"use client";

import { useRef } from "react";
import ScrollReveal from "../ui/scroll-reveal";
import { AnimateInView } from "../ui/animate-in-view";
import FlowingMenu from "./FlowingMenu";
import Image from "next/image";

const menuItems = [
  {
    text: "AV-Only Specialists",
    // Empty link to satisfy type requirements
    image: "/assets/WHYINVIOTCHOOSEUS/AVSpecialist.png",
  },
  {
    text: "Design→Integration→Support",
    // Empty link to satisfy type requirements
    image: "/assets/WHYINVIOTCHOOSEUS/Designintegeration.png",
  },
  {
    text: "Enterprise-grade Quality",
    // Empty link to satisfy type requirements
    image: "/assets/WHYINVIOTCHOOSEUS/high-technology-background.jpg",
  },
  {
    text: "Scale & Experience",
    // Empty link to satisfy type requirements
    image: "/assets/WHYINVIOTCHOOSEUS/SCALEEXPERIENCE.jpg",
  },
  {
    text: "User-first",
    // Empty link to satisfy type requirements
    image: "/assets/WHYINVIOTCHOOSEUS/userFirst.jpg",
  },
];

const WhyChooseUs = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="pt-6 pb-16 relative overflow-hidden"
    >
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

      <div className="container-max relative z-10 px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* LEFT SIDE */}
          <div className="flex flex-col gap-4 h-[450px]">
            <AnimateInView direction="left">
              <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-2">
                Why teams choose Inviot for AV
              </h2>
            </AnimateInView>
            <div className="bg-pink-600/90 rounded-lg shadow-lg backdrop-blur-sm border border-white border-opacity-20 flex-grow">
              <FlowingMenu items={menuItems} />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative lg:sticky lg:top-20">
            <AnimateInView direction="right" delay={300}>
              <div className="bg-white/95 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-border/50">
                <ScrollReveal
                  containerClassName="my-0"
                  textClassName="font-headline text-xl sm:text-2xl md:text-3xl text-primary font-bold leading-tight"
                >
                  We design and deliver boardrooms, town-halls, auditoriums,
                  hybrid meeting rooms, classrooms, command & control,
                  end-to-end AV that's reliable, intuitive, and future-ready
                  across India and the Middle East.
                </ScrollReveal>
              </div>
            </AnimateInView>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;