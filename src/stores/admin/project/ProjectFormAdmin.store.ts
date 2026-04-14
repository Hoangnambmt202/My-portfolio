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
  
  problem: string;
  decision: string;
  result: string;
  metrics: { value: string; label: string }[];

  loading: boolean;
  errors: Record<string, string[]>;

  setField: <K extends keyof ProjectFormState>(
    field: K,
    value: ProjectFormState[K],
  ) => void;

  setProject: (project: Partial<ProjectFormState>) => void;

  addTech: (tech: string) => void;
  removeTech: (tech: string) => void;
  
  addMetric: () => void;
  updateMetric: (index: number, field: "value" | "label", value: string) => void;
  removeMetric: (index: number) => void;

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
  
  problem: "",
  decision: "",
  result: "",
  metrics: [],

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

  addMetric: () =>
    set((state) => ({
      metrics: [...state.metrics, { value: "", label: "" }],
    })),

  updateMetric: (index, field, value) =>
    set((state) => {
      const newMetrics = [...state.metrics];
      newMetrics[index] = { ...newMetrics[index], [field]: value };
      return { metrics: newMetrics };
    }),

  removeMetric: (index) =>
    set((state) => ({
      metrics: state.metrics.filter((_, i) => i !== index),
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
      problem: "",
      decision: "",
      result: "",
      metrics: [],
    }),
}));
