import { AnimateInView } from "@/components/ui/animate-in-view";
import { Award } from "lucide-react";

const Experience = () => {
  return (
    <section className="section-padding">
      <div className="container-max">
        <AnimateInView className="flex flex-col items-center text-center">
            <Award className="w-16 h-16 text-secondary mb-6" />
            <h2 className="heading-2">
                Decades of Expertise
            </h2>
            <p className="mt-8 max-w-4xl text-xl md:text-2xl text-foreground/80 text-balance leading-relaxed">
            As a leading design and engineering integration firm in audiovisual technology, we bring over 20 years of rich industry experience to every project. Our seasoned team of experts is dedicated to delivering state-of-the-art solutions that are not only innovative but also reliable and user-friendly. We pride ourselves on a legacy of excellence, having successfully executed countless projects for a diverse range of clients worldwide.
            </p>
        </AnimateInView>
      </div>
    </section>
  );
};

export default Experience;
