
'use client';

import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";
import { AnimateInView } from "@/components/ui/animate-in-view";
import Image from "next/image";
import { Target, Eye, Building, Globe, Star, Flag, Briefcase, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Typewriter from 'typewriter-effect';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from "@/components/ui/button";

const ImageCarousel = ({ images, interval = 4000 }: { images: { src: string; alt: string, hint: string }[]; interval?: number }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: interval })]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="relative w-full overflow-hidden rounded-lg shadow-xl">
      <div ref={emblaRef}>
        <div className="flex">
          {images.map((image, index) => (
            <div key={index} className="flex-[0_0_100%] relative h-80 md:h-96 lg:h-[500px]">
              <Image
                src={image.src}
                alt={image.alt}
                data-ai-hint={image.hint}
                fill
                className="w-full h-full object-cover"
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
      <Button 
        onClick={scrollPrev}
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full"
        aria-label="Previous image"
      >
        <ChevronLeft size={24} />
      </Button>
      <Button 
        onClick={scrollNext}
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full"
        aria-label="Next image"
      >
        <ChevronRight size={24} />
      </Button>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${index === selectedIndex ? 'bg-primary' : 'bg-gray-300'}`}
            onClick={() => scrollTo(index)}
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const isRight = index % 2 !== 0;

  return (
    <div
      ref={ref}
      className="grid md:grid-cols-[1fr_auto_1fr] items-center w-full my-4 md:my-0"
    >
      {/* Left content or placeholder */}
      <div className="md:pr-8 md:text-right order-1">
        {!isRight && (
          <motion.div
            className="w-full max-w-sm ml-auto p-4 md:p-6 bg-card/80 backdrop-blur-sm rounded-lg shadow-lg border border-border/50"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.12 }}
          >
            <p className="text-sm text-primary font-semibold">{event.year}</p>
            <h3 className="heading-3 text-base md:text-lg mt-1 text-secondary">
              {event.title}
            </h3>
            <p className="mt-2 text-sm text-foreground/70">{event.description}</p>
          </motion.div>
        )}
      </div>

      {/* Center Icon */}
      <div className="flex justify-center items-center my-4 md:my-0 order-first md:order-2 col-start-1 md:col-start-2">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary flex items-center justify-center z-10 border-4 border-background relative">
          <div className="absolute top-0 left-[-2.6rem] md:hidden h-full border-l-2 border-dashed border-border/70 -z-10"></div>
          <event.icon className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground" />
        </div>
      </div>

      {/* Right content or placeholder */}
      <div className="md:pl-8 md:text-left order-2 md:order-3">
        {isRight && (
          <motion.div
            className="w-full max-w-sm mr-auto p-4 md:p-6 bg-card/80 backdrop-blur-sm rounded-lg shadow-lg border border-border/50"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.12 }}
          >
            <p className="text-sm text-primary font-semibold">{event.year}</p>
            <h3 className="heading-3 text-base md:text-lg mt-1 text-secondary">
              {event.title}
            </h3>
            <p className="mt-2 text-sm text-foreground/70">{event.description}</p>
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
  
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  return (
    <section className="section-padding bg-transparent" ref={containerRef}>
      <div className="container-max text-center mb-12 md:mb-16">
        <h2 className="heading-2">Our Journey</h2>
        <p className="mt-4 text-lg md:text-xl text-foreground/70">
          A timeline of our milestones and achievements.
        </p>
      </div>

      <div className="relative w-full max-w-4xl mx-auto">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-border/50 rounded-full transform -translate-x-1/2 pointer-events-none"></div>
        
        <motion.div
          className="absolute left-4 md:left-1/2 top-0 w-1 bg-primary rounded-full transform -translate-x-1/2 origin-top"
          style={{ 
            height,
            boxShadow: '0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary))'
          }}
        >
          <motion.div
              className="absolute bottom-0 left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background ring-4 ring-primary/50 transform -translate-x-[calc(50%_+_0.1rem)] translate-y-1/2"
              style={{
                scale: useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0])
              }}
           />
        </motion.div>
        
        <div className="relative flex flex-col items-start md:items-center pl-10 md:pl-0">
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
      { src: "/assets/aboutus/inviot1.png", alt: "Collaboration space", hint: "collaboration space" },
      { src: "/assets/aboutus/inviot2.png", alt: "Collaboration space", hint: "collaboration space" },
      { src: "/assets/aboutus/adani1.png", alt: "Modern meeting room", hint: "modern meeting room" },
      { src: "/assets/aboutus/adani2.png", alt: "Conference room setup", hint: "conference room" },
      { src: "/assets/aboutus/amgen1.png", alt: "Collaboration space", hint: "collaboration space" },
      { src: "/assets/aboutus/amgen2.png", alt: "Executive boardroom", hint: "executive boardroom" }
    ];
  
    return (
      <div 
        className="flex flex-col min-h-screen bg-background"
        style={{
          backgroundImage: "url('/assets/team-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <Header />
        <main className="flex-grow">
          {/* Hero About Section */}
          <section className="section-padding pt-32 bg-transparent">
            <div className="container-max grid lg:grid-cols-2 gap-12 items-center">
                <AnimateInView>
                <div>
                    <h1 className="heading-1 text-primary mb-6">
                    About Us
                    </h1>
                    <div className="heading-2 text-foreground mb-6 h-20 md:h-auto">
                        <Typewriter
                            options={{
                                strings: ["Redefining experiences by connecting technology with people."],
                                autoStart: true,
                                loop: false,
                                delay: 40,
                                deleteSpeed: 999999,
                                cursor: ''
                            }}
                        />
                    </div>
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
                
                <AnimateInView delay={200}>
                <div className="bg-background/80 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-border/50 overflow-hidden">
                    <div className="relative h-48 w-full mb-6 rounded-lg overflow-hidden">
                    <Image
                        src="/assets/aboutus/aboutcompany.jpg"
                        alt="Inviot Company"
                        data-ai-hint="team working office"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    </div>
                    <h2 className="heading-3 text-secondary mb-4">Our Company</h2>
                    <div className="space-y-4 text-foreground/70 leading-relaxed">
                    <p>
                        We are a leading design and engineering integration firm in
                        audiovisual technology with over 20 years of rich industry
                        experience, delivering best-in-class AV products and solutions.
                    </p>
                    </div>
                </div>
                </AnimateInView>
            </div>
          </section>

          {/* Image Carousel Section */}
          <section className="section-padding bg-transparent ">
            <div className="container-max">
              <AnimateInView>
                <div className="text-center mb-12">
                  <h2 className="heading-2">Our Work in Action</h2>
                  <p className="mt-4 text-xl text-foreground/70 max-w-3xl mx-auto">
                    Explore some of our innovative projects and solutions that have transformed 
                    how businesses communicate and collaborate.
                  </p>
                </div>
              </AnimateInView>
              <AnimateInView delay={200}>
                <ImageCarousel images={carouselImages} />
              </AnimateInView>
            </div>
          </section>
  
          {/* Mission + Vision */}
          <section className="section-padding bg-transparent ">
            <div className="container-max">
              <div className="grid md:grid-cols-2 gap-8">
                <AnimateInView>
                  <Card className="h-full bg-background/80 backdrop-blur-sm border-border/50">
                    <CardContent className="p-6 md:p-8 text-center">
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
                <AnimateInView delay={200}>
                  <Card className="h-full bg-background/80 backdrop-blur-sm border-border/50">
                    <CardContent className="p-6 md:p-8 text-center">
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

    

    