"use client";

import Image from "next/image";
import { AnimateInView } from "@/components/ui/animate-in-view";
import type { Solution } from "../solutions-data";
import Contact from "@/components/landing/contact";
import { CheckCircle } from "lucide-react";
import TrustedFeatures from "@/components/landing/trusted-features";

const solution: Solution = {
  slug: "experience-centres",
  title: "Experience Centres",
  subtitle:
    "A powerful corporate communication tool to connect with business prospects, partners and end-users alike.",
  video:
    "https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
  description:
    "Experience Centres offer businesses an effective way to connect with customers, build brand loyalty and ultimately increase sales through immersive, interactive brand storytelling.",
  image: {
    src: "/assets/solutionimg/Experience Centers.jpg",
    alt: "Experience Centre",
    hint: "modern interactive exhibit",
  },
  sections: [
    {
      type: "centered-text",
      title: "Experience Centres",
      content: `<p>Experience Centres are one of the most powerful PR and corporate communication tools, helping businesses connect with prospects, partners, and end-users in meaningful ways. They create immersive environments that showcase your brand, foster loyalty, and increase sales. For businesses looking to develop their own Customer Experience Centre, the right AV solutions are key to delivering impactful, memorable interactions.</p>`,
    },
  ],
};

// Card component for solutions
const SolutionCard = ({
  image,
}: {
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

export default function ExperienceCentresPage() {
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
      title: "Interactive Installations",
      description:
        "Engage visitors with multi-touch video walls, projection mapping, and gesture-controlled displays that create memorable, immersive experiences.",
      benefits: [
        "Multi-touch video walls for collaborative experiences",
        "Projection mapping for immersive environments",
        "Gesture-controlled displays for intuitive interaction",
        "Interactive product showcases with object recognition",
      ],
      image: {
        src: "/assets/LANDSCAPE/Experience centres/1.png",
        alt: "Interactive installations",
        hint: "interactive installations",
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

        {/* Connect & Engage Section */}
        <section className="py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <AnimateInView>
                <div className="relative w-full h-64 md:h-80 lg:h-96 mb-8 rounded-xl overflow-hidden">
                  <Image
                    src="/assets/LANDSCAPE/Experience centres/1.png"
                    alt="Customer Experience Center"
                    data-ai-hint="experience center"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-600 mb-8 text-center">
                  Connect, Engage & Build Loyalty
                </h2>
                <ul className="space-y-6 text-black">
                  {[
                    {
                      title: "Tailored customer experiences",
                      description:
                        "Create environments designed around personalized interactions that make prospects feel valued from the very start.",
                    },
                    {
                      title: "Stronger brand reputation",
                      description:
                        "A well-executed Customer Experience Centre (CEC) offers a polished, engaging introduction to your brand, reinforcing trust and credibility.",
                    },
                    {
                      title: "Interactive product demonstrations",
                      description:
                        "Enable your sales team to deliver hands-on demos, showcase product details, and support customers in making informed decisions.",
                    },
                    {
                      title: "Drive loyalty & sales",
                      description:
                        "Build deeper customer connections that translate into stronger brand loyalty and long-term growth.",
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
    </div>
  );
}