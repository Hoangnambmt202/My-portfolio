import { projectsApi } from "@/lib/api/project";
import { CaseStudy, Metric, Project } from "@/types/features/project";
import CaseStudyCard from "./CaseStudyCard";

export default async function CaseStudiesSection() {
  let projects: Project[] = [];
  try {
    const res = await projectsApi.getAll({ status: "PUBLISHED" });
    if (res.success && res.data?.projects) {
      projects = res.data.projects;
    }
  } catch (_error) {
    projects = [];
  }

  const CASE_STUDIES: CaseStudy[] = projects.map((p, index) => ({
    index: String(index + 1).padStart(2, "0"),
    category:
      p.techStack?.length > 0
        ? p.techStack[p.techStack.length - 1]
        : "Project Focus",
    techStack: p.techStack || [],
    title: p.title,
    description: p.description,
    liveUrl: p.liveUrl || p.demoUrl,
    githubUrl: p.githubUrl,
    content: p.content,
    problem:
      p.problem ||
      "Wait for updates on the challenges faced in this project...",
    decision:
      p.decision ||
      "Detailed architectural and technical decisions will be available soon...",
    decisionHighlight: "",
    result: p.result || "Pending outcome analysis...",
    metrics: Array.isArray(p.metrics) ? (p.metrics as unknown as Metric[]) : [],
    id: p.id,
  }));

  if (CASE_STUDIES.length === 0) return null;

  return (
    <section
      id="projects"
      className="w-full bg-[#101922] px-4 sm:px-6 py-12 md:py-16"
    >
      <div className="mx-auto max-w-5xl">
        {/* ── Section header ── */}
        <div className="mb-20">
          {/* Eyebrow */}
          <div className="mb-8 flex items-center gap-4">
            <span className="h-px w-12 bg-[#137fec]" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-[#3d9ef5]">
              Case Studies
            </span>
          </div>

          <h1 className="mb-6 sm:mb-10 text-4xl sm:text-5xl md:text-8xl font-black leading-[0.88] tracking-[-0.03em] text-white">
            Technical
            <br />
            <span
              className="text-transparent"
              style={{
                WebkitTextStroke: "1.5px #137fec",
              }}
            >
              Narratives.
            </span>
          </h1>

          <div className="grid grid-cols-1 gap-8 border-t border-slate-700/70 pt-8 md:grid-cols-2">
            <p className="text-[15px] leading-[1.8] text-slate-300 max-w-md">
              Deep-dives into distributed systems, performance optimization, and
              architectural decisions. Not just projects — problems solved at
              scale.
            </p>
            <div className="flex flex-col items-start justify-end md:items-end gap-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#3d9ef5] animate-pulse" />
                <span className="font-mono text-[11px] uppercase tracking-widest text-slate-400">
                  Showing All Systems
                </span>
              </div>
              <span
                className="font-black text-7xl md:text-8xl leading-none text-transparent select-none"
                style={{ WebkitTextStroke: "1px rgba(45,75,110,1)" }}
              >
                {String(CASE_STUDIES.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>

        {/* ── Case study list ── */}
        <div className="flex flex-col">
          {CASE_STUDIES.map((study, i) => (
            <CaseStudyCard
              key={study.index}
              study={study}
              isLast={i === CASE_STUDIES.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
