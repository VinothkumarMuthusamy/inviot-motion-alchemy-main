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
  const [isMobile, setIsMobile] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    // Check if mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Preload critical assets
    const preloadImage = new Image();
    preloadImage.src = '/assets/inviot-logo.svg';
    
    // Simulate minimum loading time - shorter on mobile
    const loadTime = isMobile ? 1500 : 1800;
    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = 'auto';
    }, loadTime);
    
    // Prevent scrolling during loading
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, [isMobile]);

  // Mobile-optimized values
  const logoSize = isMobile ? 'w-28 h-28' : 'w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56';
  const progressBarWidth = isMobile ? 'max-w-[200px]' : 'max-w-[280px] md:max-w-xs lg:max-w-sm';
  const animationDuration = isMobile ? 1.5 : 1.8;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Global Background Image - Mobile optimized */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: "url('/assets/team-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          // Mobile-specific optimizations
          ...(isMobile && {
            backgroundAttachment: 'scroll',
            backgroundPosition: 'center center'
          })
        }}
      />
      
      {/* Loader - Mobile optimized with reduced motion */}
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loader"
            className="fixed inset-0 flex items-center justify-center z-50 touch-none" // touch-none prevents scrolling on mobile
            style={{
              backgroundImage: "url('/assets/team-bg.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              // Prevent background scroll on mobile
              ...(isMobile && { position: 'fixed' })
            }}
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              transition: { 
                duration: isMobile ? 0.4 : 0.6, 
                ease: "easeOut" 
              }
            }}
          >
            {/* Semi-transparent overlay - darker on mobile for better contrast */}
            <div className={`absolute inset-0 ${isMobile ? 'bg-black/50' : 'bg-black/0'}`}></div>
            
            <div className="flex flex-col items-center justify-center relative z-10 px-4 w-full">
              {/* Logo with mobile-optimized animation */}
              <motion.div
                className="relative flex justify-center items-center"
                initial={{ 
                  scale: isMobile ? 0.9 : 0.8, 
                  opacity: 0 
                }}
                animate={{ 
                  scale: 1, 
                  opacity: 1 
                }}
                transition={{ 
                  duration: isMobile ? 0.4 : 0.5,
                  ease: "easeOut"
                }}
              >
                <img
                  src="/assets/inviot-logo.svg"
                  alt="Inviot Logo"
                  className={`${logoSize} object-contain mx-auto`}
                  // Preload and decode for better mobile performance
                  loading="eager"
                  decoding="async"
                />
              </motion.div>
              
              {/* Progress bar - simpler animation for mobile */}
              <motion.div
                className={`mt-4 md:mt-6 w-full ${progressBarWidth} mx-auto`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ 
                  delay: isMobile ? 0.3 : 0.5, 
                  duration: 0.3 
                }}
              >
                <div className="h-1.5 w-full bg-gray-200/70 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-pink-600"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ 
                      duration: animationDuration, 
                      ease: "easeInOut",
                      delay: 0.1
                    }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Mobile-specific loading text */}
            {isMobile && (
              <motion.div
                className="absolute bottom-8 left-0 right-0 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.8, duration: 0.3 }}
              >
                <p className="text-white text-sm font-light">Loading your experience...</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content - Optimized for mobile */}
      <div 
        ref={contentRef}
        className="relative z-10"
        style={{ 
          visibility: loading ? 'hidden' : 'visible',
          opacity: loading ? 0 : 1, 
          transition: `opacity ${isMobile ? '0.3s' : '0.4s'} ease-in, visibility ${isMobile ? '0.3s' : '0.4s'}` 
        }}
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

      {/* Mobile viewport meta tag enforcement */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .fixed {
            position: fixed;
          }
        }
      `}</style>
    </div>
  );
}