"use client";
/* ─────────────────────────────────────────────────────
   Technical Case Studies Section — Enhanced UI
   Next.js App Router · TypeScript · Tailwind CSS
   Color: primary #137fec  |  bg-dark: #101922
───────────────────────────────────────────────────── */

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
  tag: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    index: "01",
    category: "System Architecture",
    tag: "WebSocket · Redis · Nginx",
    title: "Scaling Real-time WebSocket Clusters for 50k Concurrent Users",
    problem:
      "Our standard horizontal scaling approach led to message fragmentation. Since client connections were distributed across nodes, messages published on Node A weren't reaching subscribers on Node B, causing critical communication gaps in live collaboration.",
    decision:
      "Architected a Redis-backed Pub/Sub backplane integrated with an Nginx-layer sticky session policy. We prioritized the At-Least-Once delivery model over pure latency to ensure session state consistency across the distributed fleet.",
    decisionHighlight: "At-Least-Once",
    result:
      "Achieved 99.99% delivery reliability during high-load peaks. Successfully supported 50k concurrent active connections with a P99 latency of under 20ms for message broadcasting.",
    metrics: [
      { value: "99.99%", label: "Delivery Reliability" },
      { value: "50k", label: "Concurrent Users" },
      { value: "<20ms", label: "P99 Latency" },
    ],
  },
  {
    index: "02",
    category: "Performance Engineering",
    tag: "Rust · Lambda · AWS",
    title: "Optimizing Cold Start Latency in Serverless Data Pipelines",
    problem:
      "Internal ETL processes triggered by S3 events were suffering from 4–6s cold starts. This latency ripple effect delayed downstream dashboard updates, causing data staleness that impacted executive decision-making.",
    decision:
      "Audited dependencies and refactored the runtime from Python to Rust. Implemented Provisioned Concurrency for high-traffic windows and moved static lookups to a global initialization phase outside the handler.",
    decisionHighlight: "Provisioned Concurrency",
    result:
      "P99 cold start latency reduced by 85% from 5s to 750ms. Total cloud infrastructure operational costs decreased by 22% due to improved memory utilization and faster execution cycles.",
    metrics: [
      { value: "85%", label: "Latency Reduction" },
      { value: "750ms", label: "P99 Cold Start" },
      { value: "22%", label: "Cost Saved" },
    ],
  },
  {
    index: "03",
    category: "Security & Compliance",
    tag: "Istio · mTLS · OIDC",
    title: "Implementing Zero-Trust Perimeter for Legacy Monoliths",
    problem:
      "A high-security fintech client required SOC2 compliance for a 10-year-old monolithic application. The existing perimeter-based security model was no longer sufficient for their evolving remote-work workforce.",
    decision:
      "Deployed a service mesh (Istio) to handle mutual TLS (mTLS) between services. Decoupled identity from the network by integrating OIDC identity providers directly into the sidecar proxies.",
    decisionHighlight: "OIDC identity providers",
    result:
      "Achieved full SOC2 Type II certification within 6 months. Reduced blast radius of potential compromises to individual services while providing granular audit logs for every internal request.",
    metrics: [
      { value: "6mo", label: "To SOC2 Type II" },
      { value: "100%", label: "mTLS Coverage" },
      { value: "0", label: "Critical Breaches" },
    ],
  },
];

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
    <div className="flex flex-col items-center justify-center bg-[#101922] border border-[#137fec]/20 px-5 py-4 min-w-[100px] group-hover:border-[#137fec]/50 transition-colors duration-300">
      <span
        className="block font-black text-2xl md:text-3xl leading-none tracking-tight text-[#137fec]"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {metric.value}
      </span>
      <span className="mt-1.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 text-center">
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
      className={`group relative ${!isLast ? "border-b border-slate-800/60" : ""} pb-10 sm:pb-16 pt-4`}
    >
      {/* Thin accent line on left on hover */}
      <div className="absolute left-0 top-0 h-full w-[2px] bg-transparent group-hover:bg-[#137fec]/60 transition-all duration-500" />

      {/* ── Top row: index + category + tags ── */}
      <div className="mb-6 sm:mb-8 flex flex-wrap items-center gap-2 sm:gap-3 pl-4 sm:pl-6">
        <span className="font-mono text-[11px] font-bold tracking-[0.25em] text-slate-600 uppercase">
          {study.index}
        </span>
        <span className="h-px w-6 bg-slate-700" />
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#137fec]">
          {study.category}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-slate-600 border border-slate-800 px-2 sm:px-3 py-1 break-all sm:break-normal">
          {study.tag}
        </span>
      </div>

      {/* ── Title ── */}
      <h2 className="mb-6 sm:mb-10 pl-4 sm:pl-6 text-xl sm:text-2xl md:text-4xl font-black leading-tight tracking-tight text-white max-w-3xl group-hover:text-[#137fec] transition-colors duration-300">
        {study.title}
      </h2>

      {/* ── Metrics bar ── */}
      <div className="mb-6 sm:mb-10 pl-4 sm:pl-6 flex flex-wrap gap-2 sm:gap-3">
        {study.metrics.map((m) => (
          <MetricPill key={m.label} metric={m} />
        ))}
      </div>

      {/* ── 3-column content ── */}
      <div className="grid grid-cols-1 gap-0 md:grid-cols-3 border-t border-slate-800/60">
        {/* Problem */}
        <div className="pl-4 sm:pl-6 pt-6 sm:pt-8 md:pr-8 md:border-r border-slate-800/60 pb-6 md:pb-0">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-red-500/70" />
            <h3 className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">
              The Problem
            </h3>
          </div>
          <p className="text-[15px] leading-[1.75] text-slate-400">
            {study.problem}
          </p>
        </div>

        {/* Decision */}
        <div className="pl-4 sm:pl-6 pt-6 sm:pt-8 md:px-8 md:border-r border-slate-800/60 border-t md:border-t-0 pb-6 md:pb-0">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-yellow-400/70" />
            <h3 className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">
              The Decision
            </h3>
          </div>
          <p className="text-[15px] leading-[1.75] text-slate-400">
            <HighlightedText
              text={study.decision}
              keyword={study.decisionHighlight}
            />
          </p>
        </div>

        {/* Result */}
        <div className="pl-4 sm:pl-6 pt-6 sm:pt-8 md:pl-8 border-t md:border-t-0 border-slate-800/60">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-emerald-400/70" />
            <h3 className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">
              The Result
            </h3>
          </div>
          <p className="text-[15px] leading-[1.75] text-slate-400">
            {study.result}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function CaseStudiesSection() {
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
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-[#137fec]">
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

          <div className="grid grid-cols-1 gap-8 border-t border-slate-800 pt-8 md:grid-cols-2">
            <p className="text-[15px] leading-[1.8] text-slate-400 max-w-md">
              Deep-dives into distributed systems, performance optimization, and
              architectural decisions. Not just projects — problems solved at
              scale.
            </p>
            <div className="flex flex-col items-start justify-end md:items-end gap-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#137fec] animate-pulse" />
                <span className="font-mono text-[11px] uppercase tracking-widest text-slate-500">
                  Showing All Systems
                </span>
              </div>
              <span
                className="font-black text-7xl md:text-8xl leading-none text-transparent select-none"
                style={{ WebkitTextStroke: "1px rgba(30,50,70,1)" }}
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
