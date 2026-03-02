import { create } from "zustand";

type AdminNavigationState = {
  activeId: string;
  setActiveId: (id: string) => void;
};

export const useAdminNavigationStore = create<AdminNavigationState>((set) => ({
  activeId: "",
  setActiveId: (id) => set({ activeId: id }),
}));
