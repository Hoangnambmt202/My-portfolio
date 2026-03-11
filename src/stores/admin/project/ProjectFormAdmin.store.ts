/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { create } from "zustand";
import { ProjectStatus } from "@/types/features/project";

interface ProjectFormState {
  title: string;
  description: string;
  content: string;
  techStack: string[];
  status: ProjectStatus;

  loading: boolean;
  error?: string;

  setField: (field: string, value: any) => void;
  setProject: (project: any) => void;

  addTech: (tech: string) => void;
  removeTech: (tech: string) => void;

  setLoading: (v: boolean) => void;
  setError: (v?: string) => void;
}

export const useAdminProjectFormStore = create<ProjectFormState>((set) => ({
  title: "",
  description: "",
  content: "",
  techStack: [],
  status: "DRAFT",

  loading: false,
  error: undefined,

  setField: (field, value) =>
    set((state) => ({
      ...state,
      [field]: value,
    })),

  setProject: (project) =>
    set({
      title: project.title ?? "",
      description: project.description ?? "",
      content: project.content ?? "",
      techStack: project.techStack ?? [],
      status: project.status ?? "DRAFT",
    }),

  addTech: (tech) =>
    set((state) => ({
      techStack: [...state.techStack, tech],
    })),

  removeTech: (tech) =>
    set((state) => ({
      techStack: state.techStack.filter((t) => t !== tech),
    })),

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
