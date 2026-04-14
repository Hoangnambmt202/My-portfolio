import { projectsApi } from "@/lib/api/project";
import { Project } from "@/types/features/project";

interface Metric {
  value: string;
  label: string;
}

interface CaseStudy {
  index: string;
  category: string;
  title: string;
  problem: string;
  decision: string;
  decisionHighlight?: string;
  result: string;
  metrics: Metric[];
  techStack: string[];
  liveUrl?: string | null;
  githubUrl?: string | null;
  description?: string | null;
  content?: string | null;
  id?: string;
}

function HighlightedText({
  text,
  keyword,
}: {
  text: string;
  keyword?: string;
}) {
  if (!keyword) return <>{text}</>;
  const parts = text.split(keyword);
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && (
            <span className="text-[#137fec] font-semibold not-italic">
              {keyword}
            </span>
          )}
        </span>
      ))}
    </>
  );
}

function MetricPill({ metric }: { metric: Metric }) {
  return (
    <div className="flex flex-col items-center justify-center bg-[#0c141b] border border-[#137fec]/35 px-5 py-4 min-w-[110px] group-hover:border-[#137fec]/70 group-hover:bg-[#0a1520] transition-all duration-300 shadow-[0_2px_12px_rgba(19,127,236,0.08)]">
      <span
        className="block font-black text-2xl md:text-3xl leading-none tracking-tight text-[#3d9ef5]"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {metric.value}
      </span>
      <span className="mt-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 text-center">
        {metric.label}
      </span>
    </div>
  );
}

function CaseStudyCard({
  study,
  isLast,
}: {
  study: CaseStudy;
  isLast: boolean;
}) {
  return (
    <article
      className={`group relative ${!isLast ? "border-b border-slate-700/50" : ""} pb-12 sm:pb-16 pt-6`}
    >
      {/* Thin accent line on left on hover */}
      <div className="absolute left-0 top-0 h-full w-[2px] bg-transparent group-hover:bg-[#137fec]/70 transition-all duration-500" />

      {/* ── Top row: index + category + tags ── */}
      <div className="mb-6 sm:mb-8 flex flex-wrap items-center gap-2 sm:gap-3 pl-4 sm:pl-6">
        <span className="font-mono text-[11px] font-bold tracking-[0.25em] text-slate-500 uppercase">
          {study.index}
        </span>
        <span className="h-px w-6 bg-slate-600" />
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#3d9ef5]">
          {study.category}
        </span>
        {study.techStack.map((tech, i) => (
          <span
            key={i}
            className="font-mono text-[10px] uppercase tracking-widest text-[#3d9ef5] border border-[#137fec]/30 bg-[#137fec]/8 px-2.5 py-1 transition-colors hover:border-[#137fec]/60 hover:bg-[#137fec]/15 hover:text-white shadow-sm"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* ── Title ── */}
      <h2 className="mb-4 sm:mb-6 pl-4 sm:pl-6 text-xl sm:text-2xl md:text-4xl font-black leading-tight tracking-tight text-white max-w-3xl group-hover:text-[#3d9ef5] transition-colors duration-300">
        {study.title}
      </h2>

      {/* ── Description ── */}
      {study.description && (
        <div className="mb-5 pl-4 sm:pl-6">
          <p className="text-[15px] leading-relaxed text-slate-300 max-w-4xl border-l-[3px] border-[#137fec]/60 pl-4 bg-[#0c141b] py-2.5 pr-4">
            {study.description}
          </p>
        </div>
      )}

      {/* ── Action Links ── */}
      {(study.liveUrl || study.githubUrl) && (
        <div className="mb-6 pl-4 sm:pl-6 flex flex-wrap gap-3">
          {study.liveUrl && (
            <a
              href={study.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-white flex items-center gap-2 border border-[#137fec]/60 hover:border-[#137fec] px-4 py-2 bg-[#137fec]/15 hover:bg-[#137fec]/25 transition-all shadow-[0_0_18px_rgba(19,127,236,0.15)] hover:shadow-[0_0_24px_rgba(19,127,236,0.25)] rounded-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              View Live
            </a>
          )}
          {study.githubUrl && (
            <a
              href={study.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-slate-200 hover:text-white flex items-center gap-2 border border-slate-600 hover:border-slate-400 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/60 transition-all rounded-sm"
            >
              Source Code
            </a>
          )}
        </div>
      )}

      {/* ── Metrics bar ── */}
      <div className="mb-6 sm:mb-10 pl-4 sm:pl-6 flex flex-wrap gap-2 sm:gap-3">
        {study.metrics.map((m) => (
          <MetricPill key={m.label} metric={m} />
        ))}
      </div>

      {/* ── 3-column content ── */}
      <div className="grid grid-cols-1 gap-0 md:grid-cols-3 border-t border-slate-700/50">
        {/* Problem */}
        <div className="pl-4 sm:pl-6 pt-6 sm:pt-8 md:pr-8 md:border-r border-slate-700/50 pb-6 md:pb-0">
          <div className="mb-4 flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-red-400/90 flex-shrink-0" />
            <h3 className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
              The Problem
            </h3>
          </div>
          <p className="text-[15px] leading-[1.75] text-slate-300">
            {study.problem}
          </p>
        </div>

        {/* Decision */}
        <div className="pl-4 sm:pl-6 pt-6 sm:pt-8 md:px-8 md:border-r border-slate-700/50 border-t md:border-t-0 pb-6 md:pb-0">
          <div className="mb-4 flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-amber-400/90 flex-shrink-0" />
            <h3 className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
              The Decision
            </h3>
          </div>
          <p className="text-[15px] leading-[1.75] text-slate-300">
            <HighlightedText
              text={study.decision}
              keyword={study.decisionHighlight}
            />
          </p>
        </div>

        {/* Result */}
        <div className="pl-4 sm:pl-6 pt-6 sm:pt-8 md:pl-8 border-t md:border-t-0 border-slate-700/50">
          <div className="mb-4 flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400/90 flex-shrink-0" />
            <h3 className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
              The Result
            </h3>
          </div>
          <p className="text-[15px] leading-[1.75] text-slate-300">
            {study.result}
          </p>
        </div>
      </div>

      {/* ── Extended Content ── */}
      {study.content && (
        <div className="mt-8 pt-6 border-t border-slate-700/30 pl-4 sm:pl-6 pr-4 sm:pr-8">
          <div className="mb-3 flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-slate-500/80" />
            <h3 className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
              Additional Details
            </h3>
          </div>
          <div className="text-[14px] leading-[1.8] text-slate-300 max-w-5xl whitespace-pre-wrap">
            {study.content}
          </div>
        </div>
      )}
    </article>
  );
}

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
    category: p.techStack?.length > 0 ? p.techStack[p.techStack.length - 1] : "Project Focus",
    techStack: p.techStack || [],
    title: p.title,
    description: p.description,
    liveUrl: p.liveUrl || p.demoUrl,
    githubUrl: p.githubUrl,
    content: p.content,
    problem: p.problem || "Wait for updates on the challenges faced in this project...",
    decision: p.decision || "Detailed architectural and technical decisions will be available soon...",
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
