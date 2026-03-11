"use client";

import { Trash2, AlertTriangle, Info, X } from "lucide-react";
import { useConfirmModalStore } from "@/stores/modal/ConfirmModal.store";
import { useState } from "react";
import Modal from "@/components/ui/Modal";

const variantConfig = {
  danger: {
    icon: Trash2,
    button: "bg-red-600 hover:bg-red-700",
  },
  warning: {
    icon: AlertTriangle,
    button: "bg-yellow-600 hover:bg-yellow-700",
  },
  info: {
    icon: Info,
    button: "bg-blue-600 hover:bg-blue-700",
  },
};

export default function ConfirmModal() {
  const { open, payload, loading, closeModal, confirm } =
    useConfirmModalStore();

  const [input, setInput] = useState("");

  if (!payload) return null;

  const {
    title = "Xác nhận hành động",
    description,
    confirmText = "Xác nhận",
    cancelText = "Hủy",
    variant = "danger",
    requireTyping,
  } = payload;

  const Icon = variantConfig[variant].icon;
  const canConfirm = !requireTyping || input.trim() === requireTyping;

  return (
    <Modal isOpen={open} onClose={closeModal}>
      <div className="rounded-xl bg-[#0f172a] border border-slate-800 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Icon className="text-red-500" size={18} />
            <h3 className="text-xl font-bold text-white">{title}</h3>
          </div>

          <button
            onClick={closeModal}
            className="text-slate-400 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 text-sm text-slate-300 space-y-3">
          {description && <p>{description}</p>}

          {requireTyping && (
            <div>
              <p className="text-xs text-slate-400 mb-1">
                Gõ <b>{requireTyping}</b> để xác nhận
              </p>

              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 px-5 py-4 border-t border-slate-800">
          <button
            onClick={closeModal}
            disabled={loading}
            className="px-4 py-2 text-sm rounded-lg text-slate-300 hover:bg-slate-800"
          >
            {cancelText}
          </button>

          <button
            onClick={confirm}
            disabled={loading || !canConfirm}
            className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg text-white
              ${variantConfig[variant].button}
              disabled:opacity-50`}
          >
            {loading ? "Đang xử lý..." : confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
