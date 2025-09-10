'use client';

import { AnimateInView } from '@/components/ui/animate-in-view';
import ProfileCard from './ProfileCard';

const industries = [
  {
    name: 'Retail',
    image: '/assets/visualpageimg/Retail.jpg',
    title: 'Modern & Inviting',
  },
  
  {
    name: 'Corporate',
    image: '/assets/visualpageimg/Corporate.jpg',
    title: 'Sleek & Professional',
  },
  {
    name: 'Control Room',
    image: '/assets/visualpageimg/Control rooms.jpg',
    title: 'Mission Critical',
  },
  {
    name: 'Education',
    image: '/assets/visualpageimg/Education.jpg',
    title: 'Interactive Learning',
  },
  
  {
    name: 'Hospitality',
    image: '/assets/visualpageimg/Hospitality.jpg',
    title: 'Luxury & Comfort',
  },
   {
    name: 'Sports',
    image: '/assets/visualpageimg/Sports (2).jpg',
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