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

  useEffect(() => {
    document.querySelectorAll('[fdprocessedid]').forEach(el => {
      el.removeAttribute('fdprocessedid');
    });
    
    // Add the robot font to the document head
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&family=Roboto+Mono:wght@300;400;500&display=swap";
    document.head.appendChild(link);
    
    // Set up the carousel auto-advance
    const interval = setInterval(nextVideo, 5000);
    
    return () => clearInterval(interval);
  }, [nextVideo]);

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
      <div className="relative z-10 container-max w-full flex flex-col items-start px-6 md:px-12 lg:px-24">
        <div className="animate-fade-in-scale-up max-w-2xl bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-gray-700">
          <h1 className="heading-1 text-white text-4xl sm:text-5xl md:text-6xl font-['Orbitron'] font-bold mb-4">
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
          
          <div className="animate-fade-up animation-delay-300">
            <p className="mt-4 text-lg md:text-xl text-gray-200 text-balance font-['Roboto_Mono']">
             Premium AV for Modern Spaces.
            </p>
          </div>

          <div className="animate-fade-up animation-delay-700 mt-8">
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

      {/* Carousel indicators - Centered at bottom */}
      {/* <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {videos.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentVideoIndex ? 'bg-white' : 'bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => {
              setIsTransitioning(true);
              setTimeout(() => {
                setCurrentVideoIndex(index);
                setIsTransitioning(false);
              }, 500);
            }}
          />
        ))}
      </div> */}

      {/* Navigation arrows */}
      {/* <button 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
        onClick={() => {
          setIsTransitioning(true);
          setTimeout(() => {
            setCurrentVideoIndex(currentVideoIndex === 0 ? videos.length - 1 : currentVideoIndex - 1);
            setIsTransitioning(false);
          }, 500);
        }}
        aria-label="Previous video"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
        onClick={nextVideo}
        aria-label="Next video"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <style jsx>{`
        .container-max {
          max-width: 1400px;
          margin: 0 auto;
        }
        
        @keyframes fadeInScaleUp {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fade-in-scale-up {
          animation: fadeInScaleUp 0.8s ease-out forwards;
        }
        
        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-up {
          opacity: 0;
          animation: fadeUp 0.8s ease-out forwards;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        
        .animation-delay-700 {
          animation-delay: 0.7s;
        }
      `}</style> */}
    </section>
  );
};

export default Hero;