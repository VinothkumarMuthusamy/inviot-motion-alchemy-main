import { LucideIcon } from "lucide-react";

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
    }
}

interface SolutionSection {
    type: 'image-left' | 'image-right' | 'centered-text' | 'feature-list-image' | 'benefits-grid';
    title: string;
    content?: string;
    image: {
        src: string;
        alt: string;
        hint: string;
    };
    features?: string[];
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
        subtitle: "Communicate and collaborate securely with anyone, anywhere.",
        video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        description: "Audio & Video collaboration is expanding across all industries. Give your employees and clients the ability to share multimedia content and communicate more effectively over distances and across devices.",
        sections: [
            {
                type: 'image-right',
                title: "Change the way your people do business.",
                content: "Gather feedback on designs, presentations and products from a distance. Provide remote workers with the same opportunities for collaboration as their office-based colleagues. Enable new solutions for small businesses that cannot afford dedicated meeting rooms or traditional video equipment. Incorporate Web Conferencing into your teaching strategies. Support more fluid project management by varying people's working time flexibly.",
                image: { 
                    src: "/assets/audio-video.jpg", 
                    alt: "Business meeting", 
                    hint: "business meeting" 
                },
            },
            {
                type: 'centered-text',
                title: "It's here, and it's your business' chance to take advantage.",
                content: "Clients will be happy with the flexibility and affordability of Web Conferencing provided by your company. Lastly, give your teams the tools to collaborate over long distances and help them stay connected.",
                image: { src: "", alt: "", hint: "" },
                bgColor: 'card'
            },
             {
                type: 'feature-list-image',
                title: "Enterprise Solutions",
                content: "Our technology allows you to extend collaboration with your employees to any smart device. This means that you can now have a presentation on your phone while sitting in the boardroom, or have a meeting with your team via video chat while they're at home.",
                features: [
                    "Extended collaboration to any smart device.",
                    "Time optimization and easier organization of ad-hoc meetings.",
                    "More effective decision-making.",
                    "Improvement of cooperation and teamwork.",
                ],
                image: { src: "/assets/corporate-office.jpg", alt: "Enterprise Solutions", hint: "corporate office" },
            },
        ],
        cta: {
            title: "We've got the solution. Ready.",
            subtitle: "By improving and streamlining your user experience, your business can empower people to focus on what matters – not just how they get there – which will ultimately drive better results for their businesses.",
            buttonText: "Get in touch with us."
        }
    },
    {
        slug: "digital-signage",
        title: "Digital Signage",
        subtitle: "Digital Signage Solutions are a great way to share information with visitors, customers, and teams.",
        video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        description: "When you want to connect with your audience, digital signage is the easiest and most engaging way to do it. With digital signage, you can reach your audience wherever they are—whether at home, in a hotel room or on the road. It's also a great way to build trust with customers by giving them a reason to engage with your brand over time.",
        sections: [
             {
                type: 'image-right',
                title: "Digital signage is more interactive than ever.",
                content: "Gather feedback on designs, presentations and products from a distance. Provide remote workers with the same opportunities for collaboration as their office-based colleagues. Enable new solutions for small businesses that cannot afford dedicated meeting rooms or traditional video equipment. Incorporate Web Conferencing into your teaching strategies. Support more fluid project management by varying people's working time flexibly.",
                image: { 
                    src: "/assets/videowalls-02.jpg", 
                    alt: "Interactive Digital Signage", 
                    hint: "interactive kiosk" 
                },
            },
            {
                type: 'feature-list-image',
                title: "Video walls",
                content: "Video walls are a great way to showcase content and provide a more immersive experience for your customers. They can be used for events, within retail, corporate offices, receptions, restaurants or more. Basically, anywhere you might implement a single screen, providing you have room, could also be used as a multi-screen video wall display.",
                image: { src: "/assets/video-wall.jpg", alt: "Video Wall", hint: "video wall" },
                features: [
                    "Touch Interactive displays in the form of kiosks and monitors",
                    "Large format displays that are both interactive and engaging.",
                    "Display solutions, both outdoor and indoor.",
                    "Video walls and direct-view LED wall systems",
                    "Single point content management such as layout creation, content pushing and network-based content.",
                ]
            },
        ],
        cta: {
            title: "We've got the solution. Ready.",
            buttonText: "Get in touch with us."
        }
    },
    {
        slug: "digital-classrooms",
        title: "Digital Classrooms",
        subtitle: "Deliver a Collaborative Education Experience with Innovative AV Solutions",
        video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
        description: "When it comes to putting students and learning first, educators and technologists strive to create learning solutions to meet the various learning needs of students everywhere. Interactive display units, touchscreens and interactive whiteboards allow teachers to bring their lessons to life and improve student engagement levels.",
        sections: [
            {
                type: 'image-right',
                title: "Enhanced Collaboration, Near and Far.",
                content: "AV in the classroom, dining hall, digital wayfinding, and other common areas makes innovative teaching methods more engaging. Huddle rooms equipped with large monitors, cameras, and crisp audio capabilities are popping up on school campuses with increasing frequency. The spaces invite interaction among learners in the room and those logging in remotely, along with guest experts, peers from other campuses, and interested members of the community.",
                image: { 
                    src: "/assets/av-solutions.jpg", 
                    alt: "Collaborative Classroom", 
                    hint: "modern classroom students" 
                },
                bgColor: 'card'
            },
        ],
        cta: {
            title: "The best part? We're there every step of the way.",
            buttonText: "Get in touch with us today."
        }
    },
    {
        slug: "experience-centres",
        title: "Experience Centres",
        subtitle: "A powerful corporate communication/PR tool to help connect with business prospects, partners and end-users alike.",
        video: "https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
        description: "Experience Centres offer businesses an effective way to connect with customers, build brand loyalty and ultimately increase sales. But how do businesses develop their own Customer Experience Centre?",
        sections: [
            {
                type: 'image-right',
                title: "More than an Executive Briefing Centre.",
                content: "Customer Experience Centres are more interactive and customer-centric, rather than product focused. If you're thinking of introducing a Customer Experience Centre into your company, planning every detail in advance is key to creating a winning experience. By developing a seamless and well-coordinated experience you will be contributing to making your customers feel welcome and comfortable in the space.",
                image: { 
                    src: "/assets/experience.jpg", 
                    alt: "Experience Centre", 
                    hint: "modern interactive exhibit" 
                },
                bgColor: 'card'
            },
        ],
        cta: {
            title: "Sets a new standard for delivering unparalleled client/employee experiences.",
            buttonText: "Get in touch with us."
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
                type: 'image-right',
                title: "Ensuring a seamless and intuitive user experience",
                content: "With Inviot, discover what team collaboration looks like in the physical and digital workplace, the technology solutions that make it possible, and how to bring its benefits and experience into your organization.",
                image: { 
                    src: "/assets/meeting-rooms-01.jpg", 
                    alt: "Seamless Meeting Room", 
                    hint: "modern boardroom" 
                },
            },
             {
                type: 'feature-list-image',
                title: "With Inviot, discover what team collaboration looks like.",
                content: "Every business succeeds when its people perform when they're engaged with their projects when they can connect with remote colleagues and work as a team.",
                image: { src: "/assets/team-collaboration.jpg", alt: "Team Collaboration", hint: "team working together" },
                features: [
                    "State-of-the-art display and audio solutions for superior video and crystal clear audio.",
                    "Control systems that help you manage and automate every aspect of the room solution.",
                    "Wireless presentation systems that share content from any device.",
                ]
            }
        ],
        cta: {
            title: "Ready to improve your meetings?",
            buttonText: "Get in touch with us today."
        }
    },
    {
        slug: "monitoring-centres",
        title: "Monitoring Centres",
        subtitle: "Automate your monitoring control and help human capital focus on the issues that matter the most.",
        video: "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
        description: "Modern NOCs often control resources and provide support to a variety of organizations, including businesses, universities, utility companies and regional government agencies.",
        sections: [
            {
                type: 'feature-list-image',
                title: "Deliver critical information that supports situational awareness.",
                content: "In short, a NOC is a critical element of any company or government and provides much-needed security and stability.",
                image: { 
                    src: "/assets/monitoring-centers-01.jpg", 
                    alt: "Monitoring Center", 
                    hint: "data center monitors" 
                },
                features: [
                    "Narrow bezel video walls and pixel pitch panels offer an ideal combination of superior picture quality and intuitive usability.",
                    "Hardware and software-based Video wall controllers.",
                    "Their most sensitive hardware still needs to be housed within the organization's most secure walls.",
                    "They can monitor server banks and other resources located all over the world.",
                ],
                bgColor: 'card'
            }
        ],
        cta: {
            title: "What Kind of Command and Control Center Do You Need?",
            subtitle: "To determine the right command and control centre for your operation, start by identifying what resources you need to coordinate.",
            buttonText: "Get in touch with us today."
        }
    },
];