"use client";
import {
  ArrowRight,
  ChevronDown,
  Code,
  Facebook,
  Github,
  LayoutDashboard,
  Linkedin,
  Mail,
  Youtube,
} from "lucide-react";
import { FaTiktok } from "react-icons/fa";

const socialList = [
  { Icon: Github, href: "http://github.com/Hoangnambmt202", label: "GitHub" },
  {
    Icon: Linkedin,
    href: "https://www.linkedin.com/in/pham-ngoc-hoang-nam",
    label: "LinkedIn",
  },
  {
    Icon: Facebook,
    href: "https://www.facebook.com/pham.ngoc.hoang.nam",
    label: "Facebook",
  },
  {
    Icon: Youtube,
    href: "https://www.youtube.com/@CoderToData",
    label: "YouTube",
  },
  {
    Icon: FaTiktok,
    href: "https://www.tiktok.com/@codertodata",
    label: "TikTok",
  },
];

const codeLines = [
  {
    lineNumber: 1,
    content: [
      { text: "const", color: "text-purple-400" },
      { text: " developer", color: "text-yellow-200" },
      { text: " = {", color: "text-slate-100" },
    ],
  },
  {
    lineNumber: 2,
    indent: true,
    content: [
      { text: "name", color: "text-sky-300" },
      { text: ": ", color: "text-slate-100" },
      { text: "'Nam'", color: "text-green-300" },
      { text: ",", color: "text-slate-100" },
    ],
  },
  {
    lineNumber: 3,
    indent: true,
    content: [
      { text: "role", color: "text-sky-300" },
      { text: ": ", color: "text-slate-100" },
      { text: "'Full-Stack'", color: "text-green-300" },
      { text: ",", color: "text-slate-100" },
    ],
  },
  {
    lineNumber: 4,
    indent: true,
    content: [
      { text: "passion", color: "text-sky-300" },
      { text: ": ", color: "text-slate-100" },
      { text: "'Building awesome UI'", color: "text-green-300" },
    ],
  },
  {
    lineNumber: 5,
    content: [{ text: "};", color: "text-slate-100" }],
  },
];

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden bg-[#101922]"
      aria-label="Hero Section"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Glow blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#137fec33] rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[-5%] left-[-10%] w-[400px] h-[400px] bg-[#a855f71a] rounded-full blur-[60px] pointer-events-none" />

      <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-28">
        <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-12 lg:gap-16">
          {/* ── Left column ── */}
          <div className="flex-1 flex flex-col items-start gap-5 sm:gap-6 text-left w-full">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800 rounded-full border border-slate-700"
              role="status"
              aria-label="Availability status"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-slate-300 text-xs font-bold tracking-widest [font-family:'Manrope',sans-serif]">
                AVAILABLE FOR HIRE
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.1] [font-family:'Manrope',sans-serif]">
              Building digital{" "}
              <span className="text-[#137FEC]">experiences</span> that matter
            </h1>

            {/* Subtext */}
            <p className="text-slate-400 text-base sm:text-lg lg:text-xl leading-7 max-w-lg [font-family:'Manrope',sans-serif]">
              Hi, I&#39;m Nam. A Full-Stack Developer focused on creating
              accessible, pixel-perfect, and performant web applications.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-2 w-full">
              <button
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[#137fec] hover:bg-[#1070d4] text-white text-sm sm:text-base font-bold [font-family:'Manrope',sans-serif] rounded-xl transition-all duration-200 shadow-[0px_8px_24px_-4px_#137fec55] hover:shadow-[0px_12px_28px_-4px_#137fec66] hover:scale-[1.02] active:scale-[0.98]"
                aria-label="View my work"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-slate-800/50 hover:bg-slate-700/60 text-white text-sm sm:text-base font-bold [font-family:'Manrope',sans-serif] rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                aria-label="Contact me"
              >
                <span>Contact Me</span>
                <Mail className="w-4 h-4" />
              </button>
            </div>

            {/* Social links */}
            <div className="flex flex-col gap-3 pt-4 w-full">
              <span className="text-slate-500 text-xs font-bold tracking-[0.15em] [font-family:'Manrope',sans-serif]">
                CONNECT WITH ME
              </span>
              <div className="flex items-center gap-4">
                {socialList.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="text-slate-400 hover:text-white transition-colors duration-200 hover:scale-110 transform"
                  >
                    <social.Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right column: Code card ── */}
          <div className="relative flex-1 w-full max-w-full sm:max-w-md lg:max-w-none flex justify-center lg:justify-end">
            {/* Floating Code icon */}
            <div
              className="hidden sm:flex absolute top-4 -right-3 lg:-right-4 z-10 p-3 bg-slate-800 rounded-lg border border-slate-700 shadow-xl"
              aria-hidden="true"
            >
              <Code className="w-4 h-4 text-white" />
            </div>

            {/* Floating Design icon */}
            <div
              className="hidden sm:flex absolute -left-3 lg:-left-4 bottom-24 z-10 p-3 bg-slate-800 rounded-lg border border-slate-700 shadow-xl"
              aria-hidden="true"
            >
              <LayoutDashboard className="w-5 h-5 text-purple-400" />
            </div>

            {/* Card */}
            <article
              className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px] aspect-[0.78] bg-[#10192299] rounded-2xl overflow-hidden border border-[#33415580] shadow-[0px_25px_50px_-12px_#00000060] backdrop-blur-sm"
              aria-label="Code editor preview"
            >
              {/* Window bar */}
              <header className="flex items-center gap-3 px-4 py-3 bg-[#0f172acc] border-b border-[#33415580]">
                <div
                  className="flex items-center gap-2"
                  role="group"
                  aria-label="Window controls"
                >
                  <span className="w-3 h-3 bg-red-500 rounded-full" />
                  <span className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <span className="w-3 h-3 bg-green-500 rounded-full" />
                </div>
                <span className="text-slate-400 text-xs [font-family:'Liberation_Mono',monospace]">
                  Profile.tsx
                </span>
              </header>

              {/* Image area */}
              <div className="absolute inset-0 top-[44px] bottom-0 bg-slate-900">
                <div className="relative w-full h-full opacity-80 bg-[url('/assets/imgs/Image-with-Overlay.png')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a33] to-transparent" />
              </div>

              {/* Code snippet overlay */}
              <div className="absolute left-4 right-4 bottom-4 bg-[#0f172ae6] border border-slate-700 rounded-xl p-4 backdrop-blur-sm shadow-xl">
                <pre
                  className="flex flex-col gap-0.5"
                  role="code"
                  aria-label="Developer profile code"
                >
                  {codeLines.map((line) => (
                    <code
                      key={line.lineNumber}
                      className="flex items-start gap-2"
                    >
                      <span className="text-slate-500 text-xs sm:text-sm [font-family:'Liberation_Mono',monospace] w-3 flex-shrink-0 select-none">
                        {line.lineNumber}
                      </span>
                      <span
                        className={`text-xs sm:text-sm [font-family:'Liberation_Mono',monospace] leading-5 ${line.indent ? "pl-4" : ""}`}
                      >
                        {line.content.map((seg, i) => (
                          <span key={i} className={seg.color}>
                            {seg.text}
                          </span>
                        ))}
                      </span>
                    </code>
                  ))}
                </pre>
              </div>
            </article>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="hidden sm:flex flex-col items-center gap-1.5 absolute bottom-6 left-1/2 -translate-x-1/2 opacity-40"
        aria-label="Scroll indicator"
      >
        <span className="text-slate-400 text-[10px] tracking-[0.2em] [font-family:'Manrope',sans-serif] font-medium">
          SCROLL
        </span>
        <ChevronDown className="w-4 h-4 text-slate-400 animate-bounce" />
      </div>
    </section>
  );
}
