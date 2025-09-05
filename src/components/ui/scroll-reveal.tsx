"use client";

import { useEffect, useRef, useMemo, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  scrollContainerRef?: React.RefObject<HTMLElement>;
  containerClassName?: string;
  textClassName?: string;
  startColor?: string;
  endColor?: string;
}

const ScrollReveal = ({
  children,
  scrollContainerRef,
  containerClassName = "",
  textClassName = "",
  startColor = "text-gray-500",
  endColor = "text-pink-600",
}: ScrollRevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="inline-block word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef && scrollContainerRef.current
        ? scrollContainerRef.current
        : window;

    const wordElements = el.querySelectorAll('.word');

    // Color transition animation
    gsap.fromTo(
      wordElements,
      { 
        color: 'rgb(107 114 128)', // Gray color
      },
      {
        ease: 'none',
        color: 'rgb(219 39 119)', // Pink-600 color
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          scroller: scroller,
          start: 'top bottom-=20%',
          end: 'bottom center',
          scrub: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [scrollContainerRef]);

  return (
    <div ref={containerRef} className={`${containerClassName} ${startColor}`}>
      <p className={textClassName}>{splitText}</p>
    </div>
  );
};

export default ScrollReveal;