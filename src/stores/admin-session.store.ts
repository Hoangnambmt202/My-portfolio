"use client";

import { create } from "zustand";

export interface AdminUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: "ADMIN" | "USER";
}

interface AdminSessionState {
  user: AdminUser | null;
  setUser: (user: AdminUser) => void;
  clear: () => void;
}

export const useAdminSessionStore = create<AdminSessionState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clear: () => set({ user: null }),
}));
