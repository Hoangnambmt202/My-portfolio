export type ConfirmVariant = "danger" | "warning" | "info";

export type ConfirmModalPayload = {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: ConfirmVariant;
  requireTyping?: string; // VD: "DELETE"
  onConfirm: () => Promise<void> | void;
};
