"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AnimateInView } from "@/components/ui/animate-in-view";
import FeatureList from "@/components/ui/feature-list";
import HotspotCarousel from "@/components/ui/hotspot";
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
  description:
    "Bringing all the benefits of advanced technology into today’s classrooms and enabling tested, standards-based solutions that simply work for users.",
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
    },
    {
      type: "feature-list",
      title: "Classroom AV Solutions",
      features: [
        {
          icon: "https://www.kramerav.com/wp-content/uploads/2023/10/Classroom-spaces_Effortless-classroom-operation-and-control-250x250.png",
          title: "Effortless classroom operation",
          description:
            "Our audio-visual technology, including dual-display features, allows for simultaneous viewing of content and remote participants.",
        },
        {
          icon: "https://www.kramerav.com/wp-content/uploads/2023/10/Personal-workspaces_Advanced-wireless-connectivity-250x250.png",
          title: "Simple wireless content sharing",
          description:
            "Students can easily share content from their devices, with quad-mode capability for up to four devices simultaneously.",
        },
        {
          icon: "https://www.kramerav.com/wp-content/uploads/2023/10/Classroom-spaces_Comprehensive-connectivity-options-250x250.png",
          title: "Comprehensive connectivity",
          description:
            "Facilitating access to classroom AV equipment for teachers’ or guests’ laptops, including peripherals.",
        },
      ],
    },
    {
      type: "hotspot-carousel",
      title: "Enhanced Collaboration, Near and Far",
      content:
        "In every space – From classrooms to dining halls, digital wayfinding, and other common areas, AV makes teaching methods more engaging and interactive. Smarter collaboration zones – Huddle rooms equipped with large monitors, cameras, and high-quality audio are becoming a fixture across school campuses, enabling seamless group learning and discussion.",
      hotspots: [
        {
          image: {
            src: "/assets/LANDSCAPE/EDUCATION/1.png",
            alt: "A digital classroom",
            hint: "digital classroom",
          },
          hotspots: [
            {
              position: { top: "45%", left: "65%" },
              title: "Tavor 5-O",
              description: "5.25–Inch On–Wall Powered Speakers",
              details: [
                "Indoor System",
                "Woofer — 5.25″",
                "Freq — 45Hz to 20kHz",
              ],
              link: "#",
            },
            {
              position: { top: "36%", left: "50%" },
              title: "VIA GO²",
              description: "Compact & Secure 4K Wireless Presentation",
              details: [
                "Conventional Wi–Fi and/or LAN",
                "Supports Windows, Mac, iOS, Android",
                "Two presenters simultaneously",
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

      <section className="flex items-center justify-center bg-transparent px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl mx-auto">
          <AnimateInView>
            <h2 className="heading-2 mb-8 text-primary font-bold text-center">
              Shaping Student Success with AV Solutions
            </h2>
            <ul className="space-y-6 text-foreground/80">
              {[
                {
                  title: "Student engagement first",
                  description:
                    "Collaboration technology continues to play a vital role in driving success both in classrooms and remotely.",
                },
                {
                  title: "HyFlex classrooms",
                  description:
                    "Seamlessly connect in-person and online students for immersive, interactive learning.",
                },
                {
                  title: "Learning without isolation",
                  description:
                    "Even in varied environments, students remain engaged and connected through innovative solutions.",
                },
                {
                  title: "Beyond convenience",
                  description:
                    "Schools need advanced AV tools and sustainable environments that foster collaboration and long-term success.",
                },
              ].map((item, index) => (
                <li key={index} className="flex items-start text-justify bg-transparent px-4 sm:px-6 lg:px-8">
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

      {/* {featureListSection && featureListSection.features && (
        <section className="section-padding bg-transparent">
          <div className="container-max">
            <FeatureList features={featureListSection.features as any[]} />
          </div>
        </section>
      )} */}

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
      <TrustedFeatures />
      <Contact />
    </div>
  );
}
