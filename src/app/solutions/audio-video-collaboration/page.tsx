"use client";

import Image from "next/image";
import { AnimateInView } from "@/components/ui/animate-in-view";
import type { Solution } from "../solutions-data";
import Contact from "@/components/landing/contact";
import { CheckCircle } from "lucide-react";
import TrustedFeatures from "@/components/landing/trusted-features";
import { motion } from "framer-motion";
import { easeOut } from "framer-motion";

// ================= Solution Data =================
const solution: Solution = {
  slug: "audio-video-collaboration",
  title: "Audio and Video Collaboration",
  subtitle: "Collaborate and communicate seamlessly, anytime and anywhere.",
  video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  image: {
    src: "/assets/solutionimg/Audio Visual.jpg",
    alt: "Business meeting",
    hint: "business meeting",
  },
  sections: [
    {
      type: "centered-text",
      title: "Redefine the way you work",
      content: `<p>Collaborate, share feedback, and connect seamlessly, whether in the office, remote, or on the go. Affordable, flexible, and built for modern teams.</p>`,
    },
    {
      type: "centered-text",
      title: "It's here, your opportunity to lead",
      content: `<p>Delight clients with flexible, affordable web conferencing and empower your teams to collaborate seamlessly across distances. Stay connected, stay ahead.</p>`,
    },
  ],
};

// ================= Hero =================
const DefaultHero = ({ solution }: { solution: Solution }) => {
  const heroImage = solution.image?.src || "https://picsum.photos/1920/1080";
  const heroHint = solution.image?.hint || "technology solution";

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

      {/* Content */}
      <div className="relative container-max">
        <AnimateInView>
          <div className="max-w-3xl">
            <h1 className="heading-1 !text-white">{solution.subtitle}</h1>
          </div>
        </AnimateInView>
      </div>
    </div>
  );
};

// ================= Solution Card with Flip Animation =================
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

      {/* Card Content */}
      <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 group-hover:scale-[1.02] border border-gray-200 hover:shadow-xl flex flex-col md:flex-row">
        {/* Text Content */}
        <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
          <div className="relative inline-block mb-4">
            <h3 className="text-2xl font-bold text-pink-600 transition-colors duration-300 group-hover:text-pink-700">
              {title}
            </h3>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-600 transition-all duration-500 group-hover:w-full"></div>
          </div>

          <p className="text-black mb-4 text-base md:text-lg transition-all duration-300 group-hover:text-gray-700">
            {description}
          </p>

          <div className="border-t border-gray-200/50 pt-4 md:pt-6">
            <h4 className="text-lg font-semibold text-black mb-3 md:mb-4 transition-colors duration-300 group-hover:text-gray-800">
              Benefits
            </h4>
            <ul className="space-y-2 md:space-y-3">
              {benefits.map((benefit, index) => (
                <li
                  key={index}
                  className="flex items-start transition-all duration-300 hover:translate-x-2"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5 mr-3 transition-all duration-300 group-hover:scale-110 group-hover:text-purple-600" />
                  <span className="text-black text-base md:text-base transition-colors duration-300 group-hover:text-gray-700">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Image */}
        <div className="relative h-64 md:h-auto md:w-1/2 overflow-hidden">
          <Image
            src={image.src}
            alt={image.alt}
            data-ai-hint={image.hint}
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
export default function AudioVideoCollaborationPage() {
  const centeredTextSections =
    solution.sections?.filter((s) => s.type === "centered-text") || [];

  const solutionsData = [
    {
      title: "Enterprise Solutions",
      description:
        "Empower your organization with seamless collaboration across every smart device. Whether it's delivering a presentation straight from your phone in the boardroom or hosting a video meeting with remote team members, our technology ensures secure, reliable, and professional communication at all times.",
      benefits: [
        "Seamless collaboration across any smart device",
        "Save time with quick, organized ad-hoc meetings",
        "Drive faster, more effective decision-making",
        "Strengthen teamwork and improve collaboration",
      ],
      image: {
        src: "/assets/LANDSCAPE/AUDIO VISUAL/1.png",
        alt: "Enterprise solutions",
        hint: "enterprise solutions",
      },
    },
    {
      title: "Retail Solutions",
      description:
        "We bring extensive experience in the retail sector, working closely with clients and agency partners to design AV solutions that drive measurable profits. Our approach ensures every solution is cost-effective, tailored to your business goals, and optimized to fit your budget helping you create engaging customer experiences that convert into results.",
      benefits: [
        "Leverage the latest, high-impact digital displays with in-store retail solutions",
        "Drive more business with engaging, cost-effective AV experiences",
        "Boost customer spending through interactive and immersive engagement",
      ],
      image: {
        src: "/assets/solutionimg/flat.jpg",
        alt: "Retail solutions",
        hint: "retail solutions",
      },
    },
    {
      title: "Hospitality & Tourism Solutions",
      description:
        "Create memorable guest experiences with AV-guided customer journeys. Deliver real-time interaction, instant support, and seamless brand engagement.",
      benefits: [
        "Easy-to-use, highly functional online screens",
        "Create and share content within minutes with AV collaboration",
        "Deliver unique and personalized customer experiences",
      ],
      image: {
        src: "/assets/solutionimg/modern-hospital-entrance-with-interactive-digital-kiosk-bright-spacious-lobby-area.jpg",
        alt: "Hospitality solutions",
        hint: "hospitality solutions",
      },
    },
  ];

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

        <section className="py-4 md:py-8 lg:py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-12 md:gap-16 lg:gap-20">
              {solutionsData.map((solution, index) => (
                <SolutionCard
                  key={index}
                  title={solution.title}
                  description={solution.description}
                  benefits={solution.benefits}
                  image={solution.image}
                />
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
