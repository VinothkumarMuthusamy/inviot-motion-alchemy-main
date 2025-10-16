"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const Contact = () => {
  const [text, setText] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [loopNum, setLoopNum] = useState<number>(0);
  const [typingSpeed, setTypingSpeed] = useState<number>(150);

  const fullText: string = "Need more information or want to get in touch?";

  useEffect(() => {
    const handleType = (): void => {
      const updatedText: string = isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1);

      setText(updatedText);

      if (!isDeleting && updatedText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && updatedText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }

      setTypingSpeed(isDeleting ? 75 : 150);
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, fullText, typingSpeed]);

  return (
    <section
      id="contact"
      className="relative overflow-hidden"
      style={{ paddingTop: "2cm", paddingBottom: "2cm" }}
    >
      {/* Colored background with 2cm transparent top and bottom */}
      {/* Colored background with 2cm transparent top and bottom on large screens */}
<div
  className="absolute inset-0 bg-gradient-to-br from-primary/95 to-primary/80 lg:top-[2cm] top-0"
>
  <div className="absolute inset-0 bg-grid-white/10 bg-[size:60px_60px]"></div>
</div>


      <div className="container-max relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Text Content - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-left"
          >
            <h2 className="heading-2 text-white mb-6">
              LET'S HAVE A TALK ABOUT YOUR PROJECT
            </h2>
            <div className="h-8 mb-6">
              <p className="text-primary-foreground/90 text-xl font-light">
                {text}
                <span className="typing-cursor">|</span>
              </p>
            </div>
            <Button
              asChild
              className="font-headline shadow-md btn-glow bg-white text-primary hover:bg-white/90"
              size="lg"
            >
              <Link href="/contact-us">Contact Us →</Link>
            </Button>
          </motion.div>

          {/* Image Card - Right Side with Overflow Effect (Hidden on Mobile) */}
          <div className="hidden lg:flex justify-end">
            <div
              className="relative w-full max-w-md h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20"
              style={{ marginTop: "-1.5cm", marginBottom: "-1.5cm" }}
            >
              <Image
                src="/assets/audio-video.jpg"
                alt="Contact us"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
