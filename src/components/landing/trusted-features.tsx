'use client';

import { useState } from 'react';
import { AnimateInView } from "@/components/ui/animate-in-view";
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const approachSteps = [
  {
    id: "consultancy",
    title: "Proven AV Excellence",
    description: "Delivering world-class audio-visual solutions with precision and impact.",
    image: "/assets/featurepage/Proven av excellence 1-01.png",
    hint: "team consulting meeting"
  },
  {
    id: "design",
    title: "Future-Ready Technology",
    description: "We design environments that evolve with tomorrow's needs, using cutting-edge AV systems.",
    image: "/assets/featurepage/Future proof technology 1-01.png",
    hint: "architectural design blueprint"
  },
  {
    id: "integrate",
    title: "End-to-End Integration",
    description: "Our team ensures seamless installation and integration for reliable performance at every step.",
    image: "/assets/featurepage/GLOBAL REACH 1-01-01.png",
    hint: "technician installing hardware"
  },
  {
    id: "support",
    title: "Worldwide Reach, Local Care",
    description: "Headquartered in India with global backing, we deliver personalized support wherever you are.",
    image: "/assets/featurepage/Worldwide Reach, Local Care 1-01.png",
    hint: "customer support team"
  },
];

const TrustedFeatures = () => {
  const [activeTab, setActiveTab] = useState(approachSteps[0].id);
  const activeStep = approachSteps.find((step) => step.id === activeTab);

  return (
    <section className="section-padding relative">
      {/* Background Layer - Same as global background */}
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
      
      <div className="container-max relative z-10">
        {/* Section Header */}
        <AnimateInView className="text-center mb-12 md:mb-16">
          <h2 className="heading-2">Often first, always trusted</h2>
          <p className="mt-4 max-w-3xl mx-auto text-foreground/80 text-base md:text-lg leading-relaxed">
            Cutting-edge technology. 20+ years of experience.
          </p>
        </AnimateInView>

        {/* Layout: Circle + Content */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
          {/* Circular Navigation */}
          <div className="relative w-72 h-72 flex-shrink-0">
            {/* Pink Circle PNG Background */}
            <Image
              src="/assets/pink-circle.png"
              alt="Pink Circle Background"
              fill
              className="object-contain z-0"
              priority
            />

            {/* Outer Circle Border */}
            <div className="absolute inset-0 rounded-full border-2 border-primary/20 z-10" />

            {/* Buttons with only numbers */}
            {approachSteps.map((step, index) => {
              const totalSteps = approachSteps.length;
              const angle = (index * 360) / totalSteps - 90;
              const radius = 100;
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;

              return (
                <button
                  key={step.id}
                  type="button"
                  className={`absolute w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-xs font-bold z-20 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                    activeTab === step.id
                      ? "bg-primary text-primary-foreground shadow-xl border-2 border-white"
                      : "bg-card text-foreground/80 hover:bg-primary/20 shadow-md border border-border"
                  }`}
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: "translate(-50%, -50%)",
                  }}
                  onClick={() => setActiveTab(step.id)}
                >
                  0{index + 1}
                </button>
              );
            })}

            {/* Enlarged Center Circle */}
            <div className="absolute inset-0 m-auto w-28 h-28 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-xl z-20">
              <span className="text-primary-foreground font-bold text-sm sm:text-base text-center leading-tight px-2">
                {activeStep?.title || "Our Approach"}
              </span>
            </div>
          </div>

          {/* Content Area with Image Left and Text Right */}
          <div className="w-[500px] h-[200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="h-full w-full flex items-center overflow-hidden rounded-xl shadow-lg border border-border/20 bg-transparent "
              >
                {/* Image Left */}
                <div className="relative w-[200px] h-full flex-shrink-0 rounded-l-xl overflow-hidden">
                  <Image
                    src={activeStep?.image || ""}
                    alt={activeStep?.title || "Approach Step"}
                    data-ai-hint={activeStep?.hint}
                    fill
                    className="object-cover"
                    sizes="200px"
                    priority
                  />
                </div>

                {/* Text Right */}
                <div className="flex-1 p-4">
                  <h3 className="text-secondary text-base font-semibold mb-1">
                    {activeStep?.title}
                  </h3>
                  <p className="text-foreground/80 text-sm leading-snug line-clamp-3">
                    {activeStep?.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedFeatures;