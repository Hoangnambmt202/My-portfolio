"use client";
import {
  GripVertical, Edit3, Trash2, Upload, Star,
  Lightbulb, BookOpen,
} from "lucide-react";
import Image from "next/image";
import { Skill } from "@/types/features/skill";

interface SkillCardProps {
  skill: Skill;
  onEdit: (skill: Skill) => void;
  onDelete: (skill: Skill) => void;
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
  isDragging?: boolean;
}

const LEVEL_COLOR: Record<string, string> = {
  Beginner: "#94a3b8",
  Intermediate: "#60a5fa",
  Advanced: "#22d3ee",
  Expert: "#34d399",
  Master: "#fbbf24",
};

const LEVEL_BG: Record<string, string> = {
  Beginner: "bg-slate-700/50 text-slate-300",
  Intermediate: "bg-blue-500/10 text-blue-400",
  Advanced: "bg-cyan-500/10 text-cyan-400",
  Expert: "bg-emerald-500/10 text-emerald-400",
  Master: "bg-amber-500/10 text-amber-400",
};

export default function SkillCard({
  skill, onEdit, onDelete, dragHandleProps, isDragging,
}: SkillCardProps) {
  const barColor = LEVEL_COLOR[skill.level] || "#3b82f6";
  const hasDetails = skill.whenToUse || skill.whyItMatters;

  return (
    <div
      className={`group relative bg-slate-900/50 border rounded-2xl p-5 transition-all duration-200 ${
        isDragging
          ? "border-blue-500/50 shadow-xl shadow-blue-900/20 scale-[1.02] bg-slate-900"
          : "border-slate-800 hover:border-slate-700 hover:bg-slate-900"
      }`}
    >
      {/* Drag handle */}
      <div
        {...dragHandleProps}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-700 group-hover:text-slate-500 cursor-grab active:cursor-grabbing transition-colors opacity-0 group-hover:opacity-100"
      >
        <GripVertical size={16} />
      </div>

      {/* Action buttons */}
      <div className="absolute top-3.5 right-3.5 flex gap-1 opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0">
        <button
          onClick={() => onEdit(skill)}
          className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-blue-400 transition-colors"
          title="Edit skill"
        >
          <Edit3 size={14} />
        </button>
        <button
          onClick={() => onDelete(skill)}
          className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-red-400 transition-colors"
          title="Delete skill"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Top row: icon + name + star */}
      <div className="flex items-start gap-4 pl-3">
        {/* Icon */}
        <div className="relative shrink-0">
          <div className="size-14 rounded-xl bg-slate-950 border border-slate-800 group-hover:border-slate-700 flex items-center justify-center overflow-hidden transition-colors">
            {skill.iconUrl ? (
              <Image src={skill.iconUrl} alt={skill.name} width={40} height={40} className="object-contain" />
            ) : (
              <span className="text-2xl font-black text-slate-600 select-none">
                {skill.name.charAt(0)}
              </span>
            )}
          </div>
          <button
            onClick={() => onEdit(skill)}
            className="absolute -bottom-1.5 -right-1.5 size-6 rounded-full bg-blue-600 text-white flex items-center justify-center border-2 border-slate-900 opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100"
            title="Change icon"
          >
            <Upload size={10} />
          </button>
        </div>

        <div className="flex-1 min-w-0 pt-0.5">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="text-base font-black text-white truncate group-hover:text-blue-400 transition-colors">
              {skill.name}
            </h3>
            {skill.isHighlighted && (
              <Star size={12} className="text-amber-400 shrink-0" fill="currentColor" />
            )}
          </div>

          <span className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md ${LEVEL_BG[skill.level]}`}>
            {skill.level}
          </span>

          {/* Progress bar */}
          <div className="mt-3 space-y-1.5">
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-bold text-slate-600 uppercase">Proficiency</span>
              <span className="text-xs font-black text-slate-300">{skill.proficiency}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${skill.proficiency}%`,
                  backgroundColor: barColor,
                  boxShadow: `0 0 8px ${barColor}60`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Expandable details */}
      {hasDetails && (
        <div className="mt-4 pt-4 border-t border-slate-800/60 pl-3 space-y-2.5">
          {skill.whenToUse && (
            <div className="flex gap-2">
              <BookOpen size={11} className="text-cyan-400 shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
                <span className="text-cyan-400 font-bold">When: </span>
                {skill.whenToUse}
              </p>
            </div>
          )}
          {skill.whyItMatters && (
            <div className="flex gap-2">
              <Lightbulb size={11} className="text-amber-400 shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
                <span className="text-amber-400 font-bold">Why: </span>
                {skill.whyItMatters}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
