'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import { AnimateInView } from '@/components/ui/animate-in-view';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/components/ui/use-toast";
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

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
  touchpad: EquipmentItem[];
}

const equipmentOptions: EquipmentOptions = {
    projector: [
      { id: 'proj1', name: '4K Projector', brand: 'Kramer', image: 'https://www.kramerav.com/images/logos/kramer-logo-w.svg' },
      { id: 'proj2', name: 'Laser Projector', brand: 'Kramer', image: 'https://www.kramerav.com/images/logos/kramer-logo-w.svg' },
    ],
    speaker: [
      { id: 'spk1', name: 'Ceiling Speaker', brand: 'Denon', image: 'https://www.denon.com/on/demandware.static/Sites-denon_northamerica_shared-Site/-/default/dw9e1e2b02/images/denon-logo.svg' },
      { id: 'spk2', name: 'Wall-mounted Speaker', brand: 'Denon', image: 'https://www.denon.com/on/demandware.static/Sites-denon_northamerica_shared-Site/-/default/dw9e1e2b02/images/denon-logo.svg' },
    ],
    display: [
      { id: 'disp1', name: 'Interactive Display', brand: 'Kramer', image: 'https://www.kramerav.com/images/logos/kramer-logo-w.svg' },
      { id: 'disp2', name: 'LED Video Wall', brand: 'Kramer', image: 'https://www.kramerav.com/images/logos/kramer-logo-w.svg' },
    ],
    microphone: [
      { id: 'mic1', name: 'Ceiling Microphone', brand: 'Denon', image: 'https://www.denon.com/on/demandware.static/Sites-denon_northamerica_shared-Site/-/default/dw9e1e2b02/images/denon-logo.svg' },
      { id: 'mic2', name: 'Tabletop Microphone', brand: 'Denon', image: 'https://www.denon.com/on/demandware.static/Sites-denon_northamerica_shared-Site/-/default/dw9e1e2b02/images/denon-logo.svg' },
    ],
    touchpad: [
        { id: 'touch1', name: '10" Touch Panel', brand: 'Kramer', image: 'https://www.kramerav.com/images/logos/kramer-logo-w.svg' },
    ],
  };

type EquipmentCategory = keyof EquipmentOptions;

const roomSizes = [
    { value: 'booth', label: 'Phone Booth', pax: '(1-2 pax)', image: 'https://resurgent.co.in/room-configurator/images/booth.webp' },
    { value: 'huddle', label: 'Huddle Room', pax: '(3-6 pax)', image: 'https://resurgent.co.in/room-configurator/images/huddle.webp' },
    { value: 'medium', label: 'Medium Room', pax: '(6-12 pax)', image: 'https://resurgent.co.in/room-configurator/images/medium.webp' },
    { value: 'large', label: 'Large Room', pax: '(>12 pax)', image: 'https://resurgent.co.in/room-configurator/images/large.webp' },
];

const vcOptions = [
    { value: 'msteams', label: 'MS Teams', image: 'https://resurgent.co.in/room-configurator/images/ms-teams.webp' },
    { value: 'zoom', label: 'Zoom', image: 'https://resurgent.co.in/room-configurator/images/zoom.webp' },
    { value: 'googlemeet', label: 'Google Meet', image: 'https://resurgent.co.in/room-configurator/images/google-meet.webp' },
    { value: 'byod', label: 'Bring Your Own Device', image: 'https://resurgent.co.in/room-configurator/images/byod.webp' },
];

const tableOptions = {
  booth: [{value: 'dual', label: 'Dual Seater'}],
  huddle: [{value: 'round', label: 'Round Table'}, {value: 'rectangle', label: 'Rectangle Table'}],
  medium: [{value: 'rectangle', label: 'Rectangle Table'}, {value: 'oval', label: 'Oval Table'}],
  large: [{value: 'rectangle', label: 'Rectangle Table'}, {value: 'oval', label: 'Oval Table'}],
};

const displayOptions = {
    booth: ["samsung", "lg", "panasonic", "sony", "nec", "avocor"],
    huddle: ["samsung", "lg", "panasonic", "sony", "nec", "avocor"],
    medium: ["samsung", "lg", "panasonic", "sony", "nec", "avocor"],
    large: ["samsung", "lg", "panasonic", "sony", "nec", "avocor"]
};

const cameraOptions = {
  booth: ["logitech-yealink", "poly", "logitech-jabra", "yealink", "logitech"],
  huddle: ["logitech", "poly", "jabra", "cisco", "yealink"],
  medium: ["logitech", "poly", "jabra", "cisco", "yealink"],
  large: ["logitech", "poly", "lumen", "cisco", "aver", "panasonic", "yealink", "qsc", "sony"]
};

const touchpadOptions = {
    medium: ["logitech", "crestron", "poly", "extron"],
    large: ["logitech", "crestron", "poly", "extron"]
};

const speakerOptions = {
    huddle: ["jabra", "logitech", "cisco", "poly", "yealink"],
    medium: ["biamp", "bose", "qsc", "jbl", "yealink"],
    large: ["biamp", "bose", "qsc", "jbl", "yealink"]
};

const microphoneOptions = {
    huddle: ["poly", "logitech", "cisco"],
    medium: ["shure", "sennheiser", "audio-technica", "akg", "beyerdynamic", "biamp", "clearone"],
    large: ["shure", "sennheiser", "audio-technica", "clearone"]
};

const desktopOptions = {
    booth: ["cisco", "logitech", "yealink"]
};

const carouselImages = [
  "/assets/roompage/r5.jpg",
  "/assets/roompage/r2.jpg",
  "/assets/roompage/r3.jpg",
  "/assets/roompage/r4.jpg",
];

const StepIndicator = ({ current, total }: { current: number; total: number }) => (
    <p className="font-bold text-lg text-primary">
        <span>{String(current).padStart(2, '0')}</span>
        <span className="text-foreground/50 mx-2">/</span>
        <span>{String(total).padStart(2, '0')}</span>
    </p>
);

const Home = ({ onNext }: { onNext: () => void; }) => {
    const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({delay: 3000})]);
    return (
      <motion.div 
        className="text-center w-full flex flex-col items-center justify-center min-h-[80vh]"
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        exit={{ opacity: 0, scale: 0.9 }} 
        transition={{ duration: 0.5 }}
      >
        <AnimateInView>
          <h1 className="heading-1 text-primary">
            Room <span className="font-light">Configurator</span>
          </h1>
          <p className="mt-2 text-lg text-foreground/70 uppercase tracking-widest">
            Customize your meeting room spaces
          </p>
        </AnimateInView>
        <AnimateInView delay={200} className="w-full max-w-2xl my-8">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {carouselImages.map((src, index) => (
                        <div key={index} className="flex-[0_0_100%] relative aspect-video">
                           <Image src={src} alt={`Room example ${index + 1}`} fill style={{objectFit:"contain"}}/>
                        </div>
                    ))}
                </div>
            </div>
        </AnimateInView>
        <AnimateInView delay={400}>
          <Button onClick={onNext} size="lg" className="font-headline btn-glow rounded-full w-32 h-32 text-lg">
            Let's Start
          </Button>
        </AnimateInView>
      </motion.div>
    );
  };

const RoomSizeSelector = ({ onNext, onBack, selected, setSelected, totalSteps }: { onNext: () => void; onBack: () => void; selected: string; setSelected: (value: string) => void; totalSteps: number; }) => {
    return (
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{duration: 0.5}}>
            <div className="text-center">
                <StepIndicator current={1} total={totalSteps} />
                <h2 className="heading-2 mt-4">What <span>room size</span> are you setting up?</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
                    {roomSizes.map((room, index) => (
                        <AnimateInView key={room.value} delay={index * 100}>
                            <label className={cn(
                                "relative block cursor-pointer rounded-lg border-2 p-4 text-center transition-all duration-300",
                                selected === room.value
                                    ? "border-primary bg-primary/10 shadow-lg"
                                    : "border-border hover:border-primary/50"
                            )}>
                                <Image src={room.image} alt={room.label} width={120} height={120} className="mx-auto" />
                                <div className="mt-2">
                                    <p className="font-bold text-foreground">{room.label}</p>
                                    <span className="text-sm text-muted-foreground">{room.pax}</span>
                                </div>
                                <input
                                    type="radio"
                                    name="roomType"
                                    value={room.value}
                                    className="sr-only"
                                    onChange={() => setSelected(room.value)}
                                    checked={selected === room.value}
                                />
                                {selected === room.value && (
                                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center">
                                        <CheckCircle className="h-4 w-4" />
                                    </div>
                                )}
                            </label>
                        </AnimateInView>
                    ))}
                </div>
                <div className="mt-8 flex justify-center gap-4">
                     <Button onClick={onBack} size="lg" variant="outline">Back</Button>
                    <Button onClick={onNext} size="lg" className="font-headline btn-glow" disabled={!selected}>Next</Button>
                </div>
            </div>
        </motion.div>
    );
};

const VcSelector = ({ onNext, onBack, selected, setSelected, totalSteps }: { onNext: () => void; onBack: () => void; selected: string[]; setSelected: (value: string[]) => void; totalSteps: number; }) => {
    const handleToggleVc = (vc: string) => {
        const newSelection = selected.includes(vc)
            ? selected.filter(item => item !== vc)
            : [...selected, vc];
        setSelected(newSelection);
    };

    return (
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{duration: 0.5}}>
            <div className="text-center">
                <StepIndicator current={2} total={totalSteps} />
                <h2 className="heading-2 mt-4">Select Video Conferencing System</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
                    {vcOptions.map((vc, index) => (
                        <AnimateInView key={vc.value} delay={index * 100}>
                            <label className={cn(
                                "relative block cursor-pointer rounded-lg border-2 p-4 text-center transition-all duration-300",
                                selected.includes(vc.value)
                                    ? "border-primary bg-primary/10 shadow-lg"
                                    : "border-border hover:border-primary/50"
                            )}>
                                <Image src={vc.image} alt={vc.label} width={80} height={80} className="mx-auto rounded-full" />
                                <p className="font-bold text-foreground mt-2">{vc.label}</p>
                                <input
                                    type="checkbox"
                                    className="sr-only"
                                    onChange={() => handleToggleVc(vc.value)}
                                    checked={selected.includes(vc.value)}
                                />
                                {selected.includes(vc.value) && (
                                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center">
                                        <CheckCircle className="h-4 w-4" />
                                    </div>
                                )}
                            </label>
                        </AnimateInView>
                    ))}
                </div>
                <div className="mt-8 flex justify-center gap-4">
                    <Button onClick={onBack} size="lg" variant="outline">Back</Button>
                    <Button onClick={onNext} size="lg" className="font-headline btn-glow" disabled={selected.length === 0}>Next</Button>
                </div>
            </div>
        </motion.div>
    );
};

const BoothTypeSelector = ({ onNext, onBack, selected, setSelected, totalSteps }: { onNext: () => void; onBack: () => void; selected: string; setSelected: (value: string) => void; totalSteps: number; }) => {
    const boothTypes = [
        { value: 'dual', label: 'dual seater' }
    ];

    return (
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{duration: 0.5}}>
            <div className="text-center">
                <StepIndicator current={3} total={totalSteps} />
                <h2 className="heading-2 mt-4">Choose your <span>booth type</span></h2>
                <div className="grid grid-cols-1 gap-4 md:gap-6 mt-8 max-w-md mx-auto">
                    {boothTypes.map((booth, index) => (
                        <AnimateInView key={booth.value} delay={index * 100}>
                            <label className={cn(
                                "relative block cursor-pointer rounded-lg border-2 p-6 text-center transition-all duration-300",
                                selected === booth.value
                                    ? "border-primary bg-primary/10 shadow-lg"
                                    : "border-border hover:border-primary/50"
                            )}>
                                <div className="flex items-center justify-center gap-4">
                                    <Image src="https://resurgent.co.in/room-configurator/images/booth/table/dual-icon.webp" alt={booth.label} width={80} height={80} className="mx-auto" />
                                    <span className="table-label font-bold text-foreground">{booth.label}</span>
                                </div>
                                {selected === booth.value && (
                                    <Image src="https://resurgent.co.in/room-configurator/images/select.webp" alt="selected" width={24} height={24} className="absolute top-3 right-3" />
                                )}
                                <input
                                    type="radio"
                                    name="boothType"
                                    value={booth.value}
                                    className="sr-only"
                                    onChange={() => setSelected(booth.value)}
                                    checked={selected === booth.value}
                                />
                            </label>
                        </AnimateInView>
                    ))}
                </div>
                
                {/* Image Preview */}
                <div className="mt-8 relative w-full max-w-2xl mx-auto aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <div className="absolute top-2 left-2 z-10 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                        <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                        All images shown are for demonstration purpose
                    </div>
                    <Image 
                        src="https://resurgent.co.in/room-configurator/images/booth/wall.webp" 
                        alt="Booth background" 
                        fill 
                        style={{objectFit: 'cover'}} 
                    />
                    <Image 
                        src="https://resurgent.co.in/room-configurator/images/booth/table/dual.webp" 
                        alt="Booth table" 
                        fill 
                        style={{objectFit: 'contain'}} 
                        className="relative z-1"
                    />
                </div>

                <div className="mt-8 flex justify-center gap-4">
                    <Button onClick={onBack} size="lg" variant="outline">Back</Button>
                    <Button onClick={onNext} size="lg" className="font-headline btn-glow" disabled={!selected}>Next</Button>
                </div>
            </div>
        </motion.div>
    )
};

const DesktopConferencingSelector = ({ onNext, onBack, selected, setSelected, totalSteps }: { onNext: () => void; onBack: () => void; selected: string; setSelected: (value: string) => void; totalSteps: number; }) => {
    return (
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{duration: 0.5}}>
            <div className="text-center">
                <StepIndicator current={4} total={totalSteps} />
                <h2 className="heading-2 mt-4">Choose your <span>desktop conferencing solution</span></h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 max-w-2xl mx-auto">
                    {(desktopOptions.booth || []).map((brand, index) => (
                        <AnimateInView key={brand} delay={index * 100}>
                            <label className={cn(
                                "relative block cursor-pointer rounded-lg border-2 p-6 text-center transition-all duration-300",
                                selected === brand
                                    ? "border-primary bg-primary/10 shadow-lg"
                                    : "border-border hover:border-primary/50"
                            )}>
                                <Image src={`https://resurgent.co.in/room-configurator/images/${brand}.webp`} alt={brand} width={120} height={60} className="mx-auto h-12 object-contain" />
                                {selected === brand && (
                                    <Image src="https://resurgent.co.in/room-configurator/images/select.webp" alt="selected" width={24} height={24} className="absolute top-3 right-3" />
                                )}
                                <input
                                    type="radio"
                                    name="desktopType"
                                    value={brand}
                                    className="sr-only"
                                    onChange={() => setSelected(brand)}
                                    checked={selected === brand}
                                />
                            </label>
                        </AnimateInView>
                    ))}
                </div>
                
                {/* Image Preview */}
                <div className="mt-8 relative w-full max-w-2xl mx-auto aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <div className="absolute top-2 left-2 z-10 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                        <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                        All images shown are for demonstration purpose
                    </div>
                    <Image 
                        src="https://resurgent.co.in/room-configurator/images/booth/wall.webp" 
                        alt="Booth background" 
                        fill 
                        style={{objectFit: 'cover'}} 
                    />
                    <Image 
                        src="https://resurgent.co.in/room-configurator/images/booth/table/dual.webp" 
                        alt="Booth table" 
                        fill 
                        style={{objectFit: 'contain'}} 
                        className="relative z-1"
                    />
                    {selected && (
                        <Image 
                            src={`https://resurgent.co.in/room-configurator/images/booth/desktop-conferencing/${selected}.webp`}
                            alt="Desktop conferencing" 
                            fill 
                            style={{objectFit: 'contain'}} 
                            className="relative z-2"
                        />
                    )}
                </div>

                <div className="mt-8 flex justify-center gap-4">
                    <Button onClick={onBack} size="lg" variant="outline">Back</Button>
                    <Button onClick={onNext} size="lg" className="font-headline btn-glow" disabled={!selected}>Next</Button>
                </div>
            </div>
        </motion.div>
    )
};

const TableSelector = ({ onNext, onBack, selected, setSelected, roomType, totalSteps }: { onNext: () => void; onBack: () => void; selected: string; setSelected: (value: string) => void; roomType: keyof typeof tableOptions; totalSteps: number; }) => {
    return (
        <div className="text-center">
            <StepIndicator current={3} total={totalSteps} />
            <h2 className="heading-2 mt-4">Choose your <span>table type</span></h2>
             <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
                {(tableOptions[roomType] || []).map((table, index) => (
                     <AnimateInView key={table.value} delay={index * 100}>
                        <label className={cn(
                            "relative block cursor-pointer rounded-lg border-2 p-4 text-center transition-all duration-300",
                            selected === table.value
                                ? "border-primary bg-primary/10 shadow-lg"
                                : "border-border hover:border-primary/50"
                        )}>
                            <Image src={`https://resurgent.co.in/room-configurator/images/${roomType}/table/${table.value}-icon.webp`} alt={table.label} width={120} height={120} className="mx-auto" />
                            <p className="font-bold text-foreground mt-2">{table.label}</p>
                            <input
                                type="radio"
                                name="tableType"
                                value={table.value}
                                className="sr-only"
                                onChange={() => setSelected(table.value)}
                                checked={selected === table.value}
                            />
                             {selected === table.value && (
                                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center">
                                    <CheckCircle className="h-4 w-4" />
                                </div>
                            )}
                        </label>
                    </AnimateInView>
                ))}
            </div>
            <div className="mt-8 flex justify-center gap-4">
                <Button onClick={onBack} size="lg" variant="outline">Back</Button>
                <Button onClick={onNext} size="lg" className="font-headline btn-glow" disabled={!selected}>Next</Button>
            </div>
        </div>
    )
}

const DisplaySelector = ({ onNext, onBack, selected, setSelected, roomType, onModeChange, displayMode, totalSteps }: {
    onNext: () => void;
    onBack: () => void;
    selected: string;
    setSelected: (value: string) => void;
    roomType: keyof typeof displayOptions;
    onModeChange: (mode: 'Single' | 'Dual') => void;
    displayMode: 'Single' | 'Dual';
    totalSteps: number;
}) => {
    const showToggle = selected && roomType !== 'booth' && roomType !== 'huddle';

    return (
        <div className="text-center">
            <StepIndicator current={4} total={totalSteps} />
            <h2 className="heading-2 mt-4">Choose your <span>display provider</span></h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                {(displayOptions[roomType] || []).map((brand, index) => (
                    <AnimateInView key={brand} delay={index * 100}>
                        <label className={cn(
                            "relative block cursor-pointer rounded-lg border-2 p-4 text-center transition-all duration-300",
                            selected === brand
                                ? "border-primary bg-primary/10 shadow-lg"
                                : "border-border hover:border-primary/50"
                        )}>
                            <Image src={`https://resurgent.co.in/room-configurator/images/${brand}.webp`} alt={brand} width={120} height={60} className="mx-auto h-12 object-contain" />
                            <input
                                type="radio"
                                name="displayType"
                                value={brand}
                                className="sr-only"
                                onChange={() => setSelected(brand)}
                                checked={selected === brand}
                            />
                            {selected === brand && (
                                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center">
                                    <CheckCircle className="h-4 w-4" />
                                </div>
                            )}
                        </label>
                    </AnimateInView>
                ))}
            </div>

            {showToggle && (
                <AnimateInView className="mt-8 flex items-center justify-center gap-4">
                    <p className="font-semibold">Single or dual monitor?</p>
                    <div className="flex items-center gap-2 rounded-full p-1 bg-muted">
                        <Button onClick={() => onModeChange('Single')} size="sm" variant={displayMode === 'Single' ? 'default' : 'ghost'} className="rounded-full">Single</Button>
                        <Button onClick={() => onModeChange('Dual')} size="sm" variant={displayMode === 'Dual' ? 'default' : 'ghost'} className="rounded-full">Dual</Button>
                    </div>
                </AnimateInView>
            )}

            <div className="mt-8 flex justify-center gap-4">
                <Button onClick={onBack} size="lg" variant="outline">Back</Button>
                <Button onClick={onNext} size="lg" className="font-headline btn-glow" disabled={!selected}>Next</Button>
            </div>
        </div>
    );
}

const CameraSelector = ({ onNext, onBack, selected, setSelected, roomType, vc, selections, totalSteps }: {
    onNext: () => void;
    onBack: () => void;
    selected: string;
    setSelected: (value: string) => void;
    roomType: keyof typeof cameraOptions;
    vc: string[];
    selections: Record<string, any>;
    totalSteps: number;
}) => {
    const options = (cameraOptions[roomType] || []);
    const isMSBooth = vc.length === 1 && vc[0] === 'msteams' && roomType === 'booth';
    const filteredOptions = isMSBooth ? options.filter(opt => opt.includes('logitech')) : options;

    return (
        <div className="text-center">
            <StepIndicator current={5} total={totalSteps} />
            <h2 className="heading-2 mt-4">Choose your conference <span>camera provider</span></h2>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                {filteredOptions.map((brand, index) => (
                     <AnimateInView key={brand} delay={index * 100}>
                        <label className={cn(
                            "relative block cursor-pointer rounded-lg border-2 p-4 text-center transition-all duration-300",
                            selected === brand
                                ? "border-primary bg-primary/10 shadow-lg"
                                : "border-border hover:border-primary/50"
                        )}>
                            <Image src={`https://resurgent.co.in/room-configurator/images/${brand}.webp`} alt={brand} width={120} height={60} className="mx-auto h-12 object-contain" />
                            <input
                                type="radio"
                                name="cameraType"
                                value={brand}
                                className="sr-only"
                                onChange={() => setSelected(brand)}
                                checked={selected === brand}
                            />
                             {selected === brand && (
                                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center">
                                    <CheckCircle className="h-4 w-4" />
                                </div>
                            )}
                        </label>
                    </AnimateInView>
                ))}
            </div>
            
            {/* Image Preview for Huddle Room */}
            {roomType === 'huddle' && (
                <div className="mt-8 relative w-full max-w-2xl mx-auto aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <div className="absolute top-2 left-2 z-10 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                        <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                        All images shown are for demonstration purpose
                    </div>
                    <Image 
                        src="https://resurgent.co.in/room-configurator/images/huddle/wall.webp" 
                        alt="Huddle background" 
                        fill 
                        style={{objectFit: 'cover'}} 
                    />
                    {selections.table && (
                        <Image 
                            src={`https://resurgent.co.in/room-configurator/images/huddle/table/${selections.table}.webp`}
                            alt="Table" 
                            fill 
                            style={{objectFit: 'contain'}} 
                            className="relative z-1"
                        />
                    )}
                    {selections.display && (
                        <Image 
                            src={`https://resurgent.co.in/room-configurator/images/huddle/display/Single-${selections.display}-display.webp`}
                            alt="Display" 
                            fill 
                            style={{objectFit: 'contain'}} 
                            className="relative z-2"
                        />
                    )}
                    {selected && (
                        <Image 
                            src={`https://resurgent.co.in/room-configurator/images/huddle/camera/${selected}-camera.webp`}
                            alt="Camera" 
                            fill 
                            style={{objectFit: 'contain'}} 
                            className="relative z-3"
                        />
                    )}
                </div>
            )}

            <div className="mt-8 flex justify-center gap-4">
                <Button onClick={onBack} size="lg" variant="outline">Back</Button>
                <Button onClick={onNext} size="lg" className="font-headline btn-glow" disabled={!selected && roomType !== 'booth'}>Next</Button>
            </div>
        </div>
    )
};

const TouchpadSelector = ({ onNext, onBack, selected, setSelected, roomType, totalSteps }: { onNext: () => void; onBack: () => void; selected: string; setSelected: (value: string) => void; roomType: keyof typeof touchpadOptions; totalSteps: number; }) => {
    return (
        <div className="text-center">
            <StepIndicator current={6} total={totalSteps} />
            <h2 className="heading-2 mt-4">Choose your <span>touchpad provider</span></h2>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                {(touchpadOptions[roomType] || []).map((brand, index) => (
                     <AnimateInView key={brand} delay={index * 100}>
                        <label className={cn(
                            "relative block cursor-pointer rounded-lg border-2 p-4 text-center transition-all duration-300",
                            selected === brand
                                ? "border-primary bg-primary/10 shadow-lg"
                                : "border-border hover:border-primary/50"
                        )}>
                            <Image src={`https://resurgent.co.in/room-configurator/images/${brand}.webp`} alt={brand} width={120} height={60} className="mx-auto h-12 object-contain" />
                            <input
                                type="radio"
                                name="touchpadType"
                                value={brand}
                                className="sr-only"
                                onChange={() => setSelected(brand)}
                                checked={selected === brand}
                            />
                             {selected === brand && (
                                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center">
                                    <CheckCircle className="h-4 w-4" />
                                </div>
                            )}
                        </label>
                    </AnimateInView>
                ))}
            </div>
            <div className="mt-8 flex justify-center gap-4">
                <Button onClick={onBack} size="lg" variant="outline">Back</Button>
                <Button onClick={onNext} size="lg" className="font-headline btn-glow" disabled={!selected}>Next</Button>
            </div>
        </div>
    )
};

const SpeakerSelector = ({ onNext, onBack, selected, setSelected, roomType, totalSteps }: { onNext: () => void; onBack: () => void; selected: string; setSelected: (value: string) => void; roomType: keyof typeof speakerOptions; totalSteps: number; }) => {
    return (
        <div className="text-center">
            <StepIndicator current={7} total={totalSteps} />
            <h2 className="heading-2 mt-4">Choose your <span>speaker provider</span></h2>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                {(speakerOptions[roomType] || []).map((brand, index) => (
                     <AnimateInView key={brand} delay={index * 100}>
                        <label className={cn(
                            "relative block cursor-pointer rounded-lg border-2 p-4 text-center transition-all duration-300",
                            selected === brand
                                ? "border-primary bg-primary/10 shadow-lg"
                                : "border-border hover:border-primary/50"
                        )}>
                            <Image src={`https://resurgent.co.in/room-configurator/images/${brand}.webp`} alt={brand} width={120} height={60} className="mx-auto h-12 object-contain" />
                            <input
                                type="radio"
                                name="speakerType"
                                value={brand}
                                className="sr-only"
                                onChange={() => setSelected(brand)}
                                checked={selected === brand}
                            />
                             {selected === brand && (
                                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center">
                                    <CheckCircle className="h-4 w-4" />
                                </div>
                            )}
                        </label>
                    </AnimateInView>
                ))}
            </div>
            <div className="mt-8 flex justify-center gap-4">
                <Button onClick={onBack} size="lg" variant="outline">Back</Button>
                <Button onClick={onNext} size="lg" className="font-headline btn-glow" disabled={!selected}>Next</Button>
            </div>
        </div>
    )
};

const MicrophoneSelector = ({ onNext, onBack, selected, setSelected, roomType, totalSteps }: { onNext: () => void; onBack: () => void; selected: string; setSelected: (value: string) => void; roomType: keyof typeof microphoneOptions; totalSteps: number; }) => {
    return (
        <div className="text-center">
            <StepIndicator current={8} total={totalSteps} />
            <h2 className="heading-2 mt-4">Choose your <span>microphone provider</span></h2>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                {(microphoneOptions[roomType] || []).map((brand, index) => (
                     <AnimateInView key={brand} delay={index * 100}>
                        <label className={cn(
                            "relative block cursor-pointer rounded-lg border-2 p-4 text-center transition-all duration-300",
                            selected === brand
                                ? "border-primary bg-primary/10 shadow-lg"
                                : "border-border hover:border-primary/50"
                        )}>
                            <Image src={`https://resurgent.co.in/room-configurator/images/${brand}.webp`} alt={brand} width={120} height={60} className="mx-auto h-12 object-contain" />
                            <input
                                type="radio"
                                name="microphoneType"
                                value={brand}
                                className="sr-only"
                                onChange={() => setSelected(brand)}
                                checked={selected === brand}
                            />
                             {selected === brand && (
                                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center">
                                    <CheckCircle className="h-4 w-4" />
                                </div>
                            )}
                        </label>
                    </AnimateInView>
                ))}
            </div>
            <div className="mt-8 flex justify-center gap-4">
                <Button onClick={onBack} size="lg" variant="outline">Back</Button>
                <Button onClick={onNext} size="lg" className="font-headline btn-glow" disabled={!selected}>Next</Button>
            </div>
        </div>
    )
};

const Configurator = ({ onNext, onBack, selections, setSelections, totalSteps } : {
    onNext: () => void;
    onBack: () => void;
    selections: Record<string, any>;
    setSelections: (selections: Record<string, any>) => void;
    totalSteps: number;
}) => {
    const [configStep, setConfigStep] = useState(0);

    const handleNextConfig = () => {
        let nextStep = configStep + 1;
        const roomType = selections.roomType;
    
        // Skip touchpad for huddle
        if (nextStep === 3 && roomType === 'huddle') {
            nextStep++;
        }
        // Skip speaker for medium rooms
        if (nextStep === 4 && roomType === 'medium') {
            nextStep++;
        }
        // Skip speaker for booth & huddle
        if (nextStep === 4 && (roomType === 'booth' || roomType === 'huddle')) {
            nextStep++;
        }
         // Skip microphone for booth
        if (nextStep === 5 && roomType === 'booth') {
             nextStep++;
        }

        const totalConfigSteps = 
            selections.roomType === 'large' ? 6 :
            selections.roomType === 'medium' ? 4 : // Reduced from 5 to 4 (skip speaker)
            selections.roomType === 'huddle' ? 4 :
            2;

        if (nextStep >= totalConfigSteps) {
            onNext();
        } else {
            setConfigStep(nextStep);
        }
    }
    
    const handlePrevConfig = () => {
        let prevStep = configStep - 1;
        const roomType = selections.roomType;

        if (prevStep === 4 && roomType === 'medium') {
            prevStep--; // Skip speaker step when going back
        }
         if (prevStep === 4 && roomType === 'booth') {
             prevStep--;
         }
        if (prevStep === 3 && (roomType === 'booth' || roomType === 'huddle')) {
            prevStep--;
        }

        if(prevStep < 0) {
            onBack();
            return;
        }

        setConfigStep(prevStep);
    }

    const currentStepNumber = 3 + configStep;

    const updateSelection = (key: string, value: any) => {
        setSelections({...selections, [key]: value});
    }

    const renderStep = () => {
        switch(configStep){
            case 0:
                return <TableSelector 
                        onNext={handleNextConfig} 
                        onBack={onBack}
                        selected={selections.table}
                        setSelected={(value) => updateSelection('table', value)}
                        roomType={selections.roomType}
                        totalSteps={totalSteps}
                    />
            case 1:
                return <DisplaySelector 
                        onNext={handleNextConfig} 
                        onBack={() => setConfigStep(0)}
                        selected={selections.display}
                        setSelected={(value) => updateSelection('display', value)}
                        roomType={selections.roomType}
                        displayMode={selections.displayMode}
                        onModeChange={(value) => updateSelection('displayMode', value)}
                        totalSteps={totalSteps}
                    />
            case 2:
                 return <CameraSelector
                        onNext={handleNextConfig}
                        onBack={() => setConfigStep(1)}
                        selected={selections.camera}
                        setSelected={(value) => updateSelection('camera', value)}
                        roomType={selections.roomType}
                        vc={selections.vc}
                        selections={selections}
                        totalSteps={totalSteps}
                    />
            case 3:
                 return <TouchpadSelector
                        onNext={handleNextConfig}
                        onBack={() => setConfigStep(2)}
                        selected={selections.touchpad}
                        setSelected={(value) => updateSelection('touchpad', value)}
                        roomType={selections.roomType}
                        totalSteps={totalSteps}
                    />
            case 4:
                 // Skip speaker for medium rooms
                 if (selections.roomType === 'medium') {
                    return <MicrophoneSelector
                        onNext={onNext}
                        onBack={() => setConfigStep(3)}
                        selected={selections.microphone}
                        setSelected={(value) => updateSelection('microphone', value)}
                        roomType={selections.roomType}
                        totalSteps={totalSteps}
                    />
                 } else {
                    return <SpeakerSelector
                        onNext={handleNextConfig}
                        onBack={() => setConfigStep(3)}
                        selected={selections.speaker}
                        setSelected={(value) => updateSelection('speaker', value)}
                        roomType={selections.roomType}
                        totalSteps={totalSteps}
                    />
                 }
            case 5:
                 return <MicrophoneSelector
                        onNext={onNext}
                        onBack={() => setConfigStep(4)}
                        selected={selections.microphone}
                        setSelected={(value) => updateSelection('microphone', value)}
                        roomType={selections.roomType}
                        totalSteps={totalSteps}
                    />
            default:
                return null;
        }
    }

    return (
         <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{duration: 0.5}}>
            <div className="text-center">
                 <StepIndicator current={currentStepNumber} total={totalSteps} />
            </div>
             <div className="grid lg:grid-cols-2 gap-8 items-start mt-8">
                 <div className='self-center'>
                    {renderStep()}
                 </div>
                 <div className="relative w-full aspect-video bg-gray-200 rounded-lg overflow-hidden">
                     <Image src={`https://resurgent.co.in/room-configurator/images/${selections.roomType}/wall.webp`} alt="Room background" fill style={{objectFit: 'cover'}} />
                    {selections.table && (
                         <Image src={`https://resurgent.co.in/room-configurator/images/${selections.roomType}/table/${selections.table}.webp`} alt="Table" fill style={{objectFit: 'contain'}} />
                    )}
                    {selections.display && (
                         <Image 
                           src={`https://resurgent.co.in/room-configurator/images/${selections.roomType}/display/${selections.displayMode}-${selections.display}-display.webp`}
                           alt="Display" fill style={{objectFit: 'contain'}}
                           className="transition-all duration-500"
                           onError={(e) => { (e.target as HTMLImageElement).src = `https://resurgent.co.in/room-configurator/images/${selections.roomType}/display/Single-${selections.display}-display.webp`}}
                          />
                    )}
                    {selections.camera && (
                         <Image 
                           src={`https://resurgent.co.in/room-configurator/images/${selections.roomType}/camera/${selections.camera}-camera.webp`}
                           alt="Camera" fill style={{objectFit: 'contain'}}
                           className="transition-all duration-500"
                          />
                    )}
                     {selections.touchpad && (
                         <Image 
                           src={`https://resurgent.co.in/room-configurator/images/${selections.roomType}/touchpad/${selections.touchpad}-touchpad.webp`}
                           alt="Touchpad" fill style={{objectFit: 'contain'}}
                          />
                    )}
                    {(selections.speaker || selections.microphone) && (
                         <Image 
                           src={`https://resurgent.co.in/room-configurator/images/${selections.roomType}/roof.webp`}
                           alt="Roof" fill style={{objectFit: 'contain'}}
                          />
                    )}
                    {selections.speaker && selections.roomType !== 'medium' && (
                         <Image 
                           src={`https://resurgent.co.in/room-configurator/images/${selections.roomType}/speaker/${selections.speaker}-speaker.webp`}
                           alt="Speaker" fill style={{objectFit: 'contain'}}
                          />
                    )}
                     {selections.microphone && (
                         <Image 
                           src="https://resurgent.co.in/room-configurator/images/large/micro/shure-microphone.webp"
                           alt="Microphone" fill style={{objectFit: 'contain'}}
                          />
                    )}
                 </div>
             </div>
        </motion.div>
    )
}

const QuoteForm = ({ onBack, onSubmit, selections, setFormValue, formValues, totalSteps }: { 
    onBack: () => void; 
    onSubmit: () => void; 
    selections: Record<string, any>;
    setFormValue: (field: string, value: string) => void;
    formValues: Record<string, string>;
    totalSteps: number;
}) => {
    
    const getSelectedItem = (category: EquipmentCategory, id: string | undefined): EquipmentItem | undefined => {
        if (!id) return undefined;
        return equipmentOptions[category].find(item => item.id === id);
    };

    const selectedRoom = roomSizes.find(r => r.value === selections.roomType);
    const selectedVCs = selections.vc.map((vcValue: string) => vcOptions.find(v => v.value === vcValue)?.label).filter(Boolean);

    const animationVariants = {
        table: { initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } } },
        display: { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.4 } } },
        camera: { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.6 } } },
        touchpad: { initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.8 } } },
        speaker: { initial: { opacity: 0, scale: 0.5 }, animate: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 1.0 } } },
        microphone: { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 1.2 } } },
        roof: { initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 0.5, delay: 1.0 } } }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit();
    }

    return (
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{duration: 0.5}}>
            <div className="text-center">
                <StepIndicator current={totalSteps} total={totalSteps} />
                <h2 className="heading-2 mt-4">Your Room Configuration</h2>
            </div>
            
            <form onSubmit={handleSubmit}>
                <div className="grid lg:grid-cols-2 gap-8 mt-8 items-start">
                    {/* Visual Summary */}
                    <div className="lg:col-span-1">
                        <Card className="p-6 bg-background/90 backdrop-blur-sm">
                            <h3 className="heading-3 text-secondary mb-6 text-center">Visual Summary</h3>
                            <div className="relative w-full h-96 bg-background rounded-lg overflow-hidden border border-border/50">
                                {selections.roomType && (
                                    <Image 
                                        src={`https://resurgent.co.in/room-configurator/images/${selections.roomType}/wall.webp`}
                                        alt="Selected Room" 
                                        fill
                                        style={{objectFit:"cover"}}
                                        className="opacity-40"
                                    />
                                )}
                                <div className="absolute inset-0 bg-black/20"></div>
                                <AnimatePresence>
                                     {selections.table && (
                                        <motion.div key="table" className="absolute w-full h-full" {...animationVariants.table}>
                                            <Image 
                                                src={`https://resurgent.co.in/room-configurator/images/${selections.roomType}/table/${selections.table}.webp`}
                                                alt="Table" 
                                                fill
                                                style={{objectFit:"contain"}}
                                            />
                                        </motion.div>
                                    )}
                                     {selections.display && (
                                        <motion.div key="display" className="absolute w-full h-full" {...animationVariants.display}>
                                            <Image 
                                                src={`https://resurgent.co.in/room-configurator/images/${selections.roomType}/display/${selections.displayMode}-${selections.display}-display.webp`}
                                                alt="Display" 
                                                fill 
                                                style={{objectFit:"contain"}}
                                                onError={(e) => { (e.target as HTMLImageElement).src = `https://resurgent.co.in/room-configurator/images/${selections.roomType}/display/Single-${selections.display}-display.webp`}}
                                            />
                                        </motion.div>
                                    )}
                                    {selections.camera && (
                                        <motion.div key="camera" className="absolute w-full h-full" {...animationVariants.camera}>
                                            <Image 
                                            src={`https://resurgent.co.in/room-configurator/images/${selections.roomType}/camera/${selections.camera}-camera.webp`}
                                            alt="Camera" fill style={{objectFit: 'contain'}}
                                            />
                                        </motion.div>
                                    )}
                                    {selections.touchpad && (
                                        <motion.div key="touchpad" className="absolute w-full h-full" {...animationVariants.touchpad}>
                                            <Image 
                                            src={`https://resurgent.co.in/room-configurator/images/${selections.roomType}/touchpad/${selections.touchpad}-touchpad.webp`}
                                            alt="Touchpad" fill style={{objectFit: 'contain'}}
                                            />
                                        </motion.div>
                                    )}
                                    {(selections.speaker || selections.microphone) && (
                                        <motion.div key="roof" className="absolute w-full h-full" {...animationVariants.roof}>
                                            <Image 
                                            src={`https://resurgent.co.in/room-configurator/images/${selections.roomType}/roof.webp`}
                                            alt="Roof" fill style={{objectFit: 'contain'}}
                                            />
                                        </motion.div>
                                    )}
                                    {selections.speaker && selections.roomType !== 'medium' && (
                                        <motion.div key="speaker" className="absolute w-full h-full" {...animationVariants.speaker}>
                                            <Image 
                                            src={`https://resurgent.co.in/room-configurator/images/${selections.roomType}/speaker/${selections.speaker}-speaker.webp`}
                                            alt="Speaker" fill style={{objectFit: 'contain'}}
                                            />
                                        </motion.div>
                                    )}
                                    {selections.microphone && (
                                        <motion.div key="microphone" className="absolute w-full h-full" {...animationVariants.microphone}>
                                            <Image 
                                            src="https://resurgent.co.in/room-configurator/images/large/micro/shure-microphone.webp"
                                            alt="Microphone" fill style={{objectFit: 'contain'}}
                                            />
                                        </motion.div>
                                    )}
                                    {selections.boothType && (
                                        <motion.div key="booth" className="absolute w-full h-full" {...animationVariants.table}>
                                            <Image 
                                                src="https://resurgent.co.in/room-configurator/images/booth/table/dual.webp"
                                                alt="Booth" 
                                                fill
                                                style={{objectFit:"contain"}}
                                            />
                                        </motion.div>
                                    )}
                                    {selections.desktop && (
                                        <motion.div key="desktop" className="absolute w-full h-full" {...animationVariants.camera}>
                                            <Image 
                                                src={`https://resurgent.co.in/room-configurator/images/booth/desktop-conferencing/${selections.desktop}.webp`}
                                                alt="Desktop Conferencing" 
                                                fill
                                                style={{objectFit:"contain"}}
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </Card>
                    </div>
                    
                    {/* Details & Form */}
                    <div className="lg:col-span-1">
                        <Card className="bg-background/90 backdrop-blur-sm">
                            <CardHeader>
                                <h3 className="heading-3 text-secondary">Summary &amp; Quote</h3>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {selectedRoom && (
                                    <div className="font-bold">Room Size: <span className="font-normal text-muted-foreground">{selectedRoom.label}</span></div>
                                )}
                                {selectedVCs.length > 0 && (
                                    <div className="font-bold">VC System: <span className="font-normal text-muted-foreground">{selectedVCs.join(', ')}</span></div>
                                )}
                                {selections.boothType && (
                                    <div className="font-bold">Booth Type: <span className="font-normal text-muted-foreground">Dual Seater</span></div>
                                )}
                                {selections.desktop && (
                                    <div className="font-bold">Desktop Solution: <span className="font-normal text-muted-foreground">{selections.desktop.charAt(0).toUpperCase() + selections.desktop.slice(1)}</span></div>
                                )}
                                {Object.entries(selections).map(([key, value]) => {
                                   if (!value || typeof value === 'object' || ['roomType', 'vc', 'boothType', 'desktop'].includes(key)) return null;
                                   if (key === 'speaker' && selections.roomType === 'medium') return null; // Hide speaker for medium rooms
                                   
                                   let item;
                                    try {
                                        item = getSelectedItem(key as EquipmentCategory, value as string) || {brand: '', name: value};
                                    } catch (e) {
                                        item = {brand: '', name: value};
                                    }

                                   return (
                                        <div key={key} className="font-bold capitalize">{key}: <span className="font-normal text-muted-foreground">{item.brand ? `${item.brand} - ${item.name}` : item.name}</span></div>
                                   )
                                })}
                            
                                <hr className="my-4 border-border" />
                                
                                <p className="text-muted-foreground text-sm">Fill in your details and we'll get back to you.</p>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Name</label>
                                    <Input placeholder="Your Name" value={formValues.name} onChange={(e) => setFormValue('name', e.target.value)} required={true}/>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Email</label>
                                    <Input type="email" placeholder="Your Email" value={formValues.email} onChange={(e) => setFormValue('email', e.target.value)} required={true}/>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Company (Optional)</label>
                                    <Input placeholder="Your Company" value={formValues.company} onChange={(e) => setFormValue('company', e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Additional Notes (Optional)</label>
                                    <Textarea placeholder="Any specific requirements..." value={formValues.notes} onChange={(e) => setFormValue('notes', e.target.value)} />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="mt-8 flex justify-center gap-4">
                    <Button onClick={onBack} size="lg" variant="outline">Back</Button>
                    <Button type="submit" size="lg" className="font-headline btn-glow">Get My Quote</Button>
                </div>
            </form>
        </motion.div>
    );
};

export default function RoomConfiguratorPage() {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [step, setStep] = useState(0); // 0:home, 1:room, 2:vc, 3:booth-type, 4:desktop, 5:config, 6:quote
  const { toast } = useToast();

  const [selections, setSelections] = useState({
    roomType: "",
    vc: [],
    boothType: "",
    desktop: "",
    table: "",
    display: "",
    displayMode: "Single" as 'Single' | 'Dual',
    camera: "",
    projector: "",
    speaker: "",
    microphone: "",
    touchpad: "",
  })

  const [formValues, setFormValues] = useState({
      name: "",
      email: "",
      company: "",
      notes: "",
  })

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getTotalSteps = () => {
    const baseSteps = 2; // Home, Room
    if (!selections.roomType) return 3;
    const roomType = selections.roomType;
    
    if (roomType === 'booth') {
      return 5; // Home, Room, VC, Booth Type, Desktop, Quote
    }
    
    let configSteps = 0;
    if (roomType === 'large') configSteps = 6;
    else if (roomType === 'medium') configSteps = 4;
    else if (roomType === 'huddle') configSteps = 4;
    
    return baseSteps + 1 + configSteps; // +1 for VC step
  };

  const totalSteps = getTotalSteps();

  const handleSetSelections = (newSelections: Record<string, any>) => {
    setSelections(prev => ({...prev, ...newSelections}))
  }
  
  const handleSetFormValue = (field: string, value: string) => {
      setFormValues(prev => ({...prev, [field]: value}));
  }

  const handleNext = () => {
    let nextStep = step + 1;
    
    // For booth, handle special flow
    if (selections.roomType === 'booth') {
      if (step === 2) nextStep = 3; // VC to Booth Type
      if (step === 3) nextStep = 4; // Booth Type to Desktop
      if (step === 4) nextStep = 5; // Desktop to Quote
    }
    
    setStep(Math.min(nextStep, 5));
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    let prevStep = step - 1;
    
    // For booth, handle back navigation properly
    if (selections.roomType === 'booth') {
      if (step === 5) prevStep = 4; // Quote to Desktop
      if (step === 4) prevStep = 3; // Desktop to Booth Type
      if (step === 3) prevStep = 2; // Booth Type to VC
    }
    
    setStep(Math.max(prevStep, 0));
    window.scrollTo(0, 0);
  };
  
  const handleSubmit = () => {
    console.log({
        ...selections,
        contact: formValues,
    });
    toast({
      title: "Quote Request Sent!",
      description: "Thank you. We will get back to you shortly.",
    });
    // Reset state
    setStep(0);
    setSelections({ roomType: "", vc: [], boothType: "", desktop: "", table: "", display: "", displayMode: 'Single', camera: "", projector: "", speaker: "", microphone: "", touchpad: ""});
    setFormValues({ name: "", email: "", company: "", notes: ""});
  };

  if (!isMounted) {
    return null;
  }

  const handleConfigNext = () => {
      setStep(5);
  }

  return (
     <div className="flex flex-col min-h-screen relative">
      {/* Background Layer */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/assets/team-bg.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-pink-500 opacity-30 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-blue-600 opacity-30 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>
      <Header />
      <main className="flex-grow pt-20">
        <section className="section-padding bg-card/0  min-h-[80vh] flex items-center">
          <div className="container-max">
            <AnimatePresence mode="wait">
                {step === 0 && <Home key="step0" onNext={handleNext} />}
                {step === 1 && (
                    <RoomSizeSelector 
                        key="step1" 
                        onNext={handleNext}
                        onBack={handleBack}
                        selected={selections.roomType}
                        setSelected={(value) => handleSetSelections({roomType: value, boothType: '', desktop: '', table: '', display: '', camera: '', touchpad: '', speaker: '', microphone: ''})}
                        totalSteps={totalSteps}
                    />
                )}
                {step === 2 && (
                    <VcSelector 
                        key="step2"
                        onNext={handleNext}
                        onBack={handleBack}
                        selected={selections.vc}
                        setSelected={(value) => handleSetSelections({vc: value})}
                        totalSteps={totalSteps}
                    />
                )}
                {step === 3 && selections.roomType === 'booth' && (
                    <BoothTypeSelector 
                        key="step3-booth"
                        onNext={handleNext}
                        onBack={handleBack}
                        selected={selections.boothType}
                        setSelected={(value) => handleSetSelections({boothType: value})}
                        totalSteps={totalSteps}
                    />
                )}
                {step === 4 && selections.roomType === 'booth' && (
                    <DesktopConferencingSelector 
                        key="step4-desktop"
                        onNext={handleNext}
                        onBack={handleBack}
                        selected={selections.desktop}
                        setSelected={(value) => handleSetSelections({desktop: value})}
                        totalSteps={totalSteps}
                    />
                )}
                {step === 3 && selections.roomType !== 'booth' && (
                    <Configurator 
                        key="step3-config" 
                        onNext={handleConfigNext} 
                        onBack={handleBack} 
                        selections={selections}
                        setSelections={handleSetSelections}
                        totalSteps={totalSteps}
                    />
                )}
                {step === 5 && (
                    <QuoteForm 
                        key="step5" 
                        onBack={handleBack} 
                        onSubmit={handleSubmit}
                        selections={selections}
                        setFormValue={handleSetFormValue}
                        formValues={formValues}
                        totalSteps={totalSteps}
                    />
                )}
            </AnimatePresence>
          </div>
        </section>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}