/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { create } from "zustand";

interface ViewProjectModalState {
  open: boolean;
  project: any | null;
  openModal: (project: any) => void;
  closeModal: () => void;
}

export const useViewProjectModalStore = create<ViewProjectModalState>(
  (set) => ({
    open: false,
    project: null,

    openModal: (project) =>
      set({
        open: true,
        project,
      }),

    closeModal: () =>
      set({
        open: false,
        project: null,
      }),
  }),
);
