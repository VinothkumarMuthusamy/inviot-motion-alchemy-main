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
    },
    {
      type: "feature-list",
      title: "Key Components of a Smart Room",
      features: [
        {
          icon: "https://picsum.photos/150/150?random=22",
          title: "One-Touch Meeting Start",
          description:
            "Integrate with calendaring systems (like Outlook and Google) to start any meeting with a single tap.",
        },
        {
          icon: "https://picsum.photos/150/150?random=23",
          title: "Intelligent Audio",
          description:
            "Deploy advanced DSPs and ceiling microphones that automatically focus on the active speaker.",
        },
        {
          icon: "https://picsum.photos/150/150?random=24",
          title: "Room Scheduling Panels",
          description:
            "See room availability at a glance and book spaces on the fly with elegant panels outside each room.",
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
            src: "/assets/solutionimg/videocall.jpg",
            alt: "A hybrid meeting in progress",
            hint: "hybrid meeting",
          },
          hotspots: [
            {
              position: { top: "40%", left: "15%" },
              title: "Front of Room Display",
              description: "Dual 4K displays",
              details: [
                "One for content, one for participants",
                "Anti-glare coating",
                "Commercial grade for longevity",
              ],
              link: "#",
            },
            {
              position: { top: "55%", left: "50%" },
              title: "Tabletop Control Panel",
              description: "10-inch Touch Interface",
              details: [
                "Controls meetings, lights, shades",
                "Intuitive user interface",
                "PoE powered",
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

      <section className="flex items-center justify-center bg-transparent px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl mx-auto">
          <AnimateInView>
            <h2 className="heading-2 mb-8 text-primary font-bold text-center">
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
                    "Create more personalized collaboration settings with advanced audio-visual facilities. Inviot’s Huddle Room Solutions support both local and remote participants, ensuring seamless communication in smaller, focused environments.",
                },
                {
                  title: "Room Scheduling & Hot-Desking",
                  description:
                    "Simplify workplace management with flexible scheduling. Inviot’s solutions allow users to book and manage rooms or desks effortlessly—whether on-premises or through the cloud—offering freedom and efficiency from anywhere.",
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

      <section className="flex items-center justify-center bg-transparent px-4 sm:px-6 lg:px-8 py-8">
        <div className="w-full max-w-4xl mx-auto">
          <AnimateInView>
            <h2 className="heading-2 mb-8 text-primary font-bold text-center">
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
                    <span className="font-bold text-center text-primary">
                      {item.title}
                    </span>{" "}
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
