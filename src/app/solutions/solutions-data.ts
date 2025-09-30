
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
   
    video: string;
    image: {
        src: string;
        alt: string;
        hint: string;
    };
    sections?: SolutionSection[]; // Make sections optional
    cta?: {
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
        video: "/videos/solutionVideos/Video_Generation_From_Image.mp4",
       
        image: {
            src: "/assets/solutionimg/Audio Visual.jpg", 
            alt: "Business meeting", 
            hint: "business meeting" 
        },
    },
    {
        slug: "digital-signage",
        title: "Digital Signage",
        subtitle: "Digital Signage Solutions are a great way to share information with visitors, customers, and teams.",
        video: "/videos/solutionVideos/Marketing_Signage_Video_Generation.mp4",
        
        image: { 
            src: "/assets/solutionimg/Digital Signage.jpg", 
            alt: "Interactive Digital Signage", 
            hint: "interactive kiosk" 
        },
    },
    {
        slug: "digital-classrooms",
        title: "Digital Classrooms",
        subtitle: "Deliver a Collaborative Education Experience with Innovative AV Solutions",
        video: "/videos/solutionVideos/freepik__wideangle-shot-a-classroom-filled-with-students-se__3915.mp4",
       
        image: {
            src: "/assets/solutionimg/EDUCATION.jpg",
            alt: "Pupils sitting next to their desks",
            hint: "students classroom"
        },
    },
    {
        slug: "experience-centres",
        title: "Experience Centres",
        subtitle: "A powerful corporate communication tool to connect with business prospects, partners and end-users alike.",
        video: "/videos/solutionVideos/freepik__continue-the-image-of-people-walking-into-a-mesmer__3916.mp4",
       
        image: { 
            src: "/assets/solutionimg/Experience Centers.jpg", 
            alt: "Experience Centre", 
            hint: "modern interactive exhibit" 
        },
    },
    {
        slug: "meeting-rooms",
        title: "Meeting Rooms",
        subtitle: "Ultimate collaboration environment for all your meetings, seamlessly connecting on-site and remote.",
        video: "/videos/solutionVideos/freepik__wideangle-shot-a-modern-conference-room-with-a-sle__91012.mp4",
       
        image: { 
            src: "/assets/solutionimg/Meeting room.jpg", 
            alt: "Seamless Meeting Room", 
            hint: "modern boardroom" 
        },
    },
    {
        slug: "monitoring-centres",
        title: "Monitoring Centres",
        subtitle: "Automate your monitoring control and help human capital focus on the issues that matter the most.",
        video: "/videos/solutionVideos/freepik__wideangle-shot-a-modern-office-environment-filled-__91013.mp4",
       
        image: { 
            src: "/assets/solutionimg/Monitoring Centers.jpg", 
            alt: "Monitoring Center", 
            hint: "data center monitors" 
        },
    },
];
