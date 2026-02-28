import React, { useState } from "react";
import {
  Search,
  User,
  RefreshCw,
  Settings2,
  Zap,
  SlidersHorizontal,
  CheckCircle,
  Link2Off,
  Puzzle,
} from "lucide-react";
import MiniToggle from "@/components/ui/MiniToggle";
import type { Integration } from "@/types/setting";

const ACTIVE_CONNECTIONS: Integration[] = [
  {
    id: "github",
    name: "GitHub",
    description:
      "Sync repositories, show contribution graphs, and automate project deployments directly from your account.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-9 h-9 fill-current text-white" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    iconBg: "bg-[#24292e]",
    connected: true,
    enabled: true,
    meta: "@dev_username",
    lastSync: "2m ago",
    category: "Developer",
  },
  {
    id: "vercel",
    name: "Vercel",
    description:
      "Deploy your projects automatically and display live deployment status on your portfolio cards.",
    icon: (
      <svg viewBox="0 0 1155 1000" className="w-9 h-9 fill-current text-white" xmlns="http://www.w3.org/2000/svg">
        <path d="m577.3 0 577.4 1000h-1154.7z" />
      </svg>
    ),
    iconBg: "bg-black",
    connected: true,
    enabled: true,
    meta: "dev-portfolio.com",
    lastSync: "All systems normal",
    category: "Developer",
  },
];

const AVAILABLE_INTEGRATIONS: Integration[] = [
  {
    id: "ga",
    name: "Google Analytics",
    description: "Track visitor traffic and user behavior on your portfolio site.",
    icon: (
      <svg viewBox="0 0 192 192" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
        <path d="M108 156a12 12 0 0 1-24 0V36a12 12 0 0 1 24 0v120z" fill="#F9AB00" />
        <path d="M156 156a12 12 0 0 1-24 0V96a12 12 0 0 1 24 0v60z" fill="#E37400" />
        <circle cx="48" cy="156" fill="#E37400" r="12" />
      </svg>
    ),
    iconBg: "bg-white dark:bg-slate-900",
    connected: false,
    enabled: true,
    category: "Analytics",
  },
  {
    id: "mailchimp",
    name: "Mailchimp",
    description: "Collect email subscribers from your contact form automatically.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
      </svg>
    ),
    iconBg: "bg-yellow-400",
    connected: false,
    enabled: false,
    category: "Communication",
  },
  {
    id: "slack",
    name: "Slack",
    description: "Receive instant notifications when someone fills out your contact form.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zm10.122 2.521a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.268 0a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zm-2.523 10.122a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zm0-1.268a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#E01E5A" />
      </svg>
    ),
    iconBg: "bg-white dark:bg-slate-900",
    connected: false,
    enabled: false,
    category: "Communication",
  },
  {
    id: "figma",
    name: "Figma",
    description: "Embed live Figma prototypes directly into your project case studies.",
    icon: (
      <svg viewBox="0 0 38 57" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
        <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83" />
        <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262" />
        <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
        <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
      </svg>
    ),
    iconBg: "bg-[#1e1e1e]",
    connected: false,
    enabled: false,
    category: "Design",
  },
  {
    id: "devto",
    name: "Dev.to",
    description: "Cross-post your blog articles to Dev.to automatically to reach a wider audience.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-.72.04-.75.03v1.77l1.22.03 1.2.04v1.28h-1.6c-1.53 0-1.6-.01-1.87-.3l-.3-.28v-3.16c0-3.02.01-3.18.25-3.48.23-.31.25-.31 1.88-.31h1.64v1.28zm4.68 5.45c-.17.43-.64.79-1 .79-.18 0-.45-.15-.67-.39-.32-.32-.45-.63-.82-2.08l-.9-3.39-.45-1.67h.76c.4 0 .75.02.75.05 0 .06 1.16 4.54 1.26 4.83.04.15.32-.7.73-2.3l.63-2.53h.75c.42 0 .75.04.75.09 0 .14-1.57 6.38-1.8 6.6z" />
      </svg>
    ),
    iconBg: "bg-black",
    connected: false,
    enabled: false,
    category: "Developer",
  },
  {
    id: "discord",
    name: "Discord",
    description: "Connect your community server and display status widgets on your portfolio.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
    iconBg: "bg-[#5865F2]",
    connected: false,
    enabled: false,
    category: "Communication",
  },
];

const CATEGORIES = ["All Categories", "Analytics", "Communication", "Developer", "Design"];

export const IntegrationsTab = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [activeConnections] = useState<Integration[]>(ACTIVE_CONNECTIONS);
  const [available, setAvailable] = useState<Integration[]>(AVAILABLE_INTEGRATIONS);

  const toggleAvailable = (id: string) =>
    setAvailable((p) => p.map((i) => (i.id === id ? { ...i, enabled: !i.enabled } : i)));

  const filtered = available.filter((i) => {
    const matchesSearch =
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All Categories" || i.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-8">
      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 group">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-400 transition-colors" />
          <input
            type="text"
            placeholder="Search integrations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition-all"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-slate-900 border border-slate-800 text-xs font-bold text-slate-400 rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition-all"
        >
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Active Connections */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Zap size={14} className="text-blue-400" />
          <h2 className="text-xs font-black text-white uppercase tracking-widest">Active Connections</h2>
          <span className="ml-1 px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-black border border-blue-500/20">
            {activeConnections.length}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeConnections.map((conn) => (
            <div
              key={conn.id}
              className="relative bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 overflow-hidden transition-all group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Connected
                </span>
              </div>
              <div className="flex items-start gap-4">
                <div className={`shrink-0 p-3 ${conn.iconBg} rounded-xl border border-slate-700 shadow`}>
                  {conn.icon}
                </div>
                <div className="flex-1 min-w-0 pr-16">
                  <h3 className="text-sm font-black text-white mb-1">{conn.name}</h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2 mb-3">
                    {conn.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-[10px] text-slate-500 mb-4">
                    {conn.lastSync && (
                      <span className="flex items-center gap-1">
                        <RefreshCw size={11} /> {conn.lastSync}
                      </span>
                    )}
                    {conn.meta && (
                      <span className="flex items-center gap-1">
                        <User size={11} /> {conn.meta}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-all shadow-lg shadow-blue-900/30">
                      <Settings2 size={12} /> Configure
                    </button>
                    {conn.id === "github" && (
                      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-black uppercase tracking-widest rounded-lg border border-slate-700 transition-all">
                        <RefreshCw size={12} /> Sync
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Available Integrations */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={14} className="text-slate-500" />
          <h2 className="text-xs font-black text-white uppercase tracking-widest">Available Integrations</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="flex flex-col bg-slate-900/40 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2.5 ${item.iconBg} rounded-xl border border-slate-700/50 shadow`}>
                  {item.icon}
                </div>
                <MiniToggle active={item.enabled} onChange={() => toggleAvailable(item.id)} />
              </div>
              <h3 className="text-sm font-black text-white mb-1">{item.name}</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed flex-1 mb-3">{item.description}</p>
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                {item.enabled ? (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                    <CheckCircle size={10} /> Active
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-slate-600">
                    <Link2Off size={10} /> Disconnected
                  </span>
                )}
                {item.enabled && (
                  <button className="text-[10px] font-bold text-blue-400 hover:text-blue-300 transition-colors">
                    Settings
                  </button>
                )}
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-slate-600">
              <Puzzle size={32} className="mb-3 opacity-30" />
              <p className="text-xs font-bold uppercase tracking-widest">No integrations found</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};