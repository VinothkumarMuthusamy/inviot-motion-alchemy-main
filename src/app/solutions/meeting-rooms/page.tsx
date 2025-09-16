"use client";

import Image from "next/image";
import { AnimateInView } from "@/components/ui/animate-in-view";
import type { Solution } from "../solutions-data";
import Contact from "@/components/landing/contact";
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

// Card component for the user experience section with image on top
const ExperienceCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl mx-auto max-w-4xl border border-gray-200">
      {/* Image at the top */}
      <div className="relative h-64 md:h-80 lg:h-96">
        <Image
          src="/assets/solutionimg/videocall.jpg"
          alt="Seamless meeting experience"
          data-ai-hint="meeting experience"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Content below the image */}
      <div className="p-6 md:p-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-600 mb-6 text-center">
          Ensuring a Seamless and Intuitive User Experience
        </h2>
        <ul className="space-y-6 text-black">
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
            <li key={index} className="flex items-start text-justify">
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
                <span className="font-bold text-pink-600">{item.title}</span> –{" "}
                {item.description}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default function MeetingRoomsPage() {
  // Get all sections by type
  const centeredTextSections =
    solution.sections?.filter((s) => s.type === "centered-text") || [];

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

        {/* Seamless User Experience Section with Card (Image on Top) */}
        <section className="py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AnimateInView>
              <ExperienceCard />
            </AnimateInView>
          </div>
        </section>

       

        <TrustedFeatures />
        <Contact />
      </div>
    </div>
  );
}