/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  FileText,
  History,
  Eye,
  Download,
  Trash2,
  UploadCloud,
  Settings,
  TrendingUp,
  Mail,
  Bot,
  CheckCircle2,
  Copy,
  ZoomIn,
  ChevronRight,
} from "lucide-react";

const ResumeManagement: React.FC = () => {
  const [isPublic, setIsPublic] = useState(true);
  const [requireEmail, setRequireEmail] = useState(false);
  const [atsOptimized, setAtsOptimized] = useState(true);

  return (
    <div className="flex h-screen bg-[#0f1115] text-slate-200 font-sans selection:bg-blue-500/30 overflow-hidden">
      {/* 2. Main Content Area */}
      <main className="flex-1 overflow-y-auto relative bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-12 space-y-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-500 uppercase tracking-widest">
                <span>System</span>
                <ChevronRight size={14} />
                <span className="text-slate-500 tracking-tighter">Resume</span>
              </div>

              <h1 className="text-4xl font-black text-white tracking-tight">
                Resume Management
              </h1>
              <p className="text-slate-500 font-medium italic">
                &quot;Your career, beautifully documented and easily
                accessible.&quot;
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 border border-slate-800 text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-800 hover:border-slate-700 transition-all">
                <History size={18} />
                <span>History</span>
              </button>
              <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-black shadow-lg shadow-blue-900/40 hover:bg-blue-500 transition-all active:scale-95">
                <Eye size={18} />
                <span>Preview Page</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Active CV & Upload */}
            <div className="lg:col-span-8 space-y-10">
              {/* Active CV Card */}
              <section className="relative group bg-slate-900/40 border border-slate-800 rounded-3xl p-8 backdrop-blur-sm overflow-hidden transition-all hover:border-blue-500/30">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <FileText size={120} className="text-blue-500" />
                </div>

                <div className="relative z-10 space-y-8">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-6">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={18} className="text-blue-400" />
                      <h2 className="text-lg font-black text-white uppercase tracking-tight">
                        Active Resume
                      </h2>
                    </div>
                    <span className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase rounded-full border border-emerald-500/20">
                      <span className="size-1.5 bg-emerald-400 rounded-full animate-pulse" />
                      Published
                    </span>
                  </div>

                  <div className="flex flex-col md:flex-row gap-8">
                    {/* CV Preview */}
                    <div className="relative group/preview shrink-0 w-full md:w-44 aspect-[3/4] bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl cursor-zoom-in">
                      <div className="absolute inset-0 bg-slate-800/50 flex items-center justify-center">
                        <FileText size={48} className="text-slate-700" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                        <div className="p-2 bg-white/10 backdrop-blur-md rounded-lg text-white group-hover/preview:scale-110 transition-transform">
                          <ZoomIn size={16} />
                        </div>
                      </div>
                    </div>

                    {/* CV Info */}
                    <div className="flex-1 space-y-6">
                      <div>
                        <h3 className="text-2xl font-black text-white leading-tight">
                          resume_alex_morgan_v4.pdf
                        </h3>
                        <p className="text-slate-500 text-xs font-bold mt-1">
                          Uploaded 4 months ago • Last sync: Today 10:45 AM
                        </p>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-4">
                        <InfoItem label="Size" value="2.4 MB" />
                        <InfoItem label="Views" value="3,102" />
                        <InfoItem label="Downloads" value="1,248" />
                        <InfoItem label="Format" value="PDF" />
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-black shadow-lg shadow-blue-900/30 hover:bg-blue-500 transition-all">
                          <Download size={18} /> Download
                        </button>
                        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-700 transition-all">
                          <Copy size={18} /> Link
                        </button>
                        <button className="p-3 bg-slate-800 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Upload Zone */}
              <section className="space-y-4">
                <h2 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] px-1">
                  Upload New Version
                </h2>
                <div className="relative group">
                  <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="bg-slate-900/30 border-2 border-dashed border-slate-800 rounded-3xl p-12 flex flex-col items-center justify-center gap-4 transition-all group-hover:border-blue-500/50 group-hover:bg-blue-500/[0.02]">
                    <div className="size-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-500 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all">
                      <UploadCloud size={32} />
                    </div>
                    <div className="text-center">
                      <h4 className="text-white font-black tracking-tight">
                        Drop your updated CV here
                      </h4>
                      <p className="text-slate-500 text-xs mt-1 font-medium">
                        Supports PDF, DOCX (Max 10MB)
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column: Settings & Trends */}
            <div className="lg:col-span-4 space-y-8">
              {/* Configuration */}
              <section className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 backdrop-blur-sm space-y-6">
                <div className="flex items-center gap-2 mb-2 text-slate-400">
                  <Settings size={18} />
                  <h3 className="text-sm font-black uppercase tracking-widest">
                    Configuration
                  </h3>
                </div>

                <div className="space-y-5">
                  <ToggleItem
                    title="Public Download"
                    desc="Allow visitors to see & save"
                    active={isPublic}
                    onChange={setIsPublic}
                  />
                  <ToggleItem
                    title="Lead Capture"
                    desc="Ask for email before download"
                    active={requireEmail}
                    onChange={setRequireEmail}
                    icon={<Mail size={14} />}
                  />
                  <ToggleItem
                    title="ATS Processing"
                    desc="AI formatting for recruiters"
                    active={atsOptimized}
                    onChange={setAtsOptimized}
                    icon={<Bot size={14} />}
                  />
                </div>
              </section>

              {/* Download Trends Chart */}
              <section className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-sm font-black text-white uppercase tracking-widest">
                    Trends
                  </h3>
                  <span className="flex items-center text-[10px] font-black text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
                    <TrendingUp size={10} className="mr-1" /> +12.5%
                  </span>
                </div>

                <div className="flex items-end justify-between h-32 gap-1 pt-4">
                  {[30, 45, 35, 60, 85, 50, 40].map((h, i) => (
                    <div
                      key={i}
                      className={`w-full rounded-t-lg transition-all cursor-pointer relative group/bar ${h > 70 ? "bg-blue-500" : "bg-slate-800 hover:bg-slate-700"}`}
                      style={{ height: `${h}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 border border-slate-700 text-[8px] font-bold text-white rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-20">
                        Day {i + 1}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <div>
                    <p className="text-3xl font-black text-white">342</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      Downloads (7d)
                    </p>
                  </div>
                  <div className="size-10 rounded-xl bg-slate-950 flex items-center justify-center text-blue-500 border border-slate-800">
                    <TrendingUp size={20} />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// --- Sub-components ---

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-1">
    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.1em]">
      {label}
    </p>
    <p className="text-sm font-black text-white">{value}</p>
  </div>
);

const ToggleItem = ({ title, desc, active, onChange, icon }: any) => (
  <div
    className="flex items-center justify-between group cursor-pointer"
    onClick={() => onChange(!active)}
  >
    <div className="space-y-0.5">
      <div className="flex items-center gap-2">
        {icon && <span className="text-blue-500">{icon}</span>}
        <span className="text-xs font-black text-white uppercase tracking-tight">
          {title}
        </span>
      </div>
      <p className="text-[10px] text-slate-500 font-medium">{desc}</p>
    </div>
    <div
      className={`relative w-9 h-5 rounded-full transition-colors ${active ? "bg-blue-600" : "bg-slate-800"}`}
    >
      <div
        className={`absolute top-1 left-1 size-3 bg-white rounded-full transition-transform ${active ? "translate-x-4" : ""}`}
      />
    </div>
  </div>
);

export default ResumeManagement;
