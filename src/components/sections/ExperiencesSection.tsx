"use client";

import {
  Calendar,
  GraduationCap,
  Terminal,
  Code2,
  Building2,
  CheckCircle2,
} from "lucide-react";

/* ─────────────────────────────────────────────────────
   Experience Section — Next.js / TypeScript / Tailwind
   Desktop : vertical timeline, left icon nodes
   Tablet  : same timeline, tighter padding
   Mobile  : horizontal scroll cards (snap), swipe hint
───────────────────────────────────────────────────── */

type ExpType = "Full-time" | "Contract" | "Education" | "Internship";

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  type: ExpType;
  description: string;
  achievements?: string[];
  coursework?: string[];
  icon: React.ReactNode;
}

const BADGE: Record<ExpType, string> = {
  "Full-time": "bg-blue-500/10   text-blue-400   border-blue-500/20",
  Contract: "bg-slate-800     text-slate-400  border-slate-700",
  Education: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Internship: "bg-amber-500/10  text-amber-400  border-amber-500/20",
};

const ICON_BG: Record<ExpType, string> = {
  "Full-time": "bg-blue-500/10   text-blue-400",
  Contract: "bg-blue-500/10   text-blue-400",
  Education: "bg-purple-500/10 text-purple-400",
  Internship: "bg-amber-500/10  text-amber-400",
};

const EXPERIENCES: ExperienceItem[] = [
  {
    id: "1",
    role: "Senior Frontend Engineer",
    company: "TechFlow Solutions",
    period: "2021 – Present",
    type: "Full-time",
    icon: <Code2 size={20} />,
    description:
      "Leading the frontend development team in building scalable web applications using React, Next.js, and TypeScript. Responsible for architectural decisions, code reviews, and mentoring junior developers.",
    achievements: [
      "Improved application performance by 40% through code splitting and lazy-loading.",
      "Implemented a comprehensive design system used across 5 products.",
      "Successfully migrated legacy codebase to modern React hooks architecture.",
    ],
  },
  {
    id: "2",
    role: "Web Developer",
    company: "Creative Agency X",
    period: "2019 – 2021",
    type: "Contract",
    icon: <Terminal size={20} />,
    description:
      "Developed responsive websites and e-commerce platforms. Collaborated closely with designers for pixel-perfect UI/UX implementation.",
    achievements: [
      "Delivered 15+ client projects with a 100% satisfaction rate.",
      "Introduced automated testing workflows, reducing bug reports by 25%.",
    ],
  },
  {
    id: "3",
    role: "BS in Computer Science",
    company: "University of Technology",
    period: "2015 – 2019",
    type: "Education",
    icon: <GraduationCap size={20} />,
    description:
      "Focused on software engineering principles, algorithms, and data structures. Participated in multiple hackathons and open-source initiatives.",
    coursework: [
      "Data Structures",
      "Algorithms",
      "Database Systems",
      "Web Dev",
    ],
  },
];

/* ── single card ── */
function ExpCard({ exp }: { exp: ExperienceItem }) {
  return (
    <div className="relative bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8 backdrop-blur-sm hover:bg-slate-900/80 hover:border-slate-700 transition-all duration-300">
      {/* header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
        <div className="space-y-1.5 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl md:text-2xl font-black text-white tracking-tight leading-tight">
              {exp.role}
            </h3>
            <span
              className={`px-2.5 py-0.5 text-[10px] font-black uppercase rounded border shrink-0 ${BADGE[exp.type]}`}
            >
              {exp.type}
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-400 font-bold text-sm">
            <Building2 size={14} className="text-blue-500 shrink-0" />
            <span className="truncate">{exp.company}</span>
          </div>
        </div>

        {/* period pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl shrink-0 self-start">
          <Calendar size={13} className="text-blue-500" />
          <span className="text-xs font-black text-slate-300 font-mono tracking-wider whitespace-nowrap">
            {exp.period}
          </span>
        </div>
      </div>

      {/* description */}
      <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">
        {exp.description}
      </p>

      {/* achievements */}
      {exp.achievements && (
        <div className="bg-slate-950/50 rounded-2xl p-5 border border-slate-800/50">
          <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">
            Core Achievements
          </h5>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {exp.achievements.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 group/item">
                <CheckCircle2
                  size={16}
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

      {/* coursework tags */}
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
  );
}

/* ── main export ── */
export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative bg-[#101922] text-slate-200 selection:bg-blue-500/30 overflow-hidden"
    >
      {/* dot-grid bg */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03] z-0"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* blue top-right glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 w-[500px] h-[400px] bg-blue-900/10 blur-3xl rounded-full -translate-y-1/3 translate-x-1/4 z-0"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        {/* section header */}
        <div className="mb-12 md:mb-16">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-3 leading-[1.0] tracking-tight text-slate-600">
            My <span className="italic text-white">Journey</span>
          </h1>
          <p className="text-slate-500 font-medium text-sm md:text-base">
            Professional experience &amp; educational milestones.
          </p>
        </div>

        {/* ─────────────────────────────
            MOBILE: horizontal snap scroll
            MD+: vertical timeline
        ───────────────────────────── */}

        {/* MOBILE cards */}
        <div className="md:hidden">
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4 scrollbar-none">
            {EXPERIENCES.map((exp) => (
              <div
                key={exp.id}
                className="snap-center shrink-0 w-[88vw] max-w-[360px]"
              >
                {/* type icon dot */}
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`p-2 rounded-xl border border-slate-800 bg-slate-900 ${ICON_BG[exp.type]}`}
                  >
                    {exp.icon}
                  </div>
                  <div className="h-px flex-1 bg-slate-800" />
                </div>
                <ExpCard exp={exp} />
              </div>
            ))}
          </div>

          {/* swipe hint */}
          <p className="mt-3 text-center text-xs text-slate-600 font-mono tracking-widest">
            ← swipe to explore →
          </p>
        </div>

        {/* DESKTOP timeline */}
        <div className="hidden md:block relative">
          {/* vertical line */}
          <div className="absolute left-7 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/70 via-slate-700 to-transparent" />

          <div className="flex flex-col gap-12">
            {EXPERIENCES.map((exp) => (
              <div key={exp.id} className="relative pl-24 group">
                {/* icon node */}
                <div className="absolute left-0 top-0 size-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-xl group-hover:border-blue-500/40 transition-colors z-10">
                  <div className={`p-2 rounded-lg ${ICON_BG[exp.type]}`}>
                    {exp.icon}
                  </div>
                </div>

                {/* connector dot on the line */}
                <div className="absolute left-[27px] top-6 size-2 rounded-full bg-blue-500 ring-4 ring-slate-950 z-10" />

                <ExpCard exp={exp} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
