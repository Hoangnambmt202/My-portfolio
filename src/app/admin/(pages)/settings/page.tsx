"use client";

import React, { useState } from "react";
import {
  User,
  Globe,
  Palette as PaletteIcon,
  Bell,
  Shield,
  Save,
  Trash2,
  ChevronRight,
  Puzzle,
  Settings2,
} from "lucide-react";

import { ProfileTab } from "./tabs/ProfileTab";
import { GeneralTab } from "./tabs/GeneralTab";
import { AppearanceTab } from "./tabs/AppearanceTab";
import { SeoTab } from "./tabs/SeoTab";
import { IntegrationsTab } from "./tabs/IntegrationsTab";

// ─── Tab definitions ──────────────────────────────
const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "general", label: "General", icon: Settings2 },
  { id: "appearance", label: "Appearance", icon: PaletteIcon },
  { id: "seo", label: "SEO", icon: Globe },
  { id: "integrations", label: "Integrations", icon: Puzzle },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "privacy", label: "Privacy", icon: Shield },
] as const;

type TabId = (typeof TABS)[number]["id"];

// ─── Tabs with their own save buttons (no footer) ─
const SELF_CONTAINED_TABS: TabId[] = [
  "seo",
  "integrations",
  "profile",
  "general",
];

// ─── Tab content renderer ─────────────────────────
const TabContent = ({ activeTab }: { activeTab: TabId }) => {
  switch (activeTab) {
    case "profile":
      return <ProfileTab />;
    case "general":
      return <GeneralTab />;
    case "appearance":
      return <AppearanceTab />;
    case "seo":
      return <SeoTab />;
    case "integrations":
      return <IntegrationsTab />;
    default:
      return (
        <div className="flex items-center justify-center h-40 text-slate-600 text-sm font-bold uppercase tracking-widest animate-in fade-in duration-300">
          Coming Soon
        </div>
      );
  }
};

// ─── Main Page ────────────────────────────────────
export default function PortfolioSettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("profile");
  const showSaveFooter = !SELF_CONTAINED_TABS.includes(activeTab);

  return (
    <div className="flex h-screen bg-[#0f1115] text-slate-200 overflow-hidden">
      <main className="flex-1 overflow-y-auto relative bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-8">
          {/* Page Header */}
          <header className="mb-8 space-y-1">
            <div className="flex items-center gap-2 text-[10px] font-bold text-blue-500 uppercase tracking-widest">
              <span>System</span>
              <ChevronRight size={12} />
              <span className="text-slate-500">Settings</span>
              <ChevronRight size={12} />
              <span className="text-slate-500">{activeTab}</span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight uppercase">
              Portfolio Settings
            </h1>
            <p className="text-slate-500 text-sm">
              Customize your digital identity and global preferences.
            </p>
          </header>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar Nav */}
            <aside className="lg:w-56 shrink-0">
              <nav className="bg-slate-900/40 border border-slate-800 rounded-2xl p-2 backdrop-blur-md sticky top-6 space-y-0.5">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-2.5 px-3.5 py-3 text-left rounded-xl transition-all group ${
                      activeTab === tab.id
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30 font-black"
                        : "text-slate-500 hover:bg-slate-800/50 hover:text-slate-200 font-bold"
                    }`}
                  >
                    <tab.icon
                      size={15}
                      className={
                        activeTab === tab.id
                          ? "text-white"
                          : "group-hover:text-blue-400"
                      }
                    />
                    <span className="text-[10px] uppercase tracking-widest">
                      {tab.label}
                    </span>
                  </button>
                ))}
              </nav>
            </aside>

            {/* Content Area */}
            <div className="flex-1 min-w-0">
              <section className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 lg:p-7 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
                <TabContent activeTab={activeTab} />

                {showSaveFooter && (
                  <div className="flex justify-end pt-6 border-t border-slate-800 mt-6">
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-500 transition-all active:scale-95 shadow-lg shadow-blue-900/40">
                      <Save size={15} /> Update Settings
                    </button>
                  </div>
                )}
              </section>

              {/* Danger Zone (Privacy tab only) */}
              {activeTab === "privacy" && (
                <section className="bg-rose-500/5 border border-rose-500/20 rounded-2xl p-6 space-y-3 mt-4 animate-in fade-in slide-in-from-top-4 duration-500">
                  <div className="flex items-center gap-2.5 text-rose-500">
                    <Trash2 size={16} />
                    <h3 className="text-xs font-black uppercase tracking-widest">
                      Danger Zone
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Permanently delete your portfolio account and all associated
                    data. This action cannot be undone.
                  </p>
                  <button className="px-5 py-2 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">
                    Delete Portfolio
                  </button>
                </section>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
