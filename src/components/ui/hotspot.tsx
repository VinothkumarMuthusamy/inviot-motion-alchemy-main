
'use client';
import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { AnimateInView } from './animate-in-view';
import type { HotspotSlide } from '@/app/solutions/solutions-data';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from './button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"


const HotspotPoint = ({ hotspot, onOpenModal }: { hotspot: HotspotSlide['hotspots'][0]; onOpenModal: () => void }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleClick = (e: React.MouseEvent) => {
        if (isMobile) {
            e.preventDefault();
            onOpenModal();
        }
    }

    return (
        <>
            <div className="hotspot" style={{ top: hotspot.position.top, left: hotspot.position.left }}>
                <button
                    className="hotspot__circle"
                    onClick={handleClick}
                    aria-label={`More info about ${hotspot.title}`}
                >
                    +
                </button>
                <div className="hotspot-content">
                     <h3 className="font-bold text-secondary">{hotspot.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{hotspot.description}</p>
                    <ul className="mt-2 text-xs space-y-1 list-disc list-inside">
                       {hotspot.details.slice(0, 3).map((detail, i) => <li key={i}>{detail}</li>)}
                    </ul>
                     <Button variant="link" asChild className="p-0 h-auto mt-2 text-xs">
                        <Link href={hotspot.link} target="_blank">Learn more <ArrowRight className="w-3 h-3 ml-1" /></Link>
                    </Button>
                </div>
            </div>
        </>
    );
};

const HotspotCarousel = ({ title, description, slides }: { title: string; description: string; slides: HotspotSlide[] }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel();
    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedHotspot, setSelectedHotspot] = useState<HotspotSlide['hotspots'][0] | null>(null);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    const onSelect = useCallback((api: any) => {
        if (!api) return;
        setPrevBtnDisabled(!api.canScrollPrev());
        setNextBtnDisabled(!api.canScrollNext());
    }, []);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect(emblaApi);
        emblaApi.on('reInit', onSelect);
        emblaApi.on('select', onSelect);
    }, [emblaApi, onSelect]);

    const handleOpenModal = (hotspot: HotspotSlide['hotspots'][0]) => {
        setSelectedHotspot(hotspot);
        setIsModalOpen(true);
    };

    return (
        <div className="flex flex-col items-center">
             <AnimateInView className="text-center max-w-4xl mx-auto mb-12">
                <h2 className="heading-2">{title}</h2>
                <p className="mt-6 text-foreground/70 leading-relaxed">{description}</p>
            </AnimateInView>
            
            <div className="w-full max-w-5xl mx-auto">
                <div className="overflow-hidden rounded-lg shadow-lg border border-border/20" ref={emblaRef}>
                    <div className="flex">
                        {slides.map((slide, index) => (
                            <div className="relative flex-[0_0_100%] aspect-video" key={index}>
                                <Image
                                    src={slide.image.src}
                                    alt={slide.image.alt}
                                    data-ai-hint={slide.image.hint}
                                    fill
                                    className="object-contain"
                                />
                                {slide.hotspots.map((hotspot, hsIndex) => (
                                    <HotspotPoint key={hsIndex} hotspot={hotspot} onOpenModal={() => handleOpenModal(hotspot)} />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {slides.length > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-8">
                        <Button variant="outline" size="icon" onClick={scrollPrev} disabled={prevBtnDisabled}>
                            <ArrowLeft className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={scrollNext} disabled={nextBtnDisabled}>
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </div>
                )}
            </div>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                    {selectedHotspot && (
                        <>
                            <DialogHeader>
                                <DialogTitle>{selectedHotspot.title}</DialogTitle>
                                <DialogDescription>{selectedHotspot.description}</DialogDescription>
                            </DialogHeader>
                            <ul className="mt-4 space-y-1 list-disc list-inside text-sm">
                                {selectedHotspot.details.map((detail, i) => (
                                    <li key={i}>{detail}</li>
                                ))}
                            </ul>
                            <Button variant="default" asChild className="mt-4 w-full">
                                <Link href={selectedHotspot.link || '#'} target="_blank">Learn more <ArrowRight className="w-4 h-4 ml-2" /></Link>
                            </Button>
                        </>
                    )}
                </DialogContent>
            </Dialog>

        </div>
    );
};

export default HotspotCarousel;
