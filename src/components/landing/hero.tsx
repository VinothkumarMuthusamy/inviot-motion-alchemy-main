"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState, useCallback } from "react";
import Typewriter from "typewriter-effect";

const Hero = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const videos = [
    "/videos/WEBSITE  VIDEO (OCT 8).mp4"
  ];
  
  const headlines = [
    "Beyond Technology, Into Experience ",
    "Trusted AV Partner for Global Enterprises ", 
    "Innovation Meets Communication "
  ];

  const scrollToContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const nextVideo = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentVideoIndex((prevIndex) => 
        prevIndex === videos.length - 1 ? 0 : prevIndex + 1
      );
      setIsTransitioning(false);
    }, 500);
  }, [videos.length]);

  

  return (
    <section
      id="hero"
      className="relative h-screen min-h-[600px] flex items-center justify-center text-white overflow-hidden"
    >
      {/* Video Carousel */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {videos.map((video, index) => (
          <video
            key={index}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              index === currentVideoIndex ? 'opacity-100' : 'opacity-0'
            } ${isTransitioning ? 'scale-105' : 'scale-100'}`}
            style={{ transition: 'opacity 0.5s ease, transform 5s ease' }}
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container-max w-full flex flex-col items-start px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="animate-fade-in-scale-up max-w-2xl bg-black/30 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-gray-700">
          <h1 className="heading-1 text-white text-3xl sm:text-4xl md:text-6xl font-['Orbitron'] font-bold mb-4 min-h-[120px] sm:min-h-[160px] md:min-h-[200px]">
            <Typewriter
              options={{
                strings: headlines,
                autoStart: true,
                loop: true,
                delay: 70,
                deleteSpeed: 50,
                cursor: '_'
              }}
            />
          </h1>
          
          <div className="animate-fade-up animation-delay-300 min-h-[60px] sm:min-h-[70px] md:min-h-[80px]">
            <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-200 text-balance font-['Roboto_Mono']">
             Premium AV for Modern Spaces.
            </p>
          </div>

          <div className="animate-fade-up animation-delay-700 mt-6 sm:mt-8 min-h-[60px]">
            <Button 
              size="lg" 
              className="font-headline bg-blue-600 hover:bg-blue-700 font-['Orbitron']" 
              onClick={scrollToContact}
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
