"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AnimateInView } from "@/components/ui/animate-in-view";
import FeatureList from "@/components/ui/feature-list";
import HotspotCarousel from "@/components/ui/hotspot";
import type { Solution } from "../solutions-data";
import Contact from "@/components/landing/contact";
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
    {
      type: "feature-list",
      title: "Elements of an Immersive Experience",
      features: [
        {
          icon: "https://picsum.photos/150/150?random=18",
          title: "Interactive Installations",
          description:
            "Engage visitors with multi-touch video walls, projection mapping, and gesture-controlled displays.",
        },
        {
          icon: "https://picsum.photos/150/150?random=19",
          title: "Personalized Journeys",
          description:
            "Use RFID or mobile apps to tailor content and experiences to individual visitors based on their interests.",
        },
        {
          icon: "https://picsum.photos/150/150?random=20",
          title: "Centralized Show Control",
          description:
            "Orchestrate all lighting, audio, and video elements from a single, intuitive control system for flawless presentations.",
        },
      ],
    },
    {
      type: "hotspot-carousel",
      title: "Experience Centres",
      content:
        "Experience Centres are one of the most powerful PR and corporate communication tools, helping businesses connect with prospects, partners, and end-users in meaningful ways. They create immersive environments that showcase your brand, foster loyalty, and increase sales. For businesses looking to develop their own Customer Experience Centre, the right AV solutions are key to delivering impactful, memorable interactions.",
      hotspots: [
        {
          image: {
            src: "/assets/solutionimg/digital-art-inmersive-exhibition.jpg",
            alt: "A futuristic brand experience center",
            hint: "brand experience center",
          },
          hotspots: [
            {
              position: { top: "50%", left: "50%" },
              title: "Projection-Mapped Table",
              description: "Interactive product showcase",
              details: [
                "Object recognition",
                "Dynamic content overlays",
                "Multi-user interaction",
              ],
              link: "#",
            },
            {
              position: { top: "25%", left: "75%" },
              title: "Transparent OLED Display",
              description: "Floating digital content",
              details: [
                "55-inch Transparent OLED",
                "Displays info without hiding product",
                "Synchronized with lighting",
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

  const introSection = solution.sections?.find(
    (s) => s.type === "centered-text"
  );
  const featureListSection = solution.sections?.find(
    (s) => s.type === "feature-list"
  );
  const hotspotSection = solution.sections?.find(
    (s) => s.type === "hotspot-carousel"
  );

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
              description={hotspotSection.content || ""}
              slides={hotspotSection.hotspots}
            />
          </div>
        </section>
      )}

      <section className="flex items-center justify-center bg-transparent px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl mx-auto">
          <AnimateInView>
            <h2 className="heading-2 mb-8 text-primary font-bold text-center">
              Connect, Engage & Build Loyalty
            </h2>
            <ul className="space-y-6 text-foreground/80">
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
                    – {item.description}
                  </span>
                </li>
              ))}
            </ul>
          </AnimateInView>
        </div>
      </section>

      <Contact />
    </div>
  );
}
