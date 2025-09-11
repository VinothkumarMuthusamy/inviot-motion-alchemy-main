"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AnimateInView } from "@/components/ui/animate-in-view";
import FeatureList from "@/components/ui/feature-list";
import HotspotCarousel from "@/components/ui/hotspot";
import type { Solution } from "../solutions-data";
import Contact from "@/components/landing/contact";
import { CheckCircle } from "lucide-react";

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
            title: "Redefine the way you work",
            content: `<p>Collaborate, share feedback, and connect seamlessly, whether in the office, remote, or on the go. Affordable, flexible, and built for modern teams.</p>`,
        },
        {
            type: 'centered-text',
            title: "It's here, your opportunity to lead",
            content: `<p>Delight clients with flexible, affordable web conferencing and empower your teams to collaborate seamlessly across distances. Stay connected, stay ahead.</p>`,
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
                        <h1 className="heading-1 !text-white">{solution.subtitle}</h1>
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

  // Get all sections by type
  const centeredTextSections = solution.sections?.filter(s => s.type === 'centered-text') || [];
  const featureListSection = solution.sections?.find(s => s.type === 'feature-list');
  const hotspotSection = solution.sections?.find(s => s.type === 'hotspot-carousel');

  // Benefits data arrays for each section
  const benefitsSections = [
    {
      title: "Benefits",
      benefits: [
        "Seamless collaboration across any smart device",
        "Save time with quick, organized ad-hoc meetings",
        "Drive faster, more effective decision-making",
        "Strengthen teamwork and improve collaboration"
      ]
    },
    {
      title: "Benefits",
      benefits: [
        "Leverage the latest, high-impact digital displays with in-store retail solutions",
        "Drive more business with engaging, cost-effective AV experiences",
        "Boost customer spending through interactive and immersive engagement"
      ]
    },
    {
      title: "Benefits",
      benefits: [
        "Easy-to-use, highly functional online screens",
        "Create and share content within minutes with AV collaboration",
        "Deliver unique and personalized customer experiences"
      ]
    }
  ];

  // Hotspot data for three different sections
  const hotspotSections = [
    {
      title: "Enterprise Solutions",
      content: "Empower your organization with seamless collaboration across every smart device. Whether it's delivering a presentation straight from your phone in the boardroom or hosting a video meeting with remote team members, our technology ensures secure, reliable, and professional communication at all times.",
      image: { src: "/assets/solutionimg/create-virtual-advertising-environment-with-digital-displays-managing-reviewing-promotiona.jpg", alt: "Enterprise solutions", hint: "enterprise solutions" },
      hotspots: [
        {
          position: { top: '25%', left: '37%' },
          title: "Conference Camera",
          description: "Ultra HD Conference Camera",
          details: ["120° wide angle", "Auto low-light correction", "5x digital zoom"],
          link: "#"
        },
        {
          position: { top: '80%', left: '63%' },
          title: "Speakerphone",
          description: "360° Full Duplex Speakerphone",
          details: ["Voice tracking", "Echo cancellation", "10m pickup range"],
          link: "#"
        },
        {
          position: { top: '50%', left: '50%' },
          title: "Control Panel",
          description: "Touch Control Interface",
          details: ["One-touch meeting start", "Volume controls", "Device status indicators"],
          link: "#"
        }
      ]
    },
    {
      title: "Retail Solutions",
      content: "We bring extensive experience in the retail sector, working closely with clients and agency partners to design AV solutions that drive measurable profits. Our approach ensures every solution is cost-effective, tailored to your business goals, and optimized to fit your budget helping you create engaging customer experiences that convert into results.",
      image: { src: "/assets/solutionimg/flat.jpg", alt: "Retail solutions", hint: "retail solutions" },
      hotspots: [
        {
          position: { top: '35%', left: '55%' },
          title: "All-in-One Bar",
          description: "Video Sound Bar",
          details: ["Integrated camera, mics and speakers", "Plug-and-play setup", "USB-C connectivity"],
          link: "#"
        },
        {
          position: { top: '65%', left: '30%' },
          title: "Tabletop Hub",
          description: "Wireless Connectivity Hub",
          details: ["HDMI and USB connections", "Charging ports", "Cable management system"],
          link: "#"
        },
        {
          position: { top: '20%', left: '75%' },
          title: "Display",
          description: "55-inch 4K Monitor",
          details: ["Anti-glare coating", "Built-in whiteboard software", "Mobile device compatibility"],
          link: "#"
        }
      ]
    },
    {
      title: "Hospitality & Tourism Solutions",
      content: "Create memorable guest experiences with AV-guided customer journeys. Deliver real-time interaction, instant support, and seamless brand engagement.",
      image: { src: "/assets/solutionimg/modern-hospital-entrance-with-interactive-digital-kiosk-bright-spacious-lobby-area.jpg", alt: "Hospitality solutions", hint: "hospitality solutions" },
      hotspots: [
        {
          position: { top: '20%', left: '50%' },
          title: "PTZ Camera",
          description: "Professional PTZ Camera",
          details: ["Remote controlled pan/tilt/zoom", "Preset positions", "Optical zoom"],
          link: "#"
        },
        {
          position: { top: '70%', left: '25%' },
          title: "Ceiling Speakers",
          description: "Distributed Audio System",
          details: ["Even sound distribution", "Background music capable", "Volume zone controls"],
          link: "#"
        },
        {
          position: { top: '40%', left: '80%' },
          title: "Interactive Display",
          description: "86-inch Interactive Touchscreen",
          details: ["Multi-touch capability", "Annotation tools", "Screen recording"],
          link: "#"
        }
      ]
    }
  ];

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

        {/* Render all centered-text sections */}
        {centeredTextSections.map((section, index) => (
            <section key={index} className="section-padding bg-transparent">
                <div className="container-max text-center max-w-4xl mx-auto">
                    <AnimateInView>
                        <h2 className="heading-2">{section.title}</h2>
                        <div className="mt-6 text-foreground/80 leading-relaxed space-y-4" 
                             dangerouslySetInnerHTML={{ __html: section.content || '' }} />
                    </AnimateInView>
                </div>
            </section>
        ))}
        
        {featureListSection && featureListSection.features && (
            <section className="section-padding bg-transparent">
                <div className="container-max">
                    <FeatureList features={featureListSection.features as any[]} />
                </div>
            </section>
        )}

        {/* Render three hotspot and benefits sections */}
        {[0, 1, 2].map((index) => (
          <div key={index}>
            {/* Hotspot section */}
            <section className="section-padding bg-transparent">
                <div className="container-max">
                    <HotspotCarousel
                        title={hotspotSections[index].title}
                        description={hotspotSections[index].content}
                        slides={[{
                          image: hotspotSections[index].image,
                          hotspots: hotspotSections[index].hotspots
                        }]}
                    />
                </div>
            </section>

            {/* Benefits section with title and four bullet points */}
            <section className="section-padding bg-transparent">
                <div className="container-max">
                    <div className="max-w-4xl mx-auto">
                        <AnimateInView>
                            <h2 className="heading-2 text-center mb-12">{benefitsSections[index].title}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {benefitsSections[index].benefits.map((benefit, i) => (
                                    <div key={i} className="flex items-start space-x-3">
                                        <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                                        <p className="text-foreground/80 text-lg">{benefit}</p>
                                    </div>
                                ))}
                            </div>
                        </AnimateInView>
                    </div>
                </div>
            </section>
          </div>
        ))}

        <Contact />
    </div>
  )
};