"use client";

import { AnimateInView } from "@/components/ui/animate-in-view";
import AffirmationDisplay from "./affirmation-display";
import { Sparkles, Volume2, VolumeX, Play, Pause } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

const keywords = [
  "INNOVATION",
  "COLLABORATION",
  "INTEGRATION",
  "EXCELLENCE",
  "AUDIOVISUAL",
  "UNIFIED COMMUNICATION",
];

const Marquee = () => {
  return (
    <div className="relative mt-6 w-full overflow-hidden border-y border-primary/10 py-2">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...keywords, ...keywords].map((keyword, index) => (
          <div key={index} className="flex items-center mx-4">
            <Sparkles className="w-5 h-5 text-accent mr-3" />
            <span className="text-lg font-semibold tracking-wider text-foreground/70">
              {keyword}
            </span>
          </div>
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent z-10"></div>
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent z-10"></div>
    </div>
  );
};

const Mission = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleLoadedData = () => {
      console.log("Video loaded successfully");
    };
    const handleError = (e: Event) => {
      console.error("Video error:", e);
    };

    videoElement.addEventListener("play", handlePlay);
    videoElement.addEventListener("pause", handlePause);
    videoElement.addEventListener("loadeddata", handleLoadedData);
    videoElement.addEventListener("error", handleError);

    // Don't autoplay initially - wait for user interaction
    videoElement.pause();

    return () => {
      videoElement.removeEventListener("play", handlePlay);
      videoElement.removeEventListener("pause", handlePause);
      videoElement.removeEventListener("loadeddata", handleLoadedData);
      videoElement.removeEventListener("error", handleError);
    };
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !videoRef.current.muted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
      
      // If unmuting and video is playing, ensure it continues playing
      if (!newMutedState && isPlaying) {
        videoRef.current.play().catch(console.error);
      }
    }
  };

  const togglePlay = async () => {
    if (videoRef.current) {
      setHasInteracted(true);
      try {
        if (videoRef.current.paused) {
          await videoRef.current.play();
          setIsPlaying(true);
        } else {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      } catch (error) {
        console.error("Error toggling play:", error);
        // If autoplay fails due to browser restrictions, show a message
        alert("Please click the play button to start the video with audio.");
      }
    }
  };

  return (
    <section className="py-12 text-card-foreground relative overflow-hidden">
      {/* Global Background Layer */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/assets/team-bg.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-pink-500 opacity-30 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-blue-600 opacity-30 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      <div className="container-max relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left text */}
          <div className="flex flex-col justify-center">
            <AnimateInView className="flex flex-col items-start text-left">
              <h2
                className="heading-2 text-primary"
                style={{
                  fontFamily: "Saira",
                  color: "#d32471",
                  fontWeight: 700,
                  textTransform: "none",
                }}
              >
                Technology with Purpose
              </h2>

              <p className="mt-4 max-w-4xl text-lg text-justify text-balance font-light leading-relaxed text-black bg-transparent backdrop-blur-sm p-4 rounded-lg">
                At Inviot, we believe that the best way to improve communication
                and collaboration within organizations is to treat audiovisual,
                unified collaboration, and digital media as part of a larger
                ecosystem. Starting a project with a strategic approach to
                integrating these technologies gives your business the best
                opportunity to maximize ROI and build a revolutionary workplace.
                With our expertise and experience, we can help you create an
                environment where everyone feels empowered and engaged in their
                work.
              </p>
              <AffirmationDisplay />
            </AnimateInView>
          </div>

          {/* Right video */}
          <AnimateInView delay={200} className="w-full">
            <div className="relative w-full max-w-[500px] mx-auto h-[300px] md:h-[400px] rounded-lg overflow-hidden border-2 border-accent/20 shadow-lg group transition-transform duration-300 ease-in-out hover:scale-105 bg-white/10 backdrop-blur-sm">
              <video
                ref={videoRef}
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover"
                loop
                preload="metadata"
              >
                <source 
                  src="/videos/WEBSITE%20%20VIDEO%20%20INVIOT%20(OCT%2011)%20V2.mp4" 
                  type="video/mp4" 
                />
                Your browser does not support the video tag.
              </video>
              
              {/* Video Controls */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                {/* Play/Pause Button */}
                <button
                  onClick={togglePlay}
                  className="p-3 bg-black/80 rounded-full text-white hover:bg-black transition-colors backdrop-blur-sm"
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                </button>

                {/* Mute/Unmute Button */}
                <button
                  onClick={toggleMute}
                  className="p-3 bg-black/80 rounded-full text-white hover:bg-black transition-colors backdrop-blur-sm"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Play overlay for first interaction */}
              {!hasInteracted && (
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
                  onClick={togglePlay}
                >
                  <div className="text-center">
                    <div className="bg-white/90 rounded-full p-4 mb-2 inline-block">
                      <Play className="w-8 h-8 text-black" />
                    </div>
                    <p className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-lg">
                      Click to play video
                    </p>
                  </div>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
            </div>
          </AnimateInView>
        </div>

        <AnimateInView delay={400} className="mt-8">
          <Marquee />
        </AnimateInView>
      </div>

      {/* Marquee animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 9s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Mission;