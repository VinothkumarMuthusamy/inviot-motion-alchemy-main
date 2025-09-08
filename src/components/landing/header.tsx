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
import { Menu, Phone, Mail, HelpCircle } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
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
  { name: "Control Rooms", href: "/solutions/control-rooms" },
];

const navLinks = [{ name: "Home", href: "/#hero" }];

const remainingNavLinks = [
  { name: "Room configurator", href: "/room-configurator" },
  { name: "Blogs", href: "/blogs" },
  { name: "About Us", href: "/about-us" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHoveringNav, setIsHoveringNav] = useState(false);

  // Throttle scroll handler
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    // Passive event listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Custom navigation menu trigger style without the white box
  const customMenuTriggerStyle =
    "bg-transparent hover:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent p-1";

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
              "text-foreground hover:text-[#9B1B5C] font-bold transition-colors hover:underline p-2",
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

  const remainingDesktopNavItems = useMemo(
    () =>
      remainingNavLinks.map((link) => (
        <NavigationMenuItem key={link.name}>
          <NavigationMenuLink
            href={link.href}
            onMouseEnter={() => setIsHoveringNav(true)}
            onMouseLeave={() => setIsHoveringNav(false)}
            className={cn(
              "text-foreground hover:text-[#9B1B5C] font-bold transition-colors hover:underline p-2",
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

  const mobileNavItems = useMemo(
    () =>
      navLinks.map((link) => (
        <SheetClose asChild key={link.name}>
          <Link
            href={link.href}
            onClick={(e) => handleSheetLinkClick(e, link.href)}
            className="text-xl font-headline text-foreground hover:text-[#9B1B5C] font-bold transition-colors hover:underline p-2 block"
          >
            {link.name}
          </Link>
        </SheetClose>
      )),
    []
  );

  const remainingMobileNavItems = useMemo(
    () =>
      remainingNavLinks.map((link) => (
        <SheetClose asChild key={link.name}>
          <Link
            href={link.href}
            onMouseEnter={() => setIsHoveringNav(true)}
            onMouseLeave={() => setIsHoveringNav(false)}
            onClick={() => setMobileMenuOpen(false)}
            className="text-xl font-headline text-foreground hover:text-[#9B1B5C] font-bold transition-colors hover:underline p-2 block"
          >
            {link.name}
          </Link>
        </SheetClose>
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

  return (
    <>
      <TopBar />
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-2 transition-all duration-300",
          scrolled || mobileMenuOpen || isHoveringNav
            ? "bg-white backdrop-blur-sm shadow-md"
            : "bg-transparent"
        )}
        style={{ top: scrolled ? 0 : "1.75rem" }} // Adjust header position based on top bar visibility
      >
        <div className="container-max flex items-center justify-between">
          {/* Logo with SVG image */}
          <Link
            href="/"
            className="flex items-center gap-2"
            prefetch={false}
            onMouseEnter={() => setIsHoveringNav(true)}
            onMouseLeave={() => setIsHoveringNav(false)}
          >
            <Image
              src="/assets/inviot-logo.svg"
              alt="Inviot Logo"
              width={100}
              height={30}
              className="h-6 w-auto"
            />
          </Link>
          {/* <div className="flex flex-col">
            <span
              className={cn(
                "font-headline text-2xl font-black uppercase tracking-widest transition-colors duration-300 text-black",
                isHoveringNav ? "text-[#9B1B5C]" : "text-black"
              )}
            >
              Inviot
            </span>
            <span className="text-xs font-medium text-gray-600 -mt-1">
              AV Solutions
            </span>
          </div> */}

          {/* Desktop Menu */}
          <div
            className="hidden lg:flex items-center gap-4"
            onMouseEnter={() => setIsHoveringNav(true)}
            onMouseLeave={() => setIsHoveringNav(false)}
          >
            <NavigationMenu>
              <NavigationMenuList className="flex items-center gap-2">
                {desktopNavItems}

                {/* Solutions Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      "text-foreground hover:text-[#9B1B5C] font-bold transition-colors hover:underline data-[state=open]:text-[#9B1B5C] p-2",
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
                            className="block rounded-md p-2 hover:bg-accent hover:text-accent-foreground transition"
                            prefetch={false}
                          >
                            {solution.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {remainingDesktopNavItems}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Contact Us Button - Now links to contact page */}
            <Link href="/contact-us" passHref>
              <Button
                size="sm"
                className="font-headline btn-glow"
                onMouseEnter={() => setIsHoveringNav(true)}
                onMouseLeave={() => setIsHoveringNav(false)}
              >
                Contact Us
              </Button>
            </Link>
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
                <div className="flex flex-col h-full">
                  <div className="flex-grow mt-8">
                    <nav className="flex flex-col space-y-4">
                      {mobileNavItems}

                      {/* Mobile Solutions Link with Room Configurator */}
                      <SheetClose asChild>
                        <Link
                          href="/solutions"
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-xl font-headline text-foreground hover:text-[#9B1B5C] transition-colors hover:underline p-2 block"
                          prefetch={false}
                        >
                          Solutions
                        </Link>
                      </SheetClose>

                      {/* Mobile Room Configurator Link */}
                      <SheetClose asChild>
                        <Link
                          href="/solutions/room-configurator"
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-xl font-headline text-foreground hover:text-[#9B1B5C] transition-colors hover:underline p-2 block"
                          prefetch={false}
                        >
                          Room Configurator
                        </Link>
                      </SheetClose>

                      {remainingMobileNavItems}
                    </nav>
                  </div>
                  {/* Mobile Contact Us Button - Now links to contact page */}
                  <SheetClose asChild>
                    <Link href="/contact-us" passHref>
                      <Button
                        className="font-headline btn-glow mt-auto w-full"
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
