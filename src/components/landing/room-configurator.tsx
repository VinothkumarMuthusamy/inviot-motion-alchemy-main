import { AnimateInView } from "@/components/ui/animate-in-view";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ImageAssembly from "./ImageAssembly";

const RoomConfigurator = () => {
  return (
    <section className="section-padding bg-card">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <ImageAssembly />
          </div>
          <AnimateInView>
            <div className="text-left">
              <h2 className="heading-2 text-primary">
                Configure your meeting spaces with
              </h2>
              <h3 className="mt-4 font-headline text-4xl md:text-5xl font-bold uppercase tracking-[0.05em] text-secondary">
                Inviot Room Configurator
              </h3>
              <div className="mt-8">
                <Button size="lg" asChild className="font-headline btn-glow">
                  <Link href="/room-configurator">Build your room now</Link>
                </Button>
              </div>
            </div>
          </AnimateInView>
        </div>
      </div>
    </section>
  );
};

export default RoomConfigurator;