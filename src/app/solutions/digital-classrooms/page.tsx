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
  slug: "digital-classrooms",
  title: "Digital Classrooms",
  subtitle:
    "Deliver a Collaborative Education Experience with Innovative AV Solutions",
  video:
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  image: {
    src: "/assets/solutionimg/EDUCATION.jpg",
    alt: "Pupils sitting next to their desks",
    hint: "students classroom",
  },
  sections: [
    {
      type: "centered-text",
      title:
        "Deliver a Collaborative Education Experience with Innovative AV Solutions",
      content: `<p>Educators and technologists are united in creating learning solutions that adapt to diverse student needs. With interactive displays, touchscreens, and whiteboards, teachers can transform traditional lessons into engaging, immersive experiences enhancing student participation, collaboration, and learning outcomes.</p>`,
    }
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

// ================= Solution Card with Exact Same Animation =================
const SolutionCard = ({
  title,
  descriptions,
  image,
}: {
  title: string;
  descriptions: string[];
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

          {/* Render each description */}
          <div className="space-y-4 md:space-y-6">
            {descriptions.map((desc, index) => {
              const [heading, ...rest] = desc.split("–");
              const body = rest.join("–").trim();
              return (
                <div
                  key={index}
                  className="mb-4 md:mb-6 transition-all duration-300 hover:translate-x-2"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <h4 className="text-pink-600 font-semibold text-base md:text-lg mb-2 transition-colors duration-300 group-hover:text-purple-600">
                    {heading.trim()}
                  </h4>
                  <p className="text-black text-sm md:text-base transition-colors duration-300 group-hover:text-gray-700">
                    {body}
                  </p>
                </div>
              );
            })}
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

// ================= Animated Feature Item =================
const FeatureItem = ({ 
  title, 
  description, 
  index 
}: { 
  title: string; 
  description: string; 
  index: number;
}) => {
  const featureVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: easeOut
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1 + 0.2
      }
    }
  };

  return (
    <motion.div
      className="bg-transparent rounded-lg p-6 transition-all duration-300 hover:bg-white/10 hover:scale-105"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={featureVariants}
    >
      <div className="flex items-start">
        <motion.div variants={iconVariants}>
          <svg
            className="h-6 w-6 text-pink-600 mr-4 mt-1 flex-shrink-0 transition-colors duration-300 group-hover:text-purple-600"
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
        </motion.div>
        <div>
          <h3 className="font-bold text-pink-600 text-lg mb-2 transition-colors duration-300 group-hover:text-purple-600">
            {title}
          </h3>
          <p className="text-black text-justify transition-colors duration-300 group-hover:text-gray-700">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// ================= Page =================
export default function DigitalClassroomsPage() {
  const scrollToContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const contactElement = document.getElementById("contact");
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#contact";
    }
  };

  const centeredTextSections = solution.sections?.filter(s => s.type === 'centered-text') || [];

  const solutionsData = [
    {
      title: "Enhanced Collaboration, Near and Far",
      descriptions: [
        "In every space – From classrooms to dining halls, digital wayfinding, and other common areas, AV makes teaching methods more engaging and interactive.",
        "Smarter collaboration zones – Huddle rooms equipped with large monitors, cameras, and high-quality audio are becoming a fixture across school campuses, enabling seamless group learning and discussion."
      ],
      image: {
        src: "/assets/LANDSCAPE/EDUCATION/1.png",
        alt: "Classroom solutions",
        hint: "classroom solutions"
      }
    }
  ];

  const features = [
    {
      title: "Student engagement first",
      description: "Collaboration technology continues to play a vital role in driving success both in classrooms and remotely."
    },
    {
      title: "HyFlex classrooms",
      description: "Seamlessly connect in-person and online students for immersive, interactive learning."
    },
    {
      title: "Learning without isolation",
      description: "Even in varied environments, students remain engaged and connected through innovative solutions."
    },
    {
      title: "Beyond convenience",
      description: "Schools need advanced AV tools and sustainable environments that foster collaboration and long-term success."
    }
  ];

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

        {/* Features Section with Enhanced Animations */}
        <motion.section 
          className="py-4 md:py-8 lg:py-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <motion.div variants={titleVariants}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-600 mb-12 text-center">
                  Shaping Student Success with AV Solutions
                </h2>
              </motion.div>
              
              {/* Grid layout for the features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-8">
                  <FeatureItem 
                    title={features[0].title} 
                    description={features[0].description} 
                    index={0}
                  />
                  <FeatureItem 
                    title={features[2].title} 
                    description={features[2].description} 
                    index={2}
                  />
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  <FeatureItem 
                    title={features[1].title} 
                    description={features[1].description} 
                    index={1}
                  />
                  <FeatureItem 
                    title={features[3].title} 
                    description={features[3].description} 
                    index={3}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Solution Card Section */}
        <motion.section 
          className="mt-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-12 md:gap-16 lg:gap-20">
              {solutionsData.map((solution, index) => (
                <div key={index} className="min-h-screen flex items-center justify-center py-8">
                  <SolutionCard
                    title={solution.title}
                    descriptions={solution.descriptions}
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