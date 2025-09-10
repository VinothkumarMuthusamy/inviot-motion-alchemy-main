'use client';

import { AnimateInView } from "@/components/ui/animate-in-view";
import Image from "next/image";

const features = [
  {
    icon: "/assets/featurepage/Provenavexcellence.png",
    title: "Proven AV Excellence",
    description: "Delivering world-class audio-visual solutions.",
    hint: "110 years icon"
  },
  {
    icon: "/assets/featurepage/Futureprooftechnology.png",
    title: "Future-Ready Technology",
    description: "We design environments that evolve with tomorrow’s needs.",
    hint: "customer support icon"
  },
  {
    icon: "/assets/featurepage/global reach.png",
    title: "End-to-End Integration",
    description: "Our team ensures precision and reliability at every step.",
    hint: "handcrafted icon"
  },
  {
    icon: "/assets/featurepage/Worldwide Reach, Local Care.png",
    title: "Worldwide Reach, Local Care",
    description: "Headquartered in India with global backing.",
    hint: "sustainability icon"
  }
];

const TrustedFeatures = () => {
  return (
    <div className="bg-white/50 py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-6 md:mb-8"> {/* Reduced bottom margin by half */}
          <AnimateInView>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Often first, always trusted
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
              Cutting-edge technology. Premium sound quality. 110+ years of experience.
            </p>
          </AnimateInView>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {features.map((feature, index) => (
            <AnimateInView key={index} delay={index * 150} className="flex">
              <div className="flex flex-col items-center text-center p-4 w-full">
                <div className="relative w-20 h-20 md:w-24 md:h-24 mb-4">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    fill
                    data-ai-hint={feature.hint}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-secondary">{feature.title}</h3>
                <p className="text-foreground/70 text-base md:text-lg">{feature.description}</p>
              </div>
            </AnimateInView>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustedFeatures;