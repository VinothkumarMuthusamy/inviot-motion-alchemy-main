'use client';

import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";
import { AnimateInView } from "@/components/ui/animate-in-view";
import Image from "next/image";
import { Target, Eye, Building, Globe, Star, Flag, Briefcase, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

// Typewriter component
const Typewriter = ({ text, delay = 50 }: { text: string; delay?: number }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
  
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <span>{currentText}</span>;
};

// Image Carousel Component
const ImageCarousel = ({ images, interval = 4000 }: { images: { src: string; alt: string }[]; interval?: number }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="relative w-full h-80 md:h-96 lg:h-[500px] overflow-hidden rounded-lg shadow-xl">
      {images.map((image, index) => (
        <motion.div
          key={index}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentIndex ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </motion.div>
      ))}
      <button 
        onClick={prevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
        aria-label="Previous image"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
        aria-label="Next image"
      >
        <ChevronRight size={24} />
      </button>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-primary' : 'bg-gray-300'}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const timelineEvents = [
  {
    year: "1997",
    title: "Inviot Founded",
    description:
      "Our journey began with a vision to revolutionize the AV industry with innovative integration solutions.",
    icon: Flag,
  },
  {
    year: "2005",
    title: "First Major Corporate Project",
    description:
      "Delivered a state-of-the-art AV system for a Fortune 500 company, setting a new benchmark for quality and performance.",
    icon: Briefcase,
  },
  {
    year: "2012",
    title: "Expansion to the Middle East",
    description:
      "Opened our first international office in Dubai, expanding our reach and expertise to a global audience.",
    icon: Globe,
  },
  {
    year: "2018",
    title: "Experience Centres",
    description:
      "Launched immersive experience centres that redefine how businesses and customers interact with technology.",
    icon: Star,
  },
  {
    year: "2023",
    title: "4000+ Projects Milestone",
    description:
      "Celebrated the successful completion of over 4000 projects across India and the Middle East.",
    icon: Building,
  },
];

const TimelineEvent = ({
  event,
  index,
}: {
  event: typeof timelineEvents[0];
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const isRight = index % 2 !== 0;

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center w-full my-8 gap-4"
    >
      {/* Left content */}
      <div
        className={`${isRight ? "order-1 md:order-1" : "order-1 md:order-1 md:flex md:justify-end md:pr-8"}`}
      >
        {!isRight && (
          <motion.div
            className="w-full max-w-sm p-6 bg-card rounded-lg shadow-lg border border-border/50 mx-auto md:mx-0"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.12 }}
            style={{ originX: 0.5, originY: 0.5 }}
          >
            <p className="text-sm text-primary font-semibold">{event.year}</p>
            <h3 className="heading-3 text-lg mt-1 text-secondary">
              {event.title}
            </h3>
            <p className="mt-2 text-foreground/70">{event.description}</p>
          </motion.div>
        )}
      </div>

      {/* Center Icon */}
      <div className="order-2 flex justify-center items-center my-4 md:my-0">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary flex items-center justify-center z-10 border-4 border-background">
          <event.icon className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground" />
        </div>
      </div>

      {/* Right content */}
      <div
        className={`${isRight ? "order-3 md:flex md:justify-start md:pl-8" : "order-3"}`}
      >
        {isRight && (
          <motion.div
            className="w-full max-w-sm p-6 bg-card rounded-lg shadow-lg border border-border/50 mx-auto md:mx-0"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.12 }}
            style={{ originX: 0.5, originY: 0.5 }}
          >
            <p className="text-sm text-primary font-semibold">{event.year}</p>
            <h3 className="heading-3 text-lg mt-1 text-secondary">
              {event.title}
            </h3>
            <p className="mt-2 text-foreground/70">{event.description}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const smoothProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const topMotion = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="section-padding bg-background" ref={containerRef}>
      <div className="container-max text-center mb-16">
        <h2 className="heading-2">Our Journey</h2>
        <p className="mt-4 text-xl text-foreground/70">
          A timeline of our milestones and achievements.
        </p>
      </div>

      <div className="relative w-full max-w-4xl mx-auto">
        {/* vertical line background */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-border/50 rounded-full transform -translate-x-1/2 pointer-events-none hidden md:block"></div>

        {/* filled progress line (scales with scroll) */}
        <motion.div
          className="absolute left-1/2 top-0 bottom-0 w-1 bg-primary rounded-full transform -translate-x-1/2 pointer-events-none hidden md:block"
          style={{ scaleY: smoothProgress, transformOrigin: "top" }}
        />

        {/* moving indicator */}
        <motion.div
          className="sticky top-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background ring-4 ring-primary/50 transform -translate-x-1/2 -translate-y-1/2 hidden md:block"
          style={{ left: "50%", top: topMotion }}
        />

        <div className="relative flex flex-col items-center">
          {timelineEvents.map((event, index) => (
            <TimelineEvent key={event.year} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

const AboutUsPage = () => {
  const carouselImages = [
    { src: "/assets/meeting-rooms-01.jpg", alt: "Modern meeting room" },
    { src: "/assets/meeting-rooms-02.jpg", alt: "Conference room setup" },
    { src: "/assets/meeting-rooms-03.jpg", alt: "Collaboration space" },
    { src: "/assets/meeting-rooms-04.jpg", alt: "Executive boardroom" }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero About Section with Company on the right */}
        <section className="section-padding pt-32">
          <div className="container-max grid lg:grid-cols-2 gap-12 items-center">
            <AnimateInView>
              <div>
                <h1 className="heading-1 text-primary mb-6">
                  About Us
                </h1>
                <h2 className="heading-2 text-foreground mb-6">
                  <Typewriter text="Redefining experiences by connecting technology with people." />
                </h2>
                <p className="mt-4 text-lg text-foreground/70">
                  At Inviot, we believe that the best way to improve communication
                  and collaboration within organizations is to treat audiovisual,
                  unified collaboration and digital media as part of a larger
                  ecosystem. Starting a project with a strategic approach gives
                  your business the best opportunity to maximize ROI and build a
                  revolutionary workplace.
                </p>
              </div>
            </AnimateInView>
            
            <AnimateInView delay={0.2}>
              <div className="bg-card p-8 rounded-lg shadow-lg border border-border/50 overflow-hidden">
                <div className="relative h-48 w-full mb-6 rounded-lg overflow-hidden">
                  <Image
                    src="/assets/company-image.jpg"
                    alt="Inviot Company"
                    fill
                    className="object-cover"
                  />
                </div>
                <h2 className="heading-2 text-secondary mb-6">Company</h2>
                <div className="space-y-4 text-foreground/70 leading-relaxed">
                  <p>
                    We are a leading design and engineering integration firm in
                    audiovisual technology with over 20 years of rich industry
                    experience. We deliver best-in-class AV products, end-to-end
                    innovation, project management, and support solutions for
                    customers across India and the Middle East.
                  </p>
                  <p>
                    Our team of certified professionals works closely with clients
                    to understand their unique needs and deliver customized solutions
                    that enhance communication, collaboration, and productivity.
                  </p>
                </div>
              </div>
            </AnimateInView>
          </div>
        </section>

        {/* Image Carousel Section */}
        <section className="section-padding bg-card">
          <div className="container-max">
            <AnimateInView>
              <div className="text-center mb-12">
                <h2 className="heading-2">Our Work</h2>
                <p className="mt-4 text-xl text-foreground/70 max-w-3xl mx-auto">
                  Explore some of our innovative projects and solutions that have transformed 
                  how businesses communicate and collaborate.
                </p>
              </div>
            </AnimateInView>
            <AnimateInView delay={0.2}>
              <ImageCarousel images={carouselImages} />
            </AnimateInView>
          </div>
        </section>

        {/* Mission + Vision */}
        <section className="section-padding">
          <div className="container-max">
            <div className="grid md:grid-cols-2 gap-8">
              <AnimateInView>
                <Card className="h-full bg-card border-border/50">
                  <CardContent className="p-8 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <Target className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                    <h3 className="heading-3 text-secondary">Our Mission</h3>
                    <p className="mt-4 text-foreground/70">
                      To design and deliver premium technology solutions to
                      elevate experiences, create values, and enable
                      organizations to thrive and grow in the ever-evolving
                      business landscape.
                    </p>
                  </CardContent>
                </Card>
              </AnimateInView>
              <AnimateInView delay={0.2}>
                <Card className="h-full bg-card border-border/50">
                  <CardContent className="p-8 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <Eye className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                    <h3 className="heading-3 text-secondary">Our Vision</h3>
                    <p className="mt-4 text-foreground/70">
                      To be the most trusted and sought-after integration
                      partner, recognized for our commitment to quality,
                      customer-centric approach, and pioneering spirit in
                      technology.
                    </p>
                  </CardContent>
                </Card>
              </AnimateInView>
            </div>
          </div>
        </section>

        {/* Journey Timeline */}
        <Timeline />
      </main>
      <Footer />
    </div>
  );
};

export default AboutUsPage;