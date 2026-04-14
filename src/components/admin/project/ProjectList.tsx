/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Project } from "@/types/features/project";
import ProjectRow from "./ProjectsRow";
import { useAdminProjectStore } from "@/stores/admin/project/useProjectStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProjectList({ data }: { data: any }) {
  const { projects: apiProjects, total, page, limit } = data;
  const { projects, setProjects, setPagination } = useAdminProjectStore();
  const router = useRouter();

  useEffect(() => {
    setProjects(apiProjects);
    setPagination(page, total, limit);
  }, [apiProjects, page, total, limit, setProjects, setPagination]);

  const totalPages = Math.ceil(total / limit);
  const setPage = (p: number) => {
    router.push(`/admin/projects?page=${p}`);
  };
  return (
    <div>
      {projects.map((project: Project, i: number) => (
        <ProjectRow
          key={project.id}
          project={project}
          isLast={i === projects.length - 1}
        />
      ))}
      {/* Pagination */}
      <nav
        className="flex items-center justify-between px-5 py-3 bg-slate-800/60 border-t border-slate-700/50"
        aria-label="Pagination"
      >
        <p className="text-sm text-slate-400">
          Showing{" "}
          <span className="font-semibold text-white">
            {total === 0
              ? 0
              : `${(page - 1) * limit + 1}–${Math.min(page * limit, total)}`}
          </span>{" "}
          of <span className="font-semibold text-white">{total}</span> projects
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="p-1.5 rounded-md border border-slate-400 text-slate-300 hover:text-white hover:border-slate-600 transition-all disabled:opacity-30"
          >
            <ChevronLeft size={14} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setPage(page)}
              aria-current={page === page ? "page" : undefined}
              className={`w-8 h-8 rounded-lg text-sm font-bold transition-all duration-150 ${
                page === page
                  ? "bg-blue-600 text-white shadow-[0_2px_8px_rgba(19,127,236,0.4)]"
                  : "text-slate-300 hover:bg-slate-700"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="p-1.5 rounded-md border border-slate-400 text-slate-300 hover:text-white hover:border-slate-600 transition-all disabled:opacity-30"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </nav>
    </div>
  );
}
