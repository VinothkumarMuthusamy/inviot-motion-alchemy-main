"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import "./ImageAssembly.css";

// Import your local images
import roomBackground from "@/image/roomBackground.jpg";
import conferenceTable from "@/image/conferenceTable.jpg";
import smartTelevision from "@/image/smartTelevision.jpg";
import securityCamera from "@/image/securityCamera.jpg";
import touchPanel from "@/image/smartTelevision.jpg";

const ImageAssembly: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAssembled, setIsAssembled] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAssembled(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.8, // Trigger when 80% visible
      }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div className="assembly-container" ref={containerRef}>
      <div className="transparent-base">
        <Image 
          src={roomBackground} 
          alt="Room background" 
          data-ai-hint="empty room wall"
          className="wall permanent"
          placeholder="blur" // Optional: adds blur-up effect
        />
      </div>

      <Image
        src={conferenceTable}
        alt="Conference table"
        data-ai-hint="conference table"
        className={`table ${isAssembled ? "assembled" : "from-bottom"}`}
        placeholder="blur"
      />
      <Image
        src={smartTelevision}
        alt="Smart television"
        data-ai-hint="smart television"
        className={`tv ${isAssembled ? "assembled" : "from-left"}`}
        placeholder="blur"
      />
      <Image
        src={securityCamera}
        alt="Security camera"
        data-ai-hint="security camera"
        className={`camera ${isAssembled ? "assembled" : "from-top"}`}
        placeholder="blur"
      />
      <Image
        src={touchPanel}
        alt="Touch screen panel"
        data-ai-hint="touch panel"
        className={`touch ${isAssembled ? "assembled" : "from-right"}`}
        placeholder="blur"
      />
    </div>
  );
};

export default ImageAssembly;