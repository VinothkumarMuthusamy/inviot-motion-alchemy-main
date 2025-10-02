"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Import your components
import Header from '@/components/landing/header';
import Hero from '@/components/landing/hero';
import Mission from '@/components/landing/mission';
import Experience from '@/components/landing/experience';
import Contact from '@/components/landing/contact';
import Footer from '@/components/landing/footer';
import Journey from '@/components/landing/aboutus';
import Leadership from '@/components/landing/leadership';
import CounterBanner from '@/components/landing/counter-banner';
import Solutions from '@/components/landing/solutions';
import Affiliations from '@/components/landing/affiliations';
import RoomConfigurator from '@/components/landing/room-configurator';
import MissionPillars from '@/components/landing/pillars';
import TrustedFeatures from "@/components/landing/trusted-features";
import WhyChooseUs from "@/components/landing/why-choose-us";
import VisualSolutions from "@/components/landing/visual-solutions";
import ProcessRail from "@/components/landing/process-rail";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [scalePhase, setScalePhase] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    // Start the scale animation after initial drop
    const timer1 = setTimeout(() => setScalePhase(true), 1000);
    
    // Preload the background image using HTMLImageElement
    const bgImage = document.createElement('img');
    bgImage.src = "/assets/team-bg.jpg";
    bgImage.onload = () => {
      // Set a minimum display time for the loader
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };

    // Fallback in case image loading fails
    const fallbackTimer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Background Layer - Same as solution pages */}
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
      
      {/* Overlay to control opacity */}
      <div className="fixed inset-0 z-0 bg-white/0" />
      
      {/* Loader */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            className="fixed inset-0 flex items-center justify-center bg-white z-50"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.5, ease: "easeOut" }
            }}
          >
            <motion.img
              src="/assets/inviot-logo.svg"
              alt="Inviot Logo"
              className="w-24 h-24 object-contain"
              initial={{ y: "-100vh", scale: 1, opacity: 0 }}
              animate={
                scalePhase
                  ? { y: 0, scale: 10, opacity: 0 }
                  : { y: 0, scale: 1, opacity: 1 }
              }
              transition={{
                duration: scalePhase ? 1.5 : 1,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content - Hidden while loading to prevent white space */}
      <div 
        ref={contentRef}
        className="relative z-10"
        style={{ display: loading ? 'none' : 'block' }}
      >
        <Header />
        <main className="flex-grow">
          <Hero />
          <Mission />
          <WhyChooseUs />
          <CounterBanner /> 
          <VisualSolutions />
          <Solutions />
          <TrustedFeatures/>
          <Affiliations />
          <ProcessRail/>
          
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}