"use client";

import { create } from "zustand";
import { Project } from "@/types/features/project";

interface AdminProjectState {
  projects: Project[];
  total: number;
  page: number;

  loading: boolean;
  limit: number;

  setProjects: (projects: Project[]) => void;
  setPagination: (page: number, total: number, limit: number) => void;

  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  removeProject: (id: string) => void;
}

export const useAdminProjectStore = create<AdminProjectState>((set) => ({
  projects: [],
  total: 0,
  page: 1,
  loading: false,
  limit: 10,

  setProjects: (projects) =>
    set(() => ({
      projects,
    })),

  setPagination: (page, total, limit) =>
    set(() => ({
      page,
      total,
      limit,
    })),

  addProject: (project) =>
    set((state) => ({
      projects: [project, ...state.projects],
    })),

  updateProject: (project) =>
    set((state) => ({
      projects: state.projects.map((p) => (p.id === project.id ? project : p)),
    })),

  removeProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== id),
    })),
}));
