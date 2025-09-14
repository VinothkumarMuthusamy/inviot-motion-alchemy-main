"use client";

import Image from "next/image";
import { AnimateInView } from "@/components/ui/animate-in-view";
import type { Solution } from "../solutions-data";
import Contact from "@/components/landing/contact";
import { CheckCircle } from "lucide-react";
import TrustedFeatures from "@/components/landing/trusted-features";

const solution: Solution = {
  slug: "digital-signage",
  title: "Digital Signage",
  subtitle:
    "Digital Signage Solutions are a great way to share information with visitors, customers, and teams.",
  video:
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  description:
    "When you want to connect with your audience, digital signage is the easiest and most engaging way to do it. With digital signage, you can reach your audience wherever they are—whether at home, in a hotel room or on the road.",
  image: {
    src: "/assets/solutionimg/Digital Signage.jpg",
    alt: "Interactive Digital Signage",
    hint: "interactive kiosk",
  },
  sections: [
    {
      type: "centered-text",
      title: "More Interactive Than Ever",
      content: `<p>Digital signage goes beyond just displaying content, it transforms the way people engage with your business. Collect feedback on designs, presentations, and products from anywhere. Give remote workers the same collaboration opportunities as in-office teams. Offer affordable, flexible solutions for small businesses without costly meeting rooms or equipment. Enhance teaching strategies with integrated web conferencing, and support smoother project management by enabling flexible work schedules.</p>`,
    }
  ],
};

// Card component for solutions
const SolutionCard = ({ 
  title, 
  description, 
  benefits, 
  image,
  number
}: { 
  title: string; 
  description: string; 
  benefits: string[]; 
  image: { src: string; alt: string; hint: string };
  number: number;
}) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transition-all duration-700 h-full flex flex-col mx-auto max-w-4xl border border-white/20 relative">
      <div className="relative h-64 md:h-80 lg:h-96">
        {/* Numbered circle positioned over the image */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center z-10 shadow-lg">
          <span className="text-white font-bold text-xl">{number}</span>
        </div>
        
        <Image
          src={image.src}
          alt={image.alt}
          data-ai-hint={image.hint}
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="p-4 md:p-6 lg:p-8 flex-grow flex flex-col bg-transparent">
        <h3 className="text-xl md:text-2xl font-bold text-pink-600 mb-3 md:mb-4">{title}</h3>
        <p className="text-foreground/80 mb-4 md:mb-6 text-sm md:text-base">{description}</p>
        
        <div className="border-t border-gray-200/50 pt-4 md:pt-6">
          <h4 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4">Benefits</h4>
          <ul className="space-y-2 md:space-y-3">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-pink-600 flex-shrink-0 mt-0.5 mr-2 md:mr-3" />
                <span className="text-foreground/80 text-sm md:text-base">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
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
      window.location.href = "/#contact";
    }
  };

  // Get all sections by type
  const centeredTextSections = solution.sections?.filter(s => s.type === 'centered-text') || [];

  // Solutions data for cards
  const solutionsData = [
    {
      title: "Video Walls",
      description: "Video walls transform ordinary spaces into captivating experiences. Whether for events, retail environments, corporate offices, receptions, or restaurants, they deliver high-impact visuals that engage and impress.",
      benefits: [
        "High-impact visuals for engaging experiences",
        "Seamless multi-screen configurations",
        "Ultra-narrow bezel displays",
        "Suitable for various environments and applications"
      ],
      image: { 
        src: "/assets/LANDSCAPE/DIGITAL SIGNAGE/1.png", 
        alt: "Video walls", 
        hint: "video walls" 
      }
    },
    {
      title: "Room Booking Management",
      description: "Managing your spaces has never been easier. Real-time digital room booking streamlines the entire process, removing the need for paper-based reservations or multiple platforms.",
      benefits: [
        "Real-time digital room booking",
        "Reduces administrative overhead",
        "Eliminates paper-based reservations",
        "Simplifies scheduling processes"
      ],
      image: { 
        src: "/assets/LANDSCAPE/DIGITAL SIGNAGE/2.png", 
        alt: "Room booking management", 
        hint: "room booking" 
      }
    },
    {
      title: "Interactive Displays",
      description: "Engage users with touchscreens, wayfinding, directories, and data-driven content triggered by sensors for immersive interactive experiences.",
      benefits: [
        "Touch-interactive kiosks and monitors",
        "Wayfinding and directory solutions",
        "Data-driven content triggered by sensors",
        "Large-format interactive displays"
      ],
      image: { 
        src: "/assets/solutionimg/shopping-girl-looking-store-window.jpg", 
        alt: "Interactive displays", 
        hint: "interactive displays" 
      }
    }
  ];

  return (
    <div className="bg-transparent">
      <DefaultHero solution={solution} />

      {/* Render all centered-text sections */}
      {centeredTextSections.map((section, index) => (
        <section key={index} className="py-12 md:py-16 lg:py-20 bg-transparent">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
            <AnimateInView>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-600 mb-6">{section.title}</h2>
              <div className="text-foreground/80 leading-relaxed space-y-4 text-base md:text-lg" 
                   dangerouslySetInnerHTML={{ __html: section.content || "" }} />
            </AnimateInView>
          </div>
        </section>
      ))}

      {/* Display Solutions Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <AnimateInView>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-600 mb-8 text-center">
                Our Display Solutions
              </h2>
              <ul className="space-y-6 text-foreground/80">
                {[
                  {
                    title: "Touch-interactive kiosks",
                    description: "Dynamic engagement through interactive touchscreens and monitors.",
                  },
                  {
                    title: "Large-format displays",
                    description: "Captivate audiences with stunning large-format interactive displays.",
                  },
                  {
                    title: "Indoor and outdoor solutions",
                    description: "Versatile display solutions for any environment and condition.",
                  },
                  {
                    title: "Video walls and LED systems",
                    description: "Create immersive experiences with stunning video walls and direct-view LED systems.",
                  },
                  {
                    title: "Centralized content management",
                    description: "Create layouts, push updates, and manage content across networks with ease.",
                  },
                ].map((item, index) => (
                  <li key={index} className="flex items-start text-justify bg-transparent">
                    <svg
                      className="h-5 w-5 text-pink-600 mr-3 mt-1 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>
                      <span className="font-bold text-pink-600">{item.title}</span>{" "}
                      – {item.description}
                    </span>
                  </li>
                ))}
              </ul>
            </AnimateInView>
          </div>
        </div>
      </section>
      
      {/* Solutions Cards Section - Individual cards that appear as you scroll */}
      <section className="py-12 md:py-16 lg:py-20 bg-transparent">
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
                    number={index + 1}
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
  );
}