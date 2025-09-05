'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Search, PenTool, TestTube2, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimateInView } from '../ui/animate-in-view';

const processSteps = [
  {
    icon: Search,
    title: 'Discover',
    description: 'Stakeholder workshops, use-case mapping.',
  },
  {
    icon: PenTool,
    title: 'Design',
    description: 'Schematics, BoM, UX flows, mockups.',
  },
  {
    icon: TestTube2,
    title: 'Deliver',
    description: 'Build, programming, testing, training.',
  },
  {
    icon: ShieldCheck,
    title: 'Depend',
    description: 'AMC, remote monitoring, priority SLAs.',
  },
];

const TrainCarriage = ({ step, index, onHover, onLeave, isHovered }: { step: typeof processSteps[0], index: number, onHover: () => void, onLeave: () => void, isHovered: boolean }) => (
    <div 
      className={cn("train-carriage-wrapper flex items-start flex-shrink-0 relative")}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className={cn("train-carriage", `carriage-${index}`)}>
        <div className="carriage-body">
          <div className="carriage-window"></div>
          <div className="carriage-window"></div>
          <div className="carriage-window"></div>
        </div>
        <div className="carriage-wheels">
          <div className="wheel"></div>
          <div className="wheel"></div>
        </div>
      </div>
      <div className={cn("step-content", { 'visible': isHovered })}>
          <div className="icon-wrapper">
            <step.icon className="h-6 w-6 text-primary"/>
          </div>
          <h3 className="text-lg font-bold mt-3 text-secondary">{step.title}</h3>
          <p className="text-foreground/70 mt-1 text-sm">{step.description}</p>
        </div>
    </div>
);

const ProcessRail = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trainRef = useRef<HTMLDivElement>(null);
  const hasAnimatedIn = useRef(false);
  const [hoveredCarriage, setHoveredCarriage] = useState<number | null>(null);

  useEffect(() => {
    // Only run animation on non-mobile devices
    if (window.innerWidth < 768) return;

    const section = sectionRef.current;
    const train = trainRef.current;

    if (!section || !train) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimatedIn.current) {
          hasAnimatedIn.current = true;
          
          gsap.set(train, { x: '100vw' });
          
          gsap.to(train, {
            x: 0,
            duration: 2.5,
            ease: 'power3.out',
          });

          observer.unobserve(section);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      gsap.killTweensOf(train);
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="process-rail-section relative w-full bg-white/50 overflow-hidden py-8 md:py-16"
    >
        {/* Section Header */}
        <div className="container-max text-center mb-8 md:mb-16">
          <AnimateInView>
            <h2 className="heading-2">How We Work</h2>
            <p className="mt-4 text-xl text-foreground/70">Our Four-Step Process for Guaranteed Success</p>
          </AnimateInView>
        </div>

        {/* Desktop: Train Animation */}
        <div className="hidden md:flex w-full h-[250px] flex-col items-center justify-end relative"> {/* Changed to justify-end to move content to bottom */}
            {/* Track at the bottom */}
            <div className="absolute bottom-0 h-2 w-[120%] bg-gray-300 rounded-full z-0"> {/* Moved track to bottom with z-0 */}
                <div className="h-full w-full bg-repeat-x" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='8' viewBox='0 0 100 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='3' width='80' height='2' fill='%23A0A0A0'/%3E%3C/svg%3E")`}}></div>
            </div>
            
            <div className="w-full flex justify-center relative z-10"> {/* Added relative and z-10 to bring train above track */}
                <div ref={trainRef} className="train-container flex items-start scale-90">
                    <div className="train-engine flex-shrink-0">
                        <div className="engine-body">
                        <div className="engine-chimney">
                            <div className="smoke s1"></div>
                            <div className="smoke s2"></div>
                            <div className="smoke s3"></div>
                        </div>
                        <div className="engine-cab"></div>
                        </div>
                        <div className="engine-wheels">
                        <div className="wheel w-sm"></div>
                        <div className="wheel w-lg"></div>
                        <div className="wheel w-lg"></div>
                        </div>
                    </div>
                    {processSteps.map((step, index) => (
                        <TrainCarriage 
                            key={index} 
                            step={step} 
                            index={index}
                            onHover={() => setHoveredCarriage(index)}
                            onLeave={() => setHoveredCarriage(null)}
                            isHovered={hoveredCarriage === index}
                        />
                    ))}
                </div>
            </div>
        </div>

        {/* Mobile: Vertical List */}
        <div className="container-max md:hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {processSteps.map((step, index) => (
              <AnimateInView key={index} delay={index * 150}>
                <div className="bg-card p-4 rounded-lg shadow-lg border border-border/50 text-center h-full transition-all duration-300 hover:border-pink-600 hover:shadow-[0_0_15px_rgba(219,39,119,0.3)]">
                   <div className="icon-wrapper mx-auto">
                      <step.icon className="h-6 w-6 text-primary"/>
                    </div>
                    <h3 className="text-lg font-bold mt-3 text-secondary">{step.title}</h3>
                    <p className="text-foreground/70 mt-1 text-sm">{step.description}</p>
                </div>
              </AnimateInView>
            ))}
          </div>
        </div>
    </section>
  );
};

export default ProcessRail;