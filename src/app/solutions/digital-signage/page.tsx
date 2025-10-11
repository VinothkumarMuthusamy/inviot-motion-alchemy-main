"use client";

import Image from "next/image";
import { AnimateInView } from "@/components/ui/animate-in-view";
import type { Solution } from "../solutions-data";
import Contact from "@/components/landing/contact";
import { CheckCircle } from "lucide-react";
import TrustedFeatures from "@/components/landing/trusted-features";
import { motion } from "framer-motion";
import { easeOut, easeInOut } from "framer-motion";

const solution: Solution = {
  slug: "digital-signage",
  title: "Digital Signage",
  subtitle:
    "Digital Signage Solutions are a great way to share information with visitors, customers, and teams.",
  video:
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  
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

// ================= Display Solutions Card =================
const DisplaySolutionsCard = () => {
  const cardVariants = {
    hidden: { rotateX: 90, opacity: 0, transformOrigin: "top center" },
    visible: {
      rotateX: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: easeOut },
    },
  };

  const displayFeatures = [
    "Touch-interactive kiosks and monitors for dynamic engagement",
    "Large-format interactive displays that captivate audiences",
    "Indoor and outdoor display solutions for any environment",
    "Video walls and direct-view LED systems for stunning visuals",
    "Create layouts, push updates, and manage content across networks with ease"
  ];

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
              Our Display Solutions
            </h3>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-600 transition-all duration-500 group-hover:w-full"></div>
          </div>

          <p className="text-black mb-4 text-base md:text-lg transition-all duration-300 group-hover:text-gray-700">
            Comprehensive display solutions designed to transform how you engage with your audience. From interactive kiosks to stunning video walls, we provide the technology to captivate and inspire.
          </p>

          <div className="border-t border-gray-200/50 pt-4 md:pt-6">
            <h4 className="text-lg font-semibold text-black mb-3 md:mb-4 transition-colors duration-300 group-hover:text-gray-800">
              Key Features
            </h4>
            <ul className="space-y-2 md:space-y-3">
              {displayFeatures.map((feature, index) => (
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
            src="/assets/solutionimg/shopping-girl-looking-store-window.jpg"
            alt="Display Solutions - Interactive kiosks and digital displays"
            data-ai-hint="display solutions interactive kiosk"
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            priority
          />
        </div>
      </div>
    </motion.div>
  );
};

// ================= Animated Display Features =================
const DisplayFeatureItem = ({ 
  item, 
  index 
}: { 
  item: { description: string };
  index: number;
}) => {
  const containerVariants = {
    hidden: { 
      opacity: 0,
      perspective: 1000,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: index * 0.15,
        ease: easeOut
      }
    }
  };

  const textVariants = {
    hidden: { 
      x: -100,
      opacity: 0,
      rotateY: -45,
      transformOrigin: "left center"
    },
    visible: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      transition: {
        duration: 0.7,
        delay: index * 0.15 + 0.2,
        ease: easeOut
      }
    }
  };

  const iconVariants = {
    hidden: { 
      scale: 0, 
      rotate: -180,
      y: -50 
    },
    visible: {
      scale: 1,
      rotate: 0,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.15 + 0.1,
        ease: easeOut
      }
    }
  };

  const hoverVariants = {
    hover: {
      x: 20,
      paddingLeft: "1.5rem",
      paddingRight: "1.5rem",
      marginLeft: "-1.5rem",
      marginRight: "-1.5rem",
      borderLeftWidth: "4px",
      borderLeftColor: "#ec4899",
      backgroundColor: "rgba(236, 72, 153, 0.05)",
      transition: {
        duration: 0.3,
        ease: easeOut
      }
    }
  };

  return (
    <motion.li
      className="flex items-start relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <motion.div
        className="flex items-start w-full py-3 rounded-lg"
        variants={hoverVariants}
      >
        <motion.div variants={iconVariants}>
          <svg
            className="h-6 w-6 text-pink-600 mr-4 mt-0.5 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </motion.div>
        <motion.span 
          className="text-left text-black text-lg font-medium"
          variants={textVariants}
        >
          {item.description}
        </motion.span>
      </motion.div>
    </motion.li>
  );
};

// ================= Page =================
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

  // Enhanced Animation for the display solutions image - Spin and move from left to right
  const imageVariants = {
    hidden: { 
      opacity: 0,
      x: -200, // Start from left side
      scale: 0.5,
      rotateY: -180, // Start with full spin backwards
      rotateX: -45,
      perspective: 1200,
      transformOrigin: "center center"
    },
    visible: {
      opacity: 1,
      x: 0, // Move to final position
      scale: 1,
      rotateY: 0, // Complete the spin
      rotateX: 0,
      transition: {
        duration: 1.5,
        ease: easeInOut, // Use imported easing function
        delay: 0.3
      }
    }
  };

  // Additional hover animation for the image
  const imageHoverVariants = {
    hover: {
      scale: 1.08,
      rotateY: 10,
      rotateX: 5,
      transition: {
        duration: 0.6,
        ease: easeOut
      }
    }
  };

  return (
    <div className="relative">
      {/* Enhanced Background with Animations */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/assets/team-bg.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-pink-500 opacity-20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-blue-600 opacity-20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-purple-500 opacity-15 rounded-full blur-[100px] animate-bounce delay-500"></div>
      </div>
      
      <div className="relative z-10">
        <DefaultHero solution={solution} />

        {/* Render all centered-text sections with animations */}
        {centeredTextSections.map((section, index) => (
          <motion.section 
            key={index} 
            className="py-16 md:py-20 lg:py-24"
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

        {/* Display Solutions Card Section */}
        <motion.section 
          className="py-12 md:py-16 lg:py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="min-h-screen flex items-center justify-center py-8">
              <DisplaySolutionsCard />
            </div>
          </div>
        </motion.section>

        {/* Solutions Cards Section - Individual cards with flip animation */}
        <motion.section 
          className="py-12 md:py-16 lg:py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-12 md:gap-16 lg:gap-20">
              {solutionsData.map((solution, index) => (
                <div
                  key={index}
                  className="min-h-screen flex items-center justify-center py-8"
                >
                  <SolutionCard
                    title={solution.title}
                    description={solution.description}
                    benefits={solution.benefits}
                    image={solution.image}
                  />
                </div>
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