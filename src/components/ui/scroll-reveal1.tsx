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

const ScrollReveal1 = ({
  children,
  scrollContainerRef,
  containerClassName = "",
  textClassName = "",
  startColor = "text-gray-300", // Light grey
  endColor = "text-black",      // Dark black
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
        color: 'rgb(209 213 219)', // Light grey (gray-300)
      },
      {
        ease: 'none',
        color: 'rgb(0 0 0)', // Black
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

export default ScrollReveal1;