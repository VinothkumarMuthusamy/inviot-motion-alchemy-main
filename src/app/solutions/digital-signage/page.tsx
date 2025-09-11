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
    {
      type: "feature-list",
      title: "Dynamic Signage Capabilities",
      features: [
        {
          icon: "https://picsum.photos/150/150?random=14",
          title: "Centralized Content Management",
          description:
            "Update content across hundreds of screens from a single, web-based dashboard with scheduling and analytics.",
        },
        {
          icon: "https://picsum.photos/150/150?random=15",
          title: "Interactive Experiences",
          description:
            "Engage users with touchscreens, wayfinding, directories, and data-driven content triggered by sensors.",
        },
        {
          icon: "https://picsum.photos/150/150?random=16",
          title: "Stunning Video Walls",
          description:
            "Create seamless, high-impact video walls of any size or configuration with ultra-narrow bezel displays.",
        },
      ],
    },
  ],
};

// Custom hotspot sections data
const hotspotSections = [
  {
    title: "Video Walls",
    content: "Video walls transform ordinary spaces into captivating experiences. Whether for events, retail environments, corporate offices, receptions, or restaurants, they deliver high-impact visuals that engage and impress. Wherever you’d consider a single screen, a multi-screen video wall can elevate the experience, providing a more immersive and dynamic way to showcase your content.",
    image: { src: "/assets/solutionimg/billboard-mockup-glass-wall-building-mockup.jpg", alt: "Enterprise solutions", hint: "enterprise solutions" },
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
    title: "Room Booking Management",
    content: "Managing your spaces has never been easier. Real-time digital room booking streamlines the entire process, removing the need for paper-based reservations or multiple platforms. By simplifying scheduling, you reduce administrative overhead, save resources, and free up time—allowing your team to focus on what matters most.",
    image: { src: "/assets/solutionimg/museum.jpg", alt: "Retail solutions", hint: "retail solutions" },
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
  }
];

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

  const introSection = solution.sections?.find(
    (s) => s.type === "centered-text"
  );
  const featureListSection = solution.sections?.find(
    (s) => s.type === "feature-list"
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

      {/* New Display Solutions Section */}
      <section className="section-padding bg-transparent">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <AnimateInView>
                <h2 className="heading-2 mb-8">Our Display Solutions</h2>
                <ul className="space-y-4 text-foreground/80">
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0"
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
                      Touch-interactive kiosks and monitors for dynamic
                      engagement.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0"
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
                      Large-format interactive displays that captivate
                      audiences.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0"
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
                      Indoor and outdoor display solutions for any environment.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0"
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
                      Video walls and direct-view LED systems for stunning
                      visuals.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0"
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
                      Centralized content management—create layouts, push
                      updates, and manage content across networks with ease.
                    </span>
                  </li>
                </ul>
              </AnimateInView>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src="/assets/solutionimg/shopping-girl-looking-store-window.jpg"
                alt="Digital display solutions"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {featureListSection && featureListSection.features && (
        <section className="section-padding bg-transparent">
          <div className="container-max">
            <FeatureList features={featureListSection.features as any[]} />
          </div>
        </section>
      )}

      {/* two Custom Hotspot Sections */}
      {hotspotSections.map((section, index) => (
        <section key={index} className="section-padding bg-transparent">
          <div className="container-max">
            <HotspotCarousel
              title={section.title}
              description={section.content}
              slides={[{
                image: section.image,
                hotspots: section.hotspots
              }]}
            />
          </div>
        </section>
      ))}

      <Contact />
    </div>
  );
}