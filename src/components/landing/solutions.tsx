"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { solutions } from '@/app/solutions/solutions-data';
import { AnimateInView } from '@/components/ui/animate-in-view';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const Solutions = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [folderOpen, setFolderOpen] = useState(false);
    const [cardsVisible, setCardsVisible] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    const sectionRef = useRef<HTMLDivElement>(null);
    const cardsContainerRef = useRef<HTMLDivElement>(null);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    
    const [dynamicHeight, setDynamicHeight] = useState('200vh');

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const section = sectionRef.current;
        const cardsContainer = cardsContainerRef.current;

        if (isMobile || !section || !cardsContainer) return;

        const scrollWidth = cardsContainer.scrollWidth - window.innerWidth;
        const newHeight = scrollWidth + window.innerHeight * 1.5;
        setDynamicHeight(`${newHeight}px`);

        const handleScroll = () => {
            const { top, bottom } = section.getBoundingClientRect();
            const startOffset = window.innerHeight * 0.2;

            if (top <= startOffset && bottom > window.innerHeight) {
                 if (!folderOpen) {
                    setFolderOpen(true);
                    setTimeout(() => setCardsVisible(true), 500);
                 }
                 const progress = Math.max(0, Math.min(1, (startOffset - top) / (bottom - top - window.innerHeight)));
                 setScrollProgress(progress);
            } else if (top > startOffset) {
                 if (folderOpen) {
                    setCardsVisible(false);
                    setTimeout(() => setFolderOpen(false), 300);
                 }
                 setScrollProgress(0);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);

    }, [isMobile, folderOpen]);

    const xOffset = cardsContainerRef.current && !isMobile ? -scrollProgress * (cardsContainerRef.current.scrollWidth - window.innerWidth) : 0;
    
    const handleMouseEnter = (index: number) => {
        const video = videoRefs.current[index];
        if (video) {
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    if (error.name !== 'AbortError') {
                        console.error("Video play failed:", error);
                    }
                });
            }
        }
    };

    const handleMouseLeave = (index: number) => {
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
                height: isMobile ? 'auto' : dynamicHeight,
                backgroundImage: "url('/assets/team-bg.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
        >
            <div className={cn("lg:sticky top-0 h-screen", isMobile ? 'h-auto py-24' : 'overflow-hidden')}>
                <div className={cn("flex flex-col items-center w-full px-4", isMobile ? 'relative' : 'absolute top-[18%] left-1/2 -translate-x-1/2')}>
                    <AnimateInView>
                        <h2 className="heading-2 text-center text-3xl md:text-4xl">Our Solutions</h2>
                        <p className="mt-4 text-base md:text-lg text-black max-w-full mx-auto text-center">
                            We improve communication and collaboration within a company by treating audiovisual, unified collaboration, and digital media as part of a larger ecosystem. Our expertise and experience help us create an environment where everyone feels empowered and engaged in their work.
                        </p>
                    </AnimateInView>
                </div>

                {/* Folder for desktop */}
                {!isMobile && (
                    <div className={cn(
                        "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000",
                        folderOpen ? 'scale-150 opacity-0' : 'scale-100 opacity-100',
                        cardsVisible ? 'hidden' : ''
                    )}>
                        <div 
                            className={cn(`w-32 h-24 md:w-48 md:h-32 bg-primary rounded-t-lg relative transition-all duration-700`,
                                 folderOpen ? 'rotate-6 scale-75' : '')}
                            style={{ transformOrigin: 'bottom left' }}
                        >
                            <div className="absolute -top-2 left-4 w-12 h-2 md:w-16 md:h-3 bg-primary rounded-t-md"></div>
                            <div 
                                className={cn(`absolute inset-0 bg-secondary rounded-t-lg transition-all duration-700`,
                                 folderOpen ? 'rotate-12 scale-75' : '')}
                                style={{ transformOrigin: 'bottom right' }}
                            ></div>
                        </div>
                    </div>
                )}
                
                {/* Cards Container */}
                <div 
                    ref={cardsContainerRef} 
                    className={cn(
                        "flex items-center",
                        isMobile ? 'flex-wrap justify-center gap-8 mt-12 px-4' : 'absolute top-[40%] md:top-[42%] left-0 -translate-y-1/2 transition-opacity duration-300',
                        cardsVisible || isMobile ? "opacity-100" : "opacity-0"
                    )}
                    style={!isMobile ? { transform: `translateX(${xOffset}px)` } : {}}
                >
                    <div className={cn("flex", isMobile ? 'flex-col w-full gap-8' : 'space-x-6 md:space-x-12 px-6 md:px-12')}>
                        {/* Add one empty card space before the first card */}
                        {!isMobile && (
                            <div className="flex-shrink-0 w-[18rem] h-[14rem] lg:w-[28rem] lg:h-[20rem] opacity-0" />
                        )}
                        
                        {solutions.map((solution, index) => (
                            <Link href={`/solutions/${solution.slug}`} key={solution.slug}>
                                <div 
                                    className="group relative flex-shrink-0 w-full md:w-[18rem] h-[14rem] lg:w-[28rem] lg:h-[20rem] rounded-xl shadow-2xl 
                                        flex flex-col justify-between text-left p-4 md:p-8 transform 
                                        transition-all duration-300 hover:scale-105 hover:shadow-primary/20 border border-border/50 overflow-hidden backdrop-blur-sm bg-background/90"
                                    style={!isMobile ? {
                                        animation: cardsVisible 
                                            ? `cardAppear 0.5s ease-out ${(index + 1) * 0.1}s both`
                                            : `cardDisappear 0.3s ease-in ${(index + 1) * 0.05}s both`
                                    } : {}}
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={() => handleMouseLeave(index)}
                                >
                                    <Image
                                        src={solution.sections[0]?.image?.src || 'https://placehold.co/600x400.png'}
                                        alt={solution.title}
                                        layout="fill"
                                        objectFit="cover"
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    {solution.video && (
                                        <video
                                            ref={el => { videoRefs.current[index] = el; }}
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
            </div>
        </section>
    );
};

export default Solutions;