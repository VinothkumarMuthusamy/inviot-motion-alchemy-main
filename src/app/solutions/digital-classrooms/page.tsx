
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AnimateInView } from "@/components/ui/animate-in-view";
import FeatureList from "@/components/ui/feature-list";
import HotspotCarousel from "@/components/ui/hotspot";
import type { Solution } from "../solutions-data";

const solution: Solution = {
    slug: "digital-classrooms",
    title: "Digital Classrooms",
    subtitle: "Deliver a Collaborative Education Experience with Innovative AV Solutions",
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    description: "Bringing all the benefits of advanced technology into today’s classrooms and enabling tested, standards-based solutions that simply work for users.",
    image: {
        src: "/assets/solutionimg/EDUCATION.jpg",
        alt: "Pupils sitting next to their desks",
        hint: "students classroom"
    },
    sections: [
        {
            type: 'centered-text',
            title: "High-quality educational experience for teachers and students",
            content: `<p>Moving to a digitized environment brings all the benefits of advanced technology into today’s classrooms and enables tested, standards-based solutions that simply work for users. At the same time, with budgets often limited, legacy devices must be accommodated in the solution design.</p><p>Our flexible solutions work with many legacy and third-party devices, enabling cost-effective classrooms and long-lasting high value.</p>`,
        },
        {
            type: 'feature-list',
            title: "Classroom AV Solutions",
            features: [
                {
                    icon: "https://www.kramerav.com/wp-content/uploads/2023/10/Classroom-spaces_Effortless-classroom-operation-and-control-250x250.png",
                    title: "Effortless classroom operation",
                    description: "Our audio-visual technology, including dual-display features, allows for simultaneous viewing of content and remote participants."
                },
                {
                    icon: "https://www.kramerav.com/wp-content/uploads/2023/10/Personal-workspaces_Advanced-wireless-connectivity-250x250.png",
                    title: "Simple wireless content sharing",
                    description: "Students can easily share content from their devices, with quad-mode capability for up to four devices simultaneously."
                },
                {
                    icon: "https://www.kramerav.com/wp-content/uploads/2023/10/Classroom-spaces_Comprehensive-connectivity-options-250x250.png",
                    title: "Comprehensive connectivity",
                    description: "Facilitating access to classroom AV equipment for teachers’ or guests’ laptops, including peripherals."
                }
            ]
        },
        {
            type: 'hotspot-carousel',
            title: "Digital classroom",
            content: "In our hybrid classroom model, we create a dynamic, interconnected hub, prioritizing clear audio communication and easy content sharing between in-person and remote participants. This intuitively designed learning environment facilitates smooth, inclusive collaborations.",
            hotspots: [
                {
                    image: { src: "https://www.kramerav.com/wp-content/uploads/2023/03/K-12_Audio_Hybrid_Classroom-1440x960.jpg", alt: "A digital classroom", hint: "digital classroom" },
                    hotspots: [
                        {
                            position: { top: '42%', left: '75%' },
                            title: "Tavor 5-O",
                            description: "5.25–Inch On–Wall Powered Speakers",
                            details: ["Indoor System", "Woofer — 5.25″", "Freq — 45Hz to 20kHz"],
                            link: "#"
                        },
                        {
                            position: { top: '36%', left: '75%' },
                            title: "VIA GO²",
                            description: "Compact & Secure 4K Wireless Presentation",
                            details: ["Conventional Wi–Fi and/or LAN", "Supports Windows, Mac, iOS, Android", "Two presenters simultaneously"],
                            link: "#"
                        }
                    ]
                }
            ]
        }
    ],
    cta: {
        title: "Looking for future-ready audio visual solutions for schools?",
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

export default function DigitalClassroomsPage() {
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
