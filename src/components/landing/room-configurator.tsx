import { AnimateInView } from "@/components/ui/animate-in-view";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ImageAssembly from "./ImageAssembly";
import Image from "next/image";

const RoomConfigurator = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background Layer - relative to section */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/team-bg.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-pink-500 opacity-30 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-blue-600 opacity-30 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      <div className="container-max relative z-10">
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