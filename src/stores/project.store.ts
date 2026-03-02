/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { create } from "zustand";

export type ProjectStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

interface ProjectCreateState {
  // form fields
  title: string;
  description: string;
  content: string;
  techStack: string[];
  demoUrl?: string;
  githubUrl?: string;
  status: ProjectStatus;

  // ui state
  loading: boolean;
  error?: string;

  // actions
  setField: <K extends keyof ProjectCreateState>(
    key: K,
    value: ProjectCreateState[K],
  ) => void;

  addTech: (tech: string) => void;
  removeTech: (tech: string) => void;

  reset: () => void;
}

export const useProjectStore = create<ProjectCreateState>((set) => ({
  title: "",
  description: "",
  content: "",
  techStack: [],
  status: "DRAFT",

  loading: false,

  setField: (key, value) => set({ [key]: value } as any),

  addTech: (tech) =>
    set((state) => ({
      techStack: state.techStack.includes(tech)
        ? state.techStack
        : [...state.techStack, tech],
    })),

  removeTech: (tech) =>
    set((state) => ({
      techStack: state.techStack.filter((t) => t !== tech),
    })),

  reset: () =>
    set({
      title: "",
      description: "",
      content: "",
      techStack: [],
      status: "DRAFT",
      loading: false,
      error: undefined,
    }),
}));
