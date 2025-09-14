"use client";

import Image from "next/image";
import { AnimateInView } from "@/components/ui/animate-in-view";
import type { Solution } from "../solutions-data";
import Contact from "@/components/landing/contact";
import { CheckCircle } from "lucide-react";
import TrustedFeatures from "@/components/landing/trusted-features";

const solution: Solution = {
  slug: "meeting-rooms",
  title: "Meeting Rooms",
  subtitle:
    "Ultimate collaboration environment for all your meetings, seamlessly connecting on-site and remote.",
  video:
    "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  description:
    "We harness the latest cutting-edge technology and best-fit audio, video, acoustic, and lighting solutions for your requirements and environment so your meeting spaces work seamlessly.",
  image: {
    src: "/assets/solutionimg/Meeting room.jpg",
    alt: "Seamless Meeting Room",
    hint: "modern boardroom",
  },
  sections: [
    {
      type: "centered-text",
      title: "The Ultimate Collaboration Environment",
      content: `<p>Create meeting spaces that truly connect people—whether on-site or remote. By integrating cutting-edge technology with best-fit audio, video, acoustic, and lighting solutions, we ensure your collaboration environment works seamlessly, delivering a smooth, productive experience every time.</p>`,
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

export default function MeetingRoomsPage() {
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
      title: "One-Touch Meeting Start",
      description: "Integrate with calendaring systems (like Outlook and Google) to start any meeting with a single tap, making meetings effortless and efficient.",
      benefits: [
        "Seamless integration with Outlook and Google Calendar",
        "Single-tap meeting initiation",
        "Automatic room configuration based on meeting type",
        "Effortless meeting management for all users"
      ],
      image: { 
        src: "/assets/solutionimg/videocall.jpg", 
        alt: "One-touch meeting", 
        hint: "meeting start" 
      }
    },
    {
      title: "Intelligent Audio Systems",
      description: "Deploy advanced DSPs and ceiling microphones that automatically focus on the active speaker, ensuring crystal-clear audio for all participants.",
      benefits: [
        "Advanced DSP technology for optimal audio",
        "Ceiling microphones with automatic speaker focus",
        "Crystal-clear audio for all participants",
        "Noise cancellation and echo reduction"
      ],
      image: { 
        src: "/assets/solutionimg/Meeting room.jpg", 
        alt: "Intelligent audio", 
        hint: "audio systems" 
      }
    },
    {
      title: "Room Scheduling & Management",
      description: "See room availability at a glance and book spaces on the fly with elegant panels outside each room, simplifying workplace management.",
      benefits: [
        "Real-time room availability display",
        "On-the-fly booking capabilities",
        "Elegant exterior panels for easy scheduling",
        "Simplified workplace management system"
      ],
      image: { 
        src: "/assets/LANDSCAPE/AUDIO VISUAL/1.png", 
        alt: "Room scheduling", 
        hint: "scheduling system" 
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

      {/* Seamless User Experience Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <AnimateInView>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-600 mb-8 text-center">
                Ensuring a Seamless and Intuitive User Experience
              </h2>
              <ul className="space-y-6 text-foreground/80">
                {[
                  {
                    title: "Collaboration Spaces",
                    description:
                      "With Inviot, experience the future of teamwork across physical and digital workplaces. Our technology solutions empower organizations to unlock the true potential of collaboration and bring its benefits into every part of the business.",
                  },
                  {
                    title: "Huddle Spaces",
                    description:
                      "Create more personalized collaboration settings with advanced audio-visual facilities. Inviot's Huddle Room Solutions support both local and remote participants, ensuring seamless communication in smaller, focused environments.",
                  },
                  {
                    title: "Room Scheduling & Hot-Desking",
                    description:
                      "Simplify workplace management with flexible scheduling. Inviot's solutions allow users to book and manage rooms or desks effortlessly—whether on-premises or through the cloud—offering freedom and efficiency from anywhere.",
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

      {/* Team Collaboration Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <AnimateInView>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-600 mb-8 text-center">
                With Inviot, Discover What Team Collaboration Looks Like
              </h2>
              <ul className="space-y-6 text-foreground/80">
                {[
                  {
                    title: "State-of-the-art displays & audio",
                    description:
                      "Deliver superior visuals and crystal-clear sound for every meeting.",
                  },
                  {
                    title: "Smart control systems",
                    description:
                      "Manage and automate every aspect of your room solution with ease.",
                  },
                  {
                    title: "Wireless presentation",
                    description:
                      "Share content instantly from any device for seamless collaboration.",
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

      <TrustedFeatures />
      <Contact />
    </div>
  );
}