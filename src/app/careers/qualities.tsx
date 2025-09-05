import { AnimateInView } from "@/components/ui/animate-in-view";
import { Card, CardContent } from "@/components/ui/card";
import { BrainCircuit, Zap, Users, Cpu, Gem } from "lucide-react";

const qualities = [
    {
        icon: BrainCircuit,
        text: "Intellectual curiosity and a passion for learning",
    },
    {
        icon: Zap,
        text: "Ability to work in a fast-paced environment",
    },
    {
        icon: Users,
        text: "Ability to work independently and collaboratively",
    },
    {
        icon: Cpu,
        text: "A strong understanding of technology is required, as we use it extensively at every stage of the process.",
    },
    {
        icon: Gem,
        text: "A passion for quality craftsmanship is also essential, as we take pride in our projects and are always striving to improve them.",
    },
];

const Qualities = () => {
    return (
        <div className="bg-card p-8 rounded-lg">
            <h2 className="heading-2 text-secondary text-center mb-8">How to be part of Inviot?</h2>
            <div className="grid gap-6">
                {qualities.map((quality, index) => (
                    <AnimateInView key={index} delay={index * 150}>
                        <Card className="bg-background border-border/50">
                            <CardContent className="p-6 flex items-center gap-4">
                                <quality.icon className="w-10 h-10 text-primary flex-shrink-0" />
                                <p className="text-foreground/80">{quality.text}</p>
                            </CardContent>
                        </Card>
                    </AnimateInView>
                ))}
            </div>
        </div>
    );
};

export default Qualities;
