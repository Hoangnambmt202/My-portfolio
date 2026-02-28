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

  submit: () => Promise<boolean>;
  reset: () => void;
}

export const useProjectStore = create<ProjectCreateState>((set, get) => ({
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

  submit: async () => {
    const { title, description, content, techStack, status } = get();

    if (!title || !description) {
      set({ error: "Title & description are required" });
      return false;
    }

    set({ loading: true, error: undefined });

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // 👈 quan trọng cho NextAuth
        body: JSON.stringify({
          title,
          description,
          content,
          techStack,
          status,
          featured: false,
          images: [],
          order: 0,
          slug: title.toLowerCase().replace(/\s+/g, "-"),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Create project failed");
      }

      set({ loading: false });
      return true;
    } catch (err: any) {
      set({ loading: false, error: err.message });
      return false;
    }
  },

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
