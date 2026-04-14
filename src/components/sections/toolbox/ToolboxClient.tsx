"use client";

import { useState } from "react";
import { Skill, SkillGroup } from "@/types/features/skill";
import ToolCard from "./ToolCard";
import FilterTabs from "./FilterTabs";

interface ToolboxClientProps {
  initialSkills: Skill[];
  initialGroups: SkillGroup[];
}

export default function ToolboxClient({
  initialSkills,
  initialGroups,
}: ToolboxClientProps) {
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);

  // Filter skills
  const filteredSkills =
    activeGroupId === null
      ? initialSkills
      : initialSkills.filter((s) => s.groupId === activeGroupId);

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
        <FilterTabs
          groups={initialGroups}
          activeGroupId={activeGroupId}
          onChange={setActiveGroupId}
        />

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSkills.map((skill) => (
            <ToolCard key={skill.id} skill={skill} />
          ))}
          {filteredSkills.length === 0 && (
            <div className="col-span-full py-12 text-center border border-dashed border-white/10 rounded-2xl">
              <p className="text-slate-500 font-medium tracking-wide">
                No tools configured yet in this category.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
