"use client";

import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';

interface ShineTextProps {
  children: ReactNode;
  containerClassName?: string;
  textClassName?: string;
  baseColor?: string;
  shineColor?: string;
  duration?: number;
  intensity?: number;
}

const ShineText = ({
  children,
  containerClassName = "",
  textClassName = "",
  baseColor = "text-gray-300",
  shineColor = "text-white",
  duration = 2,
  intensity = 0.7,
}: ShineTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const shineElement = shineRef.current;
    if (!shineElement) return;

    // Create the shine animation
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    
    tl.fromTo(shineElement,
      { 
        x: '-100%',
        opacity: 0
      },
      {
        x: '200%',
        opacity: intensity,
        duration: duration,
        ease: 'power2.inOut'
      }
    );

    return () => {
      tl.kill();
    };
  }, [duration, intensity]);

  return (
    <div ref={containerRef} className={`relative inline-block overflow-hidden ${containerClassName}`}>
      <span className={`relative z-10 ${textClassName} ${baseColor}`}>
        {children}
      </span>
      <span
        ref={shineRef}
        className={`absolute top-0 left-0 w-full h-full transform -skew-x-12 ${shineColor} pointer-events-none z-20`}
        style={{
          background: `linear-gradient(90deg, transparent, currentColor, transparent)`,
          filter: 'blur(2px)'
        }}
      />
    </div>
  );
};

export default ShineText;