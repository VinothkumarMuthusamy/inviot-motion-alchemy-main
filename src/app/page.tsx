"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const contentRef = useRef(null);

  useEffect(() => {
    // Simulate minimum loading time
    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = 'auto';
    }, 2200); // Slightly longer for smoother transition
    
    // Prevent scrolling during loading
    document.body.style.overflow = 'hidden';
    
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
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
      
      {/* Loader with Background Image */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{
              backgroundImage: "url('/assets/team-bg.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "left",
              backgroundAttachment: "fixed",
              backgroundRepeat: "no-repeat",
            }}
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.6, ease: "easeOut" }
            }}
          >
            {/* Dark overlay for better contrast */}
            <div className="absolute inset-0 bg-black/0"></div>
            
            <div className="flex flex-col items-center relative z-10">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  transition: { 
                    duration: 0.8, 
                    ease: "easeOut",
                    scale: { type: "spring", damping: 15, stiffness: 300 }
                  }
                }}
                className="relative"
              >
                <motion.img
                  src="/assets/inviot-logo.svg"
                  alt="Inviot Logo"
                  className="w-80 h-90 object-contain" 
                  animate={{
                    opacity: [0, 1],
                  }}
                  transition={{
                    duration: 1.2,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-8" 
              >
                <div className="h-1.5 w-64 bg-gray-200/70 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-pink-600"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div 
        ref={contentRef}
        className="relative z-10"
        style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.5s ease-in' }}
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
          <Leadership />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}