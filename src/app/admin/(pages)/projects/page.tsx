"use client";
import {
  ChevronDown,
  ChevronRight,
  ExternalLink,
  FilterIcon,
  FolderOpen,
  Globe,
  Lock,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Status = "live" | "draft" | "private";

interface Project {
  id: number;
  name: string;
  category: string;
  image: string;
  status: Status;
  lastUpdated: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    id: 1,
    name: "Finance Dashboard UI",
    category: "Fintech · React",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=80&h=80&fit=crop",
    status: "live",
    lastUpdated: "Oct 24, 2023",
  },
  {
    id: 2,
    name: "Portfolio V1",
    category: "Personal · HTML/CSS",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=80&h=80&fit=crop",
    status: "draft",
    lastUpdated: "Nov 01, 2023",
  },
  {
    id: 3,
    name: "E-Commerce Analytics",
    category: "SaaS · Vue.js",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=80&h=80&fit=crop",
    status: "live",
    lastUpdated: "Sep 12, 2023",
  },
  {
    id: 4,
    name: "Mobile Banking App",
    category: "Mobile · React Native",
    image:
      "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=80&h=80&fit=crop",
    status: "private",
    lastUpdated: "Aug 05, 2023",
  },
  {
    id: 5,
    name: "Corporate Landing",
    category: "Web · Tailwind",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=80&h=80&fit=crop",
    status: "live",
    lastUpdated: "Jul 22, 2023",
  },
];

const ITEMS_PER_PAGE = 5;

// ─── Config ───────────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  Status,
  {
    label: string;
    bg: string;
    border: string;
    text: string;
    dot: string;
    Icon: React.ElementType;
  }
> = {
  live: {
    label: "Live",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    text: "text-green-400",
    dot: "bg-green-400",
    Icon: Globe,
  },
  draft: {
    label: "Draft",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    text: "text-amber-400",
    dot: "bg-amber-400",
    Icon: Pencil,
  },
  private: {
    label: "Private",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    text: "text-red-400",
    dot: "bg-red-400",
    Icon: Lock,
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

function StatusBadge({ status }: { status: Status }) {
  const { label, bg, border, text, dot } = STATUS_CONFIG[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${bg} ${text} border ${border}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  );
}

function ProjectRow({
  project,
  isLast,
}: {
  project: Project;
  isLast: boolean;
}) {
  return (
    <article
      className={`group flex items-center gap-4 px-5 py-4 transition-colors duration-150 hover:bg-white/[0.03] ${
        !isLast ? "border-b border-slate-700/30" : ""
      }`}
    >
      {/* Thumbnail */}
      <div className="shrink-0 w-10 h-10 rounded-lg overflow-hidden border border-white/[0.06]">
        <Image
          width={40}
          height={40}
          className="w-full h-full object-cover"
          alt={`${project.name} thumbnail`}
          src={project.image}
        />
      </div>

      {/* Name / Category */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-white truncate">{project.name}</p>
        <p className="text-xs text-slate-500 truncate">{project.category}</p>
      </div>

      {/* Status */}
      <div className="w-28 shrink-0">
        <StatusBadge status={project.status} />
      </div>

      {/* Last updated */}
      <time className="w-32 shrink-0 text-sm text-slate-400">
        {project.lastUpdated}
      </time>

      {/* Actions */}
      <div className="shrink-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        <button
          aria-label={`View ${project.name}`}
          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 transition-colors"
        >
          <ExternalLink size={14} />
        </button>
        <button
          aria-label={`Edit ${project.name}`}
          className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 transition-colors"
        >
          <Pencil size={14} />
        </button>
        <button
          aria-label={`Delete ${project.name}`}
          className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </article>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ProjectDashboardSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | Status>("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter + search
  const filtered = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE,
  );

  const handleSearch = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleStatusFilter = (val: string) => {
    setStatusFilter(val as "all" | Status);
    setCurrentPage(1);
  };

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
              onChange={(e) => handleSearch(e.target.value)}
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
              onChange={(e) => handleStatusFilter(e.target.value)}
              className="w-full appearance-none pl-9 pr-8 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="live">Live</option>
              <option value="draft">Draft</option>
              <option value="private">Private</option>
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
            {paginated.length > 0 ? (
              paginated.map((project, i) => (
                <ProjectRow
                  key={project.id}
                  project={project}
                  isLast={i === paginated.length - 1}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-slate-500">
                <FolderOpen size={32} className="mb-3 opacity-40" />
                <p className="text-sm">No projects match your filters.</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          <nav
            className="flex items-center justify-between px-5 py-3 bg-slate-800/60 border-t border-slate-700/50"
            aria-label="Pagination"
          >
            <p className="text-sm text-slate-400">
              Showing{" "}
              <span className="font-semibold text-white">
                {filtered.length === 0
                  ? 0
                  : `${(safePage - 1) * ITEMS_PER_PAGE + 1}–${Math.min(safePage * ITEMS_PER_PAGE, filtered.length)}`}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-white">
                {filtered.length}
              </span>{" "}
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
          </nav>
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
