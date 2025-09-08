
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import { AnimateInView } from '@/components/ui/animate-in-view';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from "@/components/ui/use-toast";
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';

const Toaster = dynamic(
  () => import("@/components/ui/toaster").then((c) => c.Toaster),
  { ssr: false }
);


interface EquipmentItem {
  id: string;
  name: string;
  brand: string;
  image: string;
}

interface EquipmentOptions {
  projector: EquipmentItem[];
  speaker: EquipmentItem[];
  display: EquipmentItem[];
  microphone: EquipmentItem[];
}

const equipmentOptions: EquipmentOptions = {
  projector: [
    { id: 'proj1', name: 'Epson EB-1781W', brand: 'Epson', image: 'https://picsum.photos/300/200?random=1' },
    { id: 'proj2', name: 'Sony VPL-HW45ES', brand: 'Sony', image: 'https://picsum.photos/300/200?random=2' },
    { id: 'proj3', name: 'BenQ HT3550', brand: 'BenQ', image: 'https://picsum.photos/300/200?random=3' },
  ],
  speaker: [
    { id: 'spk1', name: 'Bose FreeSpace 51', brand: 'Bose', image: 'https://picsum.photos/200/200?random=4' },
    { id: 'spk2', name: 'JBL Control 25-1L', brand: 'JBL', image: 'https://picsum.photos/200/200?random=5' },
    { id: 'spk3', name: 'Yamaha VXS10', brand: 'Yamaha', image: 'https://picsum.photos/200/200?random=6' },
  ],
  display: [
    { id: 'disp1', name: 'Samsung QM85B', brand: 'Samsung', image: 'https://picsum.photos/400/300?random=7' },
    { id: 'disp2', name: 'LG 86UR8000', brand: 'LG', image: 'https://picsum.photos/400/300?random=8' },
    { id: 'disp3', name: 'Sony FW-85BZ40L', brand: 'Sony', image: 'https://picsum.photos/400/300?random=9' },
  ],
  microphone: [
    { id: 'mic1', name: 'Shure MXA910', brand: 'Shure', image: 'https://picsum.photos/150/150?random=10' },
    { id: 'mic2', name: 'Sennheiser TeamConnect Ceiling 2', brand: 'Sennheiser', image: 'https://picsum.photos/150/150?random=11' },
    { id: 'mic3', name: 'Audio-Technica ATND1061', brand: 'Audio-Technica', image: 'https://picsum.photos/150/150?random=12' },
  ],
};

type EquipmentCategory = keyof EquipmentOptions;

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  company: z.string().optional(),
  projector: z.string().optional(),
  speaker: z.string().optional(),
  display: z.string().optional(),
  microphone: z.string().optional(),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const animationVariants = {
    projector: {
        initial: { opacity: 0, y: -50, scale: 0.8 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 50, scale: 0.8 },
    },
    display: {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.9 },
    },
    speakerLeft: {
        initial: { opacity: 0, x: -50 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 },
    },
    speakerRight: {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 50 },
    },
    microphone: {
        initial: { opacity: 0, y: 50, scale: 0.5 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -50, scale: 0.5 },
    }
}

export default function RoomConfiguratorPage() {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      notes: "",
      projector: "",
      speaker: "",
      display: "",
      microphone: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
    toast({
      title: "Quote Request Sent!",
      description: "Thank you. We will get back to you shortly.",
    });
    form.reset();
  };
  
  const getSelectedItem = (category: EquipmentCategory, id: string | undefined): EquipmentItem | undefined => {
    if (!id) return undefined;
    return equipmentOptions[category].find(item => item.id === id);
  };
  
  const selectedProjector = getSelectedItem('projector', form.watch('projector'));
  const selectedDisplay = getSelectedItem('display', form.watch('display'));
  const selectedSpeaker = getSelectedItem('speaker', form.watch('speaker'));
  const selectedMicrophone = getSelectedItem('microphone', form.watch('microphone'));
  
  const allSelectedItems = [
    { category: 'Projector', item: selectedProjector },
    { category: 'Display', item: selectedDisplay },
    { category: 'Speaker', item: selectedSpeaker },
    { category: 'Microphone', item: selectedMicrophone }
  ].filter(i => i.item);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow pt-20">
        <section className="section-padding bg-card">
          <div className="container-max">
            <AnimateInView>
              <div className="text-center mb-12">
                <h1 className="heading-1 text-primary">Room Configurator</h1>
                <p className="mt-4 text-xl text-foreground/70">Design your perfect AV setup and get an instant quote.</p>
              </div>
            </AnimateInView>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid lg:grid-cols-3 gap-8">
                  <AnimateInView direction="left" className="lg:col-span-1">
                    <Card className="p-6 sticky top-24">
                      <h3 className="heading-3 text-secondary mb-6">1. Select Equipment</h3>
                      <div className="space-y-4">
                        {(Object.keys(equipmentOptions) as EquipmentCategory[]).map((category) => (
                          <FormField
                            key={category}
                            control={form.control}
                            name={category}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="capitalize text-foreground/80">{category}</FormLabel>
                                <Select 
                                  onValueChange={(value) => {
                                    field.onChange(value === 'none' ? '' : value);
                                  }} 
                                  value={field.value || ''}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder={`Select a ${category}`} />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="none">None</SelectItem>
                                    {equipmentOptions[category].map(item => (
                                      <SelectItem key={item.id} value={item.id}>
                                        {item.brand} - {item.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                    </Card>
                  </AnimateInView>

                  <div className="lg:col-span-2 space-y-8">
                    <AnimateInView direction="right">
                      <Card className="p-6">
                        <CardContent className="p-0">
                          <h3 className="heading-3 text-secondary mb-6">2. Preview Your Setup</h3>
                          <div
                            className="relative w-full h-96 bg-background rounded-lg overflow-hidden border border-border/50"
                          >
                             <div className="absolute inset-0 bg-grid-slate-100/50 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
                             {(selectedDisplay || selectedProjector) && (
                               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/5 h-3/5 bg-slate-700 rounded-lg shadow-inner"></div>
                             )}

                            <AnimatePresence>
                                {selectedProjector && (
                                <motion.div 
                                    key="projector"
                                    className="absolute w-1/4 h-1/4 top-[10%] left-1/2 -translate-x-1/2"
                                    variants={animationVariants.projector}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                                >
                                    <div className="relative w-full h-full">
                                        <Image src={selectedProjector.image} alt={selectedProjector.name} fill data-ai-hint="projector" className="object-contain" />
                                    </div>
                                </motion.div>
                                )}
                                {selectedDisplay && (
                                <motion.div 
                                    key="display"
                                    className="absolute w-3/5 h-3/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                    variants={animationVariants.display}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                                >
                                    <div className="relative w-full h-full p-2">
                                        <Image src={selectedDisplay.image} alt={selectedDisplay.name} fill data-ai-hint="display screen" className="object-contain" />
                                    </div>
                                </motion.div>
                                )}
                                {selectedSpeaker && (
                                <React.Fragment key="speaker">
                                    <motion.div 
                                        className="absolute w-1/6 h-1/6 top-1/2 -translate-y-1/2 left-[5%]"
                                        variants={animationVariants.speakerLeft}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                                    >
                                    <div className="relative w-full h-full">
                                        <Image src={selectedSpeaker.image} alt={selectedSpeaker.name} fill data-ai-hint="audio speaker" className="object-contain" />
                                    </div>
                                    </motion.div>
                                    <motion.div 
                                        className="absolute w-1/6 h-1/6 top-1/2 -translate-y-1/2 right-[5%]"
                                        variants={animationVariants.speakerRight}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                                    >
                                    <div className="relative w-full h-full">
                                        <Image src={selectedSpeaker.image} alt={selectedSpeaker.name} fill data-ai-hint="audio speaker" className="object-contain" />
                                    </div>
                                    </motion.div>
                                </React.Fragment>
                                )}
                                {selectedMicrophone && (
                                    <motion.div 
                                        key="microphone"
                                        className="absolute top-[50%] left-1/2 -translate-x-1/2 w-1/6 h-1/6"
                                        variants={animationVariants.microphone}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                                    >
                                    <div className="relative w-full h-full">
                                        <Image src={selectedMicrophone.image} alt={selectedMicrophone.name} fill data-ai-hint="microphone" className="object-contain"/>
                                    </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                          </div>
                        </CardContent>
                      </Card>
                    </AnimateInView>

                    <AnimateInView direction="right" delay={200}>
                       <Card className="p-6">
                        <CardContent className="p-0">
                          <h3 className="heading-3 text-secondary mb-6">3. Request a Quote</h3>
                          
                           <div className="mb-6 bg-background/50 p-4 rounded-lg border border-border/50">
                            <h4 className="font-bold text-foreground/90 mb-2">Your Configuration:</h4>
                            {allSelectedItems.length > 0 ? (
                              <ul className="space-y-1">
                                {allSelectedItems.map(({ category, item }) => (
                                  <li key={category} className="text-sm text-foreground/80 flex justify-between">
                                    <span className="font-medium">{category}:</span>
                                    <span>{item!.brand} - {item!.name}</span>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-sm text-muted-foreground italic">No equipment selected yet.</p>
                            )}
                          </div>

                           <div className="grid md:grid-cols-2 gap-6">
                              <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Name *</FormLabel>
                                    <FormControl><Input placeholder="Your Name" {...field} /></FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Email *</FormLabel>
                                    <FormControl><Input placeholder="your.email@example.com" {...field} /></FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                               <FormField
                                control={form.control}
                                name="company"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Company</FormLabel>
                                    <FormControl><Input placeholder="Your Company Name" {...field} /></FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                               <FormField
                                control={form.control}
                                name="notes"
                                render={({ field }) => (
                                  <FormItem className="md:col-span-2">
                                    <FormLabel>Additional Notes</FormLabel>
                                    <FormControl><Textarea placeholder="Tell us more about your requirements..." {...field} /></FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <div className="md:col-span-2">
                                <Button type="submit" size="lg" className="w-full font-headline btn-glow">
                                  Get My Quote
                                </Button>
                              </div>
                           </div>
                        </CardContent>
                      </Card>
                    </AnimateInView>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </section>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
