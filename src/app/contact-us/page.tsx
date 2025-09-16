"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import dynamic from "next/dynamic";
import Header from "@/components/landing/header";
import Footer from "@/components/landing/footer";

// Dynamically import the map component to avoid SSR issues
const MapWithNoSSR = dynamic(() => import("@/components/ui/map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full rounded-lg bg-muted flex items-center justify-center">
      <div className="text-muted-foreground">Loading map...</div>
    </div>
  ),
});

const Toaster = dynamic(
  () => import("@/components/ui/toaster").then((c) => c.Toaster),
  { ssr: false }
);

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  company: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

const locations = [
  {
    id: 1,
    name: "Bengaluru (HQ)",
    address: "1233, 3rd Cross Road, Bhoomi Reddy Colony, HAL 3rd Stage, New Tippasandra, Bengaluru, Karnataka 560075",
    coordinates: [12.9716, 77.5946] as [number, number]
  },
  {
    id: 2,
    name: "Hyderabad",
    address: "MYM Estate, Thakur Mansion Ln, Somajiguda, Hyderabad, Telangana 500082",
    coordinates: [17.3850, 78.4867] as [number, number]
  },
  {
    id: 3,
    name: "Ernakulam",
    address: "Door No.40/3246-C, 9th Floor, S.L Plaza, Palarivattom, Ernakulam, Kerala 682025",
    coordinates: [9.9312, 76.2673] as [number, number]
  },
  {
    id: 4,
    name: "Dubai",
    address: "Office Suit 2401, Tiffany Tower, Cluster W, Jumeirah Lake Towers DMCC, Dubai, United Arab Emirates. PO Box 117362",
    coordinates: [25.0760, 55.1320] as [number, number]
  }
];

// Airplane animation component
const Airplane = ({ animation, delay }: { animation: string; delay: string }) => (
  <div className="airplane-container" style={{ animationName: animation, animationDelay: delay }}>
    <svg className="airplane-svg" width="50" height="50" viewBox="0 0 100 100">
      <path d="M99 49.5L1 99L20 49.5L1 0L99 49.5Z" fill="white" />
    </svg>
    <div className="smoke-trail" style={{ animationDelay: delay }}></div>
  </div>
);

// CSS for airplane animations (should be added to your global CSS)
const airplaneStyles = `
  @keyframes fly-path-1 {
    0% { transform: translate(-100px, 100px) rotate(10deg); opacity: 0; }
    10% { opacity: 0.8; }
    90% { opacity: 0.6; }
    100% { transform: translate(calc(100vw + 100px), -100px) rotate(30deg); opacity: 0; }
  }
  
  @keyframes fly-path-2 {
    0% { transform: translate(calc(100vw + 100px), 150px) rotate(-10deg); opacity: 0; }
    10% { opacity: 0.7; }
    90% { opacity: 0.5; }
    100% { transform: translate(-100px, -150px) rotate(-30deg); opacity: 0; }
  }
  
  .airplane-container {
    position: absolute;
    animation-duration: 20s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    z-index: 1;
  }
  
  .smoke-trail {
    position: absolute;
    width: 20px;
    height: 5px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    filter: blur(3px);
    animation: smoke 2s infinite;
  }
  
  @keyframes smoke {
    0% { transform: translateX(0) scale(1); opacity: 0.7; }
    100% { transform: translateX(30px) scale(2); opacity: 0; }
  }
`;

const ContactPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

  useEffect(() => {
    setIsMounted(true);
    // Add airplane styles to document
    const styleSheet = document.createElement("style")
    styleSheet.innerText = airplaneStyles
    document.head.appendChild(styleSheet)
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      company: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We will get back to you shortly.",
    });
    form.reset();
  }

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-primary">
      <Header />
      <main className="flex-grow pt-20 bg-primary">
        <section id="contact" className="py-12 relative overflow-hidden">
          {/* Airplane animations in background */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Airplane animation="fly-path-1" delay="0s" />
            <Airplane animation="fly-path-2" delay="7.5s" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            {/* Page Title and Description with animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white">GET IN TOUCH</h2>
              <p className="mt-4 max-w-2xl mx-auto text-primary-foreground/80">
                With our expertise and experience, we can help you create an environment where everyone feels empowered and engaged in their work.
              </p>
            </motion.div>

            {/* Send Us a Message Form - First Section with animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <Card className="bg-white border-primary/20 p-6 md:p-8 shadow-xl max-w-4xl mx-auto">
                <CardContent className="p-0">
                  <h3 className="heading-3 text-center text-primary mb-6">Send Us a Message</h3>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-black font-bold text-base">Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Your Name" 
                                  {...field} 
                                  className="bg-background border-border/50 placeholder:text-muted-foreground focus:border-primary" 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-black font-bold text-base">Email Address</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Your Email" 
                                  {...field} 
                                  className="bg-background border-border/50 placeholder:text-muted-foreground focus:border-primary" 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-black font-bold text-base">Phone</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Your Phone" 
                                  {...field} 
                                  className="bg-background border-border/50 placeholder:text-muted-foreground focus:border-primary" 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-black font-bold text-base">Company (Optional)</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Your Company" 
                                  {...field} 
                                  className="bg-background border-border/50 placeholder:text-muted-foreground focus:border-primary" 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-black font-bold text-base">Message</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Your Message" 
                                {...field} 
                                className="bg-background border-border/50 placeholder:text-muted-foreground focus:border-primary min-h-[120px]" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="font-headline w-full shadow-md btn-glow bg-primary hover:bg-primary/90 text-white" size="lg">
                        Send Message
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Map and Address Section - Map on Right, Address on Left with animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
            >
              {/* Address Card - Left Side (Smaller) */}
              <motion.div 
                className="lg:col-span-1"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white border-primary/20 shadow-xl h-full">
                  <CardContent className="p-5">
                    <h3 className="heading-3 text-primary mb-5">Our Offices</h3>
                    
                    <div className="space-y-4 mb-6">
                      {locations.map(location => (
                        <motion.div 
                          key={location.id}
                          className={`p-3 rounded-lg cursor-pointer transition-all ${
                            selectedLocation.id === location.id 
                              ? "bg-primary/20 border border-primary" 
                              : "bg-background/50 border border-border hover:bg-primary/10"
                          }`}
                          onClick={() => setSelectedLocation(location)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                            <div>
                              <h4 className="font-semibold text-gray-900 text-sm">{location.name}</h4>
                              <p className="text-muted-foreground text-xs mt-1">{location.address}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="pt-4 border-t border-border">
                      <div className="space-y-4">
                        <motion.a 
                          href="tel:+919513800036" 
                          className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                          whileHover={{ x: 5 }}
                        >
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Phone className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">Phone</p>
                            <p className="text-muted-foreground text-sm">+91 9513 800 036</p>
                          </div>
                        </motion.a>
                        <motion.a 
                          href="mailto:info@inviotav.com" 
                          className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                          whileHover={{ x: 5 }}
                        >
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Mail className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">Email</p>
                            <p className="text-muted-foreground text-sm">info@inviotav.com</p>
                          </div>
                        </motion.a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Map - Right Side (Larger) */}
              <motion.div 
                className="lg:col-span-2"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="bg-white border-primary/20 shadow-xl p-1 h-full rounded-lg">
                  <div className="h-full rounded-lg overflow-hidden">
                    <MapWithNoSSR 
                      locations={locations} 
                      selectedLocation={selectedLocation}
                      onLocationSelect={setSelectedLocation}
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
        <Toaster />
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;