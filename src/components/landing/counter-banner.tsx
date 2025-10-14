"use client";

import React, { useEffect, useRef, useState } from "react";
import { Briefcase, Calendar, Users, Globe, Award } from "lucide-react";

// SVG Icons
const CalendarIcon = () => (
  <Calendar className="text-white" size={32} />
);
const BriefcaseIcon = () => (
  <Briefcase className="text-white" size={32} />
);
const GlobeIcon = () => (
    <Globe className="text-white" size={32} />
);
const AwardIcon = () => (
    <Award className="text-white" size={32} />
);


// Stats Section
const StatsSection = () => {
  const stats = [
    { icon: CalendarIcon, finalValue: 20,label: "Years of Experience" },
    { icon: BriefcaseIcon, finalValue: 4000, label: "Successful Projects" },
    { icon: GlobeIcon, finalValue: 2, label: "Global Presence (India & ME)" },
    { icon: AwardIcon, finalValue: 9001, label: "ISO 9001:2015 Certified", isYear: true },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <AnimatedStatCard 
          key={index} 
          icon={stat.icon} 
          finalValue={stat.finalValue} 
          label={stat.label}
          isYear={stat.isYear}
        />
      ))}
    </div>
  );
};

// Animated Stat Card
interface AnimatedStatCardProps {
  icon: React.ComponentType;
  finalValue: number;
  label: string;
  isYear?: boolean;
}

const AnimatedStatCard: React.FC<AnimatedStatCardProps> = ({ icon: Icon, finalValue, label, isYear }) => {
  const [inView, setInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => { if (cardRef.current) observer.unobserve(cardRef.current); };
  }, []);

  return (
    <div 
      ref={cardRef}
      className="relative group p-6 text-white transition-all duration-300"
    >
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="relative mb-6">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 group-hover:animate-pulse-glow">
            <div className="text-white"><Icon /></div>
          </div>
        </div>

        <Counter finalValue={finalValue} inView={inView} isYear={isYear} />
        <p className="mt-2 text-sm text-white group-hover:text-white transition-colors duration-300 h-10 flex items-center">{label}</p>
      </div>
    </div>
  );
};

interface CounterProps {
  finalValue: number;
  inView: boolean;
  isYear?: boolean;
}

const Counter: React.FC<CounterProps> = ({ finalValue, inView, isYear }) => {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (inView && !hasAnimated.current) {
      hasAnimated.current = true;
      let start = 0;
      const duration = 2000;
      const end = finalValue;
      if (start === end) return;

      const incrementTime = duration / end;
      
      const timer = setInterval(() => {
        start += Math.ceil(end/200);
        if (start > end) start = end;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [inView, finalValue]);
  
  const displayValue = isYear ? "9001:2015" : (finalValue === 2 ? count.toLocaleString() : count.toLocaleString() + "+");

  return (
    <span className="text-5xl font-bold font-headline">
       {isYear ? "9001:2015" : `${count.toLocaleString()}${finalValue !== 2 ? "+" : ""}`}
    </span>
  );
};

const MusicWaveAnimation = () => (
    <div className="absolute inset-0 w-full h-full opacity-20 pointer-events-none flex items-center justify-center">
        <div className="sound-wave w-full max-w-4xl px-4">
            <div className="sw1"></div>
            <div className="sw2"></div>
            <div className="sw3"></div>
            <div className="sw4"></div>
            <div className="sw5"></div>
            <div className="sw3"></div>
            <div className="sw5"></div>
            <div className="sw4"></div>
            <div className="sw6"></div>
            <div className="sw1"></div>
            <div className="sw2"></div>
            <div className="sw1"></div>
            <div className="sw3"></div>
            <div className="sw7"></div>
            <div className="sw5"></div>
            <div className="sw3"></div>
            <div className="sw1"></div>
            <div className="sw6"></div>
            <div className="sw8"></div>
            <div className="sw7"></div>
            <div className="sw5"></div>
            <div className="sw1"></div>
            <div className="sw2"></div>
            <div className="sw3"></div>
            <div className="sw2"></div>
            <div className="sw3"></div>
            <div className="sw4"></div>
            <div className="sw5"></div>
            <div className="sw3"></div>
            <div className="sw5"></div>
            <div className="sw7"></div>
            <div className="sw8"></div>
            <div className="sw7"></div>
            <div className="sw3"></div>
            <div className="sw1"></div>
            <div className="sw5"></div>
            <div className="sw4"></div>
            <div className="sw3"></div>
            <div className="sw2"></div>
            <div className="sw1"></div>
        </div>
    </div>
);


const CounterBanner = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-pink-600 to-pink-800 relative overflow-hidden w-full">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <StatsSection />
      </div>
      <MusicWaveAnimation />
    </section>
  );
};

export default CounterBanner;