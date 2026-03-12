"use client";

import { create } from "zustand";
import { ProjectStatus } from "@/types/features/project";

interface ProjectFormState {
  title: string;
  description: string;
  content: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  status: ProjectStatus;

  loading: boolean;
  errors: Record<string, string[]>;

  setField: <K extends keyof ProjectFormState>(
    field: K,
    value: ProjectFormState[K],
  ) => void;

  setProject: (project: Partial<ProjectFormState>) => void;

  addTech: (tech: string) => void;
  removeTech: (tech: string) => void;

  setLoading: (v: boolean) => void;
  setErrors: (errors: Record<string, string[]>) => void;
  clearErrors: () => void;

  reset: () => void;
}

export const useAdminProjectFormStore = create<ProjectFormState>((set) => ({
  title: "",
  description: "",
  content: "",
  techStack: [],
  status: "DRAFT",
  liveUrl: "",
  githubUrl: "",

  loading: false,
  errors: {},

  setField: (field, value) =>
    set((state) => ({
      ...state,
      [field]: value,
    })),

  setProject: (project) =>
    set((state) => ({
      ...state,
      ...project,
    })),

  addTech: (tech) =>
    set((state) => {
      if (state.techStack.includes(tech)) return state;

      return {
        techStack: [...state.techStack, tech],
      };
    }),

  removeTech: (tech) =>
    set((state) => ({
      techStack: state.techStack.filter((t) => t !== tech),
    })),

  setLoading: (loading) => set({ loading }),
  setErrors: (errors) => set({ errors }),

  clearErrors: () => set({ errors: {} }),
  reset: () =>
    set({
      title: "",
      description: "",
      content: "",
      liveUrl: "",
      githubUrl: "",
      techStack: [],
      status: "DRAFT",
    }),
}));
