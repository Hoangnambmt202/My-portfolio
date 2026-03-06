"use client";

import { useState } from "react";

/* ─────────────────────────────────────────────────────
   Toolbox Section — Next.js / TypeScript / Tailwind
   Color: primary #137fec  |  bg-dark: #101922
   Font: Inter (add to layout.tsx via next/font/google)
───────────────────────────────────────────────────── */

type Category = "All Tools" | "Frontend" | "Backend" | "Infrastructure";

interface Tool {
  name: string;
  category: Exclude<Category, "All Tools">;
  whenToUse: string;
  whyItMatters: string;
}

const TOOLS: Tool[] = [
  {
    name: "React",
    category: "Frontend",
    whenToUse:
      "When high-concurrency and UI responsiveness are the primary architectural priorities.",
    whyItMatters:
      "Ensures seamless user experiences through component-based architecture and optimized virtual DOM reconciliation.",
  },
  {
    name: "Next.js",
    category: "Frontend",
    whenToUse:
      "When SEO performance and server-side rendering are vital for growth and visibility.",
    whyItMatters:
      "Optimizes core web vitals and provides a unified framework for both server and client logic.",
  },
  {
    name: "TypeScript",
    category: "Frontend",
    whenToUse:
      "When building large-scale applications where type safety reduces runtime errors.",
    whyItMatters:
      "Enhances developer productivity with powerful tooling and self-documenting code patterns.",
  },
  {
    name: "PostgreSQL",
    category: "Backend",
    whenToUse:
      "When complex relational queries and absolute data integrity are non-negotiable requirements.",
    whyItMatters:
      "Guarantees ACID compliance and offers robust extensibility for structured datasets at scale.",
  },
  {
    name: "Redis",
    category: "Backend",
    whenToUse:
      "When sub-millisecond latency for session management or global caching is essential.",
    whyItMatters:
      "Significantly reduces database pressure by offloading frequently accessed data to in-memory storage.",
  },
  {
    name: "Docker",
    category: "Infrastructure",
    whenToUse:
      "When environment consistency across dev, staging, and production is critical for reliability.",
    whyItMatters:
      "Eliminates 'works on my machine' syndrome and simplifies microservice orchestration.",
  },
];

const CATEGORIES: Category[] = [
  "All Tools",
  "Frontend",
  "Backend",
  "Infrastructure",
];

/* ── Tool card ── */
function ToolCard({ tool }: { tool: Tool }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-[#137fec]/10 bg-slate-900/50 p-6 sm:p-8 shadow-sm transition-all duration-300 hover:border-[#137fec]/40 hover:shadow-lg hover:shadow-[#137fec]/5">
      {/* top-right glow */}
      <div className="pointer-events-none absolute top-0 right-0 h-24 w-24 rounded-full bg-[#137fec]/5 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

      <h3 className="mb-5 text-lg font-bold text-white sm:text-xl">
        {tool.name}
      </h3>

      <div className="flex flex-col gap-5">
        <div>
          <span className="block text-[10px] font-black uppercase tracking-widest text-[#137fec]/60">
            When to Use
          </span>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-200 line-clamp-4 sm:line-clamp-none">
            {tool.whenToUse}
          </p>
        </div>
        <div>
          <span className="block text-[10px] font-black uppercase tracking-widest text-[#137fec]/60">
            Why it Matters
          </span>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
            {tool.whyItMatters}
          </p>
        </div>
      </div>

      {/* bottom accent slide */}
      <div className="mt-8 h-px w-0 bg-[#137fec] transition-all duration-500 group-hover:w-full" />
    </div>
  );
}

/* ── Filter tabs ── */
function FilterTabs({
  active,
  onChange,
}: {
  active: Category;
  onChange: (c: Category) => void;
}) {
  return (
    <div className="mb-10  overflow-x-auto scrollbar-hide sm:mx-0 w-full">
      <div className="flex w-full border-b border-[#137fec]/10 px-4 sm:px-0">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={[
              "px-4 py-3 text-sm font-bold whitespace-nowrap transition-colors duration-200 border-b-2 -mb-px",
              active === cat
                ? "border-[#137fec] text-[#137fec]"
                : "border-transparent text-slate-500 hover:text-[#137fec]",
            ].join(" ")}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Main export ── */
export default function ToolboxSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("All Tools");

  const filtered =
    activeCategory === "All Tools"
      ? TOOLS
      : TOOLS.filter((t) => t.category === activeCategory);

  return (
    <section
      id="skills"
      className="w-full bg-[#101922] px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* Hero intro */}
        <div className="mb-16 max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#137fec]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#137fec]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#137fec] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#137fec]" />
            </span>
            Tech Stack
          </div>

          <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            My Toolbox
          </h2>

          <p className="text-base leading-relaxed text-slate-400 sm:text-lg">
            A highly opinionated collection of technologies I leverage to build
            production-grade systems. No fluff, just the right tools for
            specific engineering challenges.
          </p>
        </div>

        {/* Filter tabs */}
        <FilterTabs active={activeCategory} onChange={setActiveCategory} />

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
}
