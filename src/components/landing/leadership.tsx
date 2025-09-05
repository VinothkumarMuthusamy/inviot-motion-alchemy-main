import Image, { StaticImageData } from "next/image";
import { AnimateInView } from "@/components/ui/animate-in-view";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Linkedin } from "lucide-react";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";

// Import your actual images
import JohnDoeImage from "@/image/l1.jpg";
import JaneSmithImage from "@/image/l2.jpg";
import PeterJonesImage from "@/image/l1.jpg";

interface TeamMember {
  name: string;
  title: string;
  image: StaticImageData;
  hint: string;
  social: string;
}

const leadershipTeam: TeamMember[] = [
  {
    name: "John Doe",
    title: "Founder & CEO",
    image: JohnDoeImage,
    hint: "male portrait professional",
    social: "https://linkedin.com",
  },
  {
    name: "Jane Smith",
    title: "Chief Technology Officer",
    image: JaneSmithImage,
    hint: "female portrait professional",
    social: "https://linkedin.com",
  },
  {
    name: "Peter Jones",
    title: "Head of Operations",
    image: PeterJonesImage,
    hint: "male portrait corporate",
    social: "https://linkedin.com",
  },
  // Add more team members to make the running effect more noticeable
  {
    name: "Sarah Johnson",
    title: "Marketing Director",
    image: JohnDoeImage,
    hint: "female portrait marketing",
    social: "https://linkedin.com",
  },
  {
    name: "Michael Brown",
    title: "Product Manager",
    image: JaneSmithImage,
    hint: "male portrait product",
    social: "https://linkedin.com",
  },
  {
    name: "Emily Wilson",
    title: "UX Designer",
    image: PeterJonesImage,
    hint: "female portrait design",
    social: "https://linkedin.com",
  },
];

const Leadership = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const cards = container.querySelectorAll('.leader-card');
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;

      let closestCardIndex: number | null = null;
      let minDistance = Infinity;

      cards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const distance = Math.abs(cardCenter - containerCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestCardIndex = index;
        }
      });

      setActiveCard(closestCardIndex);
    };

    // Initial check
    handleScroll();

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section 
      id="leadership" 
      className="py-8 md:py-12 relative overflow-hidden" // Reduced top and bottom padding by half
      style={{
        backgroundImage: "url('/assets/team-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-white/0"></div>
      <div className="container-max relative z-10">
        <AnimateInView>
          <h2 className="heading-2 text-center text-pink-600">Meet the Leadership</h2>
          <p className="mt-4 text-center max-w-2xl mx-auto text-black/80">
            The driving force behind our innovation and success.
          </p>
        </AnimateInView>
        
        {/* Running Cards Container */}
        <div 
          className="mt-8 relative overflow-hidden" // Reduced top margin
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div 
            className={`flex space-x-8 pb-4 ${isPaused ? 'animate-pause' : 'animate-running-cards'}`}
            style={{
              // Create a duplicate set of cards for seamless looping
              width: 'max-content',
              animation: 'runningCards 30s linear infinite',
            }}
          >
            {/* First set of cards */}
            {leadershipTeam.map((member, index) => (
              <div key={`first-${index}`} className="w-80 flex-shrink-0">
                <Card className={`leader-card text-center bg-background/90 border-border/50 group overflow-hidden backdrop-blur-sm transition-all duration-300 ${
                  activeCard === index 
                    ? 'scale-105 shadow-lg border-pink-300' 
                    : 'scale-100'
                }`}>
                  <div className="overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={400}
                      height={400}
                      data-ai-hint={member.hint}
                      className="w-full h-auto object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                      placeholder="blur"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-headline text-xl font-bold text-secondary">
                      {member.name}
                    </h3>
                    <p className="text-primary">{member.title}</p>
                  </CardContent>
                  <CardFooter className="justify-center">
                    <Link
                      href={member.social}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="w-6 h-6 text-foreground/70 hover:text-primary transition-colors" />
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            ))}
            
            {/* Duplicate set of cards for seamless looping */}
            {leadershipTeam.map((member, index) => (
              <div key={`second-${index}`} className="w-80 flex-shrink-0">
                <Card className={`leader-card text-center bg-background/90 border-border/50 group overflow-hidden backdrop-blur-sm transition-all duration-300 ${
                  activeCard === index 
                    ? 'scale-105 shadow-lg border-pink-300' 
                    : 'scale-100'
                }`}>
                  <div className="overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={400}
                      height={400}
                      data-ai-hint={member.hint}
                      className="w-full h-auto object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                      placeholder="blur"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-headline text-xl font-bold text-secondary">
                      {member.name}
                    </h3>
                    <p className="text-primary">{member.title}</p>
                  </CardContent>
                  <CardFooter className="justify-center">
                    <Link
                      href={member.social}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="w-6 h-6 text-foreground/70 hover:text-primary transition-colors" />
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
          
          {/* Gradient overlays for a smoother effect */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10"></div>
        </div>
      </div>
      
      {/* Add the animation keyframes in style tag */}
      <style jsx>{`
        @keyframes runningCards {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-running-cards {
          animation: runningCards 30s linear infinite;
        }
        .animate-pause {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Leadership;