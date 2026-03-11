"use client";

import Modal from "@/components/ui/Modal";
import { useViewProjectModalStore } from "@/stores/modal/ViewProjectModal.store";
import Image from "next/image";
import { X, Code2, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { formatDate } from "@/lib/utils/format";

/* ── Dot accent colors cycling through tech stack ── */
const DOT_COLORS = [
  "bg-[#137fec]",
  "bg-sky-400",
  "bg-teal-400",
  "bg-purple-500",
  "bg-orange-500",
  "bg-rose-400",
  "bg-yellow-400",
];

export default function ViewProjectModal() {
  const { open, project, closeModal } = useViewProjectModalStore();

  if (!project) return null;

  return (
    <Modal isOpen={open} onClose={closeModal}>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.97 }}
        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-5xl max-h-[90vh] flex flex-col rounded-xl overflow-hidden border border-white/10 shadow-2xl"
        style={{
          background: "rgba(16, 25, 34, 0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.06), 0 40px 80px rgba(0,0,0,0.7)",
        }}
      >
        {/* ── Header ── */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <h1 className="text-lg font-bold tracking-tight text-slate-100 truncate">
              {project.title}
            </h1>
            <span className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </span>
          </div>
          <button
            onClick={closeModal}
            className="ml-4 shrink-0 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors duration-150"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </header>

        {/* ── Scrollable body ── */}
        <div
          className="flex-1 overflow-y-auto p-6 lg:p-8"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#233648 transparent",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* ── Left column ── */}
            <div className="lg:col-span-8 space-y-8">
              {/* Thumbnail */}
              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-slate-900 group">
                {project.thumbnail ? (
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid grid-cols-8 grid-rows-4 gap-1 opacity-10">
                      {Array.from({ length: 32 }).map((_, i) => (
                        <div key={i} className="w-6 h-6 rounded bg-slate-500" />
                      ))}
                    </div>
                    <Code2 className="absolute w-12 h-12 text-slate-600" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#101922]/80 via-transparent to-transparent" />
              </div>

              {/* Description */}
              <section className="space-y-3">
                <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-[#137fec]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Description
                </h3>
                {project.description ? (
                  <div className="space-y-3 text-[14px] text-slate-400 leading-[1.8]">
                    <p>{project.description}</p>
                  </div>
                ) : (
                  <p className="text-[13px] text-slate-600 italic">
                    No description provided.
                  </p>
                )}
              </section>

              {/* Key Features */}
              {project.features && project.features.length > 0 && (
                <section className="space-y-3">
                  <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-[#137fec]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    Key Features
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {project.features.map((feature: string, i: number) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.07] transition-colors duration-150"
                      >
                        <svg
                          className="w-4 h-4 text-[#137fec] mt-0.5 shrink-0"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.5}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-[13px] text-slate-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            {/* ── Right sidebar ── */}
            <aside className="lg:col-span-4 space-y-7">
              {/* Tech Stack */}
              <section className="space-y-3">
                <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                  Tech Stack
                </h4>
                {project.techStack?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech: string, i: number) => (
                      <div
                        key={tech}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[13px] text-slate-200 font-mono transition-colors duration-150 hover:bg-white/10"
                        style={{
                          background:
                            i === 0
                              ? "rgba(19,127,236,0.1)"
                              : "rgba(255,255,255,0.04)",
                          borderColor:
                            i === 0
                              ? "rgba(19,127,236,0.25)"
                              : "rgba(255,255,255,0.08)",
                        }}
                      >
                        <span
                          className={`w-2 h-2 rounded-full shrink-0 ${
                            DOT_COLORS[i % DOT_COLORS.length]
                          }`}
                        />
                        {tech}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[12px] text-slate-600 italic">
                    Not updated yet.
                  </p>
                )}
              </section>

              {/* Project Links */}
              <section className="space-y-3">
                <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                  Project Links
                </h4>
                <div className="space-y-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between w-full p-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-all duration-150 group"
                    >
                      <div className="flex items-center gap-3">
                        <svg
                          className="w-4 h-4 text-slate-400"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"
                          />
                        </svg>
                        <span className="text-[13px] font-medium text-slate-200">
                          Live Demo
                        </span>
                      </div>
                      <ArrowUpRight
                        size={15}
                        className="text-slate-500 group-hover:text-[#137fec] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150"
                      />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between w-full p-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-all duration-150 group"
                    >
                      <div className="flex items-center gap-3">
                        <svg
                          className="w-4 h-4 text-slate-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                        </svg>
                        <span className="text-[13px] font-medium text-slate-200">
                          Source Code
                        </span>
                      </div>
                      <ArrowUpRight
                        size={15}
                        className="text-slate-500 group-hover:text-[#137fec] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150"
                      />
                    </a>
                  )}
                  {!project.liveUrl && !project.githubUrl && (
                    <p className="text-[12px] text-slate-600 italic">
                      No links available.
                    </p>
                  )}
                </div>
              </section>

              {/* Stats */}
              <section className="space-y-3">
                <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                  Statistics
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.07] space-y-1">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                      Last Updated
                    </p>
                    <p className="text-[13px] font-semibold text-slate-200">
                      {project.updatedAt ? formatDate(project.updatedAt) : "—"}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.07] space-y-1">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                      Category
                    </p>
                    <p className="text-[13px] font-semibold text-slate-200 truncate">
                      {project.category ?? "—"}
                    </p>
                  </div>
                </div>
              </section>
            </aside>
          </div>
        </div>

        {/* ── Footer ── */}
        <footer className="px-6 py-4 border-t border-white/10 bg-white/[0.03] flex flex-col sm:flex-row items-center justify-end gap-3 shrink-0">
          <button
            onClick={closeModal}
            className="w-full sm:w-auto px-5 py-2 rounded-lg border border-white/10 text-slate-300 text-[13px] font-semibold hover:bg-white/[0.06] transition-colors duration-150"
          >
            Back to List
          </button>
          <button
            className="w-full sm:w-auto px-5 py-2 rounded-lg bg-[#137fec] hover:bg-[#1a8fff] text-white text-[13px] font-semibold flex items-center justify-center gap-2 transition-all duration-150"
            style={{ boxShadow: "0 4px 16px rgba(19,127,236,0.25)" }}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Edit Project
          </button>
        </footer>
      </motion.div>
    </Modal>
  );
}
