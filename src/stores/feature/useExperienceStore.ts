import { create } from "zustand";
import { Experience } from "@/lib/api/experiences";

interface ExperienceStore {
  experiences: Experience[];
  isLoading: boolean;
  error: string | null;
  setExperiences: (experiences: Experience[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useExperienceStore = create<ExperienceStore>((set) => ({
  experiences: [],
  isLoading: true,
  error: null,
  setExperiences: (experiences) => set({ experiences, isLoading: false }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error, isLoading: false }),
}));
