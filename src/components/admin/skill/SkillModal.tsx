"use client";
import { useState, useRef } from "react";
import {
  X,
  UploadCloud,
  BadgeCheck,
  Type,
  Layers,
  Star,
  CheckCircle2,
  ChevronDown,
  Lightbulb,
  BookOpen,
} from "lucide-react";
import Image from "next/image";
import Modal from "@/components/ui/Modal";
import {
  Skill,
  SkillGroup,
  levelFromProficiency,
} from "@/types/features/skill";

interface SkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (formData: FormData) => Promise<void>;
  groups: SkillGroup[];
  skill?: Skill | null; // null = create mode
}

export default function SkillModal({
  isOpen,
  onClose,
  onSave,
  groups,
  skill,
}: SkillModalProps) {
  const isEdit = !!skill;
  const [loading, setLoading] = useState(false);
  const [proficiency, setProficiency] = useState(skill?.proficiency ?? 75);
  const [isHighlighted, setIsHighlighted] = useState(
    skill?.isHighlighted ?? false,
  );
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    skill?.iconUrl ?? null,
  );
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPreviewUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = e.currentTarget;
      const fd = new FormData(form);
      fd.set("proficiency", String(proficiency));
      fd.set("isHighlighted", String(isHighlighted));
      if (fileRef.current?.files?.[0]) {
        fd.set("icon", fileRef.current.files[0]);
      }
      await onSave(fd);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const getLevelLabel = (val: number) => levelFromProficiency(val);

  const levelColors: Record<string, string> = {
    Beginner: "text-slate-400",
    Intermediate: "text-blue-400",
    Advanced: "text-cyan-400",
    Expert: "text-emerald-400",
    Master: "text-amber-400",
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="size-11 rounded-xl bg-blue-600/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
              <BadgeCheck size={22} />
            </div>
            <div>
              <h3 className="text-lg font-black text-white tracking-tight">
                {isEdit ? "Edit Skill" : "New Skill"}
              </h3>
              <p className="text-xs text-slate-500">
                {isEdit
                  ? "Update skill details"
                  : "Define your technical expertise"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-xl transition-all"
          >
            <X
              size={18}
              className="transition-transform hover:rotate-90 duration-200"
            />
          </button>
        </div>

        {/* Body */}
        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto custom-scrollbar"
        >
          <div className="p-7 space-y-7">
            {/* Icon + Name + Group */}
            <div className="grid grid-cols-12 gap-6">
              {/* Icon upload */}
              <div className="col-span-4 space-y-2">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Icon / Image
                </label>
                <div
                  onClick={() => fileRef.current?.click()}
                  className="relative group cursor-pointer w-full aspect-square rounded-2xl border-2 border-dashed border-slate-700 hover:border-blue-500 bg-slate-950/60 hover:bg-slate-800/40 transition-all flex flex-col items-center justify-center overflow-hidden"
                >
                  {previewUrl ? (
                    <>
                      <Image
                        src={previewUrl}
                        alt="preview"
                        fill
                        className="object-contain p-4"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <UploadCloud size={24} className="text-white" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="size-12 rounded-xl bg-slate-800 flex items-center justify-center mb-2 group-hover:bg-blue-600/15 transition-all">
                        <UploadCloud
                          size={22}
                          className="text-slate-500 group-hover:text-blue-400 transition-colors"
                        />
                      </div>
                      <p className="text-[11px] font-semibold text-slate-500 group-hover:text-slate-300">
                        SVG / PNG / JPG
                      </p>
                      <p className="text-[10px] text-slate-600">up to 2MB</p>
                    </>
                  )}
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              {/* Name + Group */}
              <div className="col-span-8 space-y-5">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                    Skill Name *
                  </label>
                  <div className="relative">
                    <Type
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600"
                      size={16}
                    />
                    <input
                      name="name"
                      defaultValue={skill?.name ?? ""}
                      required
                      placeholder="e.g. React.js"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                    Skill Group
                  </label>
                  <div className="relative">
                    <Layers
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600"
                      size={16}
                    />
                    <select
                      name="groupId"
                      defaultValue={skill?.groupId ?? ""}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-8 py-3 text-sm text-white appearance-none cursor-pointer focus:outline-none focus:border-blue-500 transition-all"
                    >
                      <option value="">— No Group —</option>
                      {groups.map((g) => (
                        <option key={g.id} value={g.id}>
                          {g.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none"
                      size={16}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Proficiency slider */}
            <div className="pt-5 border-t border-slate-800/60">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    Proficiency
                  </label>
                  <p
                    className={`text-sm font-bold mt-1 ${levelColors[getLevelLabel(proficiency)]}`}
                  >
                    {getLevelLabel(proficiency)}
                  </p>
                </div>
                <span className="px-3 py-1 bg-blue-600/10 border border-blue-500/20 rounded-full text-sm font-black text-blue-400">
                  {proficiency}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={proficiency}
                onChange={(e) => setProficiency(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-full appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between mt-3">
                {[
                  "Beginner",
                  "Intermediate",
                  "Advanced",
                  "Expert",
                  "Master",
                ].map((t) => (
                  <span
                    key={t}
                    className="text-[9px] font-bold text-slate-600 uppercase tracking-tight"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* When to use */}
            <div className="pt-5 border-t border-slate-800/60">
              <label className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                <BookOpen size={12} className="text-cyan-400" />
                When to Use
              </label>
              <textarea
                name="whenToUse"
                defaultValue={skill?.whenToUse ?? ""}
                rows={3}
                placeholder="Describe the ideal scenarios or contexts where this skill is best applied..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/10 transition-all resize-none custom-scrollbar"
              />
            </div>

            {/* Why it matters */}
            <div>
              <label className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                <Lightbulb size={12} className="text-amber-400" />
                Why It Matters
              </label>
              <textarea
                name="whyItMatters"
                defaultValue={skill?.whyItMatters ?? ""}
                rows={3}
                placeholder="Explain the business or technical value this skill brings to a project..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/10 transition-all resize-none custom-scrollbar"
              />
            </div>

            {/* Highlight toggle */}
            <div
              onClick={() => setIsHighlighted(!isHighlighted)}
              className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                isHighlighted
                  ? "bg-amber-500/5 border-amber-500/30"
                  : "bg-slate-950/50 border-slate-800 hover:border-slate-700"
              }`}
            >
              <div
                className={`size-9 rounded-lg flex items-center justify-center transition-all ${
                  isHighlighted
                    ? "bg-amber-500 text-white shadow-lg shadow-amber-900/30"
                    : "bg-slate-800 text-slate-500"
                }`}
              >
                <Star
                  size={18}
                  fill={isHighlighted ? "currentColor" : "none"}
                />
              </div>
              <div className="flex-1">
                <p
                  className={`text-sm font-bold ${isHighlighted ? "text-white" : "text-slate-300"}`}
                >
                  Highlight on Home
                </p>
                <p className="text-xs text-slate-500">
                  Feature this skill in the hero skill cloud
                </p>
              </div>
              <div
                className={`size-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  isHighlighted
                    ? "border-amber-500 bg-amber-500"
                    : "border-slate-700"
                }`}
              >
                {isHighlighted && (
                  <CheckCircle2 size={12} className="text-slate-900" />
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-7 py-5 border-t border-slate-800 bg-slate-900/50 flex justify-end gap-3 shrink-0">
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
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl text-sm font-black transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-blue-900/20"
            >
              <CheckCircle2 size={16} />
              {loading ? "Saving..." : isEdit ? "Update Skill" : "Create Skill"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
