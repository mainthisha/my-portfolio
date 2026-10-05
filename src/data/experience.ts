import type { ExperienceItem } from "@/types";

// Add `period: "Mon YYYY – Mon YYYY"` to any entry to show its dates on the card and in the modal.
// `documents` links to files inside /public/certificates.
export const experience: ExperienceItem[] = [
  {
    role: "UI/UX Intern",
    company: "InternPe",
    period: "16 Feb – 15 Mar 2026",
    overview:
      "Designed clean, responsive interfaces for AI-integrated web applications, with a focus on layout, hierarchy and navigation.",
    points: [
      "Designed responsive UI components for AI-integrated web applications.",
      "Applied UI/UX principles including layout design, visual hierarchy, typography, and user-friendly navigation.",
      "Completed a hands-on, four-week program centred on learning by designing.",
    ],
    tools: [
      "Layout Design",
      "Visual Hierarchy",
      "Typography",
      "Responsive UI",
      "Navigation Design",
    ],
    documents: [
      { label: "View certificate", href: "/certificates/internpe-certificate.png" },
    ],
  },
  {
    role: "AI Engineer Intern",
    company: "Litz Tech",
    period: "1 – 15 Jun 2026",
    overview:
      "Designed, built and deployed Lexora, an AI-powered library management system with a live frontend and backend.",
    points: [
      "Developed Lexora AI-Library Management System, an AI-powered solution for managing and retrieving library information.",
      "Applied AI concepts and programming skills to build practical features and solve real-world problems.",
      "Deployed the application with the frontend on Vercel and the backend on Render.",
      "Recognised for dedication, professionalism, attendance and punctuality.",
    ],
    built: {
      name: "Lexora AI",
      stack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "FastAPI", "SQLAlchemy", "JWT Auth"],
    },
    documents: [
      { label: "View certificate", href: "/certificates/litztech-certificate.png" },
    ],
  },
  {
    role: "AI Engineer Intern",
    company: "ShadowFox",
    period: "1 – 31 Aug 2026",
    overview:
      "Worked through mentor-guided AI Engineer project levels, progressing from beginner to advanced, with hands-on practice in LLM APIs, RAG and prompt engineering.",
    points: [
      "Built AI-based applications involving LLM APIs and Retrieval-Augmented Generation (RAG).",
      "Worked on prompt engineering, AI integration, document processing, and practical AI utilities.",
      "Developed Cognify AI, a RAG-based PDF learning assistant, as the internship project.",
    ],
    tools: ["LLM APIs", "RAG", "Prompt Engineering", "Document Processing"],
    built: {
      name: "Cognify AI",
      stack: ["Python", "RAG", "Embeddings", "Vector DB", "LLM"],
    },
    documents: [
      { label: "View certificate", href: "/certificates/shadowfox-certificate.png" },
    ],
  },
  {
    role: "Data Analyst Intern",
    company: "Thiranex",
    period: "24 May – 23 Jun 2026",
    overview:
      "A remote, project-based Data Analytics internship under industry mentorship, turning raw data into KPIs, customer segments and forecasts.",
    points: [
      "Practised data visualization, KPI tracking, and business insight generation.",
      "Gained experience in customer analytics, segmentation, and targeted insights.",
      "Learned predictive modeling, trend analysis, and data-driven forecasting.",
      "Worked on data preprocessing, automation, and reporting efficiency.",
    ],
    tools: ["Excel", "CSV", "Power BI", "Python"],
    documents: [
      { label: "View certificate", href: "/certificates/thiranex-certificate.png" },
      { label: "View offer letter", href: "/certificates/thiranex-offer-letter.png" },
    ],
  },
  {
    role: "Full Stack Web Development Intern",
    company: "Future Interns",
    period: "May – Jun 2026",
    overview:
      "A full-stack internship with structured, task-based assignments, building web applications from the interface to the backend.",
    points: [
      "Completed structured, task-based assignments in full-stack web development aligned with the program requirements.",
      "Developed web applications using frontend and backend technologies, with responsive UI and working application functionality.",
      "Applied learned concepts to practical scenarios and improved steadily in problem-solving.",
      "Accepted feedback constructively and delivered assigned tasks on schedule.",
    ],
    tools: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
    documents: [
      { label: "View certificate", href: "/certificates/futureinterns-certificate.png" },
      { label: "Letter of recommendation", href: "/certificates/futureinterns-recommendation.png" },
    ],
  },
];