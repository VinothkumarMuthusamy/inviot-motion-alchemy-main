"use client";

import Image from "next/image";
import { AnimateInView } from "@/components/ui/animate-in-view";
import type { Solution } from "../solutions-data";
import Contact from "@/components/landing/contact";
import { CheckCircle } from "lucide-react";
import TrustedFeatures from "@/components/landing/trusted-features";

const solution: Solution = {
  slug: "monitoring-centres",
  title: "Automated Monitoring & Experience Centres",
  subtitle:
    "Automate your monitoring control and help human capital focus on the issues that matter the most.",
  video:
    "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  description:
    "Streamline monitoring and control through automation, allowing your people to focus on high-value priorities. At the same time, Experience Centres provide an impactful way to engage customers, strengthen brand loyalty, and increase sales. With the right planning and technology, your business can design a Customer Experience Centre that delivers truly memorable interactions.",
  image: {
    src: "/assets/solutionimg/Monitoring Centers.jpg",
    alt: "Monitoring Center",
    hint: "data center monitors",
  },
  sections: [
    {
      type: "centered-text",
      title: "Automated Monitoring & Experience Centres",
      content: `Streamline monitoring and control through automation, allowing your people to focus on high-value priorities. At the same time, Experience Centres provide an impactful way to engage customers, strengthen brand loyalty, and increase sales. With the right planning and technology, your business can design a Customer Experience Centre that delivers truly memorable interactions.`,
    },
  ],
};

// Card component for solutions
const SolutionCard = ({
  title,
  description,
  benefits,
  image,
}: {
  title: string;
  description: string;
  benefits: string[];
  image: { src: string; alt: string; hint: string };
}) => {
  return (
    <div className="bg-transparent rounded-xl shadow-lg overflow-hidden transition-all duration-700 h-full flex flex-col mx-auto max-w-4xl border border-gray-200 relative">
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
        <h3 className="text-xl md:text-2xl font-bold text-pink-600 mb-3 md:mb-4">
          {title}
        </h3>
        <p className="text-black mb-4 md:mb-6 text-sm md:text-base">
          {description}
        </p>

        <div className="border-t border-gray-200/50 pt-4 md:pt-6">
          <h4 className="text-base md:text-lg font-semibold text-black mb-3 md:mb-4">
            Benefits
          </h4>
          <ul className="space-y-2 md:space-y-3">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-pink-600 flex-shrink-0 mt-0.5 mr-2 md:mr-3" />
                <span className="text-black text-sm md:text-base">
                  {benefit}
                </span>
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

export default function MonitoringCentresPage() {
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
  const centeredTextSections =
    solution.sections?.filter((s) => s.type === "centered-text") || [];

  // Solutions data for cards
  const solutionsData = [
    {
      title: "24/7-Rated Video Walls",
      description:
        "Deploy robust, high-resolution LED or LCD video walls designed for continuous operation and data visualization in mission-critical environments.",
      benefits: [
        "Designed for continuous 24/7 operation",
        "High-resolution LED or LCD displays",
        "Robust construction for mission-critical use",
        "Advanced data visualization capabilities",
      ],
      image: {
        src: "/assets/LANDSCAPE/Monitoring room/1.png",
        alt: "Video walls",
        hint: "video walls",
      },
    },
    {
      title: "Flexible Source Processing",
      description:
        "Display any source, on any screen, at any time with powerful video wall processors and intuitive controls for maximum flexibility.",
      benefits: [
        "Display any source on any screen",
        "Powerful video wall processors",
        "Intuitive control systems",
        "Maximum flexibility in content display",
      ],
      image: {
        src: "/assets/solutionimg/Monitoring Centers.jpg",
        alt: "Source processing",
        hint: "processing systems",
      },
    },
    {
      title: "Ergonomic Operator Consoles",
      description:
        "Design workspaces that optimize operator comfort and efficiency for long hours of critical monitoring in high-stakes environments.",
      benefits: [
        "Optimized for operator comfort",
        "Enhanced efficiency for long monitoring hours",
        "Designed for critical monitoring environments",
        "Ergonomic workspace solutions",
      ],
      image: {
        src: "/assets/LANDSCAPE/Monitoring room/12.png",
        alt: "Operator consoles",
        hint: "operator stations",
      },
    },
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
                <div
                  className="text-xl md:text-2xl text-black leading-relaxed space-y-6 mt-8"
                  dangerouslySetInnerHTML={{ __html: section.content || "" }}
                />
              </AnimateInView>
            </div>
          </section>
        ))}

        {/* Critical Information Section */}
        <section className="py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <AnimateInView>
                <div className="relative w-full h-64 md:h-80 lg:h-96 mb-8 rounded-xl overflow-hidden">
                  <Image
                    src="/assets/LANDSCAPE/Monitoring room/1.png"
                    alt="Customer Experience Center"
                    data-ai-hint="experience center"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-600 mb-8 text-center">
                  Deliver Critical Information for Situational Awareness
                </h2>
                <ul className="space-y-6 text-black">
                  {[
                    {
                      title: "Security Operations Centers",
                      description:
                        "Centralized facilities where analysts monitor organizational assets, ensuring both physical sites and information systems remain secure.",
                    },
                    {
                      title: "Social Media Command Centers",
                      description:
                        "Dedicated spaces for your social media team to track conversations, engage with customers, and safeguard your brand identity and reputation.",
                    },
                    {
                      title: "Dedicated Experts",
                      description:
                        "Our specialists work with you to define the purpose of your space, identify the key information operators need, and design ergonomic environments that optimize efficiency and focus.",
                    },
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start text-justify"
                    >
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
                        <span className="font-bold text-pink-600">
                          {item.title}
                        </span>{" "}
                        - {item.description}
                      </span>
                    </li>
                  ))}
                </ul>
              </AnimateInView>
            </div>
          </div>
        </section>

        {/* Network Operations Centers Section */}
        <section className="py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <AnimateInView>
                <div className="relative w-full h-64 md:h-80 lg:h-96 mb-8 rounded-xl overflow-hidden">
                  <Image
                    src="/assets/solutionimg/noc.jpg"
                    alt="Customer Experience Center"
                    data-ai-hint="experience center"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-600 mb-8 text-center">
                  Modern Network Operations Centers (NOCs)
                </h2>
                <ul className="space-y-6 text-black">
                  {[
                    {
                      title: "Broad Support Capabilities",
                      description:
                        "Today's NOCs manage and control resources for businesses, universities, utilities, and even government agencies.",
                    },
                    {
                      title: "Advanced Display Solutions",
                      description:
                        "Narrow-bezel video walls and pixel-pitch panels deliver superior picture quality with intuitive usability.",
                    },
                    {
                      title: "Powerful Control Systems",
                      description:
                        "Hardware and software-based video wall controllers ensure seamless monitoring and management.",
                    },
                    {
                      title: "Secure Infrastructure",
                      description:
                        "Sensitive hardware remains protected within the organization's most secure facilities.",
                    },
                    {
                      title: "Global Monitoring",
                      description:
                        "NOCs can oversee server banks and critical resources distributed worldwide, ensuring uninterrupted operations.",
                    },
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start text-justify"
                    >
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
                        <span className="font-bold text-pink-600">
                          {item.title}
                        </span>{" "}
                        - {item.description}
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
    </div>
  );
}