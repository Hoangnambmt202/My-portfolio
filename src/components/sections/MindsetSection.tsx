"use client";

import { useState } from "react";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────
   Engineering Mindset Section
   Aesthetic: Ink-black editorial × acid-lime accent
   Typography: Playfair Display (display) + JetBrains Mono
   Differentiation: Numbered grid with sliding accent-line
   hover reveal. Each card is square-proportioned, museum-
   card style. The grid bleeds edge-to-edge with 1px gaps.
───────────────────────────────────────────────────────── */

interface Principle {
  index: string;
  title: string;
  body: string;
}

const PRINCIPLES: Principle[] = [
  {
    index: "01",
    title: "First Principles",
    body: "Deconstruct complex problems into their fundamental truths rather than relying on industry analogies or legacy patterns.",
  },
  {
    index: "02",
    title: "Pragmatic Scale",
    body: "Optimization is a debt. Build for current reality while maintaining the elasticity to evolve when metrics demand it.",
  },
  {
    index: "03",
    title: "Type Safety",
    body: "Architect systems where the compiler is the first line of defense, making illegal states impossible to represent.",
  },
  {
    index: "04",
    title: "Radical Visibility",
    body: "An unmonitored system is a liability. Every architectural decision must include a strategy for deep observability.",
  },
  {
    index: "05",
    title: "The Lean Stack",
    body: "Minimize cognitive load by choosing the least powerful tool that solves the problem effectively and reliably.",
  },
  {
    index: "06",
    title: "Immutable Core",
    body: "Prefer unidirectional data flow and side-effect-free logic to create predictable, testable, and robust applications.",
  },
];

/* ── Single principle card ── */
function PrincipleCard({ principle }: { principle: Principle }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group relative flex flex-col justify-between bg-[#0a0a0a] p-6 sm:p-10 md:p-12 aspect-square transition-colors duration-300 hover:bg-[#0f0f0f] cursor-default overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* subtle corner accent on hover */}
      <div
        className="pointer-events-none absolute top-0 right-0 w-16 h-16 transition-opacity duration-500"
        style={{
          opacity: hovered ? 1 : 0,
          background:
            "radial-gradient(circle at top right, rgba(19,127,236,0.12), transparent 70%)",
        }}
      />

      {/* content */}
      <div className="flex flex-col gap-5 z-10">
        <span
          className="font-mono text-xs tracking-[0.25em] transition-colors duration-300"
          style={{ color: hovered ? "#137fec" : "#374151" }}
        >
          {principle.index}
        </span>

        <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold leading-tight text-white">
          {principle.title}
        </h3>

        <p className="text-sm text-slate-500 leading-relaxed font-light">
          {principle.body}
        </p>
      </div>

      {/* accent line — slides in on hover */}
      <div className="z-10 mt-8 w-full overflow-hidden">
        <div
          className="h-px bg-[#137fec] transition-all duration-500 ease-out"
          style={{ width: hovered ? "100%" : "0%" }}
        />
      </div>
    </div>
  );
}

/* ── CTA strip ── */
function CtaStrip() {
  return (
    <section className="border-t border-slate-800 py-16 sm:py-28 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold mb-6 sm:mb-10 text-white leading-tight">
          Do these principles
          <br />
          <span className="italic text-slate-500">align with yours?</span>
        </h2>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <Link
            href="/contact"
            className="inline-block bg-[#137fec] text-white px-10 py-4 rounded-lg font-bold uppercase tracking-widest text-xs hover:-translate-y-0.5 transition-all shadow-xl shadow-blue-900/30 active:scale-95"
          >
            Start a Conversation
          </Link>

          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-slate-500 font-bold uppercase tracking-widest text-xs hover:text-[#137fec] transition-colors"
          >
            View Technical Case Studies
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
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Main export ── */
export default function MindsetSection() {
  return (
    <>
      <div className="relative w-full overflow-x-hidden bg-[#0a0a0a] text-slate-100 antialiased">
        {/* ── Hero headline ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-16">
          <div className="max-w-3xl">
            <span className="text-[#137fec] font-playfair_display font-bold tracking-[0.3em] uppercase text-xs mb-5 block">
              Methodology &amp; Ethics
            </span>

            <h1 className="text-4xl sm:text-6xl md:text-8xl font-playfair_display font-black mb-6 sm:mb-8 leading-[1.05] tracking-tight">
              Engineering{" "}
              <span className="italic text-slate-600">Mindset.</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed max-w-2xl">
              Software is more than code. It is a series of trade-offs,
              architectural decisions, and a commitment to clarity over
              complexity. Here is how I reason through the systems I build.
            </p>
          </div>
        </section>

        {/* ── Editorial grid ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-0">
          <div
            className="grid gap-px bg-slate-800 border border-slate-800"
            style={{
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(100%, 250px), 1fr))",
            }}
          >
            {PRINCIPLES.map((p) => (
              <PrincipleCard key={p.index} principle={p} />
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <CtaStrip />
      </div>
    </>
  );
}
