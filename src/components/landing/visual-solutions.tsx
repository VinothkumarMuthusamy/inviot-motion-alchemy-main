'use client';

import { AnimateInView } from '@/components/ui/animate-in-view';
import ProfileCard from './ProfileCard';

const industries = [
  {
    name: 'Hospitality',
    image: 'https://picsum.photos/800/1200?random=1',
    title: 'Luxury & Comfort',
  },
  {
    name: 'Corporate',
    image: 'https://picsum.photos/1200/800?random=5',
    title: 'Sleek & Professional',
  },
  {
    name: 'Retail',
    image: 'https://picsum.photos/800/800?random=2',
    title: 'Modern & Inviting',
  },
  {
    name: 'Education',
    image: 'https://picsum.photos/800/800?random=3',
    title: 'Interactive Learning',
  },
  {
    name: 'Control Room',
    image: 'https://picsum.photos/1200/800?random=4',
    title: 'Mission Critical',
  },
   {
    name: 'Sports',
    image: 'https://picsum.photos/800/800?random=6',
    title: 'Dynamic & Energetic',
  },
];

const VisualSolutions = () => {
  return (
    <section className="pt-12 pb-16 bg-background md:pt-16 md:pb-20">
      <div className="container-max">
        <AnimateInView className="text-center mb-8 md:mb-12">
          <h2 className="heading-2">Your Sector, Our AV Expertise</h2>
          <p className="mt-4 text-xl text-foreground/70 max-w-3xl mx-auto">
            Visual transformation for Businesses and Institutions. We provide cutting-edge display solutions tailored for every sector.
          </p>
        </AnimateInView>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {industries.map((industry, index) => (
            <AnimateInView
              key={industry.name}
              delay={index * 100}
              className="w-full flex justify-center"
            >
              <ProfileCard
                  avatarUrl={industry.image}
                  name={industry.name}
                  title={industry.title}
                  showUserInfo={false}
              />
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisualSolutions;