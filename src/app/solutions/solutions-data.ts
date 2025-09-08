
import type { LucideIcon } from "lucide-react";

export interface Feature {
    icon: string;
    title: string;
    description: string;
}

export interface Hotspot {
    position: { top: string; left: string; };
    title: string;
    description: string;
    link: string;
    details: string[];
}

export interface HotspotSlide {
    image: { src: string; alt: string; hint: string; };
    hotspots: Hotspot[];
}

export interface Solution {
    slug: string;
    title: string;
    subtitle: string;
    description: string;
    video: string;
    sections: SolutionSection[];
    cta: {
        title: string;
        subtitle?: string;
        buttonText: string;
        image?: string;
    }
}

interface SolutionSection {
    type: 'image-left' | 'image-right' | 'centered-text' | 'feature-list-image' | 'feature-list' | 'hotspot-carousel';
    title: string;
    content?: string;
    image?: {
        src: string;
        alt: string;
        hint: string;
    };
    features?: (string[] | Feature[]);
    hotspots?: HotspotSlide[];
    benefits?: {
        icon: LucideIcon;
        title: string;
        description: string;
    }[];
    bgColor?: 'card' | 'background';
}

export const solutions: Solution[] = [
    {
        slug: "audio-video-collaboration",
        title: "Audio and Video Collaboration",
        subtitle: "Collaborate and communicate seamlessly, anytime and anywhere.",
        video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        description: "With audio and video collaboration becoming essential across industries, empower your employees and clients to share multimedia content and connect more effectively across distances, devices, and platforms.",
        sections: [
            {
                type: 'centered-text',
                title: "Seamless Collaboration, Anywhere",
                content: `<p>Bridge distances and connect teams with state-of-the-art audio and video collaboration tools. Our solutions are designed to be intuitive, reliable, and secure, ensuring that your meetings are productive, whether participants are in the same room or across the globe.</p><p>We integrate hardware and software to create a unified ecosystem that supports everything from one-on-one calls to large-scale virtual events.</p>`,
                image: {
                    src: "/assets/audio-video.jpg", 
                    alt: "Business meeting", 
                    hint: "business meeting" 
                },
            },
            {
                type: 'feature-list',
                title: "Core Collaboration Features",
                features: [
                    {
                        icon: "https://picsum.photos/150/150?random=10",
                        title: "Crystal-Clear Audio",
                        description: "Advanced microphones and speakers with noise cancellation for intelligible, distraction-free conversations."
                    },
                    {
                        icon: "https://picsum.photos/150/150?random=11",
                        title: "4K Ultra-HD Video",
                        description: "High-resolution cameras with auto-framing and speaker tracking to capture every detail and expression."
                    },
                    {
                        icon: "https://picsum.photos/150/150?random=12",
                        title: "Wireless Sharing",
                        description: "Effortlessly share content from any device—laptops, tablets, or smartphones—with a single click."
                    }
                ]
            },
            {
                type: 'hotspot-carousel',
                title: "Explore a Collaboration Setup",
                content: "Our integrated meeting rooms feature best-in-class products to create an intuitive and powerful collaboration experience. See how different components come together to form a seamless whole.",
                hotspots: [
                    {
                        image: { src: "https://picsum.photos/1280/720?random=13", alt: "A modern meeting room", hint: "modern meeting room" },
                        hotspots: [
                            {
                                position: { top: '30%', left: '50%' },
                                title: "Smart Camera",
                                description: "AI-powered 4K PTZ Camera",
                                details: ["Auto-framing", "Speaker tracking", "12x Optical Zoom"],
                                link: "#"
                            },
                            {
                                position: { top: '65%', left: '25%' },
                                title: "Ceiling Mic Array",
                                description: "360-degree audio capture",
                                details: ["Beamforming technology", "Acoustic echo cancellation", "Covers 25-foot radius"],
                                link: "#"
                            },
                             {
                                position: { top: '50%', left: '80%' },
                                title: "Interactive Display",
                                description: "86-inch 4K Touchscreen",
                                details: ["20-point multi-touch", "Wireless content sharing", "Integrated whiteboarding"],
                                link: "#"
                            }
                        ]
                    }
                ]
            }
        ],
        cta: {
            title: "Ready to enhance your team's collaboration?",
            buttonText: "Design Your Meeting Room"
            
        }
    },
    {
        slug: "digital-signage",
        title: "Digital Signage",
        subtitle: "Digital Signage Solutions are a great way to share information with visitors, customers, and teams.",
        video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        description: "When you want to connect with your audience, digital signage is the easiest and most engaging way to do it. With digital signage, you can reach your audience wherever they are—whether at home, in a hotel room or on the road.",
        sections: [
            {
                type: 'centered-text',
                title: "Engage, Inform, and Inspire",
                content: `<p>Transform your spaces with dynamic digital signage that captures attention and delivers impactful messages. From towering video walls in corporate lobbies to interactive kiosks in retail, we provide end-to-end solutions that are easy to manage and impossible to ignore.</p>`,
                image: { 
                    src: "/assets/videowalls-02.jpg", 
                    alt: "Interactive Digital Signage", 
                    hint: "interactive kiosk" 
                },
            },
            {
                type: 'feature-list',
                title: "Dynamic Signage Capabilities",
                features: [
                    {
                        icon: "https://picsum.photos/150/150?random=14",
                        title: "Centralized Content Management",
                        description: "Update content across hundreds of screens from a single, web-based dashboard with scheduling and analytics."
                    },
                    {
                        icon: "https://picsum.photos/150/150?random=15",
                        title: "Interactive Experiences",
                        description: "Engage users with touchscreens, wayfinding, directories, and data-driven content triggered by sensors."
                    },
                    {
                        icon: "https://picsum.photos/150/150?random=16",
                        title: "Stunning Video Walls",
                        description: "Create seamless, high-impact video walls of any size or configuration with ultra-narrow bezel displays."
                    }
                ]
            },
            {
                type: 'hotspot-carousel',
                title: "Retail Digital Signage in Action",
                content: "See how digital signage can transform a retail environment, providing information, enhancing brand image, and driving sales through targeted promotions.",
                hotspots: [
                    {
                        image: { src: "https://picsum.photos/1280/720?random=17", alt: "Retail store with digital screens", hint: "retail digital signage" },
                        hotspots: [
                            {
                                position: { top: '45%', left: '20%' },
                                title: "Interactive Kiosk",
                                description: "Product discovery and wayfinding",
                                details: ["24/7 operation", "Durable anti-glare glass", "Integrated loyalty program signup"],
                                link: "#"
                            },
                            {
                                position: { top: '30%', left: '60%' },
                                title: "Large Format Display",
                                description: "High-brightness promotional screen",
                                details: ["85-inch 4K HDR display", "2500 nits brightness", "Remote content scheduling"],
                                link: "#"
                            }
                        ]
                    }
                ]
            }
        ],
        cta: {
            title: "Ready to transform your space?",
            buttonText: "Explore Signage Solutions"
        }
    },
    {
        slug: "digital-classrooms",
        title: "Digital Classrooms",
        subtitle: "Deliver a Collaborative Education Experience with Innovative AV Solutions",
        video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
        description: "Bringing all the benefits of advanced technology into today’s classrooms and enabling tested, standards-based solutions that simply work for users.",
        sections: [
            {
                type: 'centered-text',
                title: "High-quality educational experience for teachers and students",
                content: `<p>Moving to a digitized environment brings all the benefits of advanced technology into today’s classrooms and enables tested, standards-based solutions that simply work for users. At the same time, with budgets often limited, legacy devices must be accommodated in the solution design.</p><p>Our flexible solutions work with many legacy and third-party devices, enabling cost-effective classrooms and long-lasting high value.</p>`,
                image: {
                    src: "https://picsum.photos/1920/1080?random=8",
                    alt: "Pupils sitting next to their desks",
                    hint: "students classroom"
                },
            },
            {
                type: 'feature-list',
                title: "Classroom AV Solutions",
                features: [
                    {
                        icon: "https://www.kramerav.com/wp-content/uploads/2023/10/Classroom-spaces_Effortless-classroom-operation-and-control-250x250.png",
                        title: "Effortless classroom operation",
                        description: "Our audio-visual technology, including dual-display features, allows for simultaneous viewing of content and remote participants."
                    },
                    {
                        icon: "https://www.kramerav.com/wp-content/uploads/2023/10/Personal-workspaces_Advanced-wireless-connectivity-250x250.png",
                        title: "Simple wireless content sharing",
                        description: "Students can easily share content from their devices, with quad-mode capability for up to four devices simultaneously."
                    },
                    {
                        icon: "https://www.kramerav.com/wp-content/uploads/2023/10/Classroom-spaces_Comprehensive-connectivity-options-250x250.png",
                        title: "Comprehensive connectivity",
                        description: "Facilitating access to classroom AV equipment for teachers’ or guests’ laptops, including peripherals."
                    }
                ]
            },
            {
                type: 'hotspot-carousel',
                title: "Digital classroom",
                content: "In our hybrid classroom model, we create a dynamic, interconnected hub, prioritizing clear audio communication and easy content sharing between in-person and remote participants. This intuitively designed learning environment facilitates smooth, inclusive collaborations.",
                hotspots: [
                    {
                        image: { src: "https://www.kramerav.com/wp-content/uploads/2023/03/K-12_Audio_Hybrid_Classroom-1440x960.jpg", alt: "A digital classroom", hint: "digital classroom" },
                        hotspots: [
                            {
                                position: { top: '42%', left: '75%' },
                                title: "Tavor 5-O",
                                description: "5.25–Inch On–Wall Powered Speakers",
                                details: ["Indoor System", "Woofer — 5.25″", "Freq — 45Hz to 20kHz"],
                                link: "#"
                            },
                            {
                                position: { top: '36%', left: '75%' },
                                title: "VIA GO²",
                                description: "Compact & Secure 4K Wireless Presentation",
                                details: ["Conventional Wi–Fi and/or LAN", "Supports Windows, Mac, iOS, Android", "Two presenters simultaneously"],
                                link: "#"
                            }
                        ]
                    }
                ]
            }
        ],
        cta: {
            title: "Looking for future-ready audio visual solutions for schools?",
            buttonText: "Get in touch with us"
        }
    },
    {
        slug: "experience-centres",
        title: "Experience Centres",
        subtitle: "A powerful corporate communication tool to connect with business prospects, partners and end-users alike.",
        video: "https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
        description: "Experience Centres offer businesses an effective way to connect with customers, build brand loyalty and ultimately increase sales through immersive, interactive brand storytelling.",
        sections: [
            {
                type: 'centered-text',
                title: "Build Deeper Customer Connections",
                content: `<p>Go beyond traditional showrooms. An Experience Centre is a curated environment where your brand's story comes to life. It allows customers to interact with your products and services in a meaningful, memorable way, fostering loyalty and driving engagement.</p>`,
                image: { 
                    src: "/assets/experience.jpg", 
                    alt: "Experience Centre", 
                    hint: "modern interactive exhibit" 
                },
            },
             {
                type: 'feature-list',
                title: "Elements of an Immersive Experience",
                features: [
                    {
                        icon: "https://picsum.photos/150/150?random=18",
                        title: "Interactive Installations",
                        description: "Engage visitors with multi-touch video walls, projection mapping, and gesture-controlled displays."
                    },
                    {
                        icon: "https://picsum.photos/150/150?random=19",
                        title: "Personalized Journeys",
                        description: "Use RFID or mobile apps to tailor content and experiences to individual visitors based on their interests."
                    },
                    {
                        icon: "https://picsum.photos/150/150?random=20",
                        title: "Centralized Show Control",
                        description: "Orchestrate all lighting, audio, and video elements from a single, intuitive control system for flawless presentations."
                    }
                ]
            },
            {
                type: 'hotspot-carousel',
                title: "Inside the Experience Centre",
                content: "Explore how different technologies converge to create an unforgettable brand journey for every visitor.",
                hotspots: [
                    {
                        image: { src: "https://picsum.photos/1280/720?random=21", alt: "A futuristic brand experience center", hint: "brand experience center" },
                        hotspots: [
                            {
                                position: { top: '50%', left: '50%' },
                                title: "Projection-Mapped Table",
                                description: "Interactive product showcase",
                                details: ["Object recognition", "Dynamic content overlays", "Multi-user interaction"],
                                link: "#"
                            },
                             {
                                position: { top: '25%', left: '75%' },
                                title: "Transparent OLED Display",
                                description: "Floating digital content",
                                details: ["55-inch Transparent OLED", "Displays info without hiding product", "Synchronized with lighting"],
                                link: "#"
                            }
                        ]
                    }
                ]
            }
        ],
        cta: {
            title: "Ready to tell your brand's story?",
            buttonText: "Create Your Experience"
        }
    },
    {
        slug: "meeting-rooms",
        title: "Meeting Rooms",
        subtitle: "Ultimate collaboration environment for all your meetings, seamlessly connecting on-site and remote.",
        video: "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
        description: "We harness the latest cutting-edge technology and best-fit audio, video, acoustic, and lighting solutions for your requirements and environment so your meeting spaces work seamlessly.",
        sections: [
             {
                type: 'centered-text',
                title: "The Modern Meeting Ecosystem",
                content: `<p>A successful meeting room is more than a table and chairs. It's an ecosystem of technology designed for intuitive use and flawless performance. We engineer spaces that foster collaboration, ensuring every participant, whether in-person or remote, is seen and heard clearly.</p>`,
                image: { 
                    src: "/assets/meeting-rooms-01.jpg", 
                    alt: "Seamless Meeting Room", 
                    hint: "modern boardroom" 
                },
            },
             {
                type: 'feature-list',
                title: "Key Components of a Smart Room",
                features: [
                    {
                        icon: "https://picsum.photos/150/150?random=22",
                        title: "One-Touch Meeting Start",
                        description: "Integrate with calendaring systems (like Outlook and Google) to start any meeting with a single tap."
                    },
                    {
                        icon: "https://picsum.photos/150/150?random=23",
                        title: "Intelligent Audio",
                        description: "Deploy advanced DSPs and ceiling microphones that automatically focus on the active speaker."
                    },
                    {
                        icon: "https://picsum.photos/150/150?random=24",
                        title: "Room Scheduling Panels",
                        description: "See room availability at a glance and book spaces on the fly with elegant panels outside each room."
                    }
                ]
            },
            {
                type: 'hotspot-carousel',
                title: "Anatomy of a Hybrid Meeting Room",
                content: "Discover the technology that powers effortless hybrid meetings, ensuring equitable experiences for all participants.",
                hotspots: [
                    {
                        image: { src: "https://picsum.photos/1280/720?random=25", alt: "A hybrid meeting in progress", hint: "hybrid meeting" },
                        hotspots: [
                            {
                                position: { top: '40%', left: '15%' },
                                title: "Front of Room Display",
                                description: "Dual 4K displays",
                                details: ["One for content, one for participants", "Anti-glare coating", "Commercial grade for longevity"],
                                link: "#"
                            },
                             {
                                position: { top: '55%', left: '50%' },
                                title: "Tabletop Control Panel",
                                description: "10-inch Touch Interface",
                                details: ["Controls meetings, lights, shades", "Intuitive user interface", "PoE powered"],
                                link: "#"
                            }
                        ]
                    }
                ]
            }
        ],
        cta: {
            title: "Ready to improve your meetings?",
            buttonText: "Get in touch with us"
        }
    },
    {
        slug: "monitoring-centres",
        title: "Monitoring Centres",
        subtitle: "Automate your monitoring control and help human capital focus on the issues that matter the most.",
        video: "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
        description: "Modern NOCs and SOCs control critical resources and provide support to a variety of organizations, including businesses, universities, utility companies and regional government agencies.",
        sections: [
             {
                type: 'centered-text',
                title: "Command, Control, and Clarity",
                content: `<p>A Network Operations Center (NOC) or Security Operations Center (SOC) is the nerve center of an organization. We design and build mission-critical monitoring centres that provide operators with complete situational awareness, enabling rapid, informed decision-making.</p>`,
                image: { 
                    src: "/assets/monitoring-centers-01.jpg", 
                    alt: "Monitoring Center", 
                    hint: "data center monitors" 
                },
            },
            {
                type: 'feature-list',
                title: "Mission-Critical Infrastructure",
                features: [
                    {
                        icon: "https://picsum.photos/150/150?random=26",
                        title: "24/7-Rated Video Walls",
                        description: "Deploy robust, high-resolution LED or LCD video walls designed for continuous operation and data visualization."
                    },
                    {
                        icon: "https://picsum.photos/150/150?random=27",
                        title: "Flexible Source Processing",
                        description: "Display any source, on any screen, at any time with powerful video wall processors and intuitive controls."
                    },
                    {
                        icon: "https://picsum.photos/150/150?random=28",
                        title: "Ergonomic Operator Consoles",
                        description: "Design workspaces that optimize operator comfort and efficiency for long hours of critical monitoring."
                    }
                ]
            },
            {
                type: 'hotspot-carousel',
                title: "Inside a Security Operations Center (SOC)",
                content: "Explore the key components of a SOC, where data from across the enterprise is monitored for cybersecurity threats.",
                hotspots: [
                    {
                        image: { src: "https://picsum.photos/1280/720?random=29", alt: "A security operations center", hint: "cybersecurity command center" },
                        hotspots: [
                             {
                                position: { top: '40%', left: '50%' },
                                title: "Main Video Wall",
                                description: "Central dashboard for threat monitoring",
                                details: ["20x4 LCD panel configuration", "Redundant power supplies", "Shows SIEM, threat maps, live feeds"],
                                link: "#"
                            },
                             {
                                position: { top: '75%', left: '30%' },
                                title: "KVM Switching System",
                                description: "Control multiple systems with one keyboard/mouse",
                                details: ["Secure, real-time access", "Reduces desk clutter", "Improves operator workflow"],
                                link: "#"
                            }
                        ]
                    }
                ]
            }
        ],
        cta: {
            title: "What Kind of Command and Control Center Do You Need?",
            buttonText: "Design Your Control Center"
             
        }
    },
];
