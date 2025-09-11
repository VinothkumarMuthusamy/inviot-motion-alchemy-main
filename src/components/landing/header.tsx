"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState, useCallback, useMemo } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
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
import logoImage from "@/image/logo.png";

// Top Bar Component
const TopBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
            <Phone size={12} /> <span>+91 95138 00036</span>
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
  { name: "Home", href: "/#hero" },
  { name: "Room configurator", href: "/room-configurator" },
  { name: "Blogs", href: "/blogs" },
  { name: "About Us", href: "/about-us" }
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHoveringNav, setIsHoveringNav] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);

  // Throttle scroll handler
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    // Passive event listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Memoize navigation items to prevent unnecessary re-renders
  const desktopNavItems = useMemo(
    () =>
      navLinks.map((link) => (
        <NavigationMenuItem key={link.name}>
          <NavigationMenuLink
            href={link.href}
            onMouseEnter={() => setIsHoveringNav(true)}
            onMouseLeave={() => setIsHoveringNav(false)}
            onClick={(e) => handleLinkClick(e as any, link.href)}
            className={cn(
              "text-foreground hover:text-[#9B1B5C] font-bold transition-colors hover:underline p-2 text-base",
              // Remove all background styles
              "bg-transparent hover:bg-transparent focus:bg-transparent"
            )}
          >
            {link.name}
          </NavigationMenuLink>
        </NavigationMenuItem>
      )),
    []
  );

  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
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
    },
    []
  );

  const handleSheetLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      handleLinkClick(e, href);
      setMobileMenuOpen(false);
    },
    [handleLinkClick]
  );

  // Determine if header has white background
  const hasWhiteBg = scrolled || mobileMenuOpen || isHoveringNav;

  return (
    <>
      <TopBar />
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-2 transition-all duration-300",
          hasWhiteBg
            ? "bg-white backdrop-blur-sm shadow-md"
            : "bg-transparent"
        )}
        style={{ top: scrolled ? 0 : "1.75rem" }} // Adjust header position based on top bar visibility
      >
        <div className="container-max flex items-center justify-between">
          {/* Logo - Use PNG when header has white background, SVG when transparent */}
          <Link
            href="/"
            className="flex items-center gap-2"
            prefetch={false}
            onMouseEnter={() => setIsHoveringNav(true)}
            onMouseLeave={() => setIsHoveringNav(false)}
          >
            {hasWhiteBg ? (
              <Image
                src="/assets/inviot-logo.svg"
                alt="Inviot Logo"
                width={120}
                height={30}
                className="h-8 w-auto"
              />
            ) : (
              <Image
                src="/assets/Inviot_Logo.png"
                alt="Inviot Logo"
                width={100}
                height={30}
                className="h-6 w-auto"
              />
            )}
          </Link>

          {/* Desktop Menu */}
          <div
            className="hidden lg:flex items-center gap-4"
            onMouseEnter={() => setIsHoveringNav(true)}
            onMouseLeave={() => setIsHoveringNav(false)}
          >
            <NavigationMenu>
              <NavigationMenuList className="flex items-center gap-2">
                {/* Home Link */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/#hero"
                    onMouseEnter={() => setIsHoveringNav(true)}
                    onMouseLeave={() => setIsHoveringNav(false)}
                    onClick={(e) => handleLinkClick(e as any, "/#hero")}
                    className={cn(
                      "text-foreground hover:text-[#9B1B5C] font-bold transition-colors hover:underline p-2 text-base",
                      // Remove all background styles
                      "bg-transparent hover:bg-transparent focus:bg-transparent"
                    )}
                  >
                    Home
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Solutions Dropdown - Placed right after Home */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      "text-foreground hover:text-[#9B1B5C] font-bold transition-colors hover:underline data-[state=open]:text-[#9B1B5C] p-2 text-base",
                      // Remove all background styles
                      "bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent"
                    )}
                    onMouseEnter={() => setIsHoveringNav(true)}
                    onMouseLeave={() => setIsHoveringNav(false)}
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

                {/* Other navigation links */}
                {navLinks.filter(link => link.name !== "Home").map((link) => (
                  <NavigationMenuItem key={link.name}>
                    <NavigationMenuLink
                      href={link.href}
                      onMouseEnter={() => setIsHoveringNav(true)}
                      onMouseLeave={() => setIsHoveringNav(false)}
                      onClick={(e) => handleLinkClick(e as any, link.href)}
                      className={cn(
                        "text-foreground hover:text-[#9B1B5C] font-bold transition-colors hover:underline p-2 text-base",
                        // Remove all background styles
                        "bg-transparent hover:bg-transparent focus:bg-transparent"
                      )}
                    >
                      {link.name}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}

                {/* Contact Us Button - Now links to contact page */}
                <Link href="/contact-us" passHref>
                  <Button
                    size="sm"
                    className="font-headline btn-glow text-base"
                    onMouseEnter={() => setIsHoveringNav(true)}
                    onMouseLeave={() => setIsHoveringNav(false)}
                  >
                    Contact Us
                  </Button>
                </Link>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  onMouseEnter={() => setIsHoveringNav(true)}
                  onMouseLeave={() => setIsHoveringNav(false)}
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[400px] bg-background/90 backdrop-blur-sm"
              >
                {/* Add SheetTitle for accessibility */}
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                
                <div className="flex flex-col h-full">
                  <div className="flex-grow mt-8">
                    <nav className="flex flex-col space-y-4">
                      {/* Home Link */}
                      <SheetClose asChild>
                        <Link
                          href="/#hero"
                          onClick={(e) => handleSheetLinkClick(e, "/#hero")}
                          className="text-lg font-bold text-foreground hover:text-[#9B1B5C] transition-colors hover:underline p-2 block"
                        >
                          Home
                        </Link>
                      </SheetClose>

                      {/* Mobile Solutions Dropdown */}
                      <div className="flex flex-col">
                        <button
                          onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                          className="flex items-center justify-between text-lg font-bold text-foreground hover:text-[#9B1B5C] transition-colors hover:underline p-2"
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
                                  className="text-lg font-bold text-foreground hover:text-[#9B1B5C] transition-colors hover:underline p-2 block"
                                  prefetch={false}
                                >
                                  {solution.name}
                                </Link>
                              </SheetClose>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Other navigation links */}
                      {navLinks.filter(link => link.name !== "Home").map((link) => (
                        <SheetClose asChild key={link.name}>
                          <Link
                            href={link.href}
                            onClick={(e) => handleSheetLinkClick(e, link.href)}
                            className="text-lg font-bold text-foreground hover:text-[#9B1B5C] transition-colors hover:underline p-2 block"
                          >
                            {link.name}
                          </Link>
                        </SheetClose>
                      ))}
                    </nav>
                  </div>
                  {/* Mobile Contact Us Button - Now links to contact page */}
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