"use client";
import React, { useState } from "react";
import {
  X,
  UploadCloud,
  BadgeCheck,
  Type,
  Layers,
  Star,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";
import Modal from "@/components/elements/Modal";

const NewSkillModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [proficiency, setProficiency] = useState(85);
  const [isHighlighted, setIsHighlighted] = useState(false);

  // Hàm xác định nhãn dựa trên mức độ %
  const getLevelLabel = (val: number) => {
    if (val <= 20) return "Beginner";
    if (val <= 40) return "Intermediate";
    if (val <= 60) return "Advanced";
    if (val <= 80) return "Expert";
    return "Master";
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* Modal Container */}
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl shrink-0">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-2xl bg-blue-600/10 text-blue-500 flex items-center justify-center border border-blue-500/20 shadow-inner">
              <BadgeCheck size={28} />
            </div>
            <div>
              <h3 className="text-xl font-black text-white tracking-tight">
                Create New Skill
              </h3>
              <p className="text-sm text-slate-500 font-medium">
                Define your technical expertise.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-white transition-all rounded-full p-2 hover:bg-slate-800 group"
          >
            <X
              size={20}
              className="group-hover:rotate-90 transition-transform duration-300"
            />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-8 overflow-y-auto custom-scrollbar space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Left: Icon Upload */}
            <div className="md:col-span-4 space-y-3">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">
                Skill Icon
              </label>
              <div className="relative group cursor-pointer w-full aspect-square rounded-3xl border-2 border-dashed border-slate-800 hover:border-blue-500 bg-slate-950/50 hover:bg-slate-800/50 transition-all duration-500 flex flex-col items-center justify-center text-center p-4 overflow-hidden">
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                <div className="size-14 rounded-2xl bg-slate-800 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-blue-600/10 transition-all duration-500">
                  <UploadCloud
                    size={28}
                    className="text-slate-500 group-hover:text-blue-500 transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors">
                    Choose File
                  </p>
                  <p className="text-[10px] text-slate-600">
                    SVG or PNG up to 2MB
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Inputs */}
            <div className="md:col-span-8 space-y-6">
              <div className="group">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 group-focus-within:text-blue-400 transition-colors">
                  Skill Name
                </label>
                <div className="relative">
                  <Type
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="e.g. React.js"
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-12 pr-4 py-3.5 text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 group-focus-within:text-blue-400 transition-colors">
                  Group by
                </label>
                <div className="relative">
                  <Layers
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                    size={18}
                  />
                  <select className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-12 pr-10 py-3.5 text-white appearance-none cursor-pointer focus:outline-none focus:border-blue-400 transition-all">
                    <option>Frontend Development</option>
                    <option>Backend Development</option>
                    <option>DevOps & Infrastructure</option>
                    <option>UI/UX Design</option>
                  </select>
                  <ChevronDown
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none"
                    size={18}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Proficiency Slider */}
          <div className="pt-8 border-t border-slate-800">
            <div className="flex justify-between items-end mb-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Proficiency Level
                </label>
                <p className="text-sm text-slate-400 mt-1 font-medium italic">
                  Current Level: {getLevelLabel(proficiency)}
                </p>
              </div>
              <div className="px-4 py-1 bg-blue-600/10 border border-blue-500/20 rounded-full">
                <span className="text-lg font-black text-blue-400">
                  {proficiency}%
                </span>
              </div>
            </div>

            <div className="relative group px-1">
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={proficiency}
                onChange={(e) => setProficiency(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-full appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between mt-4">
                {["Beginner", "Advanced", "Master"].map((tick) => (
                  <span
                    key={tick}
                    className="text-[10px] font-black text-slate-600 uppercase tracking-tighter"
                  >
                    {tick}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Feature Highlight Toggle */}
          <div
            onClick={() => setIsHighlighted(!isHighlighted)}
            className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all cursor-pointer ${
              isHighlighted
                ? "bg-amber-500/5 border-amber-500/30"
                : "bg-slate-950/50 border-slate-800 hover:border-slate-700"
            }`}
          >
            <div
              className={`size-10 rounded-xl flex items-center justify-center transition-all ${
                isHighlighted
                  ? "bg-amber-500 text-white shadow-lg shadow-amber-900/40"
                  : "bg-slate-800 text-slate-600"
              }`}
            >
              <Star size={20} fill={isHighlighted ? "currentColor" : "none"} />
            </div>
            <div className="flex-1">
              <p
                className={`text-sm font-bold ${isHighlighted ? "text-white" : "text-slate-300"}`}
              >
                Highlight on Home
              </p>
              <p className="text-xs text-slate-500 font-medium">
                Showcase in the hero section cloud for maximum visibility.
              </p>
            </div>
            <div
              className={`size-6 rounded-full border-2 flex items-center justify-center transition-all ${
                isHighlighted
                  ? "border-amber-500 bg-amber-500"
                  : "border-slate-700"
              }`}
            >
              {isHighlighted && (
                <CheckCircle2 size={14} className="text-slate-900" />
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-6 border-t border-slate-800 bg-slate-900 flex justify-end gap-4 shrink-0 shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl text-sm font-bold text-slate-500 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-black transition-all active:scale-95 shadow-lg shadow-blue-900/30 flex items-center gap-2">
            <CheckCircle2 size={18} />
            Create Skill
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default NewSkillModal;
