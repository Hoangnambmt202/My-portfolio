import React, { useState, KeyboardEvent } from "react";
import {
  Search,
  Eye,
  Save,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  X,
  MoreVertical,
} from "lucide-react";

export const SeoTab = () => {
  const [metaTitle, setMetaTitle] = useState(
    "Alex Dev - Full Stack Developer Portfolio",
  );
  const [metaDesc, setMetaDesc] = useState(
    "Passionate Full Stack Developer specializing in React, Node.js, and modern UI/UX design. View my projects and get in touch for collaborations.",
  );
  const [keywords, setKeywords] = useState<string[]>([
    "Web Development",
    "ReactJS",
    "Tailwind CSS",
  ]);
  const [kwInput, setKwInput] = useState("");

  const addKeyword = () => {
    const val = kwInput.trim();
    if (val && !keywords.includes(val)) setKeywords((p) => [...p, val]);
    setKwInput("");
  };

  const onKwKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addKeyword();
    }
    if (e.key === "Backspace" && !kwInput && keywords.length) {
      setKeywords((p) => p.slice(0, -1));
    }
  };

  const removeKw = (kw: string) =>
    setKeywords((p) => p.filter((k) => k !== kw));

  const titleLen = metaTitle.length;
  const descLen = metaDesc.length;
  const titleOk = titleLen >= 30 && titleLen <= 60;
  const descOk = descLen >= 120 && descLen <= 160;

  const healthChecks = [
    { ok: titleOk, label: "Title Length Optimal", tip: "30–60 chars" },
    { ok: descOk, label: "Description Length Optimal", tip: "120–160 chars" },
    { ok: keywords.length >= 3, label: "Keywords Added", tip: "≥ 3 keywords" },
    {
      ok: false,
      label: "OG Image Set",
      tip: "Boosts social shares",
      fix: true,
    },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* ── LEFT ── */}
        <div className="xl:col-span-7 flex flex-col gap-5">
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-800">
              <span className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                <Search size={16} />
              </span>
              <div>
                <h2 className="text-sm font-black text-white uppercase tracking-tight">
                  Search Engine Optimization
                </h2>
                <p className="text-[10px] text-slate-500">
                  Optimize your site for better visibility.
                </p>
              </div>
            </div>

            <div className="p-5 flex flex-col gap-5">
              {/* Meta Title */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em]">
                    Meta Title
                  </label>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      titleOk
                        ? "bg-emerald-500/10 text-emerald-400"
                        : titleLen > 60
                          ? "bg-red-500/10 text-red-400"
                          : "bg-amber-500/10 text-amber-400"
                    }`}
                  >
                    {titleOk
                      ? "Good length"
                      : titleLen > 60
                        ? "Too long"
                        : "Too short"}
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 pr-10 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition-all"
                  />
                  {titleOk && (
                    <CheckCircle2
                      size={16}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400"
                    />
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <div className="h-1 flex-1 mr-3 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${titleOk ? "bg-emerald-500" : titleLen > 60 ? "bg-red-500" : "bg-amber-500"}`}
                      style={{
                        width: `${Math.min((titleLen / 60) * 100, 100)}%`,
                      }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 shrink-0">
                    {titleLen}/60
                  </span>
                </div>
              </div>

              {/* Meta Description */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em]">
                    Meta Description
                  </label>
                  <span className="text-[10px] text-slate-500">
                    Recommended: 120–160 chars
                  </span>
                </div>
                <textarea
                  value={metaDesc}
                  onChange={(e) => setMetaDesc(e.target.value)}
                  rows={3}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition-all resize-none"
                />
                <div className="flex justify-between items-center">
                  <div className="h-1 flex-1 mr-3 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${descOk ? "bg-emerald-500" : descLen > 160 ? "bg-red-500" : "bg-amber-500"}`}
                      style={{
                        width: `${Math.min((descLen / 160) * 100, 100)}%`,
                      }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 shrink-0">
                    {descLen}/160
                  </span>
                </div>
              </div>

              {/* Keywords */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em]">
                  Keywords
                </label>
                <div
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 min-h-[44px] flex flex-wrap gap-1.5 items-center focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500/20 transition-all cursor-text"
                  onClick={() => document.getElementById("kw-input")?.focus()}
                >
                  {keywords.map((kw) => (
                    <span
                      key={kw}
                      className="inline-flex items-center gap-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-md text-xs font-bold"
                    >
                      {kw}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeKw(kw);
                        }}
                        className="hover:text-blue-200 transition-colors"
                      >
                        <X size={11} />
                      </button>
                    </span>
                  ))}
                  <input
                    id="kw-input"
                    type="text"
                    value={kwInput}
                    onChange={(e) => setKwInput(e.target.value)}
                    onKeyDown={onKwKey}
                    onBlur={addKeyword}
                    placeholder={keywords.length === 0 ? "Add keyword..." : ""}
                    className="bg-transparent border-none outline-none text-sm text-white placeholder:text-slate-600 flex-1 min-w-[100px] focus:ring-0"
                  />
                </div>
                <p className="text-[10px] text-slate-600">
                  Press Enter or comma to add. Backspace to remove last.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button className="px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
              Discard
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-900/30 active:scale-95">
              <Save size={14} /> Save Settings
            </button>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="xl:col-span-5 flex flex-col gap-5 xl:sticky xl:top-4 xl:self-start">
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-slate-800">
              <Eye size={14} className="text-emerald-400" />
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">
                Search Result Preview
              </h3>
            </div>
            <div className="p-4">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1.5">
                <div className="flex items-center gap-2 mb-2.5">
                  <div className="size-6 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-black text-white">
                    A
                  </div>
                  <div>
                    <p className="text-xs text-slate-300 font-medium leading-none">
                      Alex Dev
                    </p>
                    <p className="text-[10px] text-slate-600 leading-none mt-0.5">
                      https://alexdev.portfolio.com
                    </p>
                  </div>
                  <MoreVertical size={14} className="ml-auto text-slate-700" />
                </div>
                <a
                  className="block text-base text-blue-400 hover:underline font-normal truncate leading-tight"
                  href="#"
                >
                  {metaTitle || "Untitled Page"}
                </a>
                <p className="text-xs text-slate-500 leading-snug line-clamp-2">
                  {metaDesc || "No description provided."}
                </p>
              </div>
            </div>

            <div className="px-4 pb-4 space-y-2">
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] mb-3">
                SEO Health
              </h4>
              {healthChecks.map((c) => (
                <div
                  key={c.label}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg border ${
                    c.ok
                      ? "bg-emerald-500/5 border-emerald-500/10"
                      : "bg-amber-500/5 border-amber-500/10"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {c.ok ? (
                      <CheckCircle2
                        size={14}
                        className="text-emerald-400 shrink-0"
                      />
                    ) : (
                      <AlertTriangle
                        size={14}
                        className="text-amber-400 shrink-0"
                      />
                    )}
                    <span className="text-xs font-bold text-slate-300">
                      {c.label}
                    </span>
                    <span className="text-[10px] text-slate-600">
                      · {c.tip}
                    </span>
                  </div>
                  {c.fix && !c.ok && (
                    <button className="text-[10px] font-bold text-blue-400 hover:text-blue-300 hover:underline shrink-0">
                      Fix
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600/15 via-blue-600/5 to-transparent border border-blue-500/15 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <Lightbulb size={16} className="text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="text-xs font-black text-white mb-1.5 uppercase tracking-tight">
                  Pro Tip
                </h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Adding descriptive keywords that match the skills listed in
                  your Projects section can boost your ranking for those
                  specific technologies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
