"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, Phone, Mail, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";
import Image from "next/image";

// Top Bar Component
const TopBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    let ticking = false;
    const scrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollHandler, { passive: true });
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  if (scrolled) return null;

  return (
    <div className="w-full bg-pink-600 py-1.5 text-xs">
      <div className="container-max flex flex-col sm:flex-row justify-between items-center gap-1 sm:gap-0">
        <div className="text-white font-medium">
          Offices: Bengaluru • Kochi • Hyderabad • Dubai
        </div>
        <div className="flex flex-wrap justify-center items-center gap-3 text-white">
          <a
            href="tel:+919513800036"
            className="flex items-center gap-1 hover:text-gray-200 transition-colors"
          >
            <Phone size={12} /> <span>+91 9513800036</span>
          </a>
          <span className="hidden sm:inline">|</span>
          <a
            href="mailto:info@inviotav.com"
            className="flex items-center gap-1 hover:text-gray-200 transition-colors"
          >
            <Mail size={12} /> <span>info@inviotav.com</span>
          </a>
          <span className="hidden sm:inline">|</span>
          <a
            href="mailto:support@inviotav.com"
            className="flex items-center gap-1 hover:text-gray-200 transition-colors"
          >
            <HelpCircle size={12} /> <span>Support</span>
          </a>
        </div>
      </div>
    </div>
  );
};

const solutions = [
  {
    name: "Audio and Video Collaboration",
    href: "/solutions/audio-video-collaboration",
  },
  { name: "Digital Signage", href: "/solutions/digital-signage" },
  { name: "Digital Classrooms", href: "/solutions/digital-classrooms" },
  { name: "Experience Centres", href: "/solutions/experience-centres" },
  { name: "Meeting Rooms", href: "/solutions/meeting-rooms" },
  { name: "Monitoring Centres", href: "/solutions/monitoring-centres" },
];

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Room configurator", href: "/room-configurator" },
  { name: "About Us", href: "/about-us" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHoveringNav, setIsHoveringNav] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  const handleScroll = useCallback(() => {
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    
    scrollTimeout.current = setTimeout(() => {
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 10);
      });
    }, 10);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [handleScroll]);

  const hasWhiteBg = scrolled || mobileMenuOpen || isHoveringNav;

  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (href.startsWith("/#")) {
        e.preventDefault();
        if (pathname === '/') {
          const id = href.substring(2);
          const element = document.getElementById(id);
          if (element) {
            const headerHeight = document.querySelector('header')?.offsetHeight || 0;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerHeight;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            });
          }
        } else {
          window.location.href = href;
        }
      } else if (href === "/") {
        e.preventDefault();
        if (pathname === '/') {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          window.location.href = '/';
        }
      }
    },
    [pathname]
  );

  const handleSheetLinkClick = useCallback(
    (href: string) => {
      if (href.startsWith("/#")) {
        if (pathname === '/') {
          const id = href.substring(2);
          const element = document.getElementById(id);
          if (element) {
             const headerHeight = document.querySelector('header')?.offsetHeight || 0;
             const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
             const offsetPosition = elementPosition - headerHeight;
             window.scrollTo({top: offsetPosition, behavior: "smooth"});
          }
        } else {
          window.location.href = href;
        }
      } else if (href === "/") {
        if (pathname === '/') {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          window.location.href = '/';
        }
      }
      setMobileMenuOpen(false);
    },
    [pathname]
  );

  const isLinkActive = (href: string) => {
    if (href === '/') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };
  
  const isSolutionsActive = pathname.startsWith('/solutions');


  return (
    <>
      <div className={cn("fixed top-0 left-0 w-full z-50 transition-transform duration-300", scrolled ? "-translate-y-full" : "translate-y-0")}>
        <TopBar />
      </div>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 flex items-center justify-between p-2 transition-all duration-300",
          hasWhiteBg
            ? "bg-white backdrop-blur-sm shadow-md"
            : "bg-transparent",
          scrolled ? "top-0" : "top-[30px]"
        )}
      >
        <div className="container-max flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2"
            prefetch={false}
            onMouseEnter={() => setIsHoveringNav(true)}
            onMouseLeave={() => setIsHoveringNav(false)}
             onClick={(e) => handleLinkClick(e, "/")}
          >
            <div className="relative h-8 w-[120px] transition-opacity duration-300">
              <div className={cn(
                "absolute inset-0 transition-opacity duration-300",
                hasWhiteBg ? "opacity-0" : "opacity-100"
              )}>
                <Image
                  src="/assets/whitelogof.svg"
                  alt="Inviot Logo"
                  width={120}
                  height={32}
                  className="h-6 w-auto"
                />
              </div>
              <div className={cn(
                "absolute inset-0 transition-opacity duration-300",
                hasWhiteBg ? "opacity-100" : "opacity-0"
              )}>
                <Image
                  src="/assets/inviot-logo.svg"
                  alt="Inviot Logo"
                  width={120}
                  height={32}
                  className="h-8 w-auto"
                />
              </div>
            </div>
          </Link>

          <div
            className="hidden lg:flex items-center gap-4"
            onMouseEnter={() => setIsHoveringNav(true)}
            onMouseLeave={() => setIsHoveringNav(false)}
          >
            <NavigationMenu>
              <NavigationMenuList className="flex items-center gap-2">
                
                {navLinks.filter(l => l.name === 'Home').map((link) => (
                  <NavigationMenuItem key={link.name}>
                    <NavigationMenuLink
                      asChild
                      active={isLinkActive(link.href)}
                    >
                      <Link
                        href={link.href}
                        onClick={(e) => link.href.includes('#') || link.href === '/' ? handleLinkClick(e, link.href) : undefined}
                        className={cn(
                           "font-bold transition-colors p-2 text-base bg-transparent hover:bg-transparent focus:bg-transparent",
                          isLinkActive(link.href)
                            ? 'text-primary' 
                            : hasWhiteBg
                              ? "text-foreground hover:text-primary"
                              : "text-white hover:text-gray-200"
                        )}
                      >
                        {link.name}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}

                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      "font-bold transition-colors p-2 text-base bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent",
                      isSolutionsActive
                        ? "text-primary"
                        : hasWhiteBg 
                          ? "text-foreground hover:text-primary data-[state=open]:text-primary" 
                          : "text-white hover:text-gray-200 data-[state=open]:text-gray-200"
                    )}
                  >
                    Solutions
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-[300px]">
                      {solutions.map((solution) => (
                        <li key={solution.name}>
                          <Link
                            href={solution.href}
                            className="block rounded-md p-2 hover:bg-accent hover:text-accent-foreground transition text-base"
                            prefetch={false}
                          >
                            {solution.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                {navLinks.filter(l => l.name !== 'Home').map((link) => (
                  <NavigationMenuItem key={link.name}>
                    <NavigationMenuLink
                      asChild
                      active={isLinkActive(link.href)}
                    >
                      <Link
                        href={link.href}
                        onClick={(e) => link.href.includes('#') || link.href === '/' ? handleLinkClick(e, link.href) : undefined}
                        className={cn(
                           "font-bold transition-colors p-2 text-base bg-transparent hover:bg-transparent focus:bg-transparent",
                          isLinkActive(link.href)
                            ? 'text-primary' 
                            : hasWhiteBg
                              ? "text-foreground hover:text-primary"
                              : "text-white hover:text-gray-200"
                        )}
                      >
                        {link.name}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}

                <Link href="/contact-us" passHref>
                  <Button
                    size="sm"
                    className={cn(
                      "font-headline btn-glow text-base",
                       isLinkActive('/contact-us') ? 'bg-primary/80' : ''
                    )}
                  >
                    Contact Us
                  </Button>
                </Link>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="lg:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className={cn(
                    hasWhiteBg 
                      ? "text-foreground" 
                      : "text-white"
                  )}
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[400px] bg-background/90 backdrop-blur-sm"
              >
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                
                <div className="flex flex-col h-full">
                  <div className="flex-grow mt-8">
                    <nav className="flex flex-col space-y-4">
                      {navLinks.filter(l => l.name === 'Home').map((link) => (
                        <SheetClose asChild key={link.name}>
                          <Link
                            href={link.href}
                            onClick={() => handleSheetLinkClick(link.href)}
                            className={cn(
                              "text-lg font-bold transition-colors p-2 block",
                              isLinkActive(link.href) ? 'text-primary' : 'text-foreground hover:text-primary'
                            )}
                          >
                            {link.name}
                          </Link>
                        </SheetClose>
                      ))}

                      <div className="flex flex-col">
                        <button
                          onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                          className={cn(
                            "flex items-center justify-between text-lg font-bold transition-colors p-2",
                            isSolutionsActive ? 'text-primary' : 'text-foreground hover:text-primary'
                          )}
                        >
                          Solutions
                          {mobileSolutionsOpen ? (
                            <ChevronUp size={16} />
                          ) : (
                            <ChevronDown size={16} />
                          )}
                        </button>
                        
                        {mobileSolutionsOpen && (
                          <div className="pl-4 mt-2 space-y-3">
                            {solutions.map((solution) => (
                              <SheetClose asChild key={solution.name}>
                                <Link
                                  href={solution.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className={cn(
                                    "text-base font-bold transition-colors p-2 block",
                                    pathname === solution.href ? 'text-primary' : 'text-foreground hover:text-primary'
                                  )}
                                  prefetch={false}
                                >
                                  {solution.name}
                                </Link>
                              </SheetClose>
                            ))}
                          </div>
                        )}
                      </div>

                      {navLinks.filter(l => l.name !== 'Home').map((link) => (
                        <SheetClose asChild key={link.name}>
                          <Link
                            href={link.href}
                            onClick={() => handleSheetLinkClick(link.href)}
                            className={cn(
                              "text-lg font-bold transition-colors p-2 block",
                              isLinkActive(link.href) ? 'text-primary' : 'text-foreground hover:text-primary'
                            )}
                          >
                            {link.name}
                          </Link>
                        </SheetClose>
                      ))}
                    </nav>
                  </div>
                  <SheetClose asChild>
                    <Link href="/contact-us" passHref>
                      <Button
                        className="font-headline btn-glow mt-auto w-full text-lg font-bold"
                        size="lg"
                      >
                        Contact Us
                      </Button>
                    </Link>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;