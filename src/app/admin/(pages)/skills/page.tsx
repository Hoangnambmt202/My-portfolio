/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import {
  Search,
  Plus,
  GripVertical,
  Edit3,
  Trash2,
  Upload,
  Code2,
  Database,
  Palette,
  Terminal,
} from "lucide-react";
import Image from "next/image";
import NewSkillModal from "@/components/admin/skill/NewSkillModal";

// --- Types ---
// interface Skill {
//   id: string;
//   name: string;
//   category: string;
//   proficiency: number;
//   level: string;
//   icon: string;
// }

interface SkillGroup {
  id: string;
  name: string;
  count: number;
  icon: React.ReactNode;
  color: string;
}

const SkillsManagement = () => {
  const [activeGroup, setActiveGroup] = useState("frontend");
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleAddNewSkill = () => {
    setIsOpenModal(true);
    console.log(isOpenModal);
  };
  const groups: SkillGroup[] = [
    {
      id: "frontend",
      name: "Frontend Dev",
      count: 12,
      icon: <Code2 size={18} />,
      color: "text-blue-400",
    },
    {
      id: "backend",
      name: "Backend Dev",
      count: 8,
      icon: <Database size={18} />,
      color: "text-green-400",
    },
    {
      id: "design",
      name: "Design Tools",
      count: 5,
      icon: <Palette size={18} />,
      color: "text-purple-400",
    },
    {
      id: "devops",
      name: "DevOps",
      count: 4,
      icon: <Terminal size={18} />,
      color: "text-orange-400",
    },
  ];

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30 overflow-hidden">
      {/* 2. Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-950 to-slate-950">
        {/* Top Header */}
        <header className="h-20 border-b border-slate-800/50 flex items-center justify-between px-8 bg-slate-950/50 backdrop-blur-xl z-20">
          <div className="relative w-96 group">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder="Search skills, categories..."
              className="w-full bg-slate-900/50 border border-slate-800 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-bold transition-all active:scale-95 shadow-lg shadow-blue-900/20">
            <Plus size={18} />
            <span>New Group Skill</span>
          </button>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* 3. Skill Groups List (Draggable Context) */}
          <section className="w-80 border-r border-slate-800/50 flex flex-col bg-slate-950/30">
            <div className="p-6">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">
                Group by
              </h2>
              <div className="space-y-1">
                {groups.map((group) => (
                  <button
                    key={group.id}
                    onClick={() => setActiveGroup(group.id)}
                    className={`w-full group flex items-center justify-between p-3 rounded-xl transition-all ${
                      activeGroup === group.id
                        ? "bg-blue-600/10 border border-blue-500/20 shadow-lg"
                        : "hover:bg-slate-900 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <GripVertical
                        size={16}
                        className={`text-slate-700 group-hover:text-slate-500 transition-colors cursor-grab`}
                      />
                      <div
                        className={`p-2 rounded-lg bg-slate-900 ${activeGroup === group.id ? "text-blue-400" : "text-slate-400 group-hover:text-slate-200"}`}
                      >
                        {group.icon}
                      </div>
                      <div className="text-left">
                        <p
                          className={`text-sm font-bold ${activeGroup === group.id ? "text-white" : "text-slate-400"}`}
                        >
                          {group.name}
                        </p>
                        <p className="text-[10px] text-slate-500 font-medium">
                          {group.count} Skills
                        </p>
                      </div>
                    </div>
                    {activeGroup === group.id && (
                      <div className="size-1.5 rounded-full bg-blue-500 animate-pulse" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* 4. Skills Detail Grid */}
          <section className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="p-8">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-black text-white tracking-tight capitalize">
                    {activeGroup} Development
                  </h1>
                  <p className="text-slate-500 text-sm mt-1 font-medium">
                    Manage individual skill proficiency and visual assets.
                  </p>
                </div>
                <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
                  <button className="px-4 py-1.5 text-xs font-bold bg-slate-800 text-white rounded shadow-sm">
                    Grid
                  </button>
                  <button className="px-4 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-300">
                    List
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <SkillCard
                  name="React.js"
                  level="Expert"
                  percent={92}
                  icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                  color="from-cyan-500 to-blue-600"
                />
                <SkillCard
                  name="TypeScript"
                  level="Advanced"
                  percent={85}
                  icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
                  color="from-blue-500 to-indigo-600"
                />
                <SkillCard
                  name="Tailwind CSS"
                  level="Master"
                  percent={98}
                  icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg"
                  color="from-teal-400 to-cyan-500"
                />

                {/* Add New Placeholder */}
                <button
                  className="group border-2 border-dashed border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all"
                  onClick={handleAddNewSkill}
                >
                  <div className="size-12 rounded-full bg-slate-900 flex items-center justify-center text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xl">
                    <Plus size={24} />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-slate-400 group-hover:text-white transition-colors">
                      Add New Skill
                    </p>
                    <p className="text-xs text-slate-600">
                      to {activeGroup} group
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
      <NewSkillModal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      />
    </div>
  );
};

const SkillCard = ({
  name,
  level,
  percent,
  icon,
  color,
}: {
  name: string;
  level: string;
  percent: number;
  icon: string;
  color: string;
}) => (
  <div className="group relative bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:bg-slate-900 hover:border-slate-700 transition-all shadow-sm">
    <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0">
      <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-blue-400 transition-colors">
        <Edit3 size={16} />
      </button>
      <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-red-400 transition-colors">
        <Trash2 size={16} />
      </button>
    </div>

    <div className="flex items-start gap-5">
      <div className="relative shrink-0">
        <div className="size-16 rounded-2xl bg-slate-950 p-3 border border-slate-800 group-hover:border-slate-600 transition-colors flex items-center justify-center overflow-hidden">
          <Image
            width={100}
            height={100}
            src={icon}
            alt={name}
            className="size-full object-contain"
          />
        </div>
        <button className="absolute -bottom-2 -right-2 size-7 rounded-full bg-blue-600 text-white flex items-center justify-center border-4 border-slate-900 shadow-xl opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
          <Upload size={12} />
        </button>
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-black text-white truncate group-hover:text-blue-400 transition-colors">
          {name}
        </h3>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-0.5">
          {level}
        </p>

        <div className="mt-6 space-y-2">
          <div className="flex justify-between items-end">
            <span className="text-[10px] font-bold text-slate-600 uppercase">
              Proficiency
            </span>
            <span className="text-xs font-black text-white">{percent}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-1000 group-hover:shadow-[0_0_12px_rgba(59,130,246,0.5)]`}
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SkillsManagement;
