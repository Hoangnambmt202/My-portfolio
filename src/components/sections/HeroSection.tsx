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
// import { useTranslations } from "next-intl";

import { FaTiktok } from "react-icons/fa";

// const heroStagger = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.25 },
//   },
// };

// const heroItem = {
//   hidden: { opacity: 0, y: 50 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.9,
//       ease: cubicBezier(0.25, 0.46, 0.45, 0.94),
//     },
//   },
// };

const socialList = [
  {
    Icon: Github,
    href: "http://github.com/Hoangnambmt202",
  },
  {
    Icon: Linkedin,
    href: "https://www.linkedin.com/in/pham-ngoc-hoang-nam",
  },
  {
    Icon: Facebook,
    href: "https://www.facebook.com/pham.ngoc.hoang.nam",
  },
  {
    Icon: Youtube,
    href: "https://www.youtube.com/@CoderToData",
  },
  {
    Icon: FaTiktok,
    href: "https://www.tiktok.com/@codertodata",
  },
];

const codeLines = [
  {
    lineNumber: 1,
    content: [
      { text: "const", color: "text-purple-400" },
      { text: " ", color: "text-slate-100" },
      { text: "developer", color: "text-yellow-200" },
      { text: " = {", color: "text-slate-100" },
    ],
  },
  {
    lineNumber: 2,
    content: [
      { text: "name", color: "text-sky-300" },
      { text: ": ", color: "text-slate-100" },
      { text: "'Nam'", color: "text-green-300" },
      { text: ",", color: "text-slate-100" },
    ],
    indent: true,
  },
  {
    lineNumber: 3,
    content: [
      { text: "role", color: "text-sky-300" },
      { text: ": ", color: "text-slate-100" },
      { text: "'Full-Stack'", color: "text-green-300" },
      { text: ",", color: "text-slate-100" },
    ],
    indent: true,
  },
  {
    lineNumber: 4,
    content: [
      { text: "passion", color: "text-sky-300" },
      { text: ": ", color: "text-slate-100" },
      { text: "'Building awesome UI'", color: "text-green-300" },
    ],
    indent: true,
  },
  { lineNumber: 5, content: [{ text: "};", color: "text-slate-100" }] },
];

export default function HeroSection() {
  // const t = useTranslations("hero");
  return (
    <section
      className="flex items-center justify-center px-0 py-[93px] relative overflow-hidden"
      aria-label="Hero Section"
    >
      <div className="absolute w-full h-full top-0 left-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_3%,rgba(255,255,255,0)_3%),linear-gradient(180deg,rgba(255,255,255,0.03)_3%,rgba(255,255,255,0)_3%),linear-gradient(0deg,rgba(16,25,34,1)_0%,rgba(16,25,34,1)_100%)]" />

      <div
        className="absolute w-[46.88%] h-[63.69%] top-[-10.00%] left-[58.13%] bg-[#137fec33] rounded-full blur-[60px]"
        aria-hidden="true"
      />

      <div
        className="absolute w-[39.06%] h-[53.08%] top-[56.92%] left-[-10.00%] bg-[#a855f71a] rounded-full blur-[50px]"
        aria-hidden="true"
      />

      <div
        className="flex flex-col w-[4.04%] items-center gap-2 absolute left-[47.98%] bottom-8 opacity-50"
        aria-label="Scroll indicator"
      >
        <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
          <div className="items-center justify-center w-[51.68px] h-4 mt-[-1.00px] [font-family:'Manrope-Regular',Helvetica] font-normal text-slate-400 text-xs tracking-[1.20px] leading-4 whitespace-nowrap relative flex">
            SCROLL
          </div>
        </div>

        <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
          <ChevronDown className="relative w-5 h-5 text-gray-400" />
        </div>
      </div>

      <div className="flex flex-col max-w-screen-xl items-start px-8 py-24 relative flex-1 grow">
        <div className="flex items-center justify-center gap-8 relative self-stretch w-full flex-[0_0_auto]">
          <div className="flex-col items-start gap-6 flex-1 grow relative flex">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 relative flex-[0_0_auto] bg-slate-800 rounded-full border border-solid border-slate-700"
              role="status"
              aria-label="Availability status"
            >
              <div
                className="relative w-2 h-2 bg-green-500 rounded-full"
                aria-hidden="true"
              />

              <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                <div className="items-center justify-center h-4 mt-[-1.00px] [font-family:'Manrope-Bold',Helvetica] font-bold text-slate-300 text-xs tracking-[0.30px] leading-4 whitespace-nowrap relative flex">
                  AVAILABLE FOR HIRE
                </div>
              </div>
            </div>
            <div className="flex-col items-start">
              <h1 className="text-7xl text-white font-bold">
                Building digital <p className="text-[#137FEC]">experiences</p>{" "}
                that matter
              </h1>
            </div>
            <div className="flex flex-col max-w-2xl items-start relative w-full flex-[0_0_auto]">
              <p className="relative flex items-center self-stretch mt-[-1.00px] [font-family:'Manrope-Regular',Helvetica] font-normal text-slate-400 text-xl tracking-[0] leading-7">
                Hi, I&#39;m Nam. A Full-Stack Developer focused on creating
                <br />
                accessible, pixel-perfect, and performant web applications.
              </p>
            </div>

            <div className="flex items-center gap-4 pt-4 pb-0 px-0 relative self-stretch w-full flex-[0_0_auto]">
              <button
                className="all-[unset] box-border inline-flex items-center justify-center gap-2 px-8 py-4 relative flex-[0_0_auto] bg-[#137fec] rounded-xl cursor-pointer"
                aria-label="View my work"
              >
                <div className="absolute w-full h-full top-0 left-0 bg-[#ffffff01] rounded-xl shadow-[0px_8px_10px_-6px_#137fec40,0px_20px_25px_-5px_#137fec40]" />

                <div className="items-center justify-center w-[105.14px] h-6 mt-[-1.00px] [font-family:'Manrope-Bold',Helvetica] font-bold text-white text-base text-center tracking-[0] leading-6 whitespace-nowrap relative flex">
                  View My Work
                </div>

                <div className="inline-flex flex-col items-center relative flex-[0_0_auto]">
                  <ArrowRight
                    className="relative w-3 h-3 text-white"
                    aria-hidden="true"
                  />
                </div>
              </button>

              <button
                className="all-[unset] box-border inline-flex items-center justify-center gap-2 px-8 py-4 relative flex-[0_0_auto] bg-[#1e293b80] rounded-xl border border-solid border-slate-700 cursor-pointer"
                aria-label="Contact me"
              >
                <div className="items-center justify-center w-[90.52px] h-6 [font-family:'Manrope-Bold',Helvetica] font-bold text-white text-base text-center tracking-[0] leading-6 whitespace-nowrap relative flex">
                  Contact Me
                </div>

                <div className="inline-flex flex-col items-center relative flex-[0_0_auto]">
                  <Mail
                    className="relative w-[15px] h-3 text-white"
                    aria-hidden="true"
                  />
                </div>
              </button>
            </div>

            <div className="flex flex-col items-start gap-4 pt-8 pb-0 px-0 relative self-stretch w-full flex-[0_0_auto]">
              <div className="items-center justify-center h-5 mt-[-1.00px] [font-family:'Manrope-Bold',Helvetica] font-bold text-slate-500 text-sm tracking-[0.70px] leading-5 whitespace-nowrap relative flex">
                CONNECT WITH ME
              </div>

              <div className="flex items-center gap-4 pt-4 pb-0 px-0 relative self-stretch w-full flex-[0_0_auto]">
                {socialList.map((social) => (
                  <>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex flex-col items-start relative flex-[0_0_auto]"
                    >
                      <social.Icon className="w-6 h-6 text-white" />
                    </a>
                  </>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-start justify-end relative h-[600px] flex-1 grow">
            <article
              className="relative max-w-md  max-h-[600px] self-stretch bg-[#10192299] rounded-2xl overflow-hidden border border-solid border-[#33415580] shadow-[0px_25px_50px_-12px_#00000040] backdrop-blur-[6px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(6px)_brightness(100%)] aspect-[0.8]"
              aria-label="Code editor preview"
            >
              <header className="flex w-[calc(100%_-_2px)] items-center px-4 py-3 absolute top-px left-px bg-[#0f172acc] border-b [border-bottom-style:solid] border-[#33415580]">
                <div
                  className="inline-flex items-start gap-2 relative flex-[0_0_auto]"
                  role="group"
                  aria-label="Window controls"
                >
                  <div
                    className="relative w-3 h-3 bg-red-500 rounded-full"
                    aria-label="Close"
                  />

                  <div
                    className="relative w-3 h-3 bg-yellow-500 rounded-full"
                    aria-label="Minimize"
                  />

                  <div
                    className="relative w-3 h-3 bg-green-500 rounded-full"
                    aria-label="Maximize"
                  />
                </div>

                <div className="inline-flex flex-col items-start pl-4 pr-0 py-0 relative flex-[0_0_auto]">
                  <div className="items-center justify-center w-[79.22px] h-4 mt-[-1.00px] [font-family:'Liberation_Mono-Regular',Helvetica] font-normal text-slate-400 text-xs tracking-[0] leading-4 whitespace-nowrap relative flex">
                    Profile.tsx
                  </div>
                </div>
              </header>

              <div className="flex flex-col w-[calc(100%_-_2px)] h-[calc(100%_-_2px)] items-start justify-center absolute top-[42px] left-px bg-slate-900">
                <div className="relative flex-1 self-stretch w-full grow opacity-80 bg-[url('/assets/imgs/Image-with-Overlay.png')] bg-cover bg-[50%_50%]" />

                <div
                  className="absolute w-full h-full top-0 left-0 bg-[linear-gradient(0deg,rgba(15,23,42,1)_0%,rgba(15,23,42,0.2)_50%,rgba(15,23,42,0)_100%)]"
                  aria-hidden="true"
                />
              </div>

              <div className="flex flex-col w-[calc(100%_-_50px)] items-start p-4 left-[25px] bottom-[25px] bg-[#0f172ae6] border border-solid border-slate-700 backdrop-blur-[6px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(6px)_brightness(100%)] absolute rounded-xl">
                <div className="w-full h-full top-0 left-0 bg-[#ffffff01] shadow-[0px_8px_10px_-6px_#0000001a,0px_20px_25px_-5px_#0000001a] absolute rounded-xl" />

                <pre
                  className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]"
                  role="code"
                  aria-label="Developer profile code"
                >
                  {codeLines.map((line) => (
                    <code
                      key={line.lineNumber}
                      className="flex items-start gap-2 relative self-stretch w-full flex-[0_0_auto]"
                    >
                      <span className="inline-flex flex-col items-start relative self-stretch flex-[0_0_auto]">
                        <span className="relative flex items-center justify-center w-[8.41px] h-5 mt-[-1.00px] [font-family:'Liberation_Mono-Regular',Helvetica] font-normal text-slate-500 text-sm tracking-[0] leading-5 whitespace-nowrap">
                          {line.lineNumber}
                        </span>
                      </span>

                      <span
                        className={`inline-flex flex-col items-start relative self-stretch flex-[0_0_auto] ${line.indent ? "pl-4" : ""}`}
                      >
                        <span className="items-center justify-center mt-[-1.00px] [font-family:'Liberation_Mono-Regular',Helvetica] font-normal text-white text-sm tracking-[0] leading-[14px] relative flex">
                          {line.content.map((segment, index) => (
                            <span
                              key={index}
                              className={`${segment.color} leading-5`}
                            >
                              {segment.text}
                            </span>
                          ))}
                        </span>
                      </span>
                    </code>
                  ))}
                </pre>
              </div>
            </article>

            <div
              className="inline-flex flex-col items-start p-3 absolute top-20 -right-4 bg-slate-800 rounded-lg border border-solid border-slate-700"
              aria-label="Code icon"
            >
              <div className="absolute w-full h-full top-0 left-0 bg-[#ffffff01] rounded-lg shadow-[0px_8px_10px_-6px_#0000001a,0px_20px_25px_-5px_#0000001a]" />

              <Code className="relative w-4 h-4 text-white" />
            </div>

            <div
              className="inline-flex flex-col items-start p-3 absolute -left-4 bottom-32 bg-slate-800 rounded-lg border border-solid border-slate-700"
              aria-label="Design icon"
            >
              <div className="absolute w-full h-full top-0 left-0 bg-[#ffffff01] rounded-lg shadow-[0px_8px_10px_-6px_#0000001a,0px_20px_25px_-5px_#0000001a]" />

              <LayoutDashboard className="relative w-[22.5px] h-[22.5px] text-purple-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
