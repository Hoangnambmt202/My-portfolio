/* eslint-disable @typescript-eslint/no-explicit-any */
// components/projects/ProjectList.tsx
import { useProjects } from "@/lib/hooks/useProjects";
import { ExternalLink, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";

type ProjectStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

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
function StatusBadge({ status }: { status: ProjectStatus }) {
  const config = STATUS_CONFIG[status];

  if (!config) {
    return <span className="text-xs text-red-400 font-bold">Unknown</span>;
  }

  const { label, color } = config;

  return (
    <span className={`px-2 py-1 text-xs font-bold rounded-full ${color}`}>
      {label}
    </span>
  );
}
// Import ProjectRow từ file cũ của bạn
function ProjectRow({ project, isLast }: { project: any; isLast: boolean }) {
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
          alt={`${project.title} thumbnail`}
          src={project.thumbnail}
        />
      </div>

      {/* Name / Category */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-white truncate">{project.title}</p>
        <p className="text-xs text-slate-500 truncate">{project.category}</p>
      </div>

      {/* Status */}
      <div className="w-28 shrink-0">
        <StatusBadge status={project.status} />
      </div>

      {/* Last updated */}
      <time className="w-32 shrink-0 text-sm text-slate-400">
        {project.updatedAt}
      </time>

      {/* Actions */}
      <div className="shrink-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        <button
          aria-label={`View ${project.title}`}
          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 transition-colors"
        >
          <ExternalLink size={14} />
        </button>
        <button
          aria-label={`Edit ${project.title}`}
          className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 transition-colors"
        >
          <Pencil size={14} />
        </button>
        <button
          aria-label={`Delete ${project.title}`}
          className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </article>
  );
}

export default function ProjectList({
  search,
  status,
  page,
}: {
  search: string;
  status: string;
  page: number;
}) {
  const { projects } = useProjects();

  console.log(search);
  console.log(status);
  console.log(page);

  if (projects.length === 0) {
    return (
      <div className="p-10 text-center text-slate-500">No projects found.</div>
    );
  }

  return (
    <div>
      {projects.map((project: any, i: number) => (
        <ProjectRow
          key={project.id}
          project={project}
          isLast={i === projects.length - 1}
        />
      ))}
    </div>
  );
}
