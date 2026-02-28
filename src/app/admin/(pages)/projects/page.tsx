"use client";
import ProjectList from "@/components/admin/project/ProjectList";
import LoaderBlock from "@/components/common/LoaderBlock";
import {
  ChevronDown,
  ChevronRight,
  FilterIcon,
  FolderOpen,
  Globe,
  Pencil,
  Plus,
  Search,
} from "lucide-react";

import Link from "next/link";
import { Suspense, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type ProjectStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

// ─── Config ───────────────────────────────────────────────────────────────────
export const STATUS_CONFIG = {
  DRAFT: {
    label: "Draft",
    color: "text-gray-500",
  },
  PUBLISHED: {
    label: "Published",
    color: "text-green-500",
  },
  ARCHIVED: {
    label: "Archived",
    color: "text-red-500",
  },
};
const STATS = [
  {
    label: "Total Projects",
    value: 12,
    Icon: FolderOpen,
    color: "text-blue-400",
    glow: "bg-blue-500/10",
    iconBg: "bg-blue-500/20",
  },
  {
    label: "Live Published",
    value: 8,
    Icon: Globe,
    color: "text-green-400",
    glow: "bg-green-500/10",
    iconBg: "bg-green-500/20",
  },
  {
    label: "Drafts",
    value: 4,
    Icon: Pencil,
    color: "text-amber-400",
    glow: "bg-amber-500/10",
    iconBg: "bg-amber-500/20",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  Icon,
  color,
  glow,
  iconBg,
}: (typeof STATS)[0]) {
  return (
    <div className="relative flex-1 flex items-center justify-between p-6 bg-slate-800/40 rounded-xl border border-white/[0.06] backdrop-blur-sm overflow-hidden transition-transform duration-200 hover:-translate-y-0.5">
      <div className="flex flex-col gap-0.5">
        <span className={`text-sm font-medium ${color} opacity-80`}>
          {label}
        </span>
        <span className={`text-3xl font-extrabold ${color}`}>{value}</span>
      </div>
      <div className={`p-3 rounded-lg ${iconBg}`}>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      {/* ambient glow */}
      <div
        className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full blur-2xl ${glow}`}
      />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ProjectDashboardSection({
  searchParams,
}: {
  searchParams: { page?: string; status?: string; search?: string };
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | ProjectStatus>(
    "all",
  );
  const currentPage = Number(searchParams.page) || 1;
  const status = searchParams.status || "all";
  const search = searchParams.search || "";

  return (
    <div className="relative flex flex-col flex-1 min-h-screen bg-slate-900 overflow-y-auto">
      {/* Top gradient */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-blue-500/10 to-transparent" />

      {/* ── Breadcrumb nav ── */}
      <nav
        className="sticky top-0 z-20 flex items-center px-6 py-4 bg-slate-950/80 border-b border-slate-800 backdrop-blur-md"
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center gap-2 list-none text-sm">
          <li>
            <Link
              href="/dashboard"
              className="text-slate-400 hover:text-white transition-colors"
            >
              Dashboard
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight size={14} className="text-slate-600" />
          </li>
          <li>
            <span className="font-medium text-white" aria-current="page">
              Projects
            </span>
          </li>
        </ol>
      </nav>

      {/* ── Main content ── */}
      <div className="relative flex flex-col gap-8 max-w-screen-xl w-full mx-auto p-10">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Project Management
            </h1>
            <p className="mt-1 text-base text-slate-400">
              Manage, update, and organize your portfolio content.
            </p>
          </div>

          <Link
            href={"/admin/projects/new"}
            className="relative inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-sm font-bold rounded-lg shadow-[0_4px_14px_rgba(19,127,236,0.35)] transition-all duration-150"
          >
            <Plus size={14} />
            Add New Project
          </Link>
        </header>

        {/* Stats */}
        <section className="flex gap-4" aria-label="Project statistics">
          {STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </section>

        {/* Toolbar */}
        <div className="flex gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <input
              id="search-projects"
              type="search"
              placeholder="Search projects..."
              value={searchQuery}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition"
            />
          </div>

          {/* Status filter */}
          <div className="relative w-44">
            <FilterIcon
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as "all" | ProjectStatus)
              }
              className="w-full appearance-none pl-9 pr-8 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>
        </div>
        {/* Table */}
        <section
          className="flex flex-col bg-slate-800/40 rounded-xl border border-white/[0.06] backdrop-blur-sm overflow-hidden"
          aria-label="Projects table"
        >
          {/* Table header */}
          <div className="flex items-center gap-4 px-5 py-3 bg-slate-800/60 border-b border-slate-700/50">
            <div className="flex-1 min-w-0 text-[11px] font-bold text-slate-400 tracking-widest uppercase">
              Project Name
            </div>
            <div className="w-28 shrink-0 text-[11px] font-bold text-slate-400 tracking-widest uppercase">
              Status
            </div>
            <div className="w-32 shrink-0 text-[11px] font-bold text-slate-400 tracking-widest uppercase">
              Last Updated
            </div>
            <div className="w-20 shrink-0 text-[11px] font-bold text-slate-400 tracking-widest uppercase text-right">
              Actions
            </div>
          </div>

          {/* Rows */}
          <div>
            <Suspense fallback={<LoaderBlock />}>
              <ProjectList page={currentPage} search={search} status={status} />
            </Suspense>
          </div>

          {/* Pagination */}
          {/* <nav
            className="flex items-center justify-between px-5 py-3 bg-slate-800/60 border-t border-slate-700/50"
            aria-label="Pagination"
          >
            <p className="text-sm text-slate-400">
              Showing{" "}
              <span className="font-semibold text-white">
                {totalPages === 0
                  ? 0
                  : `${(safePage - 1) * ITEMS_PER_PAGE + 1}–${Math.min(safePage * ITEMS_PER_PAGE, total)}`}
              </span>{" "}
              of <span className="font-semibold text-white">{total}</span>{" "}
              projects
            </p>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
                className="px-3 py-1 text-sm text-slate-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    aria-current={safePage === page ? "page" : undefined}
                    className={`w-8 h-8 rounded-lg text-sm font-bold transition-all duration-150 ${
                      safePage === page
                        ? "bg-blue-600 text-white shadow-[0_2px_8px_rgba(19,127,236,0.4)]"
                        : "text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={safePage === totalPages}
                className="px-3 py-1 text-sm text-slate-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </nav> */}
        </section>

        {/* Footer */}
        <footer className="text-center">
          <p className="text-xs text-slate-600">
            © 2024 Dev Portfolio Admin. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
