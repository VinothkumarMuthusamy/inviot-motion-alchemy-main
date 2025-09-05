'use client';

import { AnimateInView } from "@/components/ui/animate-in-view";
import Image from "next/image";

const features = [
  {
    icon: "https://www.denon.com/on/demandware.static/-/Library-Sites-denon_northamerica_shared/default/dw7ae803cd/key-pages/homepage/110-years.svg",
    title: "Over A Century of Innovation",
    description: "Japanese artisanship and sound mastery since 1910.",
    hint: "110 years icon"
  },
  {
    icon: "https://www.denon.com/on/demandware.static/-/Library-Sites-denon_northamerica_shared/default/dw9faaad17/key-pages/homepage/customer-support.svg",
    title: "Outstanding Customer Service",
    description: "Our customer service team is ready to help.",
    hint: "customer support icon"
  },
  {
    icon: "https://www.denon.com/on/demandware.static/-/Library-Sites-denon_northamerica_shared/default/dw1eb5eb73/key-pages/homepage/handcrafted.svg",
    title: "Handcrafted & Hand-Tuned",
    description: "Every product is masterfully hand-tuned to achieve our iconic sound.",
    hint: "handcrafted icon"
  },
  {
    icon: "https://www.denon.com/on/demandware.static/-/Library-Sites-denon_northamerica_shared/default/dwdc6fd9d2/key-pages/homepage/sustainability.svg",
    title: "Expanded Collection",
    description: "The largest collection of products anywhere including models available nowhere else.",
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
              Often first, <span className="text-primary">always trusted</span>
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