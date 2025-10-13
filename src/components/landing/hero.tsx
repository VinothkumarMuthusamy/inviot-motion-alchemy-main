"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Typewriter from "typewriter-effect";

const Hero = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const videos = ["/videos/WEBSITE  VIDEO (OCT 8).mp4"];
  const headlines = [
    "Beyond Technology, Into Experience",
    "Trusted AV Partner for Global Enterprises", 
    "Innovation Meets Communication"
  ];

  const scrollToContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex(prev => (prev + 1) % videos.length);
    }, 5000);
    return () => clearInterval(interval);
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
            preload="auto"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              index === currentVideoIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container-max w-full flex flex-col items-start px-6 md:px-12 lg:px-24">
        <div className="max-w-2xl bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-gray-700 animate-fade-in-scale-up">
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
          
          <p className="mt-4 text-lg md:text-xl text-gray-200 font-['Roboto_Mono']">
            Premium AV for Modern Spaces.
          </p>

          <div className="mt-8">
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
      `}</style>
    </section>
  );
};

export default Hero;
