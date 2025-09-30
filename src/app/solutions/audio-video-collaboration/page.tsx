"use client";

import Image from "next/image";
import { AnimateInView } from "@/components/ui/animate-in-view";
import type { Solution } from "../solutions-data";
import Contact from "@/components/landing/contact";
import { CheckCircle } from "lucide-react";
import TrustedFeatures from "@/components/landing/trusted-features";

const solution: Solution = {
    slug: "audio-video-collaboration",
    title: "Audio and Video Collaboration",
    subtitle: "Collaborate and communicate seamlessly, anytime and anywhere.",
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
   
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
                    className="object-cover"
                    priority
                />
            </div>
            <div className="relative container-max">
                <AnimateInView>
                    <div className="max-w-3xl">
                        <h1 className="heading-1 !text-white">{solution.subtitle}</h1>
                        
                    </div>
                </AnimateInView>
            </div>
        </div>
    );
};

// Card component for solutions
const SolutionCard = ({ 
    title, 
    description, 
    benefits, 
    image
}: { 
    title: string; 
    description: string; 
    benefits: string[]; 
    image: { src: string; alt: string; hint: string };
}) => {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-700 h-full flex flex-col mx-auto max-w-4xl border border-gray-200 relative">
            <div className="relative h-64 md:h-80 lg:h-96">
                <Image
                    src={image.src}
                    alt={image.alt}
                    data-ai-hint={image.hint}
                    fill
                    className="object-cover"
                    priority
                />
            </div>
            <div className="p-4 md:p-6 lg:p-8 flex-grow flex flex-col">
                <h3 className="text-xl md:text-2xl font-bold text-pink-600 mb-3 md:mb-4">{title}</h3>
                <p className="text-black mb-4 md:mb-6 text-sm md:text-base">{description}</p>
                
                <div className="border-t border-gray-200/50 pt-4 md:pt-6">
                    <h4 className="text-base md:text-lg font-semibold text-black mb-3 md:mb-4">Benefits</h4>
                    <ul className="space-y-2 md:space-y-3">
                        {benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start">
                                <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-pink-600 flex-shrink-0 mt-0.5 mr-2 md:mr-3" />
                                <span className="text-black text-sm md:text-base">{benefit}</span>
                            </li>
                        ))}
                    </ul>
                </div>
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

  // Solutions data for cards
  const solutionsData = [
    {
      title: "Enterprise Solutions",
      description: "Empower your organization with seamless collaboration across every smart device. Whether it's delivering a presentation straight from your phone in the boardroom or hosting a video meeting with remote team members, our technology ensures secure, reliable, and professional communication at all times.",
      benefits: [
        "Seamless collaboration across any smart device",
        "Save time with quick, organized ad-hoc meetings",
        "Drive faster, more effective decision-making",
        "Strengthen teamwork and improve collaboration"
      ],
      image: { 
        src: "/assets/LANDSCAPE/AUDIO VISUAL/1.png", 
        alt: "Enterprise solutions", 
        hint: "enterprise solutions" 
      }
    },
    {
      title: "Retail Solutions",
      description: "We bring extensive experience in the retail sector, working closely with clients and agency partners to design AV solutions that drive measurable profits. Our approach ensures every solution is cost-effective, tailored to your business goals, and optimized to fit your budget helping you create engaging customer experiences that convert into results.",
      benefits: [
        "Leverage the latest, high-impact digital displays with in-store retail solutions",
        "Drive more business with engaging, cost-effective AV experiences",
        "Boost customer spending through interactive and immersive engagement"
      ],
      image: { 
        src: "/assets/solutionimg/flat.jpg", 
        alt: "Retail solutions", 
        hint: "retail solutions" 
      }
    },
    {
      title: "Hospitality & Tourism Solutions",
      description: "Create memorable guest experiences with AV-guided customer journeys. Deliver real-time interaction, instant support, and seamless brand engagement.",
      benefits: [
        "Easy-to-use, highly functional online screens",
        "Create and share content within minutes with AV collaboration",
        "Deliver unique and personalized customer experiences"
      ],
      image: { 
        src: "/assets/solutionimg/modern-hospital-entrance-with-interactive-digital-kiosk-bright-spacious-lobby-area.jpg", 
        alt: "Hospitality solutions", 
        hint: "hospitality solutions" 
      }
    }
  ];

  return (
    <div className="relative">
      {/* Full background image without any blur effects */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/assets/team-bg.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      <div className="relative z-10">
        <DefaultHero solution={solution} />

        {/* Render all centered-text sections without card styling */}
        {centeredTextSections.map((section, index) => (
            <section key={index} className="py-16 md:py-20 lg:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
                    <AnimateInView>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pink-600 mb-6">
                            {section.title}
                        </h2>
                        <div className="text-xl md:text-2xl text-black leading-relaxed space-y-6 mt-8" 
                             dangerouslySetInnerHTML={{ __html: section.content || '' }} />
                    </AnimateInView>
                </div>
            </section>
        ))}
        
        {/* Solutions Cards Section - Individual cards that appear as you scroll */}
        <section className="py-12 md:py-16 lg:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-12 md:gap-16 lg:gap-20">
                    {solutionsData.map((solution, index) => (
                        <div key={index} className="min-h-screen flex items-center justify-center py-8">
                            <AnimateInView>
                                <SolutionCard 
                                    title={solution.title}
                                    description={solution.description}
                                    benefits={solution.benefits}
                                    image={solution.image}
                                />
                            </AnimateInView>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <TrustedFeatures />
        <Contact />
      </div>
    </div>
  )
}