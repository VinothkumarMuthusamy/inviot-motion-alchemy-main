"use client";

import Image from "next/image";
import { AnimateInView } from "@/components/ui/animate-in-view";
import type { Solution } from "../solutions-data";
import Contact from "@/components/landing/contact";
import { CheckCircle } from "lucide-react";
import TrustedFeatures from "@/components/landing/trusted-features";
import { motion } from "framer-motion";
import { easeOut } from "framer-motion";

const solution: Solution = {
  slug: "experience-centres",
  title: "Experience Centres",
  subtitle:
    "A powerful corporate communication tool to connect with business prospects, partners and end-users alike.",
  video:
    "https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
  
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

      {/* Content */}
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

// ================= Solution Card with Flip Animation =================
const SolutionCard = ({
  image,
  title,
  description,
  features,
}: {
  image: { src: string; alt: string; hint: string };
  title: string;
  description: string;
  features: string[];
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

          <p className="text-black mb-6 text-base md:text-lg transition-all duration-300 group-hover:text-gray-700 flex-grow">
            {description}
          </p>

          <div className="border-t border-gray-200/50 pt-4 md:pt-6">
            <h4 className="text-lg font-semibold text-black mb-3 md:mb-4 transition-colors duration-300 group-hover:text-gray-800">
              Key Features
            </h4>
            <ul className="space-y-2 md:space-y-3">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start transition-all duration-300 hover:translate-x-2"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5 mr-3 transition-all duration-300 group-hover:scale-110 group-hover:text-purple-600" />
                  <span className="text-black text-base md:text-base transition-colors duration-300 group-hover:text-gray-700">
                    {feature}
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

  // Animation variants for sections
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut }
    }
  };

  // Get all sections by type
  const centeredTextSections =
    solution.sections?.filter((s) => s.type === "centered-text") || [];

  // Card data for the Connect & Engage section
  const connectEngageCard = {
    title: "Connect, Engage & Build Loyalty",
    description: "Transform customer interactions into lasting relationships",
    features: [
      "Tailored customer experiences – Create environments designed around personalized interactions that make prospects feel valued from the very start.",
      "Stronger brand reputation – A well-executed Customer Experience Centre (CEC) offers a polished, engaging introduction to your brand, reinforcing trust and credibility.",
      "Interactive product demonstrations – Enable your sales team to deliver hands-on demos, showcase product details, and support customers in making informed decisions.",
      "Drive loyalty & sales – Build deeper customer connections that translate into stronger brand loyalty and long-term growth.",
    ],
    image: {
      src: "/assets/LANDSCAPE/Experience centres/1.png",
      alt: "Customer Experience Center",
      hint: "experience center",
    },
  };

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

        {/* Render all centered-text sections with animations */}
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

        {/* Connect & Engage Section as a Card */}
        <section className="py-4 md:py-8 lg:py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-12 md:gap-16 lg:gap-20">
              <SolutionCard
                image={connectEngageCard.image}
                title={connectEngageCard.title}
                description={connectEngageCard.description}
                features={connectEngageCard.features}
              />
            </div>
          </div>
        </section>

        <TrustedFeatures />
        <Contact />
      </div>
    </div>
  );
}