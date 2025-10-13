
"use client";

import React, { useState, useRef, useEffect, MouseEvent } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/assets/av-solutions.jpg",
  "/assets/experience.jpg",
  "/assets/videowalls-02.jpg",
  "/assets/experience.jpg",
  "/assets/audio-video.jpg",
];
const HolographicProjector = () => {
  const [rotation, setRotation] = useState({ x: -20, y: 30 });
  const [isDragging, setIsDragging] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const prevMousePos = useRef({ x: 0, y: 0 });
  const accumulatedYRotation = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number>();

  const handleMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    prevMousePos.current = { x: e.clientX, y: e.clientY };
    if (containerRef.current) {
        containerRef.current.style.cursor = 'grabbing';
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - prevMousePos.current.x;
    const deltaY = e.clientY - prevMousePos.current.y;

    setRotation((prevRotation) => ({
      x: Math.max(-60, Math.min(60, prevRotation.x - deltaY * 0.5)),
      y: prevRotation.y + deltaX * 0.5,
    }));

    accumulatedYRotation.current += Math.abs(deltaX);

    if (accumulatedYRotation.current >= 720) { // Threshold for a spin
        accumulatedYRotation.current = 0;
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
    
    prevMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
    if (containerRef.current) {
        containerRef.current.style.cursor = 'grab';
    }
  };

  // Auto-rotate animation
  useEffect(() => {
    const autoRotate = () => {
      if (!isDragging) {
        setRotation((prev) => ({ ...prev, y: prev.y + 0.15 }));
      }
      animationFrameId.current = requestAnimationFrame(autoRotate);
    };

    animationFrameId.current = requestAnimationFrame(autoRotate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isDragging]);

  // Automatic image change
  useEffect(() => {
    const imageChangeInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3500); // Change image every 3.5 seconds

    return () => clearInterval(imageChangeInterval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="projector-scene"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
    >
      <div
        className="projector-wrapper"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: isDragging ? "none" : "transform 0.5s ease-out",
        }}
      >
        <div className="hologram-wrapper">
            <div className="hologram-image-container">
            <AnimatePresence mode="wait">
                <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, y: 20, scale: 0.9, rotateY: -90 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotateY: 0, transition: { duration: 0.5, ease: "easeOut" } }}
                exit={{ opacity: 0, y: -20, scale: 0.9, rotateY: 90, transition: { duration: 0.5, ease: "easeIn" } }}
                >
                <Image
                    src={images[currentImageIndex]}
                    alt={`Holographic image ${currentImageIndex + 1}`}
                    width={500}
                    height={350}
                    className="hologram-image"
                    priority
                  />
                </motion.div>
            </AnimatePresence>
            </div>
        </div>
        <div className="projector-base">
          <div className="projector-base-top"></div>
          <div className="projector-base-middle"></div>
          <div className="projector-base-bottom"></div>
        </div>
      </div>
    </div>
  );
};

export default HolographicProjector;
