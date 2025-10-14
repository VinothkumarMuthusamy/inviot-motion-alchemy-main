"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Linkedin, Twitter, Mail, MapPin, Phone, ArrowUp, Sparkles, InstagramIcon } from "lucide-react";
import { solutions } from "@/app/solutions/solutions-data";

const Footer = () => {
  const [year, setYear] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
    setYear(new Date().getFullYear());
    
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const scrollToContact = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };
  
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const id = href.substring(2);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = href;
      }
    } else if (href === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!isMounted) {
    return (
      <footer className="bg-gradient-to-b from-background to-background/95 border-t border-border/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"></div>
        <div className="py-4 relative z-10">
          <div className="container-max text-center text-foreground/60 text-sm">
            <p>
              &copy; {new Date().getFullYear()} Inviot AV Solutions Pvt. Ltd. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-gradient-to-b from-background to-background/95 border-t border-border/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"></div>
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary/5"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 15 + 8}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.5; }
          50% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) rotate(${Math.random() * 5 - 2.5}deg); opacity: 0.3; }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          50% { opacity: 1; transform: scale(1) rotate(180deg); }
        }
        .hover-sparkle:hover .sparkle-icon {
          animation: sparkle 0.6s ease-out;
        }
      `}</style>

      <div className="container-max py-8 md:py-12 relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="flex flex-col gap-4 items-start col-span-2 sm:col-span-1 lg:col-span-1">
            <Link 
              href="/" 
              className="font-headline text-2xl font-black text-secondary uppercase tracking-widest relative group"
              onClick={(e) => handleLinkClick(e, "/")}
            >
              <Image
                src="/assets/inviot-logo.svg"
                alt="Inviot Logo"
                width={100}
                height={30}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-foreground/70 text-sm">
              Empowering collaboration through innovative audiovisual integration.
            </p>
            <div className="flex gap-2 mt-1">
              <Link 
                href="https://www.linkedin.com/company/inviot-av-solutions" 
                className="text-foreground/60 hover:text-primary transition-colors p-1.5 rounded-full bg-background/60 hover:bg-primary/5 hover-sparkle relative"
                onMouseEnter={() => setHoveredItem('linkedin')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Linkedin size={16} />
                {hoveredItem === 'linkedin' && (
                  <Sparkles size={8} className="sparkle-icon absolute -top-0.5 -right-0.5 text-primary" />
                )}
              </Link>
              <Link 
                href="https://x.com/inviotav" 
                className="text-foreground/60 hover:text-primary transition-colors p-1.5 rounded-full bg-background/60 hover:bg-primary/5 hover-sparkle relative"
                onMouseEnter={() => setHoveredItem('twitter')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Twitter size={16} />
                {hoveredItem === 'twitter' && (
                  <Sparkles size={8} className="sparkle-icon absolute -top-0.5 -right-0.5 text-primary" />
                )}
              </Link>
              <Link 
                href="https://www.facebook.com/Inviotavsolutions" 
                className="text-foreground/60 hover:text-primary transition-colors p-1.5 rounded-full bg-background/60 hover:bg-primary/5 hover-sparkle relative"
                onMouseEnter={() => setHoveredItem('facebook')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Facebook size={16} />
                {hoveredItem === 'facebook' && (
                  <Sparkles size={8} className="sparkle-icon absolute -top-0.5 -right-0.5 text-primary" />
                )}
              </Link>
              <Link 
                href="https://www.instagram.com/inviotavsolutions" 
                className="text-foreground/60 hover:text-primary transition-colors p-1.5 rounded-full bg-background/60 hover:bg-primary/5 hover-sparkle relative"
                onMouseEnter={() => setHoveredItem('instagram')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <InstagramIcon size={16} />
                {hoveredItem === 'instagram' && (
                  <Sparkles size={8} className="sparkle-icon absolute -top-0.5 -right-0.5 text-primary" />
                )}
              </Link>
            </div>
          </div>

          <div className="col-span-1">
            <h4 className="font-headline text-lg text-primary mb-3 flex items-center">
              Quick Links
              <span className="h-px flex-1 bg-primary/10 ml-2"></span>
            </h4>
            <ul className="space-y-2">
              {['About Us', 'Solutions', 'Blogs', 'Room configurator', 'Contact Us'].map((item, index) => (
                <li key={item}>
                  <Link 
                    href={index === 0 ? "/#aboutus" : index === 1 ? "/#solutions" : index === 4 ? "#contact" : `/${item.toLowerCase().replace(/ /g, '-')}`} 
                    onClick={(e) => index === 4 ? scrollToContact(e) : index < 2 ? handleLinkClick(e, `/#${item.toLowerCase().replace(' ', '')}`) : undefined}
                    className="text-foreground/60 hover:text-primary transition-colors flex items-center group text-sm"
                    onMouseEnter={() => setHoveredItem(`quick-${index}`)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <span className={`h-0.5 w-2 bg-primary/0 group-hover:bg-primary/40 transition-all duration-300 mr-1.5 ${hoveredItem === `quick-${index}` ? 'w-4' : ''}`}></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-headline text-lg text-primary mb-3 flex items-center">
              Solutions
              <span className="h-px flex-1 bg-primary/10 ml-2"></span>
            </h4>
            <ul className="space-y-2">
              {solutions.slice(0, 4).map((solution, index) => (
                <li key={solution.slug}>
                  <Link 
                    href={`/solutions/${solution.slug}`} 
                    className="text-foreground/60 hover:text-primary transition-colors flex items-center group text-sm"
                    onMouseEnter={() => setHoveredItem(`solution-${index}`)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <span className={`h-0.5 w-2 bg-primary/0 group-hover:bg-primary/40 transition-all duration-300 mr-1.5 ${hoveredItem === `solution-${index}` ? 'w-4' : ''}`}></span>
                    {solution.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  href="/#solutions" 
                  onClick={(e) => handleLinkClick(e, "/#solutions")} 
                  className="text-foreground/60 hover:text-primary transition-colors flex items-center font-medium mt-1 text-sm"
                >
                  <span className="h-0.5 w-4 bg-primary/40 mr-1.5"></span>
                  ...and more
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1 lg:col-span-1">
            <h4 className="font-headline text-lg text-primary mb-3 flex items-center">
              Get In Touch
              <span className="h-px flex-1 bg-primary/10 ml-2"></span>
            </h4>
            <ul className="space-y-3">
              <li className="text-foreground/60 flex items-start text-sm">
                <MapPin size={16} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                <span>1233, New Tippasandra, Bengaluru, Karnataka 560075</span>
              </li>
              <li className="text-foreground/60 flex items-center text-sm">
                <Mail size={14} className="text-primary mr-2 flex-shrink-0" />
                <a href="mailto:info@inviotav.com" className="hover:text-primary transition-colors">info@inviotav.com</a>
              </li>
              <li className="text-foreground/60 flex items-center text-sm">
                <Phone size={14} className="text-primary mr-2 flex-shrink-0" />
                <a href="tel:+919513800036" className="hover:text-primary transition-colors">+91 9513 800 036</a>
              </li>
            </ul>
            
            <Button 
              className="mt-4 w-full bg-primary hover:bg-primary/90 transition-all duration-300 text-sm py-2 h-auto"
              onClick={scrollToContact}
              size="sm"
            >
              Contact Us
            </Button>
          </div>
          
        </div>
      </div>
      
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-primary text-white p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp size={16} />
        </button>
      )}
      
      <div className="border-t border-border/40 py-4 relative z-10">
        <div className="container-max flex flex-col md:flex-row justify-between items-center gap-2 text-foreground/50 text-xs text-center md:text-left">
          <p>
            &copy; {year ?? ""} Inviot AV Solutions Pvt. Ltd. All Rights Reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
