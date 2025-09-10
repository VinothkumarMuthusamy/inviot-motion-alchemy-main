
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AnimateInView } from "@/components/ui/animate-in-view";
import FeatureList from "@/components/ui/feature-list";
import HotspotCarousel from "@/components/ui/hotspot";
import type { Solution } from "../solutions-data";

const solution: Solution = {
    slug: "meeting-rooms",
    title: "Meeting Rooms",
    subtitle: "Ultimate collaboration environment for all your meetings, seamlessly connecting on-site and remote.",
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    description: "We harness the latest cutting-edge technology and best-fit audio, video, acoustic, and lighting solutions for your requirements and environment so your meeting spaces work seamlessly.",
    image: { 
        src: "/assets/solutionimg/Meeting room.jpg", 
        alt: "Seamless Meeting Room", 
        hint: "modern boardroom" 
    },
    sections: [
         {
            type: 'centered-text',
            title: "The Modern Meeting Ecosystem",
            content: `<p>A successful meeting room is more than a table and chairs. It's an ecosystem of technology designed for intuitive use and flawless performance. We engineer spaces that foster collaboration, ensuring every participant, whether in-person or remote, is seen and heard clearly.</p>`,
        },
         {
            type: 'feature-list',
            title: "Key Components of a Smart Room",
            features: [
                {
                    icon: "https://picsum.photos/150/150?random=22",
                    title: "One-Touch Meeting Start",
                    description: "Integrate with calendaring systems (like Outlook and Google) to start any meeting with a single tap."
                },
                {
                    icon: "https://picsum.photos/150/150?random=23",
                    title: "Intelligent Audio",
                    description: "Deploy advanced DSPs and ceiling microphones that automatically focus on the active speaker."
                },
                {
                    icon: "https://picsum.photos/150/150?random=24",
                    title: "Room Scheduling Panels",
                    description: "See room availability at a glance and book spaces on the fly with elegant panels outside each room."
                }
            ]
        },
        {
            type: 'hotspot-carousel',
            title: "Anatomy of a Hybrid Meeting Room",
            content: "Discover the technology that powers effortless hybrid meetings, ensuring equitable experiences for all participants.",
            hotspots: [
                {
                    image: { src: "https://picsum.photos/1280/720?random=25", alt: "A hybrid meeting in progress", hint: "hybrid meeting" },
                    hotspots: [
                        {
                            position: { top: '40%', left: '15%' },
                            title: "Front of Room Display",
                            description: "Dual 4K displays",
                            details: ["One for content, one for participants", "Anti-glare coating", "Commercial grade for longevity"],
                            link: "#"
                        },
                         {
                            position: { top: '55%', left: '50%' },
                            title: "Tabletop Control Panel",
                            description: "10-inch Touch Interface",
                            details: ["Controls meetings, lights, shades", "Intuitive user interface", "PoE powered"],
                            link: "#"
                        }
                    ]
                }
            ]
        }
    ],
    cta: {
        title: "Ready to improve your meetings?",
        buttonText: "Get in touch with us"
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

export default function MeetingRoomsPage() {
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
