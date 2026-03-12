/* eslint-disable @typescript-eslint/no-explicit-any */
import ProjectList from "@/components/admin/project/ProjectList";
import { FolderOpen, Globe, Pencil, Plus } from "lucide-react";

import Link from "next/link";
import { Suspense } from "react";
import ProjectTableSkeleton from "./skeletons/ProjectTableSkeleton";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { Metadata } from "next";
import { projectsApi } from "@/lib/api/project";
import StatCard from "@/components/admin/project/StatCard";

export const metadata: Metadata = {
  title: "Projects",
  description: "Manage your projects",
};

export default async function ProjectDashboardSection() {
  const res = await projectsApi.getAll({ status: "", page: 1 });

  const { total } = res.data;
  const publishedCount = res.data.projects.filter(
    (project: any) => project.status === "PUBLISHED",
  ).length;
  const draftCount = res.data.projects.filter(
    (project: any) => project.status === "DRAFT",
  ).length;
  const STATS = [
    {
      label: "Total project",
      value: total,
      Icon: FolderOpen,
      color: "text-blue-400",
      glow: "bg-blue-500/10",
      iconBg: "bg-blue-500/20",
    },
    {
      label: "Live Published",
      value: publishedCount,
      Icon: Globe,
      color: "text-green-400",
      glow: "bg-green-500/10",
      iconBg: "bg-green-500/20",
    },
    {
      label: "Drafts",
      value: draftCount,
      Icon: Pencil,
      color: "text-amber-400",
      glow: "bg-amber-500/10",
      iconBg: "bg-amber-500/20",
    },
  ];

  return (
    <div className="relative flex flex-col flex-1 min-h-screen bg-slate-900 overflow-y-auto">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-blue-500/10 to-transparent" />

      <div className="relative flex flex-col gap-4 max-w-screen-xl w-full mx-auto px-6 py-4">
        <Breadcrumb />

        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              Project Management
            </h1>
            <p className="mt-1 text-base text-slate-400">
              Manage, update, and organize your portfolio content.
            </p>
          </div>

          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-lg"
          >
            <Plus size={14} />
            Add New Project
          </Link>
        </header>

        {/* Stats */}
        <section className="flex gap-4">
          {STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </section>

        {/* Table */}
        <section className="flex flex-col bg-slate-800/40 rounded-xl border border-white/[0.06] overflow-hidden">
          <div className="flex items-center gap-4 px-5 py-3 bg-slate-800/60 border-b border-slate-700/50">
            <div className="flex-1 text-[11px] font-bold text-slate-400 uppercase">
              Project Name
            </div>
            <div className="w-28 text-[11px] font-bold text-slate-400 uppercase">
              Status
            </div>
            <div className="w-32 text-[11px] font-bold text-slate-400 uppercase">
              Last Updated
            </div>
            <div className="w-20 text-[11px] font-bold text-slate-400 uppercase text-right">
              Actions
            </div>
          </div>

          <div>
            <Suspense fallback={<ProjectTableSkeleton />}>
              <ProjectList data={res.data} />
            </Suspense>
          </div>
        </section>
      </div>
    </div>
  );
}
