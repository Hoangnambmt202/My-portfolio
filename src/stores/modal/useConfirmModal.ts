import { create } from "zustand";
import { ConfirmModalPayload } from "@/types/modal/Modal";

type ConfirmModalState = {
  open: boolean;
  loading: boolean;
  payload?: ConfirmModalPayload;

  openModal: (payload: ConfirmModalPayload) => void;
  closeModal: () => void;
  confirm: () => Promise<void>;
};

export const useConfirmModalStore = create<ConfirmModalState>((set, get) => ({
  open: false,
  loading: false,
  payload: undefined,

  openModal: (payload) =>
    set({
      open: true,
      payload,
      loading: false,
    }),

  closeModal: () =>
    set({
      open: false,
      loading: false,
      payload: undefined,
    }),

  confirm: async () => {
    const { payload } = get();
    if (!payload?.onConfirm) return;

    try {
      set({ loading: true });
      await payload.onConfirm();
      get().closeModal();
    } catch (error) {
      console.error("Confirm modal error:", error);
      set({ loading: false });
    }
  },
}));
