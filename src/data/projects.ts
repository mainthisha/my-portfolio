import type { Project } from "@/types";

export const projects: Project[] = [
  // 01 — FARM SPHERE AI
  {
    slug: "farmsphere-ai",
    title: "FarmSphere AI",
    subtitle: "AI-Powered Smart Farming Platform",
    category: "AI · Data",
    summary:
      "Farmers often decide on crops, water and fertiliser with incomplete information. FarmSphere combines satellite, weather, soil and historical data into clear, actionable recommendations.",
    overview:
      "Developed an AI-driven smart farming platform that combines satellite data, weather information, soil conditions, and historical agricultural data to provide intelligent crop, irrigation, fertilizer, and planting recommendations.",
    features: [
      "Crop recommendations",
      "Irrigation guidance",
      "Fertilizer planning",
      "Planting-time advice",
    ],
    technologies: [
      "Python",
      "Flask",
      "React",
      "JWT",
      "Machine Learning",
    ],
    impact: "Live on Vercel · Four AI intelligence modules",
    motif: "contours",
    github: "https://github.com/mainthisha/FarmSphere-AI",
    liveUrl: "https://farm-sphere-ai-xi.vercel.app/",
    screenshots: ["/projects/farmsphere-cover.jpg"],
  },

  // 02 — TRIP SMART
  {
    slug: "trip-smart",
    title: "Trip Smart",
    subtitle: "AI-Powered Travel Planning Platform",
    category: "Full-stack · AI",
    summary:
      "Planning a trip means juggling itineraries, budgets, weather and visas in different places. Trip Smart brings them together in one app, with AI-assisted plans and group planning built in.",
    overview:
      "Built a full-stack travel planning web app for personalized itineraries, budget management, weather updates, visa planning, and collaborative trip planning.",
    features: [
      "AI-personalized itineraries",
      "Budget tracking per trip",
      "Weather and visa planning in one place",
      "Collaborative group trips",
    ],
    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "AI",
    ],
    impact: "Full-stack MERN build with AI integration",
    motif: "routes",
    github: "https://github.com/mainthisha/TripSmart-",
    screenshots: ["/projects/tripsmart-cover.jpg"]
  },

  // 03 — CIVIL ENGINEERING WEBSITE
  {
    slug: "civil-engineering-website",
    title: "Civil Engineering Corporate Website",
    subtitle: "Responsive Corporate Web Platform",
    category: "Web · Client work",
    summary:
      "A civil engineering firm needed a professional online presence it could update without a developer. I built a responsive site with dynamic content for services, portfolio, blogs and testimonials.",
    overview:
      "Designed and developed a fully responsive corporate website for a civil engineering company showcasing services, portfolio, blogs, testimonials, vision, and mission. Built with dynamic content management for easy updates, ensuring a smooth and professional user experience.",
    features: [
      "Services and project portfolio",
      "Blogs and client testimonials",
      "Dynamic content management",
      "Fully responsive on every device",
    ],
    technologies: [
      "React",
      "JavaScript",
      "Responsive Design",
      "Content Management",
    ],
    impact: "Live client website on Vercel",
    motif: "blueprint",
    github: "https://github.com/mainthisha/Mainthisha-associates-",
    liveUrl: "https://mainthisha-associates-2x6s.vercel.app/",
    screenshots: ["/projects/civil-cover.jpg"],
  },

  // 04 — AURAX'26
  {
    slug: "aurax-26",
    title: "AuraX'26",
    subtitle: "College Tech Fest Platform",
    category: "Web platform · AI chatbot",
    summary:
      "Tech-fest participants usually juggle schedules, seats and updates across chats and posters. AuraX'26 puts events, live seat tracking, hackathon progress and an AI chatbot into one platform.",
    overview:
      "Developed an interactive event management platform for a college tech fest featuring personalized event recommendations, real-time seat tracking, live updates, hackathon progress, participant dashboard, AI chatbot support, bookmarks, digital passes, and dynamic filtering for an enhanced user experience.",
    features: [
      "Personalized event recommendations",
      "Real-time seat tracking",
      "Digital passes and bookmarks",
      "AI chatbot support",
    ],
    technologies: [
      "React",
      "JavaScript",
      "AI Chatbot",
      "Real-time Updates",
    ],
    impact: "Built for a college tech fest",
    motif: "stage",
    github: "https://github.com/mainthisha/AuraX-26/tree/main",
    screenshots: ["/projects/aurax-cover.jpg"],
  },

  // 05 — LEXORA AI
  {
    slug: "lexora-ai",
    title: "Lexora AI",
    subtitle: "AI-Powered Library Management System",
    category: "AI · Library systems",
    summary:
      "Managing books and finding the right one is slow in traditional library systems. Lexora adds intelligent search and AI-driven interactions to everyday library management.",
    overview:
      "Developed an AI-powered library management system that streamlines book management, information retrieval, and user interactions through intelligent search and AI-driven features.",
    features: [
      "Full book management",
      "Intelligent search and retrieval",
      "AI-driven user interactions",
      "Deployed frontend and backend",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "FastAPI",
      "SQLAlchemy",
      "JWT Auth",
    ],
    impact: "Live on Vercel and Render · Built during Litz Tech internship",
    motif: "shelves",
    context: "Built as part of the AI Engineer Intern role at Litz Tech.",
    github: "https://github.com/mainthisha/Lexora-ai",
    liveUrl: "https://lexora-ai-three.vercel.app/",
    screenshots: ["/projects/lexora-cover.png"]
  },

  // 06 — NEURAL DEVOPS ASSISTANT
  {
    slug: "neural-devops-assistant",
    title: "Neural DevOps Assistant",
    subtitle: "AI-Driven CI/CD Support Tool",
    category: "DevOps · AI",
    summary:
      "Deployment and CI/CD are where most beginners get stuck. This assistant guides students step by step through setting up and automating their deployment pipelines.",
    overview:
      "Currently developing an AI-powered DevOps assistant designed to help beginners and students automate project deployment workflows and CI/CD processes. The system provides guided deployment support, reducing manual configuration effort and improving learning efficiency for DevOps pipelines.",
    features: [
      "Guided deployment support",
      "Automated deployment workflows",
      "CI/CD process assistance",
      "Less manual configuration",
    ],
    technologies: [
      "AI",
      "DevOps",
      "CI/CD",
      "Deployment Automation",
    ],
    motif: "pipeline",
    status: "In development",
  },

  // 07 — COGNIFY AI
  {
    slug: "cognify-ai",
    title: "Cognify AI",
    subtitle: "RAG-Based PDF Learning Assistant",
    category: "AI · RAG",
    summary:
      "Finding answers in long PDFs wastes a student's time. Cognify lets you upload a document and ask questions in plain language, with answers grounded in the document itself through RAG.",
    overview:
      "Developed an AI-powered learning assistant that enables students to upload PDFs and ask context-aware questions using document extraction, semantic search, embeddings, vector databases, and Retrieval-Augmented Generation (RAG).",
    features: [
      "Chat with any PDF",
      "Answers grounded in your document",
      "Semantic search with embeddings",
      "Vector database retrieval",
    ],
    technologies: [
      "Python",
      "RAG",
      "Embeddings",
      "Vector DB",
      "LLM",
    ],
    impact: "Full-stack RAG document intelligence platform",
    motif: "document",
    github: "https://github.com/mainthisha/CognifyAI",
    screenshots: ["/projects/cognify-cover.jpg"],
  },

  // 08 — NEXUSFLOW AI
  {
    slug: "smart-traffic-management",
    title: "NexusFlow AI",
    subtitle: "AI-Powered Smart Traffic Management",
    category: "AI · Traffic systems",
    summary:
      "Traffic congestion affects travel time, fuel consumption and emergency response. NexusFlow AI is designed to analyze traffic conditions, predict congestion and support smarter vehicle flow management.",
    overview:
      "Currently developing NexusFlow AI, an AI-powered traffic intelligence platform designed to analyze traffic conditions, detect congestion, support intelligent traffic management, and optimize vehicle flow through data-driven insights.",
    features: [
      "Intelligent traffic monitoring",
      "Congestion detection",
      "Automated traffic management",
      "Vehicle flow optimization",
    ],
    technologies: [
      "AI",
      "Data Analytics",
      "Traffic Analysis",
    ],
    motif: "junction",
    status: "In development",
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const getAdjacent = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);

  return {
    prev: projects[(i - 1 + projects.length) % projects.length],
    next: projects[(i + 1) % projects.length],
  };
};