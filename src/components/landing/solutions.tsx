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
  const [mobileScrollProgress, setMobileScrollProgress] = useState(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const mobileCardsContainerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const autoScrollRef = useRef<number | null>(null);
  const scrollDirectionRef = useRef<number>(1); // 1 for right, -1 for left
  const currentScrollRef = useRef<number>(0);

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
    const scrollLeft = cardsContainer.scrollLeft;
    const currentIndex = Math.round(scrollLeft / cardWidth);
    const nextIndex = (currentIndex + 1) % solutions.length;
    const scrollPosition = cardWidth * nextIndex;
    
    cardsContainer.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
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
    const scrollLeft = cardsContainer.scrollLeft;
    const currentIndex = Math.round(scrollLeft / cardWidth);
    const prevIndex = currentIndex === 0 ? solutions.length - 1 : currentIndex - 1;
    const scrollPosition = cardWidth * prevIndex;
    
    cardsContainer.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
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

  // ✅ Mobile horizontal scroll and video autoplay with infinite automatic scrolling
  useEffect(() => {
    if (device !== "mobile") return;

    const section = sectionRef.current;
    const cardsContainer = mobileCardsContainerRef.current;

    if (!section || !cardsContainer) return;

    // ✅ FIXED: Use regular variables instead of useRef inside useEffect
    let interactionTimeout: NodeJS.Timeout | null = null;
    let currentCardIndex = 0;

    const handleMobileScroll = () => {
      const { top, height } = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress for mobile horizontal scrolling
      const sectionStart = windowHeight * 0.1;
      const sectionEnd = height - windowHeight * 0.1;
      
      if (top <= sectionStart && top >= -sectionEnd) {
        const progress = Math.max(0, Math.min(1, (sectionStart - top) / (height - windowHeight)));
        setMobileScrollProgress(progress);
      }

      // Auto-play videos when they come into view
      videoRefs.current.forEach((video, index) => {
        if (video) {
          const card = video.closest('[data-card-index]') as HTMLElement;
          if (card) {
            const cardRect = card.getBoundingClientRect();
            const isInView = cardRect.top < windowHeight * 0.8 && cardRect.bottom > windowHeight * 0.2;
            
            if (isInView) {
              const playPromise = video.play();
              if (playPromise !== undefined) {
                playPromise.catch((error) => {
                  if (error.name !== "AbortError") {
                    console.error("Video play failed:", error);
                  }
                });
              }
            } else {
              video.pause();
              video.currentTime = 0;
            }
          }
        }
      });
    };

    // ✅ Calculate card width for precise scrolling
    const getCardWidth = () => {
      const firstCard = cardsContainer.querySelector('[data-card-index]') as HTMLElement;
      if (!firstCard) return 0;
      const cardRect = firstCard.getBoundingClientRect();
      return cardRect.width + 24; // 24px for gap-6
    };

    // ✅ Scroll to specific card index
    const scrollToCard = (index: number) => {
      const cardWidth = getCardWidth();
      const scrollPosition = cardWidth * index;
      
      cardsContainer.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      
      currentCardIndex = index;
      currentScrollRef.current = scrollPosition;
    };

    // ✅ Infinite automatic horizontal scrolling function
    const startInfiniteAutoScroll = () => {
      if (autoScrollRef.current) {
        cancelAnimationFrame(autoScrollRef.current);
      }

      const scrollContainer = mobileCardsContainerRef.current;
      if (!scrollContainer) return;

      const scrollWidth = scrollContainer.scrollWidth;
      const containerWidth = scrollContainer.clientWidth;
      const maxScroll = scrollWidth - containerWidth;

      const autoScroll = () => {
        if (!scrollContainer) return;

        // Update current scroll position
        currentScrollRef.current += scrollDirectionRef.current * 0.3; // Adjust speed here

        // Check boundaries and reverse direction
        if (currentScrollRef.current >= maxScroll) {
          currentScrollRef.current = maxScroll;
          scrollDirectionRef.current = -1; // Reverse to left
        } else if (currentScrollRef.current <= 0) {
          currentScrollRef.current = 0;
          scrollDirectionRef.current = 1; // Reverse to right
        }

        // Apply smooth scrolling
        scrollContainer.scrollTo({
          left: currentScrollRef.current,
          behavior: 'smooth'
        });

        autoScrollRef.current = requestAnimationFrame(autoScroll);
      };

      autoScrollRef.current = requestAnimationFrame(autoScroll);
    };

    // ✅ Stop automatic scrolling function
    const stopAutoScroll = () => {
      if (autoScrollRef.current) {
        cancelAnimationFrame(autoScrollRef.current);
        autoScrollRef.current = null;
      }
    };

    // Handle user interaction to pause/resume auto-scroll
    const handleUserInteractionStart = () => {
      stopAutoScroll();
      
      // Clear any existing timeout
      if (interactionTimeout) {
        clearTimeout(interactionTimeout);
        interactionTimeout = null;
      }
    };

    const handleUserInteractionEnd = () => {
      // Resume auto-scroll after 3 seconds of inactivity
      interactionTimeout = setTimeout(() => {
        startInfiniteAutoScroll();
      }, 3000);
    };

    // Handle manual scroll to detect current card
    const handleManualScroll = () => {
      const cardWidth = getCardWidth();
      const scrollLeft = cardsContainer.scrollLeft;
      
      // Calculate which card is currently in view
      const newCardIndex = Math.round(scrollLeft / cardWidth);
      currentCardIndex = Math.max(0, Math.min(solutions.length - 1, newCardIndex));
      currentScrollRef.current = scrollLeft;
    };

    const scrollContainer = mobileCardsContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('touchstart', handleUserInteractionStart, { passive: true });
      scrollContainer.addEventListener('touchend', handleUserInteractionEnd, { passive: true });
      scrollContainer.addEventListener('touchcancel', handleUserInteractionEnd, { passive: true });
      scrollContainer.addEventListener('wheel', handleUserInteractionStart, { passive: true });
      scrollContainer.addEventListener('scroll', handleManualScroll, { passive: true });
    }

    window.addEventListener("scroll", handleMobileScroll, { passive: true });

    // Initialize and start auto-scroll
    currentCardIndex = 0;
    currentScrollRef.current = 0;
    
    // Small delay to ensure DOM is ready
    const startDelay = setTimeout(() => {
      startInfiniteAutoScroll();
    }, 1000);

    return () => {
      window.removeEventListener("scroll", handleMobileScroll);
      stopAutoScroll();
      clearTimeout(startDelay);
      
      if (interactionTimeout) {
        clearTimeout(interactionTimeout);
      }
      
      if (scrollContainer) {
        scrollContainer.removeEventListener('touchstart', handleUserInteractionStart);
        scrollContainer.removeEventListener('touchend', handleUserInteractionEnd);
        scrollContainer.removeEventListener('touchcancel', handleUserInteractionEnd);
        scrollContainer.removeEventListener('wheel', handleUserInteractionStart);
        scrollContainer.removeEventListener('scroll', handleManualScroll);
      }
    };
  }, [device]);

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
          width={1920}
          height={1080}
          className="object-cover w-full h-full"
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
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                        preload="metadata"
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
                        sizes="(max-width: 640px) 85vw, 50vw"
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
                          autoPlay
                          preload="metadata"
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
          </div>
        )}
      </div>
    </section>
  );
};


export default Solutions;
