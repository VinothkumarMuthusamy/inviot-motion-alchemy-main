"use client";
import Image from "next/image";

// Import your components
import Header from '@/components/landing/header';
import Hero from '@/components/landing/hero';
import Mission from '@/components/landing/mission';
import Affiliations from '@/components/landing/affiliations';
import WhyChooseUs from "@/components/landing/why-choose-us";
import CounterBanner from '@/components/landing/counter-banner';
import VisualSolutions from "@/components/landing/visual-solutions";
import Solutions from '@/components/landing/solutions';
import TrustedFeatures from "@/components/landing/trusted-features";
import ProcessRail from "@/components/landing/process-rail";
import Contact from '@/components/landing/contact';
import Footer from '@/components/landing/footer';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Background Layer */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/assets/team-bg.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
          quality={60} // reduces image file size
          sizes="100vw"
        />
        <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-pink-500 opacity-30 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-blue-600 opacity-30 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      {/* Overlay */}
      <div className="fixed inset-0 z-0 bg-white/0" />

      {/* Main content */}
      <div className="relative z-10">
        <Header />
        <main className="flex-grow">
          <Hero />
          <Mission />
          <Affiliations />
          <WhyChooseUs />
          <CounterBanner />
          <VisualSolutions />
          <Solutions />
          <TrustedFeatures />
          <ProcessRail />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
