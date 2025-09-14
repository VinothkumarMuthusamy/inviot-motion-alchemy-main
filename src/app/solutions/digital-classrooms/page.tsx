"use client";

import Image from "next/image";
import { AnimateInView } from "@/components/ui/animate-in-view";
import type { Solution } from "../solutions-data";
import Contact from "@/components/landing/contact";
import { CheckCircle } from "lucide-react";
import TrustedFeatures from "@/components/landing/trusted-features";

const solution: Solution = {
  slug: "digital-classrooms",
  title: "Digital Classrooms",
  subtitle:
    "Deliver a Collaborative Education Experience with Innovative AV Solutions",
  video:
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  description:
    "Bringing all the benefits of advanced technology into today's classrooms and enabling tested, standards-based solutions that simply work for users.",
  image: {
    src: "/assets/solutionimg/EDUCATION.jpg",
    alt: "Pupils sitting next to their desks",
    hint: "students classroom",
  },
  sections: [
    {
      type: "centered-text",
      title:
        "Deliver a Collaborative Education Experience with Innovative AV Solutions",
      content: `<p>Educators and technologists are united in creating learning solutions that adapt to diverse student needs. With interactive displays, touchscreens, and whiteboards, teachers can transform traditional lessons into engaging, immersive experiences enhancing student participation, collaboration, and learning outcomes.</p>`,
    },
    {
      type: "centered-text",
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

export default function DigitalClassroomsPage() {
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
      title: "Classroom Solutions",
      description: "Transform traditional lessons into engaging, immersive experiences with interactive displays, touchscreens, and whiteboards that enhance student participation, collaboration, and learning outcomes.",
      benefits: [
        "Interactive displays and touchscreens for immersive learning",
        "Dual-display features for simultaneous content viewing",
        "Wireless content sharing for up to four devices",
        "Comprehensive connectivity options for all devices"
      ],
      image: { 
        src: "/assets/LANDSCAPE/EDUCATION/1.png", 
        alt: "Classroom solutions", 
        hint: "classroom solutions" 
      }
    },
    {
      title: "HyFlex Learning Solutions",
      description: "Seamlessly connect in-person and online students for immersive, interactive learning experiences that bridge the gap between physical and virtual classrooms.",
      benefits: [
        "Seamless connection between in-person and online students",
        "High-quality audio and video for remote participants",
        "Collaboration tools for group learning and discussion",
        "Flexible learning environments for diverse needs"
      ],
      image: { 
        src: "/assets/solutionimg/EDUCATION.jpg", 
        alt: "HyFlex learning solutions", 
        hint: "hyflex learning" 
      }
    },
    {
      title: "Campus-Wide Solutions",
      description: "Implement AV solutions across entire campuses - from classrooms to dining halls, digital wayfinding, and common areas - creating engaging and interactive environments everywhere.",
      benefits: [
        "Digital wayfinding and signage systems",
        "Common area displays for information sharing",
        "Huddle rooms with collaboration technology",
        "Campus-wide audio distribution systems"
      ],
      image: { 
        src: "/assets/solutionimg/modern-hospital-entrance-with-interactive-digital-kiosk-bright-spacious-lobby-area.jpg", 
        alt: "Campus solutions", 
        hint: "campus solutions" 
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

      {/* Student Success Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <AnimateInView>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-600 mb-8 text-center">
                Shaping Student Success with AV Solutions
              </h2>
              <ul className="space-y-6 text-foreground/80">
                {[
                  {
                    title: "Student engagement first",
                    description:
                      "Collaboration technology continues to play a vital role in driving success both in classrooms and remotely.",
                  },
                  {
                    title: "HyFlex classrooms",
                    description:
                      "Seamlessly connect in-person and online students for immersive, interactive learning.",
                  },
                  {
                    title: "Learning without isolation",
                    description:
                      "Even in varied environments, students remain engaged and connected through innovative solutions.",
                  },
                  {
                    title: "Beyond convenience",
                    description:
                      "Schools need advanced AV tools and sustainable environments that foster collaboration and long-term success.",
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