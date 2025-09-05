import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";
import { AnimateInView } from "@/components/ui/animate-in-view";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import officeImage from "@/image/i1.jpg";
const blogPosts = [
  {
    title: "Keep your expensive AV Equipment in Top Shape",
    date: "April 29, 2022",
    author: "Inviot",
    image: officeImage,
    hint: "av equipment maintenance",
    excerpt: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam...",
    href: "#"
  },
  {
    title: "The Future of Collaboration: Hybrid Workspaces",
    date: "April 22, 2022",
    author: "Inviot",
    image: officeImage,
    hint: "hybrid work meeting",
    excerpt: "Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim...",
    href: "#"
  },
  {
    title: "Creating Immersive Experiences with Digital Signage",
    date: "April 15, 2022",
    author: "Inviot",
    image: officeImage,
    hint: "interactive digital signage",
    excerpt: "Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit...",
    href: "#"
  },
    {
    title: "Revolutionizing Education with Digital Classrooms",
    date: "April 8, 2022",
    author: "Inviot",
    image: officeImage,
    hint: "student using tablet",
    excerpt: "Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate...",
    href: "#"
  },
];

const Blogs = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="section-padding pt-32 bg-card">
          <div className="container-max text-center">
            <AnimateInView>
              <h1 className="heading-1 text-primary">Blog</h1>
              <p className="mt-4 text-xl text-foreground/70">
                We bring you the latest in audio and visual that can help improve your business or home.
              </p>
            </AnimateInView>
          </div>
        </section>

        <section className="section-padding">
            <div className="container-max">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
                        <AnimateInView key={index} delay={index * 150} className="h-full flex">
                            <Link href={post.href} className="w-full">
                                <Card className="h-full group overflow-hidden bg-card border-border/50 hover:border-primary transition-all duration-300 flex flex-col">
                                    <CardHeader className="p-0">
                                        <div className="overflow-hidden">
                                            <Image 
                                                src={post.image}
                                                alt={post.title}
                                                width={600}
                                                height={400}
                                                data-ai-hint={post.hint}
                                                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-6 flex-grow">
                                        <h3 className="heading-3 text-lg text-secondary group-hover:text-primary transition-colors">{post.title}</h3>
                                        <p className="mt-4 text-foreground/70">{post.excerpt}</p>
                                    </CardContent>
                                    <CardFooter className="p-6 pt-0 mt-auto">
                                        <div className="flex items-center text-sm text-muted-foreground">
                                            <CalendarDays className="w-4 h-4 mr-2" />
                                            <span>{post.author} on {post.date}</span>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </Link>
                        </AnimateInView>
                    ))}
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blogs;