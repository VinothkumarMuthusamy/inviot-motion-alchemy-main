"use client";

import { AnimateInView } from "@/components/ui/animate-in-view";
import AffirmationDisplay from "./affirmation-display";
import { Sparkles } from "lucide-react";
import { useRef, useEffect } from "react";

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
  const videoSources = ["/videos/WEBSITE VIDEO OP.mp4", "/videos/m1.mp4"];
  let currentIndex = 0;

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleEnded = () => {
      // Move to the next video
      currentIndex = (currentIndex + 1) % videoSources.length;
      videoElement.src = videoSources[currentIndex];
      videoElement.play();
    };

    videoElement.addEventListener("ended", handleEnded);
    return () => {
      videoElement.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <section
      className="py-12 text-card-foreground relative overflow-hidden"
      style={{
        backgroundImage: "url('/assets/team-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-white/0 z-10"></div>

      <div className="container-max relative z-20">
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

              <p className="mt-4 max-w-4xl text-lg text-justify text-balance font-light leading-relaxed text-black">
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
            <div
              className="relative w-full max-w-[500px] mx-auto h-[300px] md:h-[400px] rounded-lg overflow-hidden border-2 border-accent/20 shadow-lg group transition-transform duration-300 ease-in-out hover:scale-105"
              style={{
                clipPath:
                  "polygon(52% 0, 64% 19%, 100% 19%, 100% 70%, 100% 100%, 42% 100%, 33% 80%, 0 80%, 0% 35%, 0 0)",
              }}
            >
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/videos/WEBSITE VIDEO OP.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/10 transition-colors duration-300"></div>
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
