/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import {
  Calendar,
  GraduationCap,
  Terminal,
  Code2,
  Building2,
  CheckCircle2,
  Edit3,
  Trash2,
  Plus,
  Save,
  X,
  MapPin,
} from "lucide-react";
import { Experience } from "@/lib/api/experiences";
import { useExperienceStore } from "@/stores/admin/experience/AdminExperience.store";
import { ExpType } from "@prisma/client";
import { motion, AnimatePresence } from "framer-motion";

// --- Helpers ---
const ICONS: Record<ExpType, React.ReactNode> = {
  WORK: <Code2 size={18} />,
  EDUCATION: <GraduationCap size={18} />,
  FREELANCE: <Terminal size={18} />,
  INTERNSHIP: <Building2 size={18} />,
  CONTRACT: <Code2 size={18} />,
};

const TYPE_COLORS: Record<ExpType, string> = {
  WORK: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  EDUCATION: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  FREELANCE: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  INTERNSHIP: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  CONTRACT: "bg-slate-800 text-slate-400 border-slate-700",
};

export default function ExperienceManagement() {
  const {
    experiences,
    loading,
    fetchExperiences,
    addExperience,
    updateExperience,
    deleteExperience,
  } = useExperienceStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Form states
  const [formData, setFormData] = useState<Partial<Experience>>({});

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  const handleEdit = (exp: Experience) => {
    setEditingId(exp.id);
    setFormData(exp);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData({});
  };

  const handleSave = async () => {
    try {
      // Form validation for required fields
      if (
        !formData.position?.trim() ||
        !formData.company?.trim() ||
        !formData.startDate
      ) {
        alert("Please fill in Position, Company, and Start Date!");
        return;
      }

      if (editingId) {
        const res = await updateExperience(editingId, formData);
        if (res.success) {
          setEditingId(null);
          setFormData({});
        } else {
          alert("Failed to update: " + res.error);
        }
      } else {
        const res = await addExperience(formData as any);
        if (res.success) {
          setIsAdding(false);
          setFormData({});
        } else {
          alert("Failed to add: " + res.error);
        }
      }
    } catch (error) {
      console.error(error);
      alert("Failed to save experience.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await deleteExperience(id);
      if (!res.success) {
        alert("Failed to delete: " + res.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: any) => {
    const { name, value, checked } = e.target;
    if (name === "isCurrent") {
      setFormData((prev) => ({ ...prev, isCurrent: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return "Present";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30 overflow-hidden">
      <main className="flex-1 overflow-y-auto relative bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-950 to-slate-950 custom-scrollbar">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="max-w-5xl mx-auto px-6 py-12 relative z-10">
          <div className="mb-24 flex items-end justify-between">
            <div>
              <Breadcrumb />
              <h1 className="mb-4 text-6xl font-black leading-[0.9] tracking-tighter text-white md:text-8xl">
                My <span className="text-[#137fec]">Journey</span>
              </h1>
            </div>
            {!isAdding && !editingId && (
              <button
                onClick={() => {
                  setIsAdding(true);
                  setFormData({
                    type: "WORK",
                    achievements: [],
                    isCurrent: false,
                  });
                }}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black transition-all active:scale-95 shadow-xl shadow-blue-900/40"
              >
                <Plus size={20} /> Add Experience
              </button>
            )}
          </div>

          <div className="relative space-y-0 pb-20">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-slate-800 to-transparent z-0" />

            <AnimatePresence mode="popLayout">
              {isAdding && (
                <ExperienceForm
                  formData={formData}
                  onChange={handleChange}
                  onSave={handleSave}
                  onCancel={handleCancel}
                />
              )}

              {experiences.map((exp) => (
                <motion.div
                  key={exp.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                  className="relative pl-24 pb-16 last:pb-0 group"
                >
                  <div className="absolute left-0 top-0 size-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center z-10 shadow-xl group-hover:border-blue-500/50 transition-colors">
                    <div
                      className={`p-2 rounded-lg ${TYPE_COLORS[exp.type]?.split(" ")[1]}`}
                    >
                      {ICONS[exp.type]}
                    </div>
                  </div>

                  {editingId === exp.id ? (
                    <ExperienceForm
                      formData={formData}
                      onChange={handleChange}
                      onSave={handleSave}
                      onCancel={handleCancel}
                    />
                  ) : (
                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8 backdrop-blur-sm hover:bg-slate-900/80 hover:border-slate-700 transition-all group/card relative">
                      <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover/card:opacity-100 transition-all translate-y-1 group-hover/card:translate-y-0">
                        <button
                          onClick={() => handleEdit(exp)}
                          className="p-2 bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white rounded-lg transition-all"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(exp.id)}
                          className="p-2 bg-slate-800 hover:bg-red-600 text-slate-400 hover:text-white rounded-lg transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-6">
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <h3 className="text-2xl font-black text-white tracking-tight">
                              {exp.position}
                            </h3>
                            <span
                              className={`px-2.5 py-1 text-[10px] font-black uppercase rounded border ${TYPE_COLORS[exp.type]}`}
                            >
                              {exp.type.toLowerCase()}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-400 font-bold">
                            <Building2 size={16} className="text-blue-500" />
                            <span>{exp.company}</span>
                            {exp.location && (
                              <>
                                <span className="text-slate-700">•</span>
                                <MapPin size={14} className="text-slate-600" />
                                <span className="text-slate-500 font-medium">
                                  {exp.location}
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl shrink-0">
                          <Calendar size={14} className="text-blue-500" />
                          <span className="text-xs font-black text-slate-300 font-mono tracking-wider italic">
                            {formatDate(exp.startDate)} —{" "}
                            {exp.isCurrent
                              ? "Present"
                              : formatDate(exp.endDate)}
                          </span>
                        </div>
                      </div>

                      <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-3xl font-medium">
                        {exp.description}
                      </p>

                      {exp.achievements.length > 0 && (
                        <div className="bg-slate-950/50 rounded-2xl p-6 border border-slate-800/50">
                          <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">
                            Core Achievements
                          </h5>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {exp.achievements.map((item, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-3 group/item"
                              >
                                <CheckCircle2
                                  size={18}
                                  className="text-blue-500 mt-0.5 shrink-0 group-hover/item:scale-110 transition-transform"
                                />
                                <span className="text-sm text-slate-300 font-medium leading-snug">
                                  {item}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {!loading && experiences.length === 0 && !isAdding && (
              <div className="text-center py-20 bg-slate-900/20 rounded-3xl border border-dashed border-slate-800">
                <p className="text-slate-500 font-bold">
                  No experiences found. Start by adding one!
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

// --- Subcomponents ---

function ExperienceForm({ formData, onChange, onSave, onCancel }: any) {
  // Store raw input for achievements locally so user can comfortably type commas
  const [achievementsText, setAchievementsText] = useState(
    formData.achievements?.join(", ") || "",
  );

  const handleAchievementsChange = (e: any) => {
    setAchievementsText(e.target.value);
    // Automatically parse to parent logic
    onChange({
      target: {
        name: "achievements",
        value: e.target.value
          .split(",")
          .map((i: string) => i.trim())
          .filter(Boolean),
      },
    });
  };

  return (
    <div className="bg-slate-900 border-2 border-blue-500/30 rounded-2xl p-6 md:p-8 backdrop-blur-sm relative mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">
              Position / Role
            </label>
            <input
              name="position"
              value={formData.position || ""}
              onChange={onChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:border-blue-500 outline-none transition-all font-bold placeholder:text-slate-700"
              placeholder="e.g. Senior Frontend Engineer"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">
              Company / Organization
            </label>
            <input
              name="company"
              value={formData.company || ""}
              onChange={onChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:border-blue-500 outline-none transition-all font-bold placeholder:text-slate-700"
              placeholder="e.g. TechFlow Solutions"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">
                Type
              </label>
              <select
                name="type"
                value={formData.type || "WORK"}
                onChange={onChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:border-blue-500 outline-none transition-all"
              >
                <option value="WORK">Work</option>
                <option value="EDUCATION">Education</option>
                <option value="FREELANCE">Freelance</option>
                <option value="INTERNSHIP">Internship</option>
                <option value="CONTRACT">Contract</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">
                Location
              </label>
              <input
                name="location"
                value={formData.location || ""}
                onChange={onChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:border-blue-500 outline-none transition-all placeholder:text-slate-700"
                placeholder="e.g. Remote / Hanoi"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={
                  formData.startDate ? formData.startDate.substring(0, 10) : ""
                }
                onChange={onChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div className="relative">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                disabled={formData.isCurrent}
                value={
                  formData.endDate ? formData.endDate.substring(0, 10) : ""
                }
                onChange={onChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:border-blue-500 outline-none transition-all disabled:opacity-20"
              />
              <label className="flex items-center gap-2 mt-2 ml-1 cursor-pointer select-none group/current">
                <input
                  type="checkbox"
                  name="isCurrent"
                  checked={formData.isCurrent}
                  onChange={onChange}
                  className="accent-blue-500 size-3"
                />
                <span className="text-[10px] font-black uppercase text-slate-500 group-hover/current:text-blue-400 transition-colors">
                  I&apos;m currently working here
                </span>
              </label>
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">
              General Description
            </label>
            <textarea
              name="description"
              value={formData.description || ""}
              onChange={onChange}
              rows={3}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:border-blue-500 outline-none transition-all placeholder:text-slate-700 resize-none"
              placeholder="Tell more about your role..."
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">
          Core Achievements (Separated by commas)
        </label>
        <textarea
          name="achievements"
          value={achievementsText}
          onChange={handleAchievementsChange}
          rows={2}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:border-blue-500 outline-none transition-all placeholder:text-slate-700 resize-none"
          placeholder="Achievement 1, Achievement 2, ..."
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="flex items-center gap-2 px-5 py-2.5 text-slate-500 hover:text-white font-bold transition-all"
        >
          <X size={16} /> Cancel
        </button>
        <button
          onClick={onSave}
          className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black transition-all active:scale-95 shadow-xl shadow-blue-600/20"
        >
          <Save size={16} /> Save Changes
        </button>
      </div>
    </div>
  );
}
