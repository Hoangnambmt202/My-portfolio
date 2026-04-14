import Image from "next/image";
import { Skill } from "@/types/features/skill";

interface ToolCardProps {
  skill: Skill;
}

export default function ToolCard({ skill }: ToolCardProps) {
  // Use group color if available, fallback to primary blue
  const accentColor = skill.group?.color || "#137fec";

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-xl border border-white/5 bg-slate-900/50 p-6 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-lg cursor-default"
      style={{
        // Using CSS variables to handle dynamic hover colors

        "--accent-color": accentColor,
        "--accent-bg": `${accentColor}15`,
        "--accent-border": `${accentColor}40`,
        "--accent-shadow": `${accentColor}05`,
      }}
    >
      {/* Dynamic hover border via style injection on pseudo-element or just inline style wrapper */}
      <div
        className="absolute inset-0 border border-transparent transition-colors duration-300 rounded-xl"
        style={{ borderColor: "transparent" }} // Kept for foundation
      />

      {/* Since dynamic Tailwind arbitrary values like hover:border-[var(--accent-border)] might be tricky if not in safelist, 
          we apply a generic hover class and handle dynamic color in a simpler way: */}
      <style jsx>{`
        .target-card:hover {
          border-color: var(--accent-border);
          box-shadow:
            0 10px 15px -3px var(--accent-shadow),
            0 4px 6px -4px var(--accent-shadow);
        }
        .glow-effect {
          background-color: var(--accent-bg);
        }
        .accent-text {
          color: var(--accent-color);
          opacity: 0.8;
        }
        .accent-bg-solid {
          background-color: var(--accent-color);
        }
      `}</style>

      {/* Wrapping content to apply the dynamic hover via class defined above */}
      <div className="absolute inset-0 rounded-xl border border-white/5 transition-all duration-300 target-card pointer-events-none" />

      {/* top-right glow */}
      <div className="glow-effect pointer-events-none absolute top-0 right-0 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

      {/* Header: Icon + Name */}
      <div className="mb-5 flex items-center gap-3">
        {skill.iconUrl && (
          <div className="size-10 shrink-0 bg-white/5 rounded-lg border border-white/10 p-2 flex items-center justify-center">
            <Image
              src={skill.iconUrl}
              alt={skill.name}
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
        )}
        <div>
          <h3 className="text-lg font-bold text-white sm:text-xl">
            {skill.name}
          </h3>
          <span className="text-[10px] font-medium tracking-wide text-slate-400">
            Level:{" "}
            <span className="text-slate-300 font-bold">{skill.level}</span>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-5 z-10 w-full">
        {skill.whenToUse && (
          <div>
            <span className="accent-text block text-[10px] font-black uppercase tracking-widest">
              When to Use
            </span>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-200 line-clamp-4 sm:line-clamp-none">
              {skill.whenToUse}
            </p>
          </div>
        )}

        {skill.whyItMatters ? (
          <div>
            <span className="accent-text block text-[10px] font-black uppercase tracking-widest">
              Why it Matters
            </span>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
              {skill.whyItMatters}
            </p>
          </div>
        ) : (
          /* Placeholder to maintain height if no whyItMatters */
          <div className="flex-1" />
        )}
      </div>

      {/* bottom accent slide */}
      <div className="accent-bg-solid mt-8 h-px w-0 transition-all duration-500 group-hover:w-full z-10" />
    </div>
  );
}
