"use client";
import { useState } from "react";
import { X, Layers, Palette, CheckCircle2, Type, FileText } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { SkillGroup } from "@/types/features/skill";

const GROUP_COLORS = [
  "#3b82f6", "#06b6d4", "#10b981", "#f59e0b",
  "#ef4444", "#8b5cf6", "#ec4899", "#64748b",
];

interface GroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { name: string; description?: string; color?: string; icon?: string }) => Promise<void>;
  group?: SkillGroup | null;
}

export default function GroupModal({ isOpen, onClose, onSave, group }: GroupModalProps) {
  const isEdit = !!group;
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState(group?.color ?? "#3b82f6");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData(e.currentTarget);
      await onSave({
        name: fd.get("name") as string,
        description: (fd.get("description") as string) || undefined,
        color,
        icon: (fd.get("icon") as string) || undefined,
      });
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div
              className="size-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${color}20`, border: `1px solid ${color}40` }}
            >
              <Layers size={20} style={{ color }} />
            </div>
            <div>
              <h3 className="text-base font-black text-white">{isEdit ? "Edit Group" : "New Skill Group"}</h3>
              <p className="text-xs text-slate-500">{isEdit ? "Update group details" : "Organize your skills"}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-xl transition-all">
            <X size={17} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-5">
            {/* Name */}
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                Group Name *
              </label>
              <div className="relative">
                <Type className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600" size={15} />
                <input
                  name="name"
                  defaultValue={group?.name ?? ""}
                  required
                  placeholder="e.g. Frontend Development"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                <FileText size={11} /> Description
              </label>
              <textarea
                name="description"
                defaultValue={group?.description ?? ""}
                rows={2}
                placeholder="Short description for this skill group..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all resize-none"
              />
            </div>

            {/* Icon name (Lucide) */}
            <div>
              <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                <Layers size={11} /> Icon Name (Lucide)
              </label>
              <input
                name="icon"
                defaultValue={group?.icon ?? ""}
                placeholder="e.g. Code2, Database, Palette..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>

            {/* Color picker */}
            <div>
              <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                <Palette size={11} /> Accent Color
              </label>
              <div className="flex flex-wrap gap-2">
                {GROUP_COLORS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className="size-8 rounded-lg transition-all hover:scale-110 border-2"
                    style={{
                      backgroundColor: c,
                      borderColor: color === c ? "white" : "transparent",
                      boxShadow: color === c ? `0 0 12px ${c}80` : "none",
                    }}
                  />
                ))}
                <label
                  className="size-8 rounded-lg border-2 border-dashed border-slate-700 flex items-center justify-center cursor-pointer hover:border-slate-500 transition-colors overflow-hidden"
                  title="Custom color"
                >
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="opacity-0 absolute size-0"
                  />
                  <Palette size={14} className="text-slate-500" />
                </label>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <div className="size-4 rounded" style={{ backgroundColor: color }} />
                <span className="text-xs font-mono text-slate-400">{color}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/50 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl text-sm font-black transition-all active:scale-95 flex items-center gap-2"
              style={{ boxShadow: `0 4px 20px ${color}30` }}
            >
              <CheckCircle2 size={16} />
              {loading ? "Saving..." : isEdit ? "Update Group" : "Create Group"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
