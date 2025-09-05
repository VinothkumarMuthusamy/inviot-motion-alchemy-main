
"use client";

import { solutions, Solution } from "./solutions-data";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { AnimateInView } from "@/components/ui/animate-in-view";

const SolutionDetailPage = ({ slug }: { slug: string }) => {
  const solution = solutions.find((s) => s.slug === slug);

  if (!solution) {
    notFound();
  }

  const scrollToContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const contactElement = document.getElementById("contact");
    if (contactElement) {
        contactElement.scrollIntoView({ behavior: "smooth" });
    } else {
        window.location.href = '/#contact';
    }
  };

  return (
    <div>
      <section className="section-padding pt-32 bg-card">
        <div className="container-max">
          <AnimateInView>
            <h1 className="heading-1 text-primary">{solution.title}</h1>
            <p className="mt-4 text-xl text-foreground/70 max-w-4xl">
              {solution.description}
            </p>
          </AnimateInView>
        </div>
      </section>

      {solution.sections.map((section, index) => (
        <section
          key={index}
          className={`section-padding ${section.bgColor === 'card' ? 'bg-card' : 'bg-background'}`}
        >
          <div className="container-max">
            {section.type === 'image-right' && (
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <AnimateInView>
                  <h2 className="heading-2">{section.title}</h2>
                  <p className="mt-6 text-foreground/70 leading-relaxed">{section.content}</p>
                </AnimateInView>
                <AnimateInView delay={200}>
                  <Image
                    src={section.image.src}
                    alt={section.image.alt}
                    data-ai-hint={section.image.hint}
                    width={600}
                    height={400}
                    className="rounded-lg shadow-xl w-full h-auto"
                  />
                </AnimateInView>
              </div>
            )}
            {section.type === 'centered-text' && (
              <AnimateInView className="text-center max-w-4xl mx-auto">
                <h2 className="heading-2">{section.title}</h2>
                <p className="mt-6 text-xl text-foreground/70 leading-relaxed">{section.content}</p>
              </AnimateInView>
            )}
            {section.type === 'feature-list-image' && (
               <div className="grid lg:grid-cols-2 gap-12 items-center">
                 <AnimateInView className={section.image ? 'lg:order-last' : ''}>
                   <h2 className="heading-2">{section.title}</h2>
                   <p className="mt-6 text-foreground/70 leading-relaxed">{section.content}</p>
                   <ul className="mt-6 space-y-4">
                     {section.features?.map((feature, i) =>(
                       <li key={i} className="flex items-start gap-3">
                         <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                         <span className="text-foreground/80">{feature}</span>
                       </li>
                     ))}
                   </ul>
                 </AnimateInView>
                 {section.image && (
                    <AnimateInView delay={200}>
                        <Image
                            src={section.image.src}
                            alt={section.image.alt}
                            data-ai-hint={section.image.hint}
                            width={600}
                            height={400}
                            className="rounded-lg shadow-xl w-full h-auto"
                        />
                    </AnimateInView>
                 )}
               </div>
            )}
          </div>
        </section>
      ))}

      <section className="section-padding bg-card">
        <div className="container-max text-center">
          <AnimateInView>
            <h2 className="heading-2 max-w-3xl mx-auto">{solution.cta.title}</h2>
            {solution.cta.subtitle && (
                <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
                    {solution.cta.subtitle}
                </p>
            )}
            <Button size="lg" className="mt-8 font-headline btn-glow" onClick={scrollToContact}>
              {solution.cta.buttonText}
            </Button>
          </AnimateInView>
        </div>
      </section>
    </div>
  );
};

export default SolutionDetailPage;
