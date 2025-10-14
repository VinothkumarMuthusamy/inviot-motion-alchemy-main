import Image, { StaticImageData } from "next/image";
import { AnimateInView } from "@/components/ui/animate-in-view";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Linkedin } from "lucide-react";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";

interface TeamMember {
  name: string;
  title: string;
  image: string | StaticImageData;
  hint: string;
  social: string;
}

const leadershipTeam: TeamMember[] = [
  {
    name: "John Doe",
    title: "Founder & CEO",
    image: "https://picsum.photos/seed/ld1/400/400",
    hint: "male portrait professional",
    social: "https://linkedin.com",
  },
  {
    name: "Jane Smith",
    title: "Chief Technology Officer",
    image: "https://picsum.photos/seed/ld2/400/400",
    hint: "female portrait professional",
    social: "https://linkedin.com",
  },
  {
    name: "Peter Jones",
    title: "Head of Operations",
    image: "https://picsum.photos/seed/ld3/400/400",
    hint: "male portrait corporate",
    social: "https://linkedin.com",
  },
  {
    name: "Sarah Johnson",
    title: "Marketing Director",
    image: "https://picsum.photos/seed/ld4/400/400",
    hint: "female portrait marketing",
    social: "https://linkedin.com",
  },
  {
    name: "Michael Brown",
    title: "Product Manager",
    image: "https://picsum.photos/seed/ld5/400/400",
    hint: "male portrait product",
    social: "https://linkedin.com",
  },
  {
    name: "Emily Wilson",
    title: "UX Designer",
    image: "https://picsum.photos/seed/ld6/400/400",
    hint: "female portrait design",
    social: "https://linkedin.com",
  },
];

const Leadership = () => {
  const [isPaused, setIsPaused] = useState(false);
  const extendedTeam = [...leadershipTeam, ...leadershipTeam];

  return (
    <section 
      id="leadership" 
      className="py-12 md:py-16 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-white/0"></div>
      <div className="container-max relative z-10">
        <AnimateInView>
          <h2 className="heading-2 text-center text-pink-600">Meet the Leadership</h2>
          <p className="mt-4 text-center max-w-2xl mx-auto text-black/80 text-lg">
            The driving force behind our innovation and success.
          </p>
        </AnimateInView>
        
        <div 
          className="mt-12 relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div 
            className="marquee"
          >
            <div 
              className={`marquee-content ${isPaused ? 'animate-pause' : ''}`}
            >
              {extendedTeam.map((member, index) => (
                <div key={`card-${index}`} className="flex-shrink-0 w-72 sm:w-80 px-4">
                  <Card className="leader-card text-center bg-background/90 border-border/50 group overflow-hidden backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                    <div className="overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={400}
                        height={400}
                        data-ai-hint={member.hint}
                        className="w-full h-auto object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                      />
                    </div>
                    <CardContent className="p-4 sm:p-6">
                      <h3 className="font-headline text-lg sm:text-xl font-bold text-secondary">
                        {member.name}
                      </h3>
                      <p className="text-primary text-sm sm:text-base">{member.title}</p>
                    </CardContent>
                    <CardFooter className="justify-center pb-4 sm:pb-6">
                      <Link
                        href={member.social}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name}'s LinkedIn profile`}
                      >
                        <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-foreground/70 hover:text-primary transition-colors" />
                      </Link>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>
        </div>
      </div>
      
      <style jsx>{`
        .animate-pause {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Leadership;
