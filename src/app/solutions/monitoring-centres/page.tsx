"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AnimateInView } from "@/components/ui/animate-in-view";
import FeatureList from "@/components/ui/feature-list";
import HotspotCarousel from "@/components/ui/hotspot";
import type { Solution } from "../solutions-data";
import Contact from "@/components/landing/contact";
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
    {
      type: "feature-list",
      title: "Mission-Critical Infrastructure",
      features: [
        {
          icon: "https://picsum.photos/150/150?random=26",
          title: "24/7-Rated Video Walls",
          description:
            "Deploy robust, high-resolution LED or LCD video walls designed for continuous operation and data visualization.",
        },
        {
          icon: "https://picsum.photos/150/150?random=27",
          title: "Flexible Source Processing",
          description:
            "Display any source, on any screen, at any time with powerful video wall processors and intuitive controls.",
        },
        {
          icon: "https://picsum.photos/150/150?random=28",
          title: "Ergonomic Operator Consoles",
          description:
            "Design workspaces that optimize operator comfort and efficiency for long hours of critical monitoring.",
        },
      ],
    },
    {
      type: "hotspot-carousel",
      title: "",
      content: "",
      hotspots: [
        {
          image: {
            src: "/assets/LANDSCAPE/Monitoring room/1.png",
            alt: "A security operations center",
            hint: "cybersecurity command center",
          },
          hotspots: [
            {
              position: { top: "40%", left: "50%" },
              title: "Main Video Wall",
              description: "Central dashboard for threat monitoring",
              details: [
                "20x4 LCD panel configuration",
                "Redundant power supplies",
                "Shows SIEM, threat maps, live feeds",
              ],
              link: "#",
            },
            {
              position: { top: "75%", left: "30%" },
              title: "KVM Switching System",
              description: "Control multiple systems with one keyboard/mouse",
              details: [
                "Secure, real-time access",
                "Reduces desk clutter",
                "Improves operator workflow",
              ],
              link: "#",
            },
          ],
        },
      ],
    },
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

  const introSection = solution.sections?.find(
    (s) => s.type === "centered-text"
  );
  const featureListSection = solution.sections?.find(
    (s) => s.type === "feature-list"
  );
  const hotspotSection = solution.sections?.find(
    (s) => s.type === "hotspot-carousel"
  );

  // Standalone hotspot data - can be used independently
  const standaloneHotspotData = {
    title: "",
    description: "",
    slides: [
      {
        image: {
          src: "/assets/LANDSCAPE/Monitoring room/12.png",
          alt: "Customer lounge",
          hint: "customer lounge area",
        },
        hotspots: [
          {
            position: { top: "30%", left: "40%" },
            title: "Comfortable Seating",
            description: "Ergonomic furniture for extended discussions",
            details: [
              "Premium materials",
              "Modular configuration",
              "Integrated charging ports",
            ],
            link: "#",
          },
          {
            position: { top: "65%", left: "75%" },
            title: "Demo Station",
            description: "Hands-on product demonstration area",
            details: [
              "Multiple device support",
              "Wireless connectivity",
              "Technical support access",
            ],
            link: "#",
          },
        ],
      },
    ],
  };

  return (
    <div
      className="bg-background"
      style={{
        backgroundImage: "url('/assets/team-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <DefaultHero solution={solution} />

      {introSection && (
        <section className="section-padding bg-transparent">
          <div className="container-max text-center max-w-4xl mx-auto">
            <AnimateInView>
              <h2 className="heading-2">{introSection.title}</h2>
              <div
                className="mt-6 text-foreground/80 leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ __html: introSection.content || "" }}
              />
            </AnimateInView>
          </div>
        </section>
      )}

      {/* {featureListSection && featureListSection.features && (
        <section className="section-padding bg-transparent">
          <div className="container-max">
            <FeatureList features={featureListSection.features as any[]} />
          </div>
        </section>
      )} */}

      <section className="flex items-start text-justify bg-transparent pb-0 px-4 sm:px-6 lg:px-8 py-8">
        <div className="w-full max-w-4xl mx-auto">
          <AnimateInView>
            <h2 className="heading-2 mb-8 text-primary font-bold text-center">
              Deliver Critical Information for Situational Awareness
            </h2>
            <ul className="space-y-6 text-foreground/80">
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
                <li key={index} className="flex items-start">
                  <svg
                    className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0"
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
                    <span className="font-bold text-primary">{item.title}</span>{" "}
                    - {item.description}
                  </span>
                </li>
              ))}
            </ul>
          </AnimateInView>
        </div>
      </section>

      {hotspotSection && hotspotSection.hotspots && (
        <section className="section-padding bg-transparent pt-0">
          <div className="container-max">
            <HotspotCarousel
              title=""
              description=""
              slides={hotspotSection.hotspots}
            />
          </div>
        </section>
      )}

      <section className="flex items-start text-justify bg-transparent pb-0 px-4 sm:px-6 lg:px-8 py-8">
        <div className="w-full max-w-4xl mx-auto">
          <AnimateInView>
            <h2 className="heading-2 mb-8 text-primary font-bold text-center">
              Modern Network Operations Centers (NOCs)
            </h2>
            <ul className="space-y-6 text-foreground/80">
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
                <li key={index} className="flex items-start">
                  <svg
                    className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0"
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
                    <span className="font-bold text-primary">{item.title}</span>{" "}
                    - {item.description}
                  </span>
                </li>
              ))}
            </ul>
          </AnimateInView>
        </div>
      </section>

      {/* Standalone hotspot section - independent of solution data */}
      <section className="section-padding bg-transparent pt-0">
        <div className="container-max">
          <HotspotCarousel
            title={standaloneHotspotData.title}
            description={standaloneHotspotData.description}
            slides={standaloneHotspotData.slides}
          />
        </div>
      </section>
      <TrustedFeatures />
      <Contact />
    </div>
  );
}
