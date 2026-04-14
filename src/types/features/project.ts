// src/types/index.ts
export type ProjectStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export interface Metric {
  value: string;
  label: string;
}
export interface CaseStudy {
  index: string;
  category: string;
  title: string;
  problem: string;
  decision: string;
  decisionHighlight?: string;
  result: string;
  metrics: Metric[];
  techStack: string[];
  liveUrl?: string | null;
  githubUrl?: string | null;
  description?: string | null;
  content?: string | null;
  id?: string;
}
export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content?: string;
  thumbnail?: string;
  images: string[];
  techStack: string[];
  demoUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  problem?: string;
  decision?: string;
  result?: string;
  metrics?: { value: string; label: string }[];
  isFeatured: boolean;
  status: ProjectStatus;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectsResponse {
  success: boolean;
  data: {
    projects: Project[];
    total: number;
    page: number;
    limit: number;
  };
}

export interface ProjectResponse {
  success: boolean;
  data: Project;
}
