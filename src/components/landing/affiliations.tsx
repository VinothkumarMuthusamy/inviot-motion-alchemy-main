"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { AnimateInView } from "@/components/ui/animate-in-view";
import ScrollReveal1 from "../ui/scroll-reveal1";
import VariableProximity from "../ui/VariableProximity";

interface LogoItem {
  name: string;
  logo: string;
  hint: string;
}

const clients: LogoItem[] = [
  { name: "Client 2", logo: "/assets/CLIENTS/Our india clients/2.png", hint: "client company" },
  { name: "Client 3", logo: "/assets/CLIENTS/Our india clients/3.png", hint: "client company" },
  { name: "Client 4", logo: "/assets/CLIENTS/Our india clients/4.png", hint: "client company" },
  { name: "Client 5", logo: "/assets/CLIENTS/Our india clients/5.png", hint: "client company" },
  { name: "Client 6", logo: "/assets/CLIENTS/Our india clients/6.png", hint: "client company" },
  { name: "Client 7", logo: "/assets/CLIENTS/Our india clients/7.png", hint: "client company" },
  { name: "Client 8", logo: "/assets/CLIENTS/Our india clients/8.png", hint: "client company" },
  { name: "Client 9", logo: "/assets/CLIENTS/Our india clients/9.png", hint: "client company" },
  { name: "Client 10", logo: "/assets/CLIENTS/Our india clients/10.png", hint: "client company" },
  { name: "Client 11", logo: "/assets/CLIENTS/Our india clients/11.png", hint: "client company" },
  { name: "Client 12", logo: "/assets/CLIENTS/Our india clients/12.png", hint: "client company" },
  { name: "Client 13", logo: "/assets/CLIENTS/Our india clients/13.png", hint: "client company" },
  { name: "Client 14", logo: "/assets/CLIENTS/Our india clients/14.png", hint: "client company" },
  { name: "Client 15", logo: "/assets/CLIENTS/Our india clients/15.png", hint: "client company" },
  { name: "Client 16", logo: "/assets/CLIENTS/Our india clients/16.png", hint: "client company" },
  { name: "Client 17", logo: "/assets/CLIENTS/Our india clients/17.png", hint: "client company" },
  { name: "Client 18", logo: "/assets/CLIENTS/Our india clients/18.png", hint: "client company" },
  { name: "Client 19", logo: "/assets/CLIENTS/Our india clients/19.png", hint: "client company" },
  { name: "Client 20", logo: "/assets/CLIENTS/Our india clients/20.png", hint: "client company" },
  { name: "Client 21", logo: "/assets/CLIENTS/Our india clients/21.png", hint: "client company" },
  { name: "Client 22", logo: "/assets/CLIENTS/Our india clients/22.png", hint: "client company" },
  { name: "Client 23", logo: "/assets/CLIENTS/Our india clients/23.png", hint: "client company" },
  { name: "Client 24", logo: "/assets/CLIENTS/Our india clients/24.png", hint: "client company" },
  { name: "Client 25", logo: "/assets/CLIENTS/Our india clients/25.png", hint: "client company" },
  { name: "Client 26", logo: "/assets/CLIENTS/Our india clients/26.png", hint: "client company" },
  { name: "Client 27", logo: "/assets/CLIENTS/Our india clients/27.png", hint: "client company" },
  { name: "Client 28", logo: "/assets/CLIENTS/Our india clients/28.png", hint: "client company" },
  { name: "Client 29", logo: "/assets/CLIENTS/Our india clients/29.png", hint: "client company" },
  { name: "Client 30", logo: "/assets/CLIENTS/Our india clients/30.png", hint: "client company" },
  { name: "Client 31", logo: "/assets/CLIENTS/Our india clients/31.png", hint: "client company" },
  { name: "Client 32", logo: "/assets/CLIENTS/Our india clients/32.png", hint: "client company" },
  { name: "Client 33", logo: "/assets/CLIENTS/Our india clients/33.png", hint: "client company" },
  { name: "Client 34", logo: "/assets/CLIENTS/Our india clients/34.png", hint: "client company" },
  { name: "Client 35", logo: "/assets/CLIENTS/Our india clients/35.png", hint: "client company" },
  { name: "Client 36", logo: "/assets/CLIENTS/Our india clients/36.png", hint: "client company" },
  { name: "Client 37", logo: "/assets/CLIENTS/Our india clients/37.png", hint: "client company" },
  { name: "Client 38", logo: "/assets/CLIENTS/Our india clients/38.png", hint: "client company" },
  { name: "Client 39", logo: "/assets/CLIENTS/Our india clients/39.png", hint: "client company" },
  { name: "Client 40", logo: "/assets/CLIENTS/Our india clients/40.png", hint: "client company" },
  { name: "Client 41", logo: "/assets/CLIENTS/Our india clients/41.png", hint: "client company" },
  { name: "Client 42", logo: "/assets/CLIENTS/Our india clients/42.png", hint: "client company" },
  { name: "Client 43", logo: "/assets/CLIENTS/Our india clients/43.png", hint: "client company" },
  { name: "Client 44", logo: "/assets/CLIENTS/Our india clients/44.png", hint: "client company" },
  { name: "Client 45", logo: "/assets/CLIENTS/Our india clients/45.png", hint: "client company" },
  { name: "Client 46", logo: "/assets/CLIENTS/Our india clients/46.png", hint: "client company" },
  { name: "Client 47", logo: "/assets/CLIENTS/Our india clients/47.png", hint: "client company" },
  { name: "Client 48", logo: "/assets/CLIENTS/Our india clients/48.png", hint: "client company" },
  { name: "Client 49", logo: "/assets/CLIENTS/Our india clients/49.png", hint: "client company" },
  { name: "Client 50", logo: "/assets/CLIENTS/Our india clients/50.png", hint: "client company" },
  { name: "Client 51", logo: "/assets/CLIENTS/Our india clients/51.png", hint: "client company" },
  
];

// Technology Partners - All 29 images
const technologyPartners: LogoItem[] = [
  { name: "Audio Technica", logo: "/assets/Partners/Technology Partners - AV/Audio Technica.png", hint: "audio equipment" },
  { name: "Barco", logo: "/assets/Partners/Technology Partners - AV/Barco.png", hint: "projection technology" },
  { name: "Biamp", logo: "/assets/Partners/Technology Partners - AV/Biamp.png", hint: "audio systems" },
  { name: "Bose", logo: "/assets/Partners/Technology Partners - AV/Bose.png", hint: "sound systems" },
  { name: "BrightSign", logo: "/assets/Partners/Technology Partners - AV/Bright sign.png", hint: "digital signage" },
  { name: "Chief", logo: "/assets/Partners/Technology Partners - AV/Chief.png", hint: "mounting solutions" },
  { name: "Christie", logo: "/assets/Partners/Technology Partners - AV/Christie.png", hint: "visual solutions" },
  { name: "Cisco", logo: "/assets/Partners/Technology Partners - AV/Cisco.png", hint: "networking equipment" },
  { name: "ClearOne", logo: "/assets/Partners/Technology Partners - AV/ClearOne.png", hint: "conferencing solutions" },
  { name: "Crestron", logo: "/assets/Partners/Technology Partners - AV/Crestron.png", hint: "automation systems" },
  { name: "Datapath", logo: "/assets/Partners/Technology Partners - AV/Datapath.png", hint: "video wall controllers" },
  { name: "Epson", logo: "/assets/Partners/Technology Partners - AV/Epson.png", hint: "projectors" },
  { name: "Extron", logo: "/assets/Partners/Technology Partners - AV/Extron Electro.png", hint: "AV systems" },
  { name: "Harman", logo: "/assets/Partners/Technology Partners - AV/2.png", hint: "audio solutions" },
  { name: "Jabra", logo: "/assets/Partners/Technology Partners - AV/Jabra.png", hint: "headsets" },
  { name: "Jupiter", logo: "/assets/Partners/Technology Partners - AV/Jupiter.png", hint: "display systems" },
  { name: "Kramer", logo: "/assets/Partners/Technology Partners - AV/Kramer.png", hint: "AV solutions" },
  { name: "LG", logo: "/assets/Partners/Technology Partners - AV/LG.png", hint: "displays" },
  { name: "Lightware", logo: "/assets/Partners/Technology Partners - AV/Lightware.png", hint: "AV connectivity" },
  { name: "Logitech", logo: "/assets/Partners/Technology Partners - AV/Logitech.png", hint: "peripherals" },
  { name: "Neat", logo: "/assets/Partners/Technology Partners - AV/1.png", hint: "video devices" },
  { name: "Panasonic", logo: "/assets/Partners/Technology Partners - AV/Panasonic.png", hint: "electronics" },
  { name: "Poly", logo: "/assets/Partners/Technology Partners - AV/Poly.png", hint: "communications equipment" },
  { name: "QSC", logo: "/assets/Partners/Technology Partners - AV/QSC.png", hint: "audio products" },
  { name: "Samsung", logo: "/assets/Partners/Technology Partners - AV/Samsung.png", hint: "electronics" },
  { name: "Sennheiser", logo: "/assets/Partners/Technology Partners - AV/Sennheiser.png", hint: "audio equipment" },
  { name: "Shure", logo: "/assets/Partners/Technology Partners - AV/Shure.png", hint: "microphones" },
  { name: "Microsoft Teams", logo: "/assets/Partners/Technology Partners - AV/Teams.png", hint: "collaboration platform" },
  { name: "Zoom", logo: "/assets/Partners/Technology Partners - AV/Zoom.png", hint: "video communications" },
];

interface HorizontalMarqueeProps {
  items: LogoItem[];
  direction?: "normal" | "reverse";
  speedMultiplier?: number;
  className?: string;
  opacity?: number;
}

const HorizontalMarquee = ({
  items,
  direction = "normal",
  speedMultiplier = 1,
  className = "",
  opacity = 80,
}: HorizontalMarqueeProps) => {
  // For large number of items, we need to duplicate them enough times to create a seamless loop
  // We'll duplicate the items array twice to ensure smooth animation
  const extendedItems = [...items, ...items];

  const getSpeed = (): number => {
    const baseSpeed = 60; // Adjust base speed based on number of items
    return baseSpeed / speedMultiplier;
  };

  return (
    <div className={`relative w-full overflow-hidden py-6 ${className}`}>
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: `marquee-horizontal ${getSpeed()}s linear infinite`,
          animationDirection: direction,
        }}
      >
        {extendedItems.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className="inline-flex items-center justify-center mx-4 md:mx-8"
            style={{ minWidth: "120px", height: "80px" }}
          >
            <Image
              src={item.logo}
              alt={item.name}
              width={120}
              height={60}
              data-ai-hint={item.hint}
              className="hover:scale-105 transition-all duration-300 hover:opacity-100 object-contain max-h-[60px]"
              style={{ opacity: `${opacity}%` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const Affiliations = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <section
      id="affiliations"
      className="relative py-8 md:py-12"
      ref={containerRef}
    >
      <div className="absolute inset-0 bg-white/0 z-0"></div>

      <div className="container-max relative z-10">
        {/* Clients Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <VariableProximity
            label="Our Clients"
            fromFontVariationSettings={`'wght' 700`}
            toFontVariationSettings={`'wght' 300`}
            containerRef={containerRef}
            radius={120}
            className="heading-2 mb-6 text-3xl md:text-4xl lg:text-5xl"
            style={{ fontFamily: "'Saira', sans-serif" }}
          />
          <ScrollReveal1
            textClassName="text-black text-justify md:text-center leading-relaxed max-w-3xl mx-auto text-lg md:text-xl"
            containerClassName="my-0"
          >
            Inviot has built a strong reputation as a trusted partner for organizations ranging from startups to global enterprises. Our collaborations span finance, education, technology, healthcare, and the public sector. With tailor-made audiovisual solutions, we address unique challenges, drive efficiency, and strengthen the trust our clients place in us.
          </ScrollReveal1>
        </div>

        {/* Top Clients Marquee - Left to Right */}
        <AnimateInView delay={200} className="mb-0">
          <HorizontalMarquee
            items={clients}
            direction="normal"
            speedMultiplier={1}
          />
        </AnimateInView>
        
        {/* Bottom Clients Marquee - Right to Left */}
        <AnimateInView delay={200} className="mb-16">
          <HorizontalMarquee
            items={clients}
            direction="reverse"
            speedMultiplier={1}
          />
        </AnimateInView>

        {/* Technology Partners Section */}
        <div className="flex flex-col items-center text-center mb-16 mt-24">
          <VariableProximity
            label="Our Technology Partners"
            fromFontVariationSettings={`'wght' 700`}
            toFontVariationSettings={`'wght' 300`}
            containerRef={containerRef}
            radius={120}
            className="heading-2 mb-6 text-3xl md:text-4xl lg:text-5xl"
            style={{ fontFamily: "'Saira', sans-serif" }}
          />
          <ScrollReveal1
            textClassName="text-black text-justify md:text-center leading-relaxed max-w-3xl mx-auto text-lg md:text-xl"
            containerClassName="my-0"
          >
            At Inviot, we collaborate with the world's leading technology manufacturers to deliver advanced, innovative products to our customers.
          </ScrollReveal1>
        </div>

        {/* Top Technology Partners Marquee - Left to Right */}
        <AnimateInView delay={200} className="mb-0">
          <HorizontalMarquee
            items={technologyPartners}
            direction="normal"
            speedMultiplier={1}
          />
        </AnimateInView>
        
        {/* Bottom Technology Partners Marquee - Right to Left */}
        <AnimateInView delay={200}>
          <HorizontalMarquee
            items={technologyPartners}
            direction="reverse"
            speedMultiplier={1}
          />
        </AnimateInView>
      </div>

      {/* Add CSS for horizontal marquee animation */}
      <style jsx global>{`
        @keyframes marquee-horizontal {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-400%);
          }
        }
      `}</style>
    </section>
  );
};

export default Affiliations;