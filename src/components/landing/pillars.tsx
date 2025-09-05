"use client";

import { useState, useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import officeImage from "@/image/bulb-gears.jpg";
import integrateImage from "@/image/3154099.jpg";
import indulgeImage from "@/image/7060468.jpg";
import interactImage from "@/image/Handshake.jpg";

const pillarsData = [
  {
    title: "Innovate",
    description: "Pushing boundaries to deliver cutting-edge AV solutions.",
    image: officeImage,
    position: "top" as const,
  },
  {
    title: "Integrate",
    description: "Seamlessly blending technology with your environment.",
    image: integrateImage,
    position: "left" as const,
  },
  {
    title: "Indulge",
    description: "Creating immersive and engaging user experiences.",
    image: indulgeImage,
    position: "right" as const,
  },
  {
    title: "Interact",
    description: "Fostering collaboration through intuitive interfaces.",
    image: interactImage,
    position: "bottom" as const,
  },
];

interface PillarCardProps {
  title: string;
  description: string;
  image: StaticImageData | string;
  position: "top" | "right" | "bottom" | "left";
  onHover: () => void;
  onLeave: () => void;
  isHovered: boolean;
  cardsVisible: boolean;
}

const PillarCard: React.FC<PillarCardProps> = ({
  title,
  description,
  image,
  position,
  onHover,
  onLeave,
  isHovered,
  cardsVisible,
}) => {
  const getPositionClasses = () => {
    switch (position) {
      case "top":
        return "col-start-2 row-start-1 justify-self-center self-end";
      case "left":
        return "col-start-1 row-start-2 justify-self-end self-center";
      case "right":
        return "col-start-3 row-start-2 justify-self-start self-center";
      case "bottom":
        return "col-start-2 row-start-3 justify-self-center self-start";
      default:
        return "";
    }
  };
  
  const getOverlayPosition = () => {
    switch(title) {
      case "Innovate": return "col-start-3 row-start-1 justify-self-start self-end";
      case "Indulge": return "col-start-3 row-start-3 justify-self-start self-start";
      default: return "";
    }
  }

  const handleMouseEnter = () => {
    if (cardsVisible) {
      onHover();
    }
  };

  const handleMouseLeave = () => {
    if (cardsVisible) {
      onLeave();
    }
  };

  // Special case for Interact card's description
  if (title === 'Interact') {
    return (
        <>
            {/* The Interact Card */}
            <div
                className={cn(
                    "relative transition-all duration-500 ease-out",
                    getPositionClasses(),
                    cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <Card
                    className="relative w-48 h-40 md:w-64 md:h-64 rounded-lg overflow-hidden shadow-lg transition-all duration-300 ease-out hover:scale-105"
                >
                    <Image src={image as string} alt={title} layout="fill" className="object-cover" />
                    <div className="absolute bottom-0 w-full bg-black/40 p-2 text-white font-semibold text-center text-sm md:text-base">
                        {title}
                    </div>
                </Card>
            </div>
            
            {/* The description overlay, positioned below 'Integrate' */}
            <div className={cn(
                "transition-all duration-300 ease-out z-10",
                "col-start-1 row-start-3 justify-self-end self-start",
                isHovered && cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
            )}>
                <div className="p-4 w-48 h-24 md:w-64 md:h-32 flex items-center justify-center text-center rounded-lg bg-black/50 text-white text-sm backdrop-blur-sm shadow-xl">
                    {description}
                </div>
            </div>
        </>
    );
  }

  // Special case for Integrate card's description
  if (title === 'Integrate') {
    return (
        <>
            <div
                className={cn(
                    "relative transition-all duration-500 ease-out",
                    getPositionClasses(),
                    cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <Card
                    className="relative w-48 h-40 md:w-64 md:h-64 rounded-lg overflow-hidden shadow-lg transition-all duration-300 ease-out hover:scale-105"
                >
                    <Image src={image as string} alt={title} layout="fill" className="object-cover" />
                    <div className="absolute bottom-0 w-full bg-black/40 p-2 text-white font-semibold text-center text-sm md:text-base">
                        {title}
                    </div>
                </Card>
            </div>
            <div className={cn(
                "transition-all duration-300 ease-out z-10",
                "col-start-1 row-start-1 justify-self-end self-end",
                isHovered && cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
            )}>
                <div className="p-4 w-48 h-24 md:w-64 md:h-32 flex items-center justify-center text-center rounded-lg bg-black/50 text-white text-sm backdrop-blur-sm shadow-xl">
                    {description}
                </div>
            </div>
        </>
    );
  }

  return (
    <>
        <div
            className={cn(
                "relative transition-all duration-500 ease-out",
                getPositionClasses(),
                cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Card
                className={cn(
                    "relative w-48 h-40 md:w-64 md:h-64 rounded-lg overflow-hidden shadow-lg transition-all duration-300 ease-out hover:scale-105"
                )}
            >
                <Image src={image as string} alt={title} layout="fill" className="object-cover" />
                <div className="absolute bottom-0 w-full bg-black/40 p-2 text-white font-semibold text-center text-sm md:text-base">
                {title}
                </div>
            </Card>
        </div>
        {/* Description Overlay */}
        <div className={cn(
            "transition-all duration-300 ease-out z-10",
            getOverlayPosition(),
            isHovered && cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
        )}>
            <div className="p-4 w-48 h-24 md:w-64 md:h-32 flex items-center justify-center text-center rounded-lg bg-black/50 text-white text-sm backdrop-blur-sm shadow-xl">
                {description}
            </div>
        </div>
    </>
  );
};

const MissionPillars = () => {
  const [scale, setScale] = useState(1.5);
  const [hoveredPillar, setHoveredPillar] = useState<string | null>(null);
  const [cardsVisible, setCardsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      
      animationFrameId.current = requestAnimationFrame(() => {
        const section = sectionRef.current;
        if (!section) return;

        const { top, height } = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const scrollableHeight = height - windowHeight;
        
        if (scrollableHeight <= 0) return;
        
        const scrollPercent = Math.max(0, Math.min(1, -top / scrollableHeight));
        
        // Use an easing function for smoother scaling
        const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
        const easedScrollPercent = easeOutCubic(scrollPercent);
        
        const newScale = 1.5 - easedScrollPercent * 0.5;
        setScale(newScale);

        if (newScale <= 1.05 && !cardsVisible) {
          setCardsVisible(true);
        } else if (newScale > 1.05 && cardsVisible) {
          setCardsVisible(false);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [cardsVisible]);

  return (
    <section
      ref={sectionRef}
      className="min-h-[300vh] relative bg-card"
      style={{
        perspective: "1000px",
        backgroundImage: "url('/assets/team-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="w-full h-full grid grid-cols-3 grid-rows-3 items-center justify-items-center py-20">
            <div
                className="col-start-2 row-start-2 flex items-center justify-center transition-transform duration-150 ease-out"
                style={{
                    transform: `scale(${scale})`,
                    willChange: 'transform'
                }}
            >
                <h2 className="heading-2 text-primary whitespace-nowrap" style={{color: "#d32471"}}>
                    Our Pillars
                </h2>
            </div>

            {pillarsData.map((pillar) => (
                <PillarCard
                    key={pillar.title}
                    {...pillar}
                    onHover={() => setHoveredPillar(pillar.title)}
                    onLeave={() => setHoveredPillar(null)}
                    isHovered={hoveredPillar === pillar.title}
                    cardsVisible={cardsVisible}
                />
            ))}
        </div>
      </div>
    </section>
  );
};

export default MissionPillars;