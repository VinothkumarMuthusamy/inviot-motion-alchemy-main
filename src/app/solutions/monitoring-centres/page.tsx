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
  slug: "monitoring-centres",
  title: "Automated Monitoring & Experience Centres",
  subtitle:
    "Automate your monitoring control and help human capital focus on the issues that matter the most.",
  video:
    "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  
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

// Helper component to format the benefit text with pink before hyphen
const FormattedBenefit = ({ text }: { text: string }) => {
  const parts = text.split(' - ');
  
  if (parts.length > 1) {
    return (
      <span>
        <span className="text-pink-600">{parts[0]}</span>
        <span> - {parts.slice(1).join(' - ')}</span>
      </span>
    );
  }
  
  return <span>{text}</span>;
};
// ================= Solution Card with Flip Animation =================
const SolutionCard = ({
  title,
  benefits,
  image,
}: {
  title: string;
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

      {/* Card Content - Side by side layout */}
      <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 group-hover:scale-[1.02] border border-gray-200 hover:shadow-xl flex flex-col md:flex-row">
        {/* Text Content - Left Side */}
        <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
          <div className="relative inline-block mb-4">
            <h3 className="text-xl md:text-2xl font-bold text-pink-600 transition-colors duration-300 group-hover:text-pink-700">
              {title}
            </h3>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-600 transition-all duration-500 group-hover:w-full"></div>
          </div>

          <div className="pt-4 md:pt-6">
            <ul className="space-y-4 md:space-y-5">
              {benefits.map((benefit, index) => (
                <li 
                  key={index} 
                  className="flex items-start transition-all duration-300 hover:translate-x-2"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-pink-600 flex-shrink-0 mt-0.5 mr-2 md:mr-3 transition-all duration-300 group-hover:scale-110 group-hover:text-purple-600" />
                  <span className="text-black text-sm md:text-base transition-colors duration-300 group-hover:text-gray-700">
                    <FormattedBenefit text={benefit} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Image - Right Side */}
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

  // Card data for the two sections
  const infoCardsData = [
    {
      title: "Deliver Critical Information for Situational Awareness",
      benefits: [
        "Security Operations Centers - Centralized facilities where analysts monitor organizational assets, ensuring both physical sites and information systems remain secure.",
        "Social Media Command Centers - Dedicated spaces for your social media team to track conversations, engage with customers, and safeguard your brand identity and reputation.",
        "Dedicated Experts - Our specialists work with you to define the purpose of your space, identify the key information operators need, and design ergonomic environments that optimize efficiency and focus."
      ],
      image: {
        src: "/assets/LANDSCAPE/Monitoring room/1.png",
        alt: "Situational Awareness",
        hint: "situational awareness"
      }
    },
    {
      title: "Modern Network Operations Centers (NOCs)",
      benefits: [
        "Broad Support Capabilities - Today's NOCs manage and control resources for businesses, universities, utilities, and even government agencies.",
        "Advanced Display Solutions - Narrow-bezel video walls and pixel-pitch panels deliver superior picture quality with intuitive usability.",
        "Powerful Control Systems - Hardware and software-based video wall controllers ensure seamless monitoring and management.",
        "Secure Infrastructure - Sensitive hardware remains protected within the organization's most secure facilities.",
        "Global Monitoring - NOCs can oversee server banks and critical resources distributed worldwide, ensuring uninterrupted operations."
      ],
      image: {
        src: "/assets/solutionimg/noc.jpg",
        alt: "Network Operations Center",
        hint: "network operations"
      }
    }
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

        {/* Render all centered-text sections with animations */}
        {centeredTextSections.map((section, index) => (
          <motion.section 
            key={index} 
            className="py-4 md:py-8 lg:py-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
              <motion.div variants={titleVariants}>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pink-600 mb-6">
                  {section.title}
                </h2>
                <motion.div
                  className="text-xl md:text-2xl text-black leading-relaxed space-y-6 mt-8"
                  dangerouslySetInnerHTML={{ __html: section.content || "" }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                />
              </motion.div>
            </div>
          </motion.section>
        ))}

        {/* Critical Information Section as Cards - One after another */}
        <motion.section 
          className="py-4 md:py-8 lg:py-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-12 md:gap-16 lg:gap-20 max-w-4xl mx-auto">
              {infoCardsData.map((card, index) => (
                <SolutionCard
                  key={index}
                  title={card.title}
                  benefits={card.benefits}
                  image={card.image}
                />
              ))}
            </div>
          </div>
        </motion.section>

        <TrustedFeatures />
        <Contact />
      </div>
    </div>
  );
}