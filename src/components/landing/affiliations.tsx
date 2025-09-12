"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { AnimateInView } from "@/components/ui/animate-in-view";
import ScrollReveal1 from "../ui/scroll-reveal1";
import VariableProximity from "../ui/VariableProximity";

// Import client logos (keep your existing imports)
import c1 from "@/image/c1.png";
import c2 from "@/image/c2.png";
import c3 from "@/image/c3.png";
import c4 from "@/image/c4.png";
import c5 from "@/image/c5.png";
import c6 from "@/image/c6.png";
import c7 from "@/image/c7.png";
import c8 from "@/image/c8.png";
import c9 from "@/image/c9.png";
import c10 from "@/image/c10.png";
import c11 from "@/image/c11.png";
import c12 from "@/image/c12.png";
import c13 from "@/image/c13.png";
import c14 from "@/image/c14.png";
import c15 from "@/image/c15.png";

// Import partner logos (keep your existing imports)
import p1 from "@/image/p1.png";
import p2 from "@/image/p2.png";
import p3 from "@/image/p3.png";
import p4 from "@/image/p4.png";
import p5 from "@/image/p5.png";
import p6 from "@/image/p6.png";
import p7 from "@/image/p7.png";
import p8 from "@/image/p8.png";
import p9 from "@/image/p9.png";
import p10 from "@/image/p10.png";
import p11 from "@/image/p11.png";
import p12 from "@/image/p12.png";
import p13 from "@/image/p13.png";
import p14 from "@/image/p14.png";
import p15 from "@/image/p15.png";
import p16 from "@/image/p16.png";
import p17 from "@/image/p17.png";
import p18 from "@/image/p18.png";
import p19 from "@/image/p19.png";
import p20 from "@/image/p20.png";

interface LogoItem {
  name: string;
  logo: any;
  hint: string;
}

const clients: LogoItem[] = [
  { name: "TechCorp Solutions", logo: c1, hint: "technology company" },
  { name: "Global Enterprises", logo: c2, hint: "multinational corporation" },
  { name: "Innovate Labs", logo: c3, hint: "research and development" },
  { name: "Capital Finance Group", logo: c4, hint: "financial services" },
  { name: "MediaSphere Networks", logo: c5, hint: "broadcasting company" },
  { name: "Digital Dynamics", logo: c6, hint: "digital transformation" },
  { name: "SoftWorks Inc", logo: c7, hint: "software development" },
  { name: "HardTech Systems", logo: c8, hint: "hardware manufacturer" },
  { name: "HealthFirst Medical", logo: c9, hint: "healthcare provider" },
  { name: "EduFuture University", logo: c10, hint: "higher education" },
  { name: "City Municipal Office", logo: c11, hint: "government services" },
  { name: "RetailPlus Stores", logo: c12, hint: "retail chain" },
  { name: "Grand Hotels Group", logo: c13, hint: "hospitality brand" },
  { name: "ManufacturePro", logo: c14, hint: "industrial manufacturing" },
  { name: "CommunityCare NGO", logo: c15, hint: "non-profit organization" },
];

const partners: LogoItem[] = [
  { name: "TechVision", logo: p1, hint: "AV technology partner" },
  { name: "Corporate Solutions", logo: p2, hint: "business integration" },
  { name: "Startup Innovations", logo: p3, hint: "emerging technology" },
  { name: "Financial Systems", logo: p4, hint: "fintech solutions" },
  { name: "Media Productions", logo: p5, hint: "content creation" },
  { name: "Tech Giants Inc", logo: p6, hint: "technology conglomerate" },
  { name: "Software Alliance", logo: p7, hint: "software development" },
  { name: "Hardware Partners", logo: p8, hint: "equipment manufacturer" },
  { name: "Consulting Experts", logo: p9, hint: "professional services" },
  { name: "Design Studio Pro", logo: p10, hint: "creative design" },
  { name: "Cloud Services Ltd", logo: p11, hint: "cloud computing" },
  { name: "SecureTech Solutions", logo: p12, hint: "cybersecurity" },
  { name: "Network Systems", logo: p13, hint: "connectivity solutions" },
  { name: "Audio Excellence", logo: p14, hint: "sound technology" },
  { name: "Visual Technologies", logo: p15, hint: "display systems" },
  { name: "Integration Specialists", logo: p16, hint: "system integration" },
  { name: "Innovation Labs", logo: p17, hint: "R&D partnership" },
  { name: "Digital Transformers", logo: p18, hint: "digital solutions" },
  { name: "Enterprise Systems", logo: p19, hint: "business solutions" },
  { name: "Collaborate Pro", logo: p20, hint: "collaboration tools" },
];

interface HorizontalMarqueeProps {
  items: LogoItem[];
  direction?: "normal" | "reverse";
  speedMultiplier?: number;
}

const HorizontalMarquee = ({
  items,
  direction = "normal",
  speedMultiplier = 1,
}: HorizontalMarqueeProps) => {
  const extendedItems = [...items, ...items, ...items]; // Triple the items for seamless looping

  const getSpeed = (): number => {
    const baseSpeed = 40;
    return baseSpeed / speedMultiplier;
  };

  return (
    <div className="relative w-full overflow-hidden py-6">
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
              className="hover:scale-105 transition-all duration-300 opacity-80 hover:opacity-100 object-contain max-h-[60px]"
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
      className="relative py-8 md:py-12" // Reduced top and bottom padding by half
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

        <AnimateInView delay={200} className="mb-16">
          <HorizontalMarquee
            items={clients}
            direction="normal"
            speedMultiplier={1.5}
          />
        </AnimateInView>

        {/* Partners Section */}
        <div className="flex flex-col items-center text-center mb-16 mt-24">
          <VariableProximity
            label="Our Partners"
            fromFontVariationSettings={`'wght' 700`}
            toFontVariationSettings={`'wght' 300`}
            containerRef={containerRef}
            radius={120}
            className="heading-2 mb-6 text-3xl md:text-4xl lg:text-5xl "
            style={{ fontFamily: "'Saira', sans-serif" }}
          />
          <ScrollReveal1
            textClassName="text-black text-justify md:text-center leading-relaxed max-w-3xl mx-auto text-lg md:text-xl"
            containerClassName="my-0"
          >
            At Inviot, we collaborate with the world's leading technology manufacturers to deliver advanced, innovative products to our customers.
          </ScrollReveal1>
        </div>

        <AnimateInView>
          <HorizontalMarquee
            items={partners}
            direction="reverse"
            speedMultiplier={1.2}
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
            transform: translateX(-33.33%);
          }
        }
      `}</style>
    </section>
  );
};

export default Affiliations;