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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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

const Airplane = ({ animation, delay }: { animation: string; delay: string }) => (
  <div className="airplane-container" style={{ animationName: animation, animationDelay: delay }}>
    <svg className="airplane-svg" width="50" height="50" viewBox="0 0 100 100">
      <path d="M99 49.5L1 99L20 49.5L1 0L99 49.5Z" fill="white" />
    </svg>
    <div className="smoke-trail" style={{ animationDelay: delay }}></div>
  </div>
);

const ContactPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

  useEffect(() => {
    setIsMounted(true);
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
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20">
        <section 
          id="contact" 
          className="section-padding bg-primary relative overflow-hidden"
        >
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Airplane animation="fly-path-1" delay="0s" />
            <Airplane animation="fly-path-2" delay="7.5s" />
          </div>
          <div className="container-max relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="heading-2 text-white">GET IN TOUCH</h2>
              <p className="mt-4 max-w-2xl mx-auto text-primary-foreground/80">
                With our expertise and experience, we can help you create an environment where everyone feels empowered and engaged in their work.
              </p>
            </motion.div>

            {/* Map Section at the Top */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-12 relative rounded-lg h-[400px] w-full bg-background/90 border border-primary/20 shadow-xl backdrop-blur-sm overflow-hidden"
            >
              <MapWithNoSSR 
                locations={locations} 
                selectedLocation={selectedLocation}
                onLocationSelect={setSelectedLocation}
              />
            </motion.div>

            <div className="mt-12 grid lg:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="w-full"
              >
                <Card className="bg-background/95 border-primary/20 p-6 sm:p-8 h-full shadow-xl backdrop-blur-sm w-full">
                  <CardContent className="p-0 w-full">
                    <h3 className="heading-3 text-center text-primary mb-6">Send Us a Message</h3>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel className="text-black font-bold text-base">Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Your Name" 
                                  {...field} 
                                  className="bg-background border-border/50 placeholder:text-muted-foreground focus:border-primary w-full" 
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
                            <FormItem className="w-full">
                              <FormLabel className="text-black font-bold text-base">Email Address</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Your Email" 
                                  {...field} 
                                  className="bg-background border-border/50 placeholder:text-muted-foreground focus:border-primary w-full" 
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
                            <FormItem className="w-full">
                              <FormLabel className="text-black font-bold text-base">Phone</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Your Phone" 
                                  {...field} 
                                  className="bg-background border-border/50 placeholder:text-muted-foreground focus:border-primary w-full" 
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
                            <FormItem className="w-full">
                              <FormLabel className="text-black font-bold text-base">Company (Optional)</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Your Company" 
                                  {...field} 
                                  className="bg-background border-border/50 placeholder:text-muted-foreground focus:border-primary w-full" 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel className="text-black font-bold text-base">Message</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Your Message" 
                                  {...field} 
                                  className="bg-background border-border/50 placeholder:text-muted-foreground focus:border-primary w-full min-h-[120px]" 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className="font-headline w-full shadow-md btn-glow" size="lg">
                          Send Message
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="relative rounded-lg p-8 bg-background/90 border border-primary/20 shadow-xl backdrop-blur-sm"
              >
                <div className="relative z-10">
                  <h3 className="heading-3 text-primary mb-6">Our Offices</h3>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {locations.map(location => (
                      <div 
                        key={location.id}
                        className={`p-4 rounded-md cursor-pointer transition-all ${
                          selectedLocation.id === location.id 
                            ? "bg-primary/20 border border-primary" 
                            : "bg-background/50 border border-border hover:bg-primary/10"
                        }`}
                        onClick={() => setSelectedLocation(location)}
                      >
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-lg">{location.name}</h4>
                            <p className="text-muted-foreground mt-1">{location.address}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-border">
                    <div className="flex flex-col space-y-6">
                      <a href="tel:+919513800036" className="flex items-center gap-4 text-foreground hover:text-primary transition-colors group">
                        <div className="w-12 h-12 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors flex items-center justify-center">
                          <Phone className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-bold text-lg">Phone</p>
                          <p className="text-foreground/80">+91 9513 800 036</p>
                        </div>
                      </a>
                      <a href="mailto:info@inviotav.com" className="flex items-center gap-4 text-foreground hover:text-primary transition-colors group">
                        <div className="w-12 h-12 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors flex items-center justify-center">
                          <Mail className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-bold text-lg">Email</p>
                          <p className="text-foreground/80">info@inviotav.com</p>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        <Toaster />
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;