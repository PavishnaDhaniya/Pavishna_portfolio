import { Cpu, MessageSquare, Code } from 'lucide-react';

export const portfolioData = {
    hero: {
        title: "Pavishna Dhaniya",
        subtitle: "A digital canvas where imagination meets execution. Explore the boundary-less playground of innovation as I Design with Purpose   Create with care  and explore sustainability through innovation.",
        ctaText: "View Projects"
    },
    about: {
        title: "Textile Technologist",
        description: `Driven by a passion for sustainable fashion and textile innovation, I’m a Textile Technologist in the making—curious about materials, processes, and design that respect both people and the planet. I believe the future of fashion lies in conscious choices and smart technology.`
    },
    activitiesTitle: "Activities",
    projects: [
        {
            title: "Nebula OS",
            desc: "A decentralized operating system for edge nodes.",
            icon: Cpu,
            tech: "Rust / Wasm" // Added tech for consistency if needed, though App.jsx usage might vary
        },
        {
            title: "Quantum Chat",
            desc: "Encryption that evolves with the speed of thought.",
            icon: MessageSquare,
            tech: "Go / OQS"
        },
        {
            title: "Ether Flow",
            desc: "Visualizing data streams in 4D space.",
            icon: Code,
            tech: "WebGL / Three.js"
        },
        // Ventures section projects used different data in original App.jsx, consolidating here or keeping separate if intended.
        // In original App.jsx there were two lists. One in `projects` const (lines 40-44) and one inline in `Ventures` section (lines 106-110).
        // I will consolidate them or provide both if they serve different purposes. 
        // The "Ventures" section seemed to be the main visual grid. The `projects` const was used for FloatingIdeas? No, `projects` const was unused in the provided App.jsx snippet!
        // Wait, let me check App.jsx usage of `projects` const.
        // Line 40: const projects = [...]
        // Line 48: <FloatingIdeas /> -> It might use it if passed as prop? But it is not passed.
        // Line 106: Inline array map for Ventures.
        // I will use the Ventures data for the main projects section.
    ],
    ventures: [
        {
            title: "Tinkercad",
            tech: "3D Design / Electronics",
            desc: "Innovative 3D modeling and circuit design projects.",
            document: "/Assignment_1_Pavishna_Dhaniya_R.pdf"
        },
        {
            title: "Scratch",
            tech: "Interactive Stories / Games",
            desc: "Creative programming and interactive storytelling.",
            document: "/scratch.pdf"
        },
        {
            title: "Fusion 360",
            tech: "CAD / CAM / CAE",
            desc: "Advanced product design and engineering simulations.",
            document: "/AutoCAD_360_Water_Bottle_Project.pdf"
        },
        {
            title: "MIT App Inventor",
            tech: "Mobile App Development",
            desc: "Building functional Android applications with block-based coding.",
            document: "/mit.pdf"
        }
    ],
    skills: {
        title: "Arsenal",
        items: ['React', 'Three.js', 'Node.js', 'Typescript', 'GLSL', 'Python', 'Docker', 'AWS', 'UI/UX Design']
    },
    contact: {
        title: "Let's Create",
        subtitle: "Ready to bring your vision to life? Let's discuss how we can build something extraordinary together.",
        buttonText: "Send Message"
    },
    footer: {
        copyright: "© 2026 Pavishna Dhaniya. Crafted with precision."
    },
    social: {
        linkedin: "https://www.linkedin.com/in/pavishna-dhaniya",
        github: "#", // Add GitHub if available
        email: "mailto:pavishnarajkumar@gmail.com"
    }
};
