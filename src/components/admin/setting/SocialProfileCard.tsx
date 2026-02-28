import React, { useState } from "react";
import { Share2, Plus, Trash2, Code2, Briefcase, AtSign } from "lucide-react";
import  MiniToggle from "@/components/ui/MiniToggle";

interface SocialLinkItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  url: string;
  enabled: boolean;
}

const DEFAULT_LINKS: SocialLinkItem[] = [
  {
    id: "1",
    label: "GitHub URL",
    icon: Code2,
    color: "text-slate-300",
    url: "https://github.com/alexdev",
    enabled: true,
  },
  {
    id: "2",
    label: "LinkedIn URL",
    icon: Briefcase,
    color: "text-blue-400",
    url: "https://linkedin.com/in/alex-developer",
    enabled: true,
  },
  {
    id: "3",
    label: "Twitter / X URL",
    icon: AtSign,
    color: "text-sky-400",
    url: "",
    enabled: false,
  },
];

export const SocialProfilesCard = () => {
  const [links, setLinks] = useState<SocialLinkItem[]>(DEFAULT_LINKS);

  const toggle = (id: string) =>
    setLinks((p) => p.map((l) => (l.id === id ? { ...l, enabled: !l.enabled } : l)));

  const remove = (id: string) => setLinks((p) => p.filter((l) => l.id !== id));

  const update = (id: string, url: string) =>
    setLinks((p) => p.map((l) => (l.id === id ? { ...l, url } : l)));

  return (
    <div className="bg-slate-950/60 border border-slate-800 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
            <Share2 size={16} />
          </span>
          <div>
            <h2 className="text-sm font-black text-white uppercase tracking-tight">
              Social Profiles
            </h2>
            <p className="text-[10px] text-slate-500">Manage links to your social media.</p>
          </div>
        </div>
        <button className="flex items-center gap-1 text-xs font-bold text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 px-3 py-1.5 rounded-lg transition-colors">
          <Plus size={14} /> Add
        </button>
      </div>

      <div className="p-4 flex flex-col gap-3">
        {links.map((link) => (
          <div
            key={link.id}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/10 transition-all group"
          >
            <link.icon size={18} className={`shrink-0 ${link.color}`} />
            <div className="flex-1 min-w-0">
              <p className="text-[9px] font-bold text-slate-600 uppercase tracking-wider mb-0.5">
                {link.label}
              </p>
              <input
                type="url"
                value={link.url}
                onChange={(e) => update(link.id, e.target.value)}
                placeholder="https://..."
                className="w-full bg-transparent border-none p-0 text-xs text-white placeholder:text-slate-700 focus:ring-0 outline-none"
              />
            </div>
            <div className="flex items-center gap-2 border-l border-slate-800 pl-3 shrink-0">
              <MiniToggle active={link.enabled} onChange={() => toggle(link.id)} />
              <button
                onClick={() => remove(link.id)}
                className="p-1 text-slate-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};