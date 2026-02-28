import React, { useState } from "react";
import {
  Search,
  Save,
  Sun,
  Moon,
  Monitor,
  Globe,
  Upload,
  Plus,
  Diamond,
  Type,
  Hash,
  Palette as PaletteIcon,
} from "lucide-react";
import type { ThemeMode, FontStyle, AccentColor } from "@/types/setting";

const ACCENT_COLORS: AccentColor[] = [
  { hex: "#137fec", label: "Blue" },
  { hex: "#8b5cf6", label: "Violet" },
  { hex: "#10b981", label: "Emerald" },
  { hex: "#f59e0b", label: "Amber" },
  { hex: "#ef4444", label: "Red" },
];

export const GeneralTab = () => {
  const [siteTitle, setSiteTitle] = useState("Alex Dev | Senior Full Stack Engineer");
  const [authorName, setAuthorName] = useState("Alex Dev");
  const [metaDesc, setMetaDesc] = useState(
    "Passionate Full Stack Developer specializing in React, Node.js, and modern web architectures. Transforming ideas into high-performance digital experiences."
  );
  const [keywords, setKeywords] = useState(
    "Web Development, React, UI/UX, Portfolio, JavaScript"
  );
  const [themeMode, setThemeMode] = useState<ThemeMode>("dark");
  const [accentHex, setAccentHex] = useState("#137fec");
  const [customHex, setCustomHex] = useState("#137fec");
  const [fontStyle, setFontStyle] = useState<FontStyle>("sans");

  const descLen = metaDesc.length;
  const descOk = descLen >= 150 && descLen <= 160;

  const themeModes: { id: ThemeMode; icon: React.ReactNode; label: string }[] = [
    { id: "light", icon: <Sun size={14} />, label: "Light" },
    { id: "dark", icon: <Moon size={14} />, label: "Dark" },
    { id: "system", icon: <Monitor size={14} />, label: "System" },
  ];

  const fonts: { id: FontStyle; preview: string; label: string; cls: string }[] = [
    { id: "sans", preview: "Aa", label: "Sans Serif (Modern)", cls: "font-sans" },
    { id: "serif", preview: "Aa", label: "Serif (Classic)", cls: "font-serif" },
    { id: "mono", preview: "Aa", label: "Monospace (Code)", cls: "font-mono" },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-6">
      {/* SEO & Metadata */}
      <div className="bg-slate-950/60 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
              <Search size={15} />
            </span>
            <div>
              <h3 className="text-xs font-black text-white uppercase tracking-widest">
                SEO &amp; Metadata
              </h3>
              <p className="text-[10px] text-slate-500">Core identity &amp; search engine signals.</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="size-1.5 rounded-full bg-emerald-400" /> Indexed
          </span>
        </div>

        <div className="p-5 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5 group">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] group-focus-within:text-blue-400 transition-colors">
                Site Title
              </label>
              <input
                type="text"
                value={siteTitle}
                onChange={(e) => setSiteTitle(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition-all"
              />
              <p className="text-[10px] text-slate-600">Appears in browser tab and search results.</p>
            </div>
            <div className="space-y-1.5 group">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] group-focus-within:text-blue-400 transition-colors">
                Author Name
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5 group">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] group-focus-within:text-blue-400 transition-colors">
              Meta Description
            </label>
            <textarea
              value={metaDesc}
              onChange={(e) => setMetaDesc(e.target.value)}
              rows={3}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition-all resize-none"
            />
            <div className="flex items-center justify-between">
              <div className="h-1 flex-1 mr-3 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${descOk ? "bg-emerald-500" : descLen > 160 ? "bg-red-500" : "bg-amber-500"}`}
                  style={{ width: `${Math.min((descLen / 160) * 100, 100)}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-500 shrink-0">{descLen}/160</span>
            </div>
            <p className="text-[10px] text-slate-600">Recommended: 150–160 characters.</p>
          </div>

          <div className="space-y-1.5 group">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] group-focus-within:text-blue-400 transition-colors">
              Keywords
            </label>
            <div className="relative">
              <Hash size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" />
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition-all"
              />
            </div>
            <p className="text-[10px] text-slate-600">Separate keywords with commas.</p>
          </div>
        </div>
      </div>

      {/* Branding & Assets */}
      <div className="bg-slate-950/60 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="flex items-center gap-2.5 px-5 py-4 border-b border-slate-800">
          <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
            <Diamond size={15} />
          </span>
          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-widest">
              Branding &amp; Assets
            </h3>
            <p className="text-[10px] text-slate-500">Favicon and social share image.</p>
          </div>
        </div>

        <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em]">
              Favicon
            </label>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 hover:border-blue-500/50 rounded-xl p-6 cursor-pointer transition-colors group">
              <div className="size-14 bg-slate-800 rounded-xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Globe size={24} className="text-slate-500" />
              </div>
              <span className="text-xs font-bold text-blue-400 mb-1">Upload New</span>
              <span className="text-[10px] text-slate-600 text-center leading-relaxed">
                ICO, PNG or SVG
                <br />
                Max 2MB
              </span>
            </div>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em]">
              Share Image (OG:Image)
            </label>
            <div className="relative w-full h-36 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-slate-900 to-indigo-900/40" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <div className="size-10 rounded-xl bg-blue-600/20 border border-blue-500/20 flex items-center justify-center">
                  <Upload size={16} className="text-blue-400" />
                </div>
                <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-white/20 transition-colors">
                  Change Image
                </button>
              </div>
            </div>
            <p className="text-[10px] text-slate-600">
              Recommended: 1200×630px. Used when sharing on social media.
            </p>
          </div>
        </div>
      </div>

      {/* Visual Theme */}
      <div className="bg-slate-950/60 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="flex items-center gap-2.5 px-5 py-4 border-b border-slate-800">
          <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
            <PaletteIcon size={15} />
          </span>
          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-widest">Visual Theme</h3>
            <p className="text-[10px] text-slate-500">Mode, accent color, and typography.</p>
          </div>
        </div>

        <div className="p-5 space-y-6">
          {/* Theme Mode */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs font-black text-white">Default Theme Mode</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Set initial appearance for new visitors.</p>
            </div>
            <div className="flex bg-slate-900 border border-slate-800 rounded-xl p-1 gap-0.5">
              {themeModes.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setThemeMode(m.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    themeMode === m.id
                      ? "bg-slate-700 text-white shadow"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {m.icon} {m.label}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-800" />

          {/* Accent Color */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <p className="text-xs font-black text-white">Main Accent Color</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Used for buttons, links, and highlights.</p>
              </div>
              <div className="flex items-center gap-2.5 flex-wrap">
                {ACCENT_COLORS.map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => { setAccentHex(c.hex); setCustomHex(c.hex); }}
                    title={c.label}
                    className="size-9 rounded-full transition-all hover:scale-110 shrink-0"
                    style={{
                      background: c.hex,
                      outline: accentHex === c.hex ? `3px solid ${c.hex}` : "none",
                      outlineOffset: "2px",
                    }}
                  />
                ))}
                <button className="size-9 rounded-full border border-slate-700 flex items-center justify-center text-slate-500 hover:bg-slate-800 transition-colors">
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs font-black text-white">Custom Hex Code</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Enter a specific color value.</p>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="size-9 rounded-xl border border-slate-700 shrink-0 transition-colors"
                  style={{ background: customHex }}
                />
                <input
                  type="text"
                  value={customHex}
                  onChange={(e) => { setCustomHex(e.target.value); setAccentHex(e.target.value); }}
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white font-mono uppercase focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition-all"
                  maxLength={7}
                />
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800" />

          {/* Typography */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Type size={14} className="text-slate-500" />
              <p className="text-xs font-black text-white">Typography Style</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {fonts.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFontStyle(f.id)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    fontStyle === f.id
                      ? "border-blue-500 ring-1 ring-blue-500/30 bg-blue-500/5"
                      : "border-slate-800 bg-slate-900/40 hover:bg-slate-800/50"
                  }`}
                >
                  <p className={`text-2xl font-bold mb-1 text-white ${f.cls}`}>{f.preview}</p>
                  <p className="text-[10px] text-slate-500">{f.label}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action bar */}
      <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
        <button className="px-5 py-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors">
          Cancel
        </button>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-900/30 active:scale-95">
          <Save size={14} /> Save Changes
        </button>
      </div>
    </div>
  );
};