"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimateInViewProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  direction?: "up" | "down" | "left" | "right"; // ✅ added direction
}

export function AnimateInView({
  children,
  className,
  delay = 0,
  threshold = 0.1,
  direction = "up", // ✅ default
}: AnimateInViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(element);
          }
        });
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  // ✅ compute transform based on direction
  const getHiddenClass = () => {
    switch (direction) {
      case "left":
        return "opacity-0 -translate-x-8";
      case "right":
        return "opacity-0 translate-x-8";
      case "down":
        return "opacity-0 translate-y-8";
      case "up":
      default:
        return "opacity-0 -translate-y-8";
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-1000",
        isInView ? "animate-fade-up opacity-100 translate-x-0 translate-y-0" : getHiddenClass(),
        className
      )}
      style={{ animationDelay: `${delay}ms`, transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
