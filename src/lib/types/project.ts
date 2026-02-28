// src/types/index.ts
export type ProjectStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

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
  githubUrl?: string;
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
