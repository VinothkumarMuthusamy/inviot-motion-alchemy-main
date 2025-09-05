import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";
import { AnimateInView } from "@/components/ui/animate-in-view";
import Qualities from "./qualities";

const Careers = () => {
    return (
      <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
              <section className="section-padding pt-32 bg-card">
                  <div className="container-max">
                      <AnimateInView>
                          <h1 className="heading-1 text-primary">Career with us</h1>
                          <p className="mt-4 text-lg text-foreground/70 leading-relaxed max-w-4xl">
                            It's a good day to join a reputed company in Pro AV. Today, professional ambition is as much about making a meaningful impact on the world as it is about fulfilling your own goals. Inviot is a leading AV integration company looking for bright, career-oriented individuals to complement our team. Working at Inviot gives you the chance to develop new skills in a dynamic environment and make a difference in people's lives across the globe.
                          </p>
                      </AnimateInView>
                  </div>
              </section>

              <section className="section-padding">
                <div className="container-max grid lg:grid-cols-2 gap-12 items-center">
                    <AnimateInView>
                        <h2 className="heading-2">Culture</h2>
                        <div className="space-y-4 mt-6 text-foreground/70 leading-relaxed">
                            <p>Our company values are our guiding principles for what we do and how we do it.</p>
                            <p>At Inviot, we value our people. Our employees are our most valuable asset, and we are committed to developing them for their growth and success. We value learning and continual development because it is essential for everyone to be able to do their best work in the future.</p>
                            <p>When you work on projects with us, we want you to feel comfortable asking questions; this will help you become more independent with your own responsibilities.</p>
                            <p>We value your professional development because we believe that this is one of the most important things you can do for yourself: learn more about how to do your job well so that you are an asset to others. We also recognize the importance of communicating effectively with others—especially when working on projects with clients.</p>
                            <p>Inviot follows a transparent approach internally and externally—to all aspects of Inviot's operations, including marketing efforts and business partnerships with other companies in the industry. We are open, honest and approachable. We communicate with all aspects of our operations and services to ensure that every client receives optimal service.</p>
                            <p>We also focus on diversity on the team and are committed to creating an inclusive environment where everyone feels welcomed and included regardless of gender or ethnicity.</p>
                        </div>
                    </AnimateInView>
                    <AnimateInView delay={200} className="self-start">
                        <Qualities />
                    </AnimateInView>
                </div>
              </section>

          </main>
          <Footer />
      </div>
    );
  };
  
  export default Careers;