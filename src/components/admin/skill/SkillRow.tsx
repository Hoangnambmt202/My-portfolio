"use client";
import { GripVertical, Edit3, Trash2, Star, BookOpen, Lightbulb } from "lucide-react";
import Image from "next/image";
import { Skill } from "@/types/features/skill";

interface SkillRowProps {
  skill: Skill;
  onEdit: (skill: Skill) => void;
  onDelete: (skill: Skill) => void;
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
  isDragging?: boolean;
}

const LEVEL_BG: Record<string, string> = {
  Beginner: "bg-slate-700/50 text-slate-300",
  Intermediate: "bg-blue-500/10 text-blue-400",
  Advanced: "bg-cyan-500/10 text-cyan-400",
  Expert: "bg-emerald-500/10 text-emerald-400",
  Master: "bg-amber-500/10 text-amber-400",
};

const LEVEL_COLOR: Record<string, string> = {
  Beginner: "#94a3b8", Intermediate: "#60a5fa",
  Advanced: "#22d3ee", Expert: "#34d399", Master: "#fbbf24",
};

export default function SkillRow({
  skill, onEdit, onDelete, dragHandleProps, isDragging,
}: SkillRowProps) {
  return (
    <div
      className={`group flex items-center gap-4 px-5 py-4 border rounded-xl transition-all duration-200 ${
        isDragging
          ? "border-blue-500/50 bg-slate-900 shadow-lg scale-[1.01]"
          : "border-slate-800/70 bg-slate-900/30 hover:bg-slate-900/70 hover:border-slate-700"
      }`}
    >
      {/* Drag handle */}
      <div
        {...dragHandleProps}
        className="text-slate-700 group-hover:text-slate-500 cursor-grab active:cursor-grabbing transition-colors shrink-0"
      >
        <GripVertical size={16} />
      </div>

      {/* Icon */}
      <div className="size-11 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-hidden shrink-0">
        {skill.iconUrl ? (
          <Image src={skill.iconUrl} alt={skill.name} width={30} height={30} className="object-contain" />
        ) : (
          <span className="text-lg font-black text-slate-600">{skill.name.charAt(0)}</span>
        )}
      </div>

      {/* Name + group */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-white truncate group-hover:text-blue-400 transition-colors">
            {skill.name}
          </span>
          {skill.isHighlighted && (
            <Star size={11} className="text-amber-400 shrink-0" fill="currentColor" />
          )}
        </div>
        {skill.group && (
          <span className="text-[10px] text-slate-500 font-medium">{skill.group.name}</span>
        )}
      </div>

      {/* Details snippets */}
      <div className="hidden lg:flex items-center gap-4 flex-1 min-w-0">
        {skill.whenToUse && (
          <div className="flex items-center gap-1.5 min-w-0">
            <BookOpen size={11} className="text-cyan-400 shrink-0" />
            <span className="text-[11px] text-slate-500 truncate max-w-[140px]">{skill.whenToUse}</span>
          </div>
        )}
        {skill.whyItMatters && (
          <div className="flex items-center gap-1.5 min-w-0">
            <Lightbulb size={11} className="text-amber-400 shrink-0" />
            <span className="text-[11px] text-slate-500 truncate max-w-[140px]">{skill.whyItMatters}</span>
          </div>
        )}
      </div>

      {/* Level badge */}
      <span className={`shrink-0 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg ${LEVEL_BG[skill.level]}`}>
        {skill.level}
      </span>

      {/* Progress bar (w-24) */}
      <div className="shrink-0 w-24 space-y-1">
        <div className="flex justify-between">
          <span className="text-[9px] text-slate-600 uppercase font-bold">Prof.</span>
          <span className="text-[10px] font-black text-slate-400">{skill.proficiency}%</span>
        </div>
        <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${skill.proficiency}%`,
              backgroundColor: LEVEL_COLOR[skill.level] || "#3b82f6",
            }}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-all translate-x-1 group-hover:translate-x-0">
        <button
          onClick={() => onEdit(skill)}
          className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-blue-400 transition-colors"
        >
          <Edit3 size={14} />
        </button>
        <button
          onClick={() => onDelete(skill)}
          className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-red-400 transition-colors"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
