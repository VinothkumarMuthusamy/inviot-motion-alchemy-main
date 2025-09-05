"use client";

import { useRef } from 'react';
import { ArrowRight, Star, Shield, Users, Layers, Scale } from 'lucide-react';
import ScrollReveal from '../ui/scroll-reveal';
import { AnimateInView } from '../ui/animate-in-view';
import Link from 'next/link';
import { Button } from '../ui/button';
import FlowingMenu from './FlowingMenu';

const menuItems = [
  {
    text: "AV-Only Specialists",
    link: "#",
    image: "https://picsum.photos/400/200?random=1"
  },
  {
    text: "Design → Integration → Support",
    link: "#",
    image: "https://picsum.photos/400/200?random=2"
  },
  {
    text: "Enterprise-grade Quality",
    link: "#",
    image: "https://picsum.photos/400/200?random=3"
  },
  {
    text: "Scale & Experience",
    link: "#",
    image: "https://picsum.photos/400/200?random=4"
  },
  {
    text: "User-first",
    link: "#",
    image: "https://picsum.photos/400/200?random=5"
  }
];

const WhyChooseUs = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      ref={containerRef}
      className="pt-4 pb-12 md:pt-6 md:pb-16 bg-background relative overflow-hidden"
      style={{
        backgroundImage: "url('/assets/team-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container-max relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-start">
          {/* LEFT SIDE */}
          <div className="flex flex-col gap-4 h-[450px]">
            <AnimateInView direction='left'>
              <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-2">Why teams choose Inviot for AV</h2>
            </AnimateInView>
            <div className="bg-pink-600 rounded-lg shadow-lg backdrop-blur-sm bg-opacity-80 border border-white border-opacity-20 flex-grow">
              <FlowingMenu items={menuItems} />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:sticky top-20">
            <AnimateInView direction='right' delay={300}>
                <div className="bg-card p-6 rounded-lg shadow-lg border border-border/50">
                <ScrollReveal 
                    containerClassName="my-0"
                    textClassName="font-headline text-2xl md:text-3xl text-primary font-bold leading-tight"
                >
                    We design and deliver boardrooms, town-halls, auditoriums, hybrid meeting rooms, classrooms, command & control, end-to-end AV that's reliable, intuitive, and future-ready across India and the Middle East.
                </ScrollReveal>
                <div className="mt-6">
                    {/* <Button asChild className="btn-glow font-headline text-sm py-2 px-4">
                    <Link href="/solutions">
                        Explore Our Solutions <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                    </Button> */}
                </div>
                </div>
            </AnimateInView>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;