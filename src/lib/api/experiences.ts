// src/lib/api/experiences.ts
import { ExpType } from "@prisma/client";

export interface Experience {
  id: string;
  company: string;
  position: string;
  location?: string | null;
  description?: string | null;
  startDate: string;
  endDate?: string | null;
  isCurrent: boolean;
  type: ExpType;
  order: number;
  achievements: string[];
  coursework: string[];
  createdAt: string;
  updatedAt: string;
}

export type CreateExperienceData = Omit<Experience, "id" | "createdAt" | "updatedAt" | "order">;
export type UpdateExperienceData = Partial<CreateExperienceData>;

const BASE_URL = "/api/experiences";

export const experiencesApi = {
  getAll: async (): Promise<{ success: boolean; data: Experience[] }> => {
    const res = await fetch(BASE_URL, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch experiences");
    return res.json();
  },

  create: async (data: CreateExperienceData): Promise<{ success: boolean; data: Experience }> => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create experience");
    return res.json();
  },

  update: async (id: string, data: UpdateExperienceData): Promise<{ success: boolean; data: Experience }> => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update experience");
    return res.json();
  },

  delete: async (id: string): Promise<{ success: boolean }> => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete experience");
    return res.json();
  },

  reorder: async (ids: string[]): Promise<{ success: boolean }> => {
    const res = await fetch(`${BASE_URL}/reorder`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids }),
    });
    if (!res.ok) throw new Error("Failed to reorder experiences");
    return res.json();
  },
};
