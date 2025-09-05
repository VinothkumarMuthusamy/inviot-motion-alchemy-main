"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  useEffect(() => {
    const timer1 = setTimeout(() => setScalePhase(true), 1000); // start scale after drop
    const timer2 = setTimeout(() => setLoading(false), 2800); // hide loader after scale finishes

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Global Background Image */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: "url('/assets/team-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "left",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
        }}
      />
      
      {/* Overlay to control opacity */}
      <div className="fixed inset-0 z-0 bg-white/0" />
      
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            className="fixed inset-0 flex items-center justify-center bg-white z-50"
            initial={{ opacity: 1 }}
            animate={{ opacity: scalePhase ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .8, ease: "easeOut" }}
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

      {!loading && (
        <>
          <div className="relative z-10">
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
              <Leadership />
              <Contact />
            </main>
            <Footer />
          </div>
        </>
      )}
    </div>
  );
}