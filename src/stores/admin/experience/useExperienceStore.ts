/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { Experience, experiencesApi } from "@/lib/api/experiences";

interface ExperienceState {
  experiences: Experience[];
  loading: boolean;
  error: string | null;
  // actions
  fetchExperiences: () => Promise<void>;
  addExperience: (
    data: any,
  ) => Promise<{ success: boolean; data?: Experience; error?: string }>;
  updateExperience: (
    id: string,
    data: any,
  ) => Promise<{ success: boolean; data?: Experience; error?: string }>;
  deleteExperience: (
    id: string,
  ) => Promise<{ success: boolean; error?: string }>;
}

export const useExperienceStore = create<ExperienceState>((set) => ({
  experiences: [],
  loading: true,
  error: null,

  fetchExperiences: async () => {
    set({ loading: true, error: null });
    try {
      const res = await experiencesApi.getAll();
      if (res.success) {
        set({ experiences: res.data, loading: false });
      } else {
        set({ error: "Failed to fetch experiences", loading: false });
      }
    } catch (err: any) {
      set({ error: err.message || "Something went wrong", loading: false });
    }
  },

  addExperience: async (data: any) => {
    try {
      const res = await experiencesApi.create(data);
      if (res.success) {
        // Prepend to array since new order is at the top
        set((state) => ({ experiences: [res.data, ...state.experiences] }));
        return res;
      }
      return { success: false, error: "Failed to add" };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  updateExperience: async (id: string, data: any) => {
    try {
      const res = await experiencesApi.update(id, data);
      if (res.success) {
        set((state) => ({
          experiences: state.experiences.map((exp) =>
            exp.id === id ? res.data : exp,
          ),
        }));
        return res;
      }
      return { success: false, error: "Failed to update" };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  deleteExperience: async (id: string) => {
    try {
      const res = await experiencesApi.delete(id);
      if (res.success) {
        set((state) => ({
          experiences: state.experiences.filter((exp) => exp.id !== id),
        }));
        return { success: true };
      }
      return { success: false, error: "Failed to delete" };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },
}));
