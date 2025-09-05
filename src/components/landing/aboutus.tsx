"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import HolographicProjector from "./HolographicProjector";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AboutUs = () => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  const fullText = "AUDIO VISUAL AND IT SOLUTIONS";

  useEffect(() => {
    const handleType = () => {
      const current = loopNum % fullText.length;
      const updatedText = isDeleting 
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1);
      
      setText(updatedText);
      
      if (!isDeleting && updatedText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
      
      setTypingSpeed(isDeleting ? 75 : 150);
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, fullText, typingSpeed]);

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: "url('/assets/team-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif'
      }}
    >
      <section id="aboutus" className="py-16 bg-white/30 relative z-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <motion.h1 
              className="text-5xl font-bold text-pink-700 mb-6"
              style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif', fontWeight: 700 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              ABOUT US
            </motion.h1>
            <motion.div 
              className="w-32 h-1.5 bg-pink-600 mx-auto mb-8"
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            />
            <motion.div 
              className="text-2xl text-gray-800 max-w-3xl mx-auto font-medium h-10"
              style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-center text-black">
                {text}
                <span className="typing-cursor">|</span>
              </div>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="mt-4">
              <motion.h2 
                className="text-4xl font-semibold text-pink-600 mb-8"
                style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif', fontWeight: 600 }}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                Who We Are
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-800 mb-8 leading-relaxed text-justify font-normal"
                style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                INVIOT is a value-added system integrator specializing in audio-visual
                and IT infrastructure design, engineering and integration. With more
                than two decades of industry experience, we deliver top-of-the-line
                AV & IT solutions, efficient project management and reliable
                support to enterprises across India and the Middle East.
              </motion.p>
              <motion.p 
                className="text-xl text-gray-800 text-justify font-normal"
                style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Established in 1997, we are a trusted organization with a proven
                record of excellence on 4000+ projects.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
                className="mt-8"
              >
                <Button asChild className="font-headline btn-glow">
                  <Link href="/about-us">Know More</Link>
                </Button>
              </motion.div>
            </div>

            <motion.div 
              className="relative w-full flex justify-center items-center h-96"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <HolographicProjector />
            </motion.div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .typing-cursor {
          animation: blink 1s infinite;
          color: rgba(0, 0, 0, 0.7);
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default AboutUs;