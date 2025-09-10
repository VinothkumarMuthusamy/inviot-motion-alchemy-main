
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AnimateInView } from "@/components/ui/animate-in-view";
import FeatureList from "@/components/ui/feature-list";
import HotspotCarousel from "@/components/ui/hotspot";
import type { Solution } from "../solutions-data";

const solution: Solution = {
    slug: "audio-video-collaboration",
    title: "Audio and Video Collaboration",
    subtitle: "Collaborate and communicate seamlessly, anytime and anywhere.",
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    description: "With audio and video collaboration becoming essential across industries, empower your employees and clients to share multimedia content and connect more effectively across distances, devices, and platforms.",
    image: {
        src: "/assets/solutionimg/Audio Visual.jpg", 
        alt: "Business meeting", 
        hint: "business meeting" 
    },
    sections: [
        {
            type: 'centered-text',
            title: "Seamless Collaboration, Anywhere",
            content: `<p>Bridge distances and connect teams with state-of-the-art audio and video collaboration tools. Our solutions are designed to be intuitive, reliable, and secure, ensuring that your meetings are productive, whether participants are in the same room or across the globe.</p><p>We integrate hardware and software to create a unified ecosystem that supports everything from one-on-one calls to large-scale virtual events.</p>`,
        },
        {
            type: 'feature-list',
            title: "Core Collaboration Features",
            features: [
                {
                    icon: "https://picsum.photos/150/150?random=10",
                    title: "Crystal-Clear Audio",
                    description: "Advanced microphones and speakers with noise cancellation for intelligible, distraction-free conversations."
                },
                {
                    icon: "https://picsum.photos/150/150?random=11",
                    title: "4K Ultra-HD Video",
                    description: "High-resolution cameras with auto-framing and speaker tracking to capture every detail and expression."
                },
                {
                    icon: "https://picsum.photos/150/150?random=12",
                    title: "Wireless Sharing",
                    description: "Effortlessly share content from any device—laptops, tablets, or smartphones—with a single click."
                }
            ]
        },
        {
            type: 'hotspot-carousel',
            title: "Explore a Collaboration Setup",
            content: "Our integrated meeting rooms feature best-in-class products to create an intuitive and powerful collaboration experience. See how different components come together to form a seamless whole.",
            hotspots: [
                {
                    image: { src: "https://picsum.photos/1280/720?random=13", alt: "A modern meeting room", hint: "modern meeting room" },
                    hotspots: [
                        {
                            position: { top: '30%', left: '50%' },
                            title: "Smart Camera",
                            description: "AI-powered 4K PTZ Camera",
                            details: ["Auto-framing", "Speaker tracking", "12x Optical Zoom"],
                            link: "#"
                        },
                        {
                            position: { top: '65%', left: '25%' },
                            title: "Ceiling Mic Array",
                            description: "360-degree audio capture",
                            details: ["Beamforming technology", "Acoustic echo cancellation", "Covers 25-foot radius"],
                            link: "#"
                        },
                         {
                            position: { top: '50%', left: '80%' },
                            title: "Interactive Display",
                            description: "86-inch 4K Touchscreen",
                            details: ["20-point multi-touch", "Wireless content sharing", "Integrated whiteboarding"],
                            link: "#"
                        }
                    ]
                }
            ]
        }
    ],
    cta: {
        title: "Ready to enhance your team's collaboration?",
        buttonText: "Design Your Meeting Room"
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

export default function AudioVideoCollaborationPage() {
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
