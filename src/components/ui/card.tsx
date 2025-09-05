"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const GlareHover = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & {
  background?: string;
  borderColor?: string;
  borderRadius?: string;
}>(
  (
    {
      children,
      className = "",
      background = "hsl(var(--card))",
      borderColor = "hsl(var(--border))",
      borderRadius = "0.5rem",
      ...props
    },
    ref
  ) => {
    const overlayRef = React.useRef<HTMLDivElement>(null);

    const animateIn = () => {
      const el = overlayRef.current;
      if (!el) return;

      el.style.transition = "none";
      el.style.backgroundPosition = "-100% -100%, 0 0";
      el.style.transition = "650ms ease";
      el.style.backgroundPosition = "100% 100%, 0 0";
    };

    const animateOut = () => {
      const el = overlayRef.current;
      if (!el) return;

      el.style.transition = "650ms ease";
      el.style.backgroundPosition = "-100% -100%, 0 0";
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative grid place-items-center overflow-hidden cursor-pointer",
          className
        )}
        style={{
          background,
          borderColor,
          borderRadius,
        }}
        onMouseEnter={animateIn}
        onMouseLeave={animateOut}
        {...props}
      >
        <div
          ref={overlayRef}
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(-45deg,
              hsla(0,0%,0%,0) 60%,
              rgba(255,255,255,0.3) 70%,
              hsla(0,0%,0%,0) 100%)`,
            backgroundSize: `250% 250%, 100% 100%`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "-100% -100%, 0 0",
            pointerEvents: "none",
          }}
        />
        {children}
      </div>
    );
  }
);
GlareHover.displayName = "GlareHover";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <GlareHover
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
      ref={ref}
    />
  )
);
Card.displayName = "Card";

// Keep all other card components unchanged
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };