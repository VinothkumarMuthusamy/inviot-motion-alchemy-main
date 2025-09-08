
'use client';
import { AnimateInView } from "./animate-in-view";
import Image from "next/image";

interface Feature {
    icon: string;
    title: string;
    description: string;
}

const FeatureList = ({ features }: { features: Feature[] }) => {
    return (
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {features.map((feature, index) => (
                <AnimateInView key={index} delay={index * 150}>
                    <div className="text-center md:text-left flex flex-col md:flex-row items-center md:items-start gap-4">
                        <Image
                            src={feature.icon}
                            alt=""
                            width={100}
                            height={100}
                            className="w-20 h-20 md:w-24 md:h-24 object-contain flex-shrink-0"
                        />
                        <div className="mt-4 md:mt-0">
                            <h3 className="heading-3 text-xl text-secondary">{feature.title}</h3>
                            <p className="mt-2 text-foreground/70">{feature.description}</p>
                        </div>
                    </div>
                </AnimateInView>
            ))}
        </div>
    );
};

export default FeatureList;
