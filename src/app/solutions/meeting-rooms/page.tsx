"use client";

import Image from "next/image";
import { AnimateInView } from "@/components/ui/animate-in-view";
import type { Solution } from "../solutions-data";
import Contact from "@/components/landing/contact";
import TrustedFeatures from "@/components/landing/trusted-features";
import { motion } from "framer-motion";
import { easeOut } from "framer-motion";

const solution: Solution = {
  slug: "meeting-rooms",
  title: "Meeting Rooms",
  subtitle:
    "Ultimate collaboration environment for all your meetings, seamlessly connecting on-site and remote.",
  video:
    "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  
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

// ================= Hero with Animation =================
const DefaultHero = ({ solution }: { solution: Solution }) => {
  const heroImage = solution.image?.src || "https://picsum.photos/1920/1080";
  const heroHint = solution.image?.hint || "technology solution";

  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: easeOut }
    }
  };

  return (
    <div className="relative pt-32 pb-16 text-white" role="main">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/50">
        <Image
          src={heroImage}
          alt={`${solution.title} hero image`}
          data-ai-hint={heroHint}
          fill
          className="object-cover opacity-80"
          priority
        />
      </div>
      <div className="relative container-max">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={heroVariants}
        >
          <div className="max-w-3xl">
            <h1 className="heading-1 !text-white">{solution.title}</h1>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// ================= Experience Card with Flip Animation =================
const ExperienceCard = () => {
  const cardVariants = {
    hidden: { rotateX: 90, opacity: 0, transformOrigin: "top center" },
    visible: {
      rotateX: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: easeOut },
    },
  };

  return (
    <motion.div
      className="relative group max-w-6xl w-full mx-auto"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={cardVariants}
    >
      {/* Gradient Glow */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-30 group-hover:opacity-60 blur-lg transition-all duration-500 ease-out group-hover:scale-105"></div>

      {/* Card Content - Side by side layout */}
      <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 group-hover:scale-[1.02] border border-gray-200 hover:shadow-xl flex flex-col md:flex-row">
        {/* Text Content - Left Side */}
        <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
          <div className="relative inline-block mb-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-600 transition-colors duration-300 group-hover:text-pink-700">
              Ensuring a Seamless and Intuitive User Experience
            </h2>
            <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-pink-600 transition-all duration-500 group-hover:w-full"></div>
          </div>
          
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
              <li 
                key={index} 
                className="flex items-start text-justify transition-all duration-300 hover:translate-x-2"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <svg
                  className="h-5 w-5 text-pink-600 mr-3 mt-1 flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:text-purple-600"
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
                <span className="transition-colors duration-300 group-hover:text-gray-700">
                  <span className="font-bold text-pink-600 transition-colors duration-300 group-hover:text-purple-600">
                    {item.title}
                  </span> – {item.description}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Image - Right Side */}
        <div className="relative h-64 md:h-auto md:w-1/2 overflow-hidden">
          
          <Image
            src="/assets/solutionimg/videocall.jpg"
            alt="Seamless meeting experience"
            data-ai-hint="meeting experience"
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            priority
          />
        </div>
      </div>
    </motion.div>
  );
};

// ================= Page =================
export default function MeetingRoomsPage() {
  // Get all sections by type
  const centeredTextSections =
    solution.sections?.filter((s) => s.type === "centered-text") || [];

  return (
    <div className="relative">
      {/* Background Layer */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/assets/team-bg.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-pink-500 opacity-30 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-blue-600 opacity-30 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative z-10">
        <DefaultHero solution={solution} />

        {/* Render all centered-text sections */}
        {centeredTextSections.map((section, index) => (
          <section key={index} className="py-4 md:py-8 lg:py-8">
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

        {/* Seamless User Experience Section with Card (Image on Side) */}
        <section className="py-4 md:py-8 lg:py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <ExperienceCard />
          </div>
        </section>

        <TrustedFeatures />
        <Contact />
      </div>
    </div>
  );
}