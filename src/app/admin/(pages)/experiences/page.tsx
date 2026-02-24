"use client";

import React from "react";
import {
  Plus,
  Calendar,
  GraduationCap,
  Terminal,
  Code2,
  Building2,
  CheckCircle2,
  Edit3,
  Trash2,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

// --- Types ---
interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  type: "Full-time" | "Contract" | "Education" | "Internship";
  description: string;
  achievements?: string[];
  coursework?: string[];
  icon: React.ReactNode;
}

const ExperienceManagement: React.FC = () => {
  const experiences: ExperienceItem[] = [
    {
      id: "1",
      role: "Senior Frontend Engineer",
      company: "TechFlow Solutions",
      period: "2021 - Present",
      type: "Full-time",
      icon: <Code2 size={20} />,
      description:
        "Leading the frontend development team in building scalable web applications using React, Next.js, and TypeScript. Responsible for architectural decisions, code reviews, and mentoring junior developers.",
      achievements: [
        "Improved application performance by 40% through code splitting and optimization.",
        "Implemented a comprehensive design system used across 5 products.",
        "Successfully migrated legacy codebase to modern React hooks architecture.",
      ],
    },
    {
      id: "2",
      role: "Web Developer",
      company: "Creative Agency X",
      period: "2019 - 2021",
      type: "Contract",
      icon: <Terminal size={20} />,
      description:
        "Developed responsive websites and e-commerce platforms. Collaborated closely with designers for pixel-perfect UI/UX implementation.",
      achievements: [
        "Delivered over 15 client projects with a 100% satisfaction rate.",
        "Introduced automated testing workflows reducing bug reports by 25%.",
      ],
    },
    {
      id: "3",
      role: "BS in Computer Science",
      company: "University of Technology",
      period: "2015 - 2019",
      type: "Education",
      icon: <GraduationCap size={20} />,
      description:
        "Focused on software engineering principles, algorithms, and data structures. Participated in multiple hackathons.",
      coursework: [
        "Data Structures",
        "Algorithms",
        "Database Systems",
        "Web Dev",
      ],
    },
  ];

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30 overflow-hidden">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-950 to-slate-950">
        {/* Decorative Grid Background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="max-w-5xl mx-auto px-6 py-12 relative z-10">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-blue-500 uppercase tracking-widest mb-2">
                <span>Management</span>
                <ChevronRight size={14} />
                <span className="text-slate-500">Career Timeline</span>
              </div>
              <h1 className="text-4xl font-black text-white tracking-tight">
                Experience History
              </h1>
              <p className="text-slate-500 mt-2 font-medium">
                Curate your professional journey and educational milestones.
              </p>
            </div>
            <Link
              href={"/admin/experiences/new"}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20 active:scale-95 group"
            >
              <Plus
                size={20}
                className="group-hover:rotate-90 transition-transform"
              />
              <span>Add Experience</span>
            </Link>
          </div>

          {/* Timeline Wrapper */}
          <div className="relative space-y-0 pb-20">
            {/* The Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-slate-800 to-transparent z-0" />

            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="relative pl-24 pb-16 last:pb-0 group"
              >
                {/* Timeline Icon Node */}
                <div className="absolute left-0 top-0 size-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center z-10 shadow-xl group-hover:border-blue-500/50 transition-colors">
                  <div
                    className={`p-2 rounded-lg ${exp.type === "Education" ? "bg-purple-500/10 text-purple-400" : "bg-blue-500/10 text-blue-400"}`}
                  >
                    {exp.icon}
                  </div>
                </div>

                {/* Experience Card */}
                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8 backdrop-blur-sm hover:bg-slate-900/80 hover:border-slate-700 transition-all group/card relative">
                  {/* Floating Action Buttons */}
                  <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover/card:opacity-100 transition-all translate-y-1 group-hover/card:translate-y-0">
                    <Link
                      href={`/admin/experiences/edit/${exp.id}`}
                      className="p-2 bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white rounded-lg transition-all"
                    >
                      <Edit3 size={18} />
                    </Link>
                    <button className="p-2 bg-slate-800 hover:bg-red-600 text-slate-400 hover:text-white rounded-lg transition-all">
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-2xl font-black text-white tracking-tight">
                          {exp.role}
                        </h3>
                        <span
                          className={`px-2.5 py-1 text-[10px] font-black uppercase rounded border ${
                            exp.type === "Full-time"
                              ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                              : exp.type === "Education"
                                ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                                : "bg-slate-800 text-slate-400 border-slate-700"
                          }`}
                        >
                          {exp.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 font-bold">
                        <Building2 size={16} className="text-blue-500" />
                        <span>{exp.company}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl shrink-0">
                      <Calendar size={14} className="text-blue-500" />
                      <span className="text-xs font-black text-slate-300 font-mono tracking-wider">
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-3xl font-medium">
                    {exp.description}
                  </p>

                  {/* Achievements List */}
                  {exp.achievements && (
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

                  {/* Coursework Tags */}
                  {exp.coursework && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {exp.coursework.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-slate-800 text-slate-400 text-[10px] font-bold uppercase rounded-full border border-slate-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExperienceManagement;
