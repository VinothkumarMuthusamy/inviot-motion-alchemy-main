'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft } from 'lucide-react';

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
    { 
      id: 'proj1', 
      name: 'Epson EB-1781W', 
      brand: 'Epson',
      image: '/images/epson-projector.png'
    },
    { 
      id: 'proj2', 
      name: 'Sony VPL-HW45ES', 
      brand: 'Sony',
      image: '/images/sony-projector.png'
    },
    { 
      id: 'proj3', 
      name: 'BenQ HT3550', 
      brand: 'BenQ',
      image: '/images/benq-projector.png'
    },
  ],
  speaker: [
    { 
      id: 'spk1', 
      name: 'Bose FreeSpace 51', 
      brand: 'Bose',
      image: '/images/bose-speaker.png'
    },
    { 
      id: 'spk2', 
      name: 'JBL Control 25-1L', 
      brand: 'JBL',
      image: '/images/jbl-speaker.png'
    },
    { 
      id: 'spk3', 
      name: 'Yamaha VXS10', 
      brand: 'Yamaha',
      image: '/images/yamaha-speaker.png'
    },
  ],
  display: [
    { 
      id: 'disp1', 
      name: 'Samsung QM85B', 
      brand: 'Samsung',
      image: '/images/samsung-display.png'
    },
    { 
      id: 'disp2', 
      name: 'LG 86UR8000', 
      brand: 'LG',
      image: '/images/lg-display.png'
    },
    { 
      id: 'disp3', 
      name: 'Sony FW-85BZ40L', 
      brand: 'Sony',
      image: '/images/sony-display.png'
    },
  ],
  microphone: [
    { 
      id: 'mic1', 
      name: 'Shure MXA910', 
      brand: 'Shure',
      image: '/images/shure-mic.png'
    },
    { 
      id: 'mic2', 
      name: 'Sennheiser TeamConnect Ceiling 2', 
      brand: 'Sennheiser',
      image: '/images/sennheiser-mic.png'
    },
    { 
      id: 'mic3', 
      name: 'Audio-Technica ATND1061', 
      brand: 'Audio-Technica',
      image: '/images/audio-technica-mic.png'
    },
  ],
};

type SelectedEquipment = {
  [key in keyof EquipmentOptions]?: string;
};

export default function RoomConfiguratorPage() {
  const [selectedEquipment, setSelectedEquipment] = useState<SelectedEquipment>({});
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isAssembled, setIsAssembled] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Set mounted state after hydration
  useEffect(() => {
    setIsMounted(true);
    
    // Clean up any fdprocessedid attributes that might have been added by extensions
    const cleanupAttributes = () => {
      document.querySelectorAll('[fdprocessedid]').forEach(el => {
        el.removeAttribute('fdprocessedid');
      });
    };
    
    // Run cleanup after a short delay
    const timer = setTimeout(cleanupAttributes, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAssembled(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.8 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [isMounted]);

  const handleSelect = (category: keyof EquipmentOptions, id: string) => {
    setSelectedEquipment(prev => ({
      ...prev,
      [category]: id
    }));
    setIsAssembled(false);
    setTimeout(() => setIsAssembled(true), 100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let emailBody = `New Room Configuration Quote Request:\n\n`;
    emailBody += `Name: ${name}\n`;
    emailBody += `Email: ${email}\n`;
    emailBody += `Company: ${company}\n\n`;
    emailBody += `Selected Equipment:\n`;
    
    Object.entries(selectedEquipment).forEach(([category, id]) => {
      const items = equipmentOptions[category as keyof EquipmentOptions];
      const selectedItem = items.find(item => item.id === id);
      if (selectedItem) {
        emailBody += `${category.charAt(0).toUpperCase() + category.slice(1)}: ${selectedItem.brand} ${selectedItem.name}\n`;
      }
    });
    
    emailBody += `\nAdditional Notes: ${notes}`;
    
    window.location.href = `mailto:quotes@resurgent.com?subject=Room Configuration Quote Request&body=${encodeURIComponent(emailBody)}`;
    setIsSubmitted(true);
  };

  const getSelectedItem = (category: keyof EquipmentOptions): EquipmentItem | null => {
    const id = selectedEquipment[category];
    if (!id) return null;
    const items = equipmentOptions[category];
    return items.find(item => item.id === id) || null;
  };

  if (!isMounted) {
    return (
      <section className="section-padding bg-card">
        <div className="container-max text-center py-20">
          <div className="animate-pulse">Loading configuration tool...</div>
        </div>
      </section>
    );
  }

  if (isSubmitted) {
    return (
      <section className="section-padding bg-card">
        <div className="container-max text-center py-20">
          <h2 className="heading-2 text-primary mb-4">Thank You!</h2>
          <p className="text-xl mb-8">Your quote request has been submitted. We'll contact you shortly.</p>
          <Button asChild>
            <Link href="/" className="flex items-center justify-center gap-2">
              <ChevronLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="container-max py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-primary font-bold">
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          <div className="text-xl font-bold text-secondary">AV Room Configurator</div>
          <div className="w-24"></div> {/* Spacer for balance */}
        </div>
      </nav>

      <section className="section-padding bg-card">
        <div className="container-max">
          <div className="text-center mb-8">
            <h1 className="heading-2 text-primary">Room Configurator</h1>
            <p className="mt-2 text-lg">Design your perfect AV setup</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {/* Equipment Selection - Compact Sidebar */}
            <div className="md:col-span-1 bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-secondary">Equipment</h3>
              
              <div className="space-y-4">
                {(Object.entries(equipmentOptions) as [keyof EquipmentOptions, EquipmentItem[]][]).map(([category, items]) => (
                  <div key={category}>
                    <label className="block text-sm font-medium mb-1 capitalize">
                      {category}
                    </label>
                    <select
                      className="w-full p-2 text-sm border border-gray-300 rounded-md bg-white"
                      value={selectedEquipment[category] || ''}
                      onChange={(e) => handleSelect(category, e.target.value)}
                    >
                      <option value="">Select {category}</option>
                      {items.map(item => (
                        <option key={item.id} value={item.id}>
                          {item.brand} - {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>

            {/* Room Preview - Main Content Area */}
            <div className="md:col-span-3">
              <div className="bg-white p-6 rounded-lg shadow-md h-full">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-secondary">Room Preview</h3>
                  <div className="text-sm text-gray-500">
                    {Object.keys(selectedEquipment).length > 0 
                      ? `${Object.keys(selectedEquipment).length} items selected` 
                      : 'No equipment selected'}
                  </div>
                </div>

                <div 
                  className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden border border-gray-200"
                  ref={containerRef}
                >
                  {/* Room background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-200">
                    {selectedEquipment.projector || selectedEquipment.display ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-3/4 h-3/4 bg-gray-300 rounded-lg shadow-inner"></div>
                      </div>
                    ) : null}
                  </div>

                  {/* Projector */}
                  {selectedEquipment.projector && (
                    <div className={`absolute w-1/5 top-[5%] left-1/2 transform -translate-x-1/2 transition-all duration-700 ${isAssembled ? 'opacity-100' : 'opacity-0 -translate-y-full'}`}>
                      <div className="relative w-full h-full">
                        <Image
                          src={getSelectedItem('projector')?.image || '/images/placeholder.png'}
                          alt={`${getSelectedItem('projector')?.brand} projector`}
                          fill
                          className="object-contain"
                          sizes="20vw"
                        />
                      </div>
                    </div>
                  )}

                  {/* Display */}
                  {selectedEquipment.display && (
                    <div className={`absolute w-1/3 top-[15%] right-[10%] transition-all duration-700 ${isAssembled ? 'opacity-100' : 'opacity-0 translate-x-full'}`}>
                      <div className="relative w-full h-full">
                        <Image
                          src={getSelectedItem('display')?.image || '/images/placeholder.png'}
                          alt={`${getSelectedItem('display')?.brand} display`}
                          fill
                          className="object-contain"
                          sizes="33vw"
                        />
                      </div>
                    </div>
                  )}

                  {/* Speakers */}
                  {selectedEquipment.speaker && (
                    <>
                      <div className={`absolute w-1/6 bottom-[15%] left-[10%] transition-all duration-700 ${isAssembled ? 'opacity-100' : 'opacity-0 -translate-x-full'}`}>
                        <div className="relative w-full h-full">
                          <Image
                            src={getSelectedItem('speaker')?.image || '/images/placeholder.png'}
                            alt={`${getSelectedItem('speaker')?.brand} speaker left`}
                            fill
                            className="object-contain"
                            sizes="16.6vw"
                          />
                        </div>
                      </div>
                      <div className={`absolute w-1/6 bottom-[15%] right-[10%] transition-all duration-700 ${isAssembled ? 'opacity-100' : 'opacity-0 translate-x-full'}`}>
                        <div className="relative w-full h-full">
                          <Image
                            src={getSelectedItem('speaker')?.image || '/images/placeholder.png'}
                            alt={`${getSelectedItem('speaker')?.brand} speaker right`}
                            fill
                            className="object-contain"
                            sizes="16.6vw"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Microphone */}
                  {selectedEquipment.microphone && (
                    <div className={`absolute w-16 top-[30%] left-[30%] transition-all duration-700 ${isAssembled ? 'opacity-100' : 'opacity-0 translate-y-full'}`}>
                      <div className="relative w-full h-full">
                        <Image
                          src={getSelectedItem('microphone')?.image || '/images/placeholder.png'}
                          alt={`${getSelectedItem('microphone')?.brand} microphone`}
                          fill
                          className="object-contain"
                          sizes="64px"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Quote Request Form - Full width below */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-6 text-secondary">Request a Quote</h3>
            
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Name *</label>
                <input
                  type="text"
                  required
                  className="w-full p-3 border border-gray-300 rounded-md"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Email *</label>
                <input
                  type="email"
                  required
                  className="w-full p-3 border border-gray-300 rounded-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Company</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Selected Equipment</label>
                <div className="bg-gray-50 p-4 rounded-md">
                  {Object.entries(selectedEquipment).length > 0 ? (
                    <ul className="grid grid-cols-2 gap-2">
                      {Object.entries(selectedEquipment).map(([category, id]) => {
                        const items = equipmentOptions[category as keyof EquipmentOptions];
                        const selectedItem = items.find(item => item.id === id);
                        return (
                          <li key={category} className="flex justify-between text-sm">
                            <span className="capitalize font-medium">{category}:</span>
                            <span className="text-right">{selectedItem?.brand} {selectedItem?.name}</span>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No equipment selected yet</p>
                  )}
                </div>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Additional Notes</label>
                <textarea
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
              
              <div className="md:col-span-2">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full font-headline btn-glow"
                  disabled={Object.keys(selectedEquipment).length === 0}
                >
                  Request Quote
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}