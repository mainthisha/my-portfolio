export type Motif =
  | "routes"
  | "blueprint"
  | "stage"
  | "pipeline"
  | "shelves"
  | "contours"
  | "document"
  | "junction";

export type Certification = {
  title: string;
  issuer: string;
  year?: string;
  kind: string;
  credential?: string;
};

export type SkillGroup = {
  id: string;
  title: string;
  items: string[];
  icon?: string;
};

export type Project = {
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  summary: string;
  overview: string;
  problem?: string;
  solution?: string;
  features: string[];
  technologies: string[];
  motif: Motif;
  status?: string;
  context?: string;
  github?: string;
  liveUrl?: string;
  impact?: string;
  screenshots?: string[];
};

export type ExperienceItem = {
  role: string;
  company: string;
  period?: string;
  overview?: string;
  points: string[];
  tools?: string[];
  built?: { name: string; stack: string[] };
  documents?: { label: string; href: string }[];
};