'use client';

import { AnimateInView } from '@/components/ui/animate-in-view';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

const industries = [
  {
    name: 'Retail',
    image: '/assets/visualpageimg/Retail.jpg',
    title: 'Modern & Inviting',
    hint: 'retail store display'
  },
  
  {
    name: 'Corporate',
    image: '/assets/visualpageimg/Corporate.jpg',
    title: 'Sleek & Professional',
    hint: 'modern office interior'
  },
  {
    name: 'Control Room',
    image: '/assets/visualpageimg/Control rooms.jpg',
    title: 'Mission Critical',
    hint: 'command center screens'
  },
  {
    name: 'Education',
    image: '/assets/visualpageimg/Education.jpg',
    title: 'Interactive Learning',
    hint: 'classroom technology'
  },
  
  {
    name: 'Hospitality',
    image: '/assets/visualpageimg/Hospitality.jpg',
    title: 'Luxury & Comfort',
    hint: 'luxury hotel lobby'
  },
   {
    name: 'Sports',
    image: '/assets/visualpageimg/Sports (2).jpg',
    title: 'Dynamic & Energetic',
    hint: 'sports stadium'
  },
];

const VisualSolutions = () => {
  return (
    <section className="section-padding bg-transparent">
      <div className="container-max">
        <AnimateInView className="text-center mb-12 md:mb-16">
          <h2 className="heading-2">Your Sector, Our AV Expertise</h2>
          <p className="mt-4 text-xl text-foreground/70 max-w-3xl mx-auto">
            Visual transformation for Businesses and Institutions. We provide cutting-edge display solutions tailored for every sector.
          </p>
        </AnimateInView>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => (
            <AnimateInView
              key={industry.name}
              delay={index * 100}
            >
              <Card className="visual-solution-card group overflow-hidden">
                  <Image
                      src={industry.image}
                      alt={industry.name}
                      width={800}
                      height={800}
                      data-ai-hint={industry.hint}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <CardContent className="absolute bottom-0 left-0 right-0 p-6 z-10 text-center">
                      <h3 className="text-3xl font-extrabold text-white group-hover:text-primary transition-colors duration-300">{industry.name}</h3>
                      <p className="text-white/90 text-xl font-bold mt-1">{industry.title}</p>
                  </CardContent>
              </Card>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisualSolutions;
