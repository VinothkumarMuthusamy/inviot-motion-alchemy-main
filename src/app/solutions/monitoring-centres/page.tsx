
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AnimateInView } from "@/components/ui/animate-in-view";
import FeatureList from "@/components/ui/feature-list";
import HotspotCarousel from "@/components/ui/hotspot";
import type { Solution } from "../solutions-data";

const solution: Solution = {
    slug: "monitoring-centres",
    title: "Monitoring Centres",
    subtitle: "Automate your monitoring control and help human capital focus on the issues that matter the most.",
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    description: "Modern NOCs and SOCs control critical resources and provide support to a variety of organizations, including businesses, universities, utility companies and regional government agencies.",
    image: { 
        src: "/assets/solutionimg/Monitoring Centers.jpg", 
        alt: "Monitoring Center", 
        hint: "data center monitors" 
    },
    sections: [
         {
            type: 'centered-text',
            title: "Command, Control, and Clarity",
            content: `<p>A Network Operations Center (NOC) or Security Operations Center (SOC) is the nerve center of an organization. We design and build mission-critical monitoring centres that provide operators with complete situational awareness, enabling rapid, informed decision-making.</p>`,
        },
        {
            type: 'feature-list',
            title: "Mission-Critical Infrastructure",
            features: [
                {
                    icon: "https://picsum.photos/150/150?random=26",
                    title: "24/7-Rated Video Walls",
                    description: "Deploy robust, high-resolution LED or LCD video walls designed for continuous operation and data visualization."
                },
                {
                    icon: "https://picsum.photos/150/150?random=27",
                    title: "Flexible Source Processing",
                    description: "Display any source, on any screen, at any time with powerful video wall processors and intuitive controls."
                },
                {
                    icon: "https://picsum.photos/150/150?random=28",
                    title: "Ergonomic Operator Consoles",
                    description: "Design workspaces that optimize operator comfort and efficiency for long hours of critical monitoring."
                }
            ]
        },
        {
            type: 'hotspot-carousel',
            title: "Inside a Security Operations Center (SOC)",
            content: "Explore the key components of a SOC, where data from across the enterprise is monitored for cybersecurity threats.",
            hotspots: [
                {
                    image: { src: "https://picsum.photos/1280/720?random=29", alt: "A security operations center", hint: "cybersecurity command center" },
                    hotspots: [
                         {
                            position: { top: '40%', left: '50%' },
                            title: "Main Video Wall",
                            description: "Central dashboard for threat monitoring",
                            details: ["20x4 LCD panel configuration", "Redundant power supplies", "Shows SIEM, threat maps, live feeds"],
                            link: "#"
                        },
                         {
                            position: { top: '75%', left: '30%' },
                            title: "KVM Switching System",
                            description: "Control multiple systems with one keyboard/mouse",
                            details: ["Secure, real-time access", "Reduces desk clutter", "Improves operator workflow"],
                            link: "#"
                        }
                    ]
                }
            ]
        }
    ],
    cta: {
        title: "What Kind of Command and Control Center Do You Need?",
        buttonText: "Design Your Control Center"
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

export default function MonitoringCentresPage() {
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
