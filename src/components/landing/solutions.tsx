"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { solutions } from "@/app/solutions/solutions-data";
import { AnimateInView } from "@/components/ui/animate-in-view";
import { cn } from "@/lib/utils";
import Image from "next/image";

const Solutions = () => {
  const [device, setDevice] = useState<"mobile" | "tablet" | "desktop">("desktop");
  const [folderOpen, setFolderOpen] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const mobileCardsContainerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const [dynamicHeight, setDynamicHeight] = useState("200vh");

  // ✅ Navigate to next card
  const nextCard = () => {
    if (device !== "mobile") return;
    
    const cardsContainer = mobileCardsContainerRef.current;
    if (!cardsContainer) return;

    const getCardWidth = () => {
      const firstCard = cardsContainer.querySelector('[data-card-index]') as HTMLElement;
      if (!firstCard) return 0;
      const cardRect = firstCard.getBoundingClientRect();
      return cardRect.width + 24;
    };

    const cardWidth = getCardWidth();
    const nextIndex = (currentCardIndex + 1) % solutions.length;
    const scrollPosition = cardWidth * nextIndex;
    
    cardsContainer.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
    
    setCurrentCardIndex(nextIndex);
  };

  // ✅ Navigate to previous card
  const prevCard = () => {
    if (device !== "mobile") return;
    
    const cardsContainer = mobileCardsContainerRef.current;
    if (!cardsContainer) return;

    const getCardWidth = () => {
      const firstCard = cardsContainer.querySelector('[data-card-index]') as HTMLElement;
      if (!firstCard) return 0;
      const cardRect = firstCard.getBoundingClientRect();
      return cardRect.width + 24;
    };

    const cardWidth = getCardWidth();
    const prevIndex = currentCardIndex === 0 ? solutions.length - 1 : currentCardIndex - 1;
    const scrollPosition = cardWidth * prevIndex;
    
    cardsContainer.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
    
    setCurrentCardIndex(prevIndex);
  };

  // ✅ Detect device type based on width
  useEffect(() => {
    const detectDevice = () => {
      if (window.innerWidth < 640) setDevice("mobile"); // phones
      else if (window.innerWidth < 1024) setDevice("tablet"); // tablets
      else setDevice("desktop"); // desktop
    };
    detectDevice();
    window.addEventListener("resize", detectDevice);
    return () => window.removeEventListener("resize", detectDevice);
  }, []);

  // ✅ Dynamic scroll behavior for desktop only
  useEffect(() => {
    const section = sectionRef.current;
    const cardsContainer = cardsContainerRef.current;

    if (device !== "desktop" || !section || !cardsContainer) return;

    const updateHeight = () => {
      const scrollWidth = cardsContainer.scrollWidth - window.innerWidth;
      const newHeight = scrollWidth + window.innerHeight * 1.5;
      setDynamicHeight(`${newHeight}px`);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    const handleScroll = () => {
      const { top, bottom } = section.getBoundingClientRect();
      const startOffset = window.innerHeight * 0.2;

      if (top <= startOffset && bottom > window.innerHeight) {
        if (!folderOpen) {
          setFolderOpen(true);
          setTimeout(() => setCardsVisible(true), 500);
        }
        const progress = Math.max(
          0,
          Math.min(1, (startOffset - top) / (bottom - top - window.innerHeight))
        );
        setScrollProgress(progress);
      } else if (top > startOffset) {
        if (folderOpen) {
          setCardsVisible(false);
          setTimeout(() => setFolderOpen(false), 300);
        }
        setScrollProgress(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateHeight);
    };
  }, [device, folderOpen]);

  // ✅ Mobile horizontal scroll with manual navigation only
  useEffect(() => {
    if (device !== "mobile") return;

    const cardsContainer = mobileCardsContainerRef.current;
    if (!cardsContainer) return;

    // ✅ Calculate card width for precise scrolling
    const getCardWidth = () => {
      const firstCard = cardsContainer.querySelector('[data-card-index]') as HTMLElement;
      if (!firstCard) return 0;
      const cardRect = firstCard.getBoundingClientRect();
      return cardRect.width + 24; // 24px for gap-6
    };

    // Handle manual scroll to detect current card
    const handleManualScroll = () => {
      const cardWidth = getCardWidth();
      const scrollLeft = cardsContainer.scrollLeft;
      
      // Calculate which card is currently in view
      const newCardIndex = Math.round(scrollLeft / cardWidth);
      const validIndex = Math.max(0, Math.min(solutions.length - 1, newCardIndex));
      
      if (validIndex !== currentCardIndex) {
        setCurrentCardIndex(validIndex);
      }
    };

    // Setup video autoplay with Intersection Observer
    const setupVideoObserver = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const video = entry.target as HTMLVideoElement;
            if (entry.isIntersecting) {
              const playPromise = video.play();
              if (playPromise !== undefined) {
                playPromise.catch((error) => {
                  if (error.name !== "AbortError" && error.name !== "NotAllowedError") {
                    console.error("Video play failed:", error);
                  }
                });
              }
            } else {
              video.pause();
              video.currentTime = 0;
            }
          });
        },
        { 
          threshold: 0.6,
          rootMargin: "0px 0px -10% 0px"
        }
      );

      // Observe all videos
      videoRefs.current.forEach((video) => {
        if (video) {
          observer.observe(video);
        }
      });

      return observer;
    };

    // Add event listeners
    cardsContainer.addEventListener('scroll', handleManualScroll, { passive: true });

    // Setup video observer
    const videoObserver = setupVideoObserver();

    // Scroll to first card on initial load
    const initialScroll = setTimeout(() => {
      const cardWidth = getCardWidth();
      cardsContainer.scrollTo({
        left: cardWidth * currentCardIndex,
        behavior: 'auto'
      });
    }, 100);

    return () => {
      clearTimeout(initialScroll);
      
      if (videoObserver) {
        videoObserver.disconnect();
      }
      
      cardsContainer.removeEventListener('scroll', handleManualScroll);
    };
  }, [device, currentCardIndex]);

  // ✅ Horizontal scroll offset for desktop
  const xOffset =
    cardsContainerRef.current && device === "desktop"
      ? -scrollProgress *
        (cardsContainerRef.current.scrollWidth - window.innerWidth)
      : 0;

  // ✅ Handle video hover/click for desktop
  const handleVideoPlay = (index: number) => {
    if (device !== "desktop") return;
    
    const video = videoRefs.current[index];
    if (video) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          if (error.name !== "AbortError") {
            console.error("Video play failed:", error);
          }
        });
      }
    }
  };

  const handleVideoStop = (index: number) => {
    if (device !== "desktop") return;
    
    const video = videoRefs.current[index];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="solutions"
      className="relative"
      style={{
        height: device === "desktop" ? dynamicHeight : "auto",
      }}
    >
      {/* Global Background Layer */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/assets/team-bg.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-pink-500 opacity-30 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-blue-600 opacity-30 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>
      
      <div
        className={cn(
          "lg:sticky top-0 h-screen relative z-10",
          device === "desktop" ? "overflow-hidden" : "h-auto py-24"
        )}
      >
        {/* Heading */}
        <div
          className={cn(
            "flex flex-col items-center w-full px-4",
            device === "desktop"
              ? "absolute top-[18%] left-1/2 -translate-x-1/2"
              : "relative"
          )}
        >
          <AnimateInView>
            <h2 className="heading-2 text-center text-3xl md:text-4xl">
              Our Solutions
            </h2>
            <p className="mt-4 text-sm md:text-base text-black max-w-6xl mx-auto text-center">
              We improve communication and collaboration within a company by
              treating audiovisual, unified collaboration, and digital media as
              part of a larger ecosystem. Our expertise and experience help us
              create an environment where everyone feels empowered and engaged
              in their work.
            </p>
          </AnimateInView>
        </div>

        {/* Folder (desktop only) */}
        {device === "desktop" && (
          <div
            className={cn(
              "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000",
              folderOpen ? "scale-150 opacity-0" : "scale-100 opacity-100",
              cardsVisible ? "hidden" : ""
            )}
          >
            <div
              className={cn(
                `w-32 h-24 md:w-48 md:h-32 bg-primary rounded-t-lg relative transition-all duration-700`,
                folderOpen ? "rotate-6 scale-75" : ""
              )}
              style={{ transformOrigin: "bottom left" }}
            >
              <div className="absolute -top-2 left-4 w-12 h-2 md:w-16 md:h-3 bg-primary rounded-t-md"></div>
              <div
                className={cn(
                  `absolute inset-0 bg-secondary rounded-t-lg transition-all duration-700`,
                  folderOpen ? "rotate-12 scale-75" : ""
                )}
                style={{ transformOrigin: "bottom right" }}
              ></div>
            </div>
          </div>
        )}

        {/* Desktop Cards */}
        {device === "desktop" && (
          <div
            ref={cardsContainerRef}
            className={cn(
              "flex items-center absolute top-[40%] md:top-[42%] left-0 -translate-y-1/2 transition-opacity duration-300",
              cardsVisible ? "opacity-100" : "opacity-0"
            )}
            style={{ transform: `translateX(${xOffset}px)` }}
          >
            <div className="flex space-x-6 md:space-x-12 px-6 md:px-12">
              {/* Empty space for scroll effect */}
              <div className="flex-shrink-0 w-[18rem] h-[14rem] lg:w-[28rem] lg:h-[20rem] opacity-0" />

              {solutions.map((solution, index) => (
                <Link href={`/solutions/${solution.slug}`} key={solution.slug}>
                  <div
                    className={cn(
                      "group relative flex-shrink-0 rounded-xl shadow-2xl flex flex-col justify-between text-left p-4 md:p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-primary/20 border border-border/50 overflow-hidden backdrop-blur-sm bg-background/90",
                      "w-full sm:w-[90%] md:w-[18rem] h-[14rem] lg:w-[28rem] lg:h-[20rem]"
                    )}
                    style={{
                      animation: cardsVisible
                        ? `cardAppear 0.5s ease-out ${(index + 1) * 0.1}s both`
                        : `cardDisappear 0.3s ease-in ${(index + 1) * 0.05}s both`,
                    }}
                    onMouseEnter={() => handleVideoPlay(index)}
                    onMouseLeave={() => handleVideoStop(index)}
                  >
                    <Image
                      src={solution.image.src}
                      alt={solution.title}
                      fill
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {solution.video && (
                      <video
                        ref={(el) => {
                          videoRefs.current[index] = el;
                        }}
                        src={solution.video}
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-colors duration-300 z-20"></div>

                    <div className="relative z-30">
                      <h3 className="font-headline text-primary text-lg md:text-2xl font-bold uppercase tracking-widest text-white">
                        {solution.title}
                      </h3>
                      <p className="text-white/80 text-sm md:text-base mt-1 md:mt-2">
                        {solution.subtitle}
                      </p>
                    </div>
                    <span className="relative z-30 font-bold text-secondary hover:underline text-sm md:text-base mt-2 md:mt-4 self-start">
                      Learn More &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Mobile/Tablet Cards with Horizontal Scroll and Arrows */}
        {device !== "desktop" && (
          <div className="relative">
            {/* Left Arrow */}
            <button
              onClick={prevCard}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all duration-300 backdrop-blur-sm"
              style={{ left: '0.5rem' }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right Arrow */}
            <button
              onClick={nextCard}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all duration-300 backdrop-blur-sm"
              style={{ right: '0.5rem' }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div
              ref={mobileCardsContainerRef}
              className="flex items-center mt-12 px-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
              style={{ 
                scrollBehavior: 'smooth',
                overflowX: 'auto'
              }}
            >
              <div className="flex gap-6 min-w-max px-4">
                {solutions.map((solution, index) => (
                  <Link href={`/solutions/${solution.slug}`} key={solution.slug}>
                    <div
                      data-card-index={index}
                      className={cn(
                        "group relative flex-shrink-0 rounded-xl shadow-2xl flex flex-col justify-between text-left p-6 transform transition-all duration-300 border border-border/50 overflow-hidden backdrop-blur-sm bg-background/90 snap-center",
                        "w-[85vw] h-[60vh] max-h-[400px]"
                      )}
                    >
                      <Image
                        src={solution.image.src}
                        alt={solution.title}
                        fill
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      {solution.video && (
                        <video
                          ref={(el) => {
                            videoRefs.current[index] = el;
                          }}
                          src={solution.video}
                          loop
                          muted
                          playsInline
                          className="absolute inset-0 w-full h-full object-cover z-10"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/60 z-20"></div>

                      <div className="relative z-30">
                        <h3 className="font-headline text-primary text-xl font-bold uppercase tracking-widest text-white">
                          {solution.title}
                        </h3>
                        <p className="text-white/80 text-base mt-2">
                          {solution.subtitle}
                        </p>
                      </div>
                      <span className="relative z-30 font-bold text-secondary text-base mt-4 self-start">
                        Learn More &rarr;
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Scroll Indicator Dots */}
            <div className="flex justify-center mt-4 space-x-2">
              {solutions.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    currentCardIndex === index 
                      ? "bg-blue-500 scale-125" 
                      : "bg-gray-300"
                  )}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Solutions;