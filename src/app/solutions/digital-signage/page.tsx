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
    },
  ],
};

// Card component for solutions
const SolutionCard = ({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
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
        <h3 className="text-xl md:text-2xl font-bold text-pink-600 mb-3 md:mb-4">
          {title}
        </h3>
        <p className="text-black mb-4 md:mb-6 text-sm md:text-base">
          {description}
        </p>
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
  const centeredTextSections =
    solution.sections?.filter((s) => s.type === "centered-text") || [];

  // Solutions data for cards
  const solutionsData = [
    {
      title: "Video Walls",
      description:
        "Video walls transform ordinary spaces into captivating experiences. Whether for events, retail environments, corporate offices, receptions, or restaurants, they deliver high-impact visuals that engage and impress. Wherever you'd consider a single screen, a multi-screen video wall can elevate the experience, providing a more immersive and dynamic way to showcase your content.",
      benefits: [
        "High-impact visuals for engaging experiences",
        "Seamless multi-screen configurations",
        "Ultra-narrow bezel displays",
        "Suitable for various environments and applications",
      ],
      image: {
        src: "/assets/LANDSCAPE/DIGITAL SIGNAGE/1.png",
        alt: "Video walls",
        hint: "video walls",
      },
    },
    {
      title: "Room Booking Management",
      description:
        "Managing your spaces has never been easier. Real-time digital room booking streamlines the entire process, removing the need for paper-based reservations or multiple platforms. By simplifying scheduling, you reduce administrative overhead, save resources, and free up time—allowing your team to focus on what matters most.",
      benefits: [
        "Real-time digital room booking",
        "Reduces administrative overhead",
        "Eliminates paper-based reservations",
        "Simplifies scheduling processes",
      ],
      image: {
        src: "/assets/LANDSCAPE/DIGITAL SIGNAGE/2.png",
        alt: "Room booking management",
        hint: "room booking",
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

        {/* Display Solutions Section - Side by side layout */}
        <section className="py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 max-w-6xl mx-auto">
              {/* Text Content - Left Side */}
              <div className="lg:w-1/2">
                <AnimateInView>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-600 mb-6">
                    Our Display Solutions
                  </h2>
                  <ul className="space-y-6 text-black">
                    {[
                      {
                        title: "",
                        description:
                          "Touch-interactive kiosks and monitors for dynamic engagement",
                      },
                      {
                        title: "",
                        description:
                          "Large-format interactive displays that captivate audiences",
                      },
                      {
                        title: "",
                        description:
                          "Indoor and outdoor display solutions for any environment",
                      },
                      {
                        title: "",
                        description:
                          "Video walls and direct-view LED systems for stunning visuals",
                      },
                      {
                        title: "",
                        description:
                          "Create layouts, push updates, and manage content across networks with ease",
                      },
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start"
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
                        <span className="text-left">
                          <span className="font-bold text-pink-600">
                            {item.title}
                          </span>{" "}
                         {item.description}
                        </span>
                      </li>
                    ))}
                  </ul>
                </AnimateInView>
              </div>

              {/* Image - Right Side */}
              <div className="lg:w-1/2">
                <AnimateInView>
                  <div className="flex justify-center lg:justify-end">
                    <img
                      src="/assets/solutionimg/shopping-girl-looking-store-window.jpg"
                      alt="Display Solutions"
                      className="max-w-full h-auto rounded-lg shadow-md"
                    />
                  </div>
                </AnimateInView>
              </div>
            </div>
          </div>
        </section>

        {/* Solutions Cards Section - Individual cards that appear as you scroll */}
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-12 md:gap-16 lg:gap-20">
              {solutionsData.map((solution, index) => (
                <div
                  key={index}
                  className="min-h-screen flex items-center justify-center py-8"
                >
                  <AnimateInView>
                    <SolutionCard
                      title={solution.title}
                      description={solution.description}
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
  );
}