
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AnimateInView } from "@/components/ui/animate-in-view";
import FeatureList from "@/components/ui/feature-list";
import HotspotCarousel from "@/components/ui/hotspot";
import type { Solution } from "../solutions-data";

const solution: Solution = {
    slug: "digital-signage",
    title: "Digital Signage",
    subtitle: "Digital Signage Solutions are a great way to share information with visitors, customers, and teams.",
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    description: "When you want to connect with your audience, digital signage is the easiest and most engaging way to do it. With digital signage, you can reach your audience wherever they are—whether at home, in a hotel room or on the road.",
    image: { 
        src: "/assets/solutionimg/Digital Signage.jpg", 
        alt: "Interactive Digital Signage", 
        hint: "interactive kiosk" 
    },
    sections: [
        {
            type: 'centered-text',
            title: "Engage, Inform, and Inspire",
            content: `<p>Transform your spaces with dynamic digital signage that captures attention and delivers impactful messages. From towering video walls in corporate lobbies to interactive kiosks in retail, we provide end-to-end solutions that are easy to manage and impossible to ignore.</p>`,
        },
        {
            type: 'feature-list',
            title: "Dynamic Signage Capabilities",
            features: [
                {
                    icon: "https://picsum.photos/150/150?random=14",
                    title: "Centralized Content Management",
                    description: "Update content across hundreds of screens from a single, web-based dashboard with scheduling and analytics."
                },
                {
                    icon: "https://picsum.photos/150/150?random=15",
                    title: "Interactive Experiences",
                    description: "Engage users with touchscreens, wayfinding, directories, and data-driven content triggered by sensors."
                },
                {
                    icon: "https://picsum.photos/150/150?random=16",
                    title: "Stunning Video Walls",
                    description: "Create seamless, high-impact video walls of any size or configuration with ultra-narrow bezel displays."
                }
            ]
        },
        {
            type: 'hotspot-carousel',
            title: "Retail Digital Signage in Action",
            content: "See how digital signage can transform a retail environment, providing information, enhancing brand image, and driving sales through targeted promotions.",
            hotspots: [
                {
                    image: { src: "https://picsum.photos/1280/720?random=17", alt: "Retail store with digital screens", hint: "retail digital signage" },
                    hotspots: [
                        {
                            position: { top: '45%', left: '20%' },
                            title: "Interactive Kiosk",
                            description: "Product discovery and wayfinding",
                            details: ["24/7 operation", "Durable anti-glare glass", "Integrated loyalty program signup"],
                            link: "#"
                        },
                        {
                            position: { top: '30%', left: '60%' },
                            title: "Large Format Display",
                            description: "High-brightness promotional screen",
                            details: ["85-inch 4K HDR display", "2500 nits brightness", "Remote content scheduling"],
                            link: "#"
                        }
                    ]
                }
            ]
        }
    ],
    cta: {
        title: "Ready to transform your space?",
        buttonText: "Explore Signage Solutions"
    }
};

const DefaultHero = ({ solution }: { solution: Solution }) => {
    const heroImage = solution.image?.src || "https://picsum.photos/1920/1080";
    const heroHint = solution.image?.hint || "technology solution";
    
    return (
        <div className="relative pt-32 pb-16 text-white" role="main">
            <div className="absolute inset-0 bg-black">
                <Image
                    src={heroImage}
                    alt={`${solution.title} hero image`}
                    data-ai-hint={heroHint}
                    fill
                    className="object-cover opacity-40"
                    priority
                />
            </div>
            <div className="relative container-max">
                <AnimateInView>
                    <div className="max-w-3xl">
                        <h1 className="heading-1 !text-white">{solution.title}</h1>
                        <p className="mt-4 text-xl text-white/80 max-w-4xl">
                        {solution.description}
                        </p>
                    </div>
                </AnimateInView>
            </div>
        </div>
    );
};

export default function DigitalSignagePage() {
  const scrollToContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const contactElement = document.getElementById("contact");
    if (contactElement) {
        contactElement.scrollIntoView({ behavior: "smooth" });
    } else {
        window.location.href = '/#contact';
    }
  };

  const introSection = solution.sections?.find(s => s.type === 'centered-text');
  const featureListSection = solution.sections?.find(s => s.type === 'feature-list');
  const hotspotSection = solution.sections?.find(s => s.type === 'hotspot-carousel');

  return (
    <div 
      className="bg-background"
      style={{
        backgroundImage: "url('/assets/team-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
        <DefaultHero solution={solution} />

        {introSection && (
            <section className="section-padding bg-transparent">
                <div className="container-max text-center max-w-4xl mx-auto">
                    <AnimateInView>
                        <h2 className="heading-2">{introSection.title}</h2>
                        <div className="mt-6 text-foreground/80 leading-relaxed space-y-4" dangerouslySetInnerHTML={{ __html: introSection.content || '' }} />
                    </AnimateInView>
                </div>
            </section>
        )}
        
        {featureListSection && featureListSection.features && (
            <section className="section-padding bg-transparent">
                <div className="container-max">
                    <FeatureList features={featureListSection.features as any[]} />
                </div>
            </section>
        )}

        {hotspotSection && hotspotSection.hotspots && (
             <section className="section-padding bg-transparent">
                <div className="container-max">
                    <HotspotCarousel
                        title={hotspotSection.title}
                        description={hotspotSection.content || ''}
                        slides={hotspotSection.hotspots}
                    />
                </div>
            </section>
        )}

        {solution.cta && (
          <section className="section-padding bg-gradient-to-r from-primary to-accent">
              <div className="container-max text-center text-white">
                  <AnimateInView>
                      <h2 className="heading-2 !text-white max-w-3xl mx-auto">{solution.cta.title}</h2>
                      {solution.cta.subtitle && (
                          <p className="mt-4 text-lg text-white/80 max-w-3xl mx-auto">
                              {solution.cta.subtitle}
                          </p>
                      )}
                       <Button size="lg" className="mt-8 font-headline btn-glow bg-white text-primary hover:bg-white/90" onClick={scrollToContact}>
                          {solution.cta.buttonText} <ArrowRight className="w-4 h-4 ml-2" />
                       </Button>
                  </AnimateInView>
              </div>
          </section>
        )}
    </div>
  )
};
