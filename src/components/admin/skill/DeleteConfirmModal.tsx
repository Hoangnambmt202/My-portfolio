"use client";
import { AlertTriangle, Trash2, X } from "lucide-react";
import Modal from "@/components/ui/Modal";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  title: string;
  description?: string;
  loading?: boolean;
}

export default function DeleteConfirmModal({
  isOpen, onClose, onConfirm, title, description, loading,
}: DeleteConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-7 text-center">
          <div className="size-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-5">
            <AlertTriangle size={26} className="text-red-400" />
          </div>
          <h3 className="text-lg font-black text-white mb-2">{title}</h3>
          {description && (
            <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
          )}
        </div>
        <div className="px-7 pb-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-center gap-2"
          >
            <X size={15} /> Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white rounded-xl text-sm font-black transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Trash2 size={15} />
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
