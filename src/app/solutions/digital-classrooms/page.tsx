"use client";

import Image from "next/image";
import { AnimateInView } from "@/components/ui/animate-in-view";
import type { Solution } from "../solutions-data";
import Contact from "@/components/landing/contact";
import TrustedFeatures from "@/components/landing/trusted-features";

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
            
          </div>
        </AnimateInView>
      </div>
    </div>
  );
};

const SolutionCard = ({
  title,
  descriptions,
  image,
}: {
  title: string;
  descriptions: string[];
  image: { src: string; alt: string; hint: string };
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-700 h-full flex flex-col mx-auto max-w-4xl border border-gray-200 relative">
      <div className="relative h-64 md:h-80 lg:h-96">
        <Image
          src={image.src}
          alt={image.alt}
          data-ai-hint={image.hint}
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="p-4 md:p-6 lg:p-8 flex-grow flex flex-col">
        <h3 className="text-xl md:text-2xl font-bold text-pink-600 mb-3 md:mb-4">{title}</h3>

        {/* Render each description with heading and paragraph */}
        {descriptions.map((desc, index) => {
          const [heading, ...rest] = desc.split("–");
          const body = rest.join("–").trim();
          return (
            <div key={index} className="mb-4 md:mb-6">
              <h4 className="text-pink-600 font-semibold text-base md:text-lg mb-2">
                {heading.trim()}
              </h4>
              <p className="text-black text-sm md:text-base">{body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

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

        <section className="py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <AnimateInView>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-600 mb-12 text-center">
                  Shaping Student Success with AV Solutions
                </h2>
                
                {/* Grid layout for the features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-8">
                    {/* First feature - top left */}
                    <div className="bg-transparent rounded-lg p-6">
                      <div className="flex items-start">
                        <svg
                          className="h-6 w-6 text-pink-600 mr-4 mt-1 flex-shrink-0"
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
                        <div>
                          <h3 className="font-bold text-pink-600 text-lg mb-2">{features[0].title}</h3>
                          <p className="text-black text-justify">{features[0].description}</p>
                        </div>
                      </div>
                    </div>

                    {/* Third feature - bottom left */}
                    <div className="bg-transparent rounded-lg p-6">
                      <div className="flex items-start">
                        <svg
                          className="h-6 w-6 text-pink-600 mr-4 mt-1 flex-shrink-0"
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
                        <div>
                          <h3 className="font-bold text-pink-600 text-lg mb-2">{features[2].title}</h3>
                          <p className="text-black text-justify">{features[2].description}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-8">
                    {/* Second feature - top right */}
                    <div className="bg-transparent rounded-lg p-6">
                      <div className="flex items-start">
                        <svg
                          className="h-6 w-6 text-pink-600 mr-4 mt-1 flex-shrink-0"
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
                        <div>
                          <h3 className="font-bold text-pink-600 text-lg mb-2">{features[1].title}</h3>
                          <p className="text-black text-justify">{features[1].description}</p>
                        </div>
                      </div>
                    </div>

                    {/* Fourth feature - bottom right */}
                    <div className="bg-transparent rounded-lg p-6">
                      <div className="flex items-start">
                        <svg
                          className="h-6 w-6 text-pink-600 mr-4 mt-1 flex-shrink-0"
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
                        <div>
                          <h3 className="font-bold text-pink-600 text-lg mb-2">{features[3].title}</h3>
                          <p className="text-black text-justify">{features[3].description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimateInView>
            </div>
          </div>
        </section>

        <section className="py-0">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-12 md:gap-16 lg:gap-20">
              {solutionsData.map((solution, index) => (
                <div key={index} className="min-h-screen flex items-center justify-center py-8">
                  <AnimateInView>
                    <SolutionCard
                      title={solution.title}
                      descriptions={solution.descriptions}
                      image={solution.image}
                    />
                  </AnimateInView>
                </div>
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