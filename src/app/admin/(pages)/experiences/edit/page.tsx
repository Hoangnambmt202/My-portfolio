"use client";

import React, { useState } from "react";
import {
  Save,
  X,
  Briefcase,
  GraduationCap,
  Award,
  MapPin,
  BrainCircuit,
  ChevronRight,
  Info,
  CheckCircle2,
} from "lucide-react";

const EditExperienceForm = () => {
  const [entryType, setEntryType] = useState("work");
  const [isCurrent, setIsCurrent] = useState(false);
  const [skills, setSkills] = useState(["React", "TypeScript", "Tailwind CSS"]);
  const [skillInput, setSkillInput] = useState("");

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (skillInput && !skills.includes(skillInput)) {
      setSkills([...skills, skillInput]);
      setSkillInput("");
    }
  };

  const removeSkill = (tag: string) => {
    setSkills(skills.filter((s) => s !== tag));
  };

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30 overflow-hidden">
      {/* Header Bar */}
      <header className="h-20 border-b border-slate-800/60 bg-slate-900/50 backdrop-blur-xl flex items-center justify-between px-8 shrink-0 z-30">
        <div className="flex-col items-center gap-6">
          <div className="hidden md:flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
            <span>Edit Experience</span>
            <ChevronRight size={14} />
            <span className="text-blue-400">Edit Experience</span>
          </div>
          <h1 className="text-xl font-black text-white tracking-tight">
            Edit Experience
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-5 py-2 text-sm font-bold text-slate-400 hover:text-white transition-colors">
            Cancel
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-black shadow-lg shadow-blue-900/40 transition-all active:scale-95">
            <Save size={18} />
            <span>Save Changes</span>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-950 to-slate-950 p-6 md:p-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Primary Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Main Details Card */}
            <section className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 shadow-sm backdrop-blur-sm">
              <div className="space-y-6">
                <div className="group">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 group-focus-within:text-blue-400 transition-colors">
                    Job Title / Degree Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Senior Software Architect"
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-5 py-4 text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                <div className="group">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 group-focus-within:text-blue-400 transition-colors">
                    Company / Organization
                  </label>
                  <div className="relative">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600">
                      <Briefcase size={20} />
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. Google, Inc."
                      className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl pl-14 pr-5 py-4 text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 group-focus-within:text-blue-400 transition-colors">
                    Description & Key Achievements
                  </label>
                  <textarea
                    rows={12}
                    placeholder="Use bullet points for achievements. Markdown is supported..."
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-5 py-4 text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none font-medium leading-relaxed"
                  />
                  <p className="flex justify-end text-[10px] font-bold text-slate-600 mt-2 tracking-widest uppercase">
                    Markdown Support Active
                  </p>
                </div>
              </div>
            </section>

            {/* Skills Card */}
            <section className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                  <BrainCircuit size={20} />
                </div>
                <h2 className="text-lg font-bold text-white">
                  Technologies & Tools
                </h2>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="flex items-center gap-2 px-4 py-1.5 bg-blue-600/10 text-blue-400 text-xs font-black uppercase rounded-full border border-blue-500/20 group"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(skill)}
                      className="hover:text-red-400 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>

              <div className="relative flex gap-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddSkill(e)}
                  placeholder="Add a skill (e.g. Next.js)..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-5 py-3 text-sm focus:border-blue-500 focus:outline-none transition-all"
                />
                <button
                  onClick={handleAddSkill}
                  className="px-6 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all"
                >
                  Add
                </button>
              </div>
            </section>
          </div>

          {/* Right Column: Settings Sidepanel */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Entry Type Selection */}
            <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-sm">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6">
                Category
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "work", icon: <Briefcase size={20} />, label: "Work" },
                  {
                    id: "education",
                    icon: <GraduationCap size={20} />,
                    label: "Study",
                  },
                  { id: "intern", icon: <Award size={20} />, label: "Intern" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setEntryType(item.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${
                      entryType === item.id
                        ? "bg-blue-600/10 border-blue-500/40 text-blue-400 shadow-lg shadow-blue-900/10"
                        : "bg-slate-950/50 border-slate-800 text-slate-500 hover:border-slate-700"
                    }`}
                  >
                    {item.icon}
                    <span className="text-[10px] font-black uppercase tracking-wider">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            {/* Duration & Metadata */}
            <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
              <div className="space-y-4">
                <div className="group">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                    Employment Type
                  </label>
                  <select className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-400 outline-none">
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract / Freelance</option>
                    <option>Internship</option>
                  </select>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-800">
                  <div className="group">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-400 outline-none"
                    />
                  </div>

                  <div
                    className={`group transition-opacity duration-300 ${isCurrent ? "opacity-30" : "opacity-100"}`}
                  >
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      disabled={isCurrent}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-400 outline-none"
                    />
                  </div>

                  <label className="flex items-center gap-3 p-3 bg-slate-950/50 rounded-xl border border-slate-800 cursor-pointer group hover:border-blue-500/30 transition-all">
                    <input
                      type="checkbox"
                      checked={isCurrent}
                      onChange={() => setIsCurrent(!isCurrent)}
                      className="size-5 rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-blue-500/20"
                    />
                    <span className="text-sm font-bold text-slate-400 group-hover:text-slate-200">
                      I currently work here
                    </span>
                  </label>
                </div>

                <div className="group pt-4">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                    />
                    <input
                      type="text"
                      placeholder="e.g. Remote / NYC"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:border-blue-400 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Tips */}
            <div className="p-6 bg-gradient-to-br from-blue-600/10 to-indigo-600/10 border border-blue-500/20 rounded-3xl">
              <div className="flex items-center gap-2 mb-3 text-blue-400">
                <Info size={18} />
                <h4 className="text-xs font-black uppercase tracking-wider">
                  Expert Tips
                </h4>
              </div>
              <ul className="space-y-2">
                {[
                  "Use strong action verbs (Led, Scaled, Architected).",
                  "Mention specific metrics where possible.",
                  "Tag at least 3 relevant technologies.",
                ].map((tip, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-[11px] font-medium text-slate-400 leading-relaxed"
                  >
                    <CheckCircle2
                      size={12}
                      className="text-blue-500/50 mt-0.5 shrink-0"
                    />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default EditExperienceForm;
