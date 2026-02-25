/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, KeyboardEvent } from "react";
import {
  User,
  Globe,
  Camera,
  Palette as PaletteIcon,
  Bell,
  Shield,
  Moon,
  Sun,
  Save,
  Upload,
  Link as LinkIcon,
  Eye,
  Trash2,
  Plus,
  ChevronRight,
  Search,
  Share2,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  X,
  MoreVertical,
  Code2,
  Briefcase,
  AtSign,
  Puzzle,
  RefreshCw,
  Settings2,
  Zap,
  CheckCircle,
  Link2Off,
  SlidersHorizontal,
  Mail,
  MapPin,
  ExternalLink,
  Info,
  BadgeCheck,
  Diamond,
  Type,
  Monitor,
  Hash,
} from "lucide-react";
import { FiLinkedin, FiGithub, FiFacebook } from "react-icons/fi";

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: any;
  color: string;
  enabled: boolean;
}

// ─────────────────────────────────────────────
// SEO TAB — full-featured
// ─────────────────────────────────────────────
const SeoTab = () => {
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
        {/* ── LEFT: Forms ── */}
        <div className="xl:col-span-7 flex flex-col gap-5">
          {/* SEO Card */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl overflow-hidden">
            {/* Card header */}
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

          {/* Social Profiles Card */}
          <SocialProfilesCard />

          {/* Actions */}
          <div className="flex items-center justify-end gap-3">
            <button className="px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
              Discard
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-900/30 active:scale-95">
              <Save size={14} /> Save Settings
            </button>
          </div>
        </div>

        {/* ── RIGHT: Preview + Health ── */}
        <div className="xl:col-span-5 flex flex-col gap-5 xl:sticky xl:top-4 xl:self-start">
          {/* Search Preview */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-slate-800">
              <Eye size={14} className="text-emerald-400" />
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">
                Search Result Preview
              </h3>
            </div>
            <div className="p-4">
              {/* Google-style preview */}
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

            {/* SEO Health */}
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

          {/* Pro Tip */}
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

// ─────────────────────────────────────────────
// PROFILE TAB — full-featured
// ─────────────────────────────────────────────
const BIO_MAX = 280;

const ProfileTab = () => {
  const [profileData, setProfileData] = useState({
    fullName: "Alex Morgan",
    email: "alex.morgan@dev.com",
    bio: "Passionate Full Stack Developer with 5+ years of experience in building scalable web applications. Lover of clean code and modern UI/UX.",
    location: "San Francisco, CA",
    website: "https://alexmorgan.dev",
  });
  const [social, setSocial] = useState({
    linkedin: "https://linkedin.com/in/alexmorgan",
    github: "https://github.com/alexmorgan",
    twitter: "",
  });
  const [avatarHover, setAvatarHover] = useState(false);

  const bioLeft = BIO_MAX - profileData.bio.length;
  const bioOk = profileData.bio.length <= BIO_MAX;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-6">
      {/* Avatar Section */}
      <div className="relative bg-slate-950/60 border border-slate-800 rounded-2xl p-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center gap-4">
          {/* Circular avatar with hover overlay */}
          <div
            className="relative cursor-pointer select-none"
            onMouseEnter={() => setAvatarHover(true)}
            onMouseLeave={() => setAvatarHover(false)}
          >
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-slate-700 bg-slate-800 shadow-xl">
              <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
                <User size={44} className="text-white/80" />
              </div>
            </div>
            {/* Hover overlay */}
            <div
              className={`absolute inset-0 rounded-full bg-black/60 flex items-center justify-center transition-opacity duration-200 ${avatarHover ? "opacity-100" : "opacity-0"}`}
            >
              <Upload size={22} className="text-white" />
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-sm font-black text-white mb-0.5">
              Upload New Avatar
            </h3>
            <p className="text-[10px] text-slate-500">
              JPG, PNG or GIF · Max 2MB · Recommended 400×400px
            </p>
          </div>

          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase tracking-widest rounded-lg transition-all shadow-lg shadow-blue-900/30 active:scale-95">
              <Upload size={13} /> Upload New
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-black uppercase tracking-widest rounded-lg border border-slate-700 transition-all">
              <Trash2 size={13} /> Remove
            </button>
          </div>
        </div>
      </div>

      {/* Personal Info + Social Links — 2-col grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left — Personal Information */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="flex items-center gap-2.5 px-5 py-4 border-b border-slate-800">
            <BadgeCheck size={15} className="text-blue-400" />
            <h3 className="text-xs font-black text-white uppercase tracking-widest">
              Personal Information
            </h3>
          </div>
          <div className="p-5 flex flex-col gap-4">
            {/* Full Name */}
            <IconInputGroup
              label="Full Name"
              icon={
                <User
                  size={15}
                  className="text-slate-500 group-focus-within:text-blue-400 transition-colors"
                />
              }
              value={profileData.fullName}
              placeholder="e.g. John Doe"
              onChange={(v) => setProfileData((p) => ({ ...p, fullName: v }))}
            />
            {/* Email */}
            <IconInputGroup
              label="Email Address"
              icon={
                <Mail
                  size={15}
                  className="text-slate-500 group-focus-within:text-blue-400 transition-colors"
                />
              }
              value={profileData.email}
              placeholder="e.g. john@example.com"
              type="email"
              onChange={(v) => setProfileData((p) => ({ ...p, email: v }))}
            />
            {/* Location */}
            <IconInputGroup
              label="Location"
              icon={
                <MapPin
                  size={15}
                  className="text-slate-500 group-focus-within:text-blue-400 transition-colors"
                />
              }
              value={profileData.location}
              placeholder="e.g. San Francisco, CA"
              onChange={(v) => setProfileData((p) => ({ ...p, location: v }))}
            />
            {/* Website */}
            <IconInputGroup
              label="Website"
              icon={
                <ExternalLink
                  size={15}
                  className="text-slate-500 group-focus-within:text-blue-400 transition-colors"
                />
              }
              value={profileData.website}
              placeholder="https://yoursite.dev"
              type="url"
              onChange={(v) => setProfileData((p) => ({ ...p, website: v }))}
            />
            {/* Bio */}
            <div className="space-y-1.5 group">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] group-focus-within:text-blue-400 transition-colors">
                Bio
              </label>
              <textarea
                value={profileData.bio}
                onChange={(e) =>
                  setProfileData((p) => ({ ...p, bio: e.target.value }))
                }
                rows={4}
                placeholder="Write a short bio about yourself..."
                className={`w-full bg-slate-900 border rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:ring-1 transition-all resize-none ${
                  !bioOk
                    ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
                    : "border-slate-800 focus:ring-blue-500/20 focus:border-blue-500"
                }`}
              />
              <div className="flex justify-end">
                <span
                  className={`text-[10px] font-bold ${!bioOk ? "text-red-400" : "text-slate-600"}`}
                >
                  {bioLeft} characters left
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right — Social Links */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-2xl overflow-hidden flex flex-col">
          <div className="flex items-center gap-2.5 px-5 py-4 border-b border-slate-800">
            <LinkIcon size={15} className="text-blue-400" />
            <h3 className="text-xs font-black text-white uppercase tracking-widest">
              Social Links
            </h3>
          </div>
          <div className="p-5 flex flex-col gap-4 flex-1">
            <IconInputGroup
              label="LinkedIn URL"
              icon={
                <Briefcase
                  size={15}
                  className="text-slate-500 group-focus-within:text-blue-400 transition-colors"
                />
              }
              value={social.linkedin}
              placeholder="https://linkedin.com/in/username"
              type="url"
              onChange={(v) => setSocial((s) => ({ ...s, linkedin: v }))}
            />
            <IconInputGroup
              label="GitHub URL"
              icon={
                <Code2
                  size={15}
                  className="text-slate-500 group-focus-within:text-blue-400 transition-colors"
                />
              }
              value={social.github}
              placeholder="https://github.com/username"
              type="url"
              onChange={(v) => setSocial((s) => ({ ...s, github: v }))}
            />
            <IconInputGroup
              label="Twitter (X) URL"
              icon={
                <AtSign
                  size={15}
                  className="text-slate-500 group-focus-within:text-blue-400 transition-colors"
                />
              }
              value={social.twitter}
              placeholder="https://twitter.com/username"
              type="url"
              onChange={(v) => setSocial((s) => ({ ...s, twitter: v }))}
            />

            {/* Info card */}
            <div className="mt-auto pt-3">
              <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-4 flex items-start gap-3">
                <Info size={14} className="text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-black text-white mb-1">
                    Public Profile
                  </h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    These links will be displayed on your portfolio footer and
                    contact section.
                  </p>
                </div>
              </div>
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

// Prefixed input used only in ProfileTab
const IconInputGroup = ({
  label,
  icon,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) => (
  <div className="group space-y-1.5">
    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] group-focus-within:text-blue-400 transition-colors">
      {label}
    </label>
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
        {icon}
      </div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
      />
    </div>
  </div>
);

// ─────────────────────────────────────────────
// INTEGRATIONS TAB
// ─────────────────────────────────────────────
interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  connected: boolean;
  enabled: boolean;
  meta?: string;
  lastSync?: string;
  category: string;
}

const IntegrationsTab = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");

  const [activeConnections, setActiveConnections] = useState<Integration[]>([
    {
      id: "github",
      name: "GitHub",
      description:
        "Sync repositories, show contribution graphs, and automate project deployments directly from your account.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-9 h-9 fill-current text-white"
          xmlns="http://www.w3.org/2000/svg"
        >
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
        <svg
          viewBox="0 0 1155 1000"
          className="w-9 h-9 fill-current text-white"
          xmlns="http://www.w3.org/2000/svg"
        >
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
  ]);

  const [availableIntegrations, setAvailableIntegrations] = useState<
    Integration[]
  >([
    {
      id: "ga",
      name: "Google Analytics",
      description:
        "Track visitor traffic and user behavior on your portfolio site.",
      icon: (
        <svg
          viewBox="0 0 192 192"
          className="w-8 h-8"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M108 156a12 12 0 0 1-24 0V36a12 12 0 0 1 24 0v120z"
            fill="#F9AB00"
          />
          <path
            d="M156 156a12 12 0 0 1-24 0V96a12 12 0 0 1 24 0v60z"
            fill="#E37400"
          />
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
      description:
        "Collect email subscribers from your contact form automatically.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-8 h-8 fill-white"
          xmlns="http://www.w3.org/2000/svg"
        >
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
      description:
        "Receive instant notifications when someone fills out your contact form.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-8 h-8 fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zm10.122 2.521a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.268 0a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zm-2.523 10.122a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zm0-1.268a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"
            fill="#E01E5A"
          />
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
      description:
        "Embed live Figma prototypes directly into your project case studies.",
      icon: (
        <svg
          viewBox="0 0 38 57"
          className="w-7 h-7"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z"
            fill="#1ABCFE"
          />
          <path
            d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z"
            fill="#0ACF83"
          />
          <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262" />
          <path
            d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z"
            fill="#F24E1E"
          />
          <path
            d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z"
            fill="#A259FF"
          />
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
      description:
        "Cross-post your blog articles to Dev.to automatically to reach a wider audience.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-8 h-8 fill-white"
          xmlns="http://www.w3.org/2000/svg"
        >
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
      description:
        "Connect your community server and display status widgets on your portfolio.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-8 h-8 fill-white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      ),
      iconBg: "bg-[#5865F2]",
      connected: false,
      enabled: false,
      category: "Communication",
    },
  ]);

  const toggleAvailable = (id: string) =>
    setAvailableIntegrations((p) =>
      p.map((i) => (i.id === id ? { ...i, enabled: !i.enabled } : i)),
    );

  const categories = [
    "All Categories",
    "Analytics",
    "Communication",
    "Developer",
    "Design",
  ];

  const filtered = availableIntegrations.filter((i) => {
    const matchesSearch =
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      category === "All Categories" || i.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-8">
      {/* Search + filter bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 group">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-400 transition-colors"
          />
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
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Active Connections */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Zap size={14} className="text-blue-400" />
          <h2 className="text-xs font-black text-white uppercase tracking-widest">
            Active Connections
          </h2>
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
              {/* glow accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

              {/* connected badge */}
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Connected
                </span>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className={`shrink-0 p-3 ${conn.iconBg} rounded-xl border border-slate-700 shadow`}
                >
                  {conn.icon}
                </div>
                <div className="flex-1 min-w-0 pr-16">
                  <h3 className="text-sm font-black text-white mb-1">
                    {conn.name}
                  </h3>
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
          <h2 className="text-xs font-black text-white uppercase tracking-widest">
            Available Integrations
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="flex flex-col bg-slate-900/40 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`p-2.5 ${item.iconBg} rounded-xl border border-slate-700/50 shadow`}
                >
                  {item.icon}
                </div>
                {/* mini toggle */}
                <button
                  onClick={() => toggleAvailable(item.id)}
                  className={`relative shrink-0 rounded-full transition-colors`}
                  style={{
                    height: "20px",
                    width: "36px",
                    background: item.enabled ? "#2563eb" : "#334155",
                  }}
                >
                  <div
                    className={`absolute top-[3px] left-[3px] size-[14px] bg-white rounded-full shadow transition-transform`}
                    style={{
                      transform: item.enabled
                        ? "translateX(16px)"
                        : "translateX(0)",
                    }}
                  />
                </button>
              </div>

              <h3 className="text-sm font-black text-white mb-1">
                {item.name}
              </h3>
              <p className="text-[11px] text-slate-500 leading-relaxed flex-1 mb-3">
                {item.description}
              </p>

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
              <p className="text-xs font-bold uppercase tracking-widest">
                No integrations found
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

// ─────────────────────────────────────────────
// GENERAL TAB — full-featured
// ─────────────────────────────────────────────
type ThemeMode = "light" | "dark" | "system";
type FontStyle = "sans" | "serif" | "mono";

const ACCENT_COLORS = [
  { hex: "#137fec", label: "Blue" },
  { hex: "#8b5cf6", label: "Violet" },
  { hex: "#10b981", label: "Emerald" },
  { hex: "#f59e0b", label: "Amber" },
  { hex: "#ef4444", label: "Red" },
];

const GeneralTab = () => {
  /* ── SEO & Metadata ── */
  const [siteTitle, setSiteTitle] = useState(
    "Alex Dev | Senior Full Stack Engineer",
  );
  const [authorName, setAuthorName] = useState("Alex Dev");
  const [metaDesc, setMetaDesc] = useState(
    "Passionate Full Stack Developer specializing in React, Node.js, and modern web architectures. Transforming ideas into high-performance digital experiences.",
  );
  const [keywords, setKeywords] = useState(
    "Web Development, React, UI/UX, Portfolio, JavaScript",
  );

  /* ── Theme ── */
  const [themeMode, setThemeMode] = useState<ThemeMode>("dark");
  const [accentHex, setAccentHex] = useState("#137fec");
  const [customHex, setCustomHex] = useState("#137fec");
  const [fontStyle, setFontStyle] = useState<FontStyle>("sans");

  const descLen = metaDesc.length;
  const descOk = descLen >= 150 && descLen <= 160;

  const themeModes: { id: ThemeMode; icon: React.ReactNode; label: string }[] =
    [
      { id: "light", icon: <Sun size={14} />, label: "Light" },
      { id: "dark", icon: <Moon size={14} />, label: "Dark" },
      { id: "system", icon: <Monitor size={14} />, label: "System" },
    ];

  const fonts: {
    id: FontStyle;
    preview: string;
    label: string;
    cls: string;
  }[] = [
    {
      id: "sans",
      preview: "Aa",
      label: "Sans Serif (Modern)",
      cls: "font-sans",
    },
    { id: "serif", preview: "Aa", label: "Serif (Classic)", cls: "font-serif" },
    { id: "mono", preview: "Aa", label: "Monospace (Code)", cls: "font-mono" },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-6">
      {/* ── SEO & Metadata ── */}
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
              <p className="text-[10px] text-slate-500">
                Core identity &amp; search engine signals.
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="size-1.5 rounded-full bg-emerald-400" /> Indexed
          </span>
        </div>

        <div className="p-5 space-y-5">
          {/* Site Title + Author row */}
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
              <p className="text-[10px] text-slate-600">
                Appears in browser tab and search results.
              </p>
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

          {/* Meta Description */}
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
              <span className="text-[10px] text-slate-500 shrink-0">
                {descLen}/160
              </span>
            </div>
            <p className="text-[10px] text-slate-600">
              Recommended: 150–160 characters.
            </p>
          </div>

          {/* Keywords */}
          <div className="space-y-1.5 group">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] group-focus-within:text-blue-400 transition-colors">
              Keywords
            </label>
            <div className="relative">
              <Hash
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none"
              />
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition-all"
              />
            </div>
            <p className="text-[10px] text-slate-600">
              Separate keywords with commas.
            </p>
          </div>
        </div>
      </div>

      {/* ── Branding & Assets ── */}
      <div className="bg-slate-950/60 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="flex items-center gap-2.5 px-5 py-4 border-b border-slate-800">
          <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
            <Diamond size={15} />
          </span>
          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-widest">
              Branding &amp; Assets
            </h3>
            <p className="text-[10px] text-slate-500">
              Favicon and social share image.
            </p>
          </div>
        </div>

        <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Favicon */}
          <div className="md:col-span-1 space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em]">
              Favicon
            </label>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 hover:border-blue-500/50 rounded-xl p-6 cursor-pointer transition-colors group">
              <div className="size-14 bg-slate-800 rounded-xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Globe size={24} className="text-slate-500" />
              </div>
              <span className="text-xs font-bold text-blue-400 mb-1">
                Upload New
              </span>
              <span className="text-[10px] text-slate-600 text-center leading-relaxed">
                ICO, PNG or SVG
                <br />
                Max 2MB
              </span>
            </div>
          </div>

          {/* OG Image */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em]">
              Share Image (OG:Image)
            </label>
            <div className="relative w-full h-36 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 group cursor-pointer">
              {/* gradient placeholder */}
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

      {/* ── Visual Theme ── */}
      <div className="bg-slate-950/60 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="flex items-center gap-2.5 px-5 py-4 border-b border-slate-800">
          <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
            <PaletteIcon size={15} />
          </span>
          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-widest">
              Visual Theme
            </h3>
            <p className="text-[10px] text-slate-500">
              Mode, accent color, and typography.
            </p>
          </div>
        </div>

        <div className="p-5 space-y-6">
          {/* Theme Mode segmented control */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs font-black text-white">
                Default Theme Mode
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5">
                Set initial appearance for new visitors.
              </p>
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

          {/* Accent Color + Custom hex */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <p className="text-xs font-black text-white">
                  Main Accent Color
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Used for buttons, links, and highlights.
                </p>
              </div>
              <div className="flex items-center gap-2.5 flex-wrap">
                {ACCENT_COLORS.map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => {
                      setAccentHex(c.hex);
                      setCustomHex(c.hex);
                    }}
                    title={c.label}
                    className="size-9 rounded-full transition-all hover:scale-110 shrink-0"
                    style={{
                      background: c.hex,
                      outline:
                        accentHex === c.hex ? `3px solid ${c.hex}` : "none",
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
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Enter a specific color value.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="size-9 rounded-xl border border-slate-700 shrink-0 transition-colors"
                  style={{ background: customHex }}
                />
                <input
                  type="text"
                  value={customHex}
                  onChange={(e) => {
                    setCustomHex(e.target.value);
                    setAccentHex(e.target.value);
                  }}
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
                  <p className={`text-2xl font-bold mb-1 text-white ${f.cls}`}>
                    {f.preview}
                  </p>
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

// Social Profiles sub-card (used inside SEO tab area)
const SocialProfilesCard = () => {
  const [links, setLinks] = useState([
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
  ]);

  const toggle = (id: string) =>
    setLinks((p) =>
      p.map((l) => (l.id === id ? { ...l, enabled: !l.enabled } : l)),
    );
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
            <p className="text-[10px] text-slate-500">
              Manage links to your social media.
            </p>
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
              {/* Toggle */}
              <button
                onClick={() => toggle(link.id)}
                className={`relative w-8 h-4.5 rounded-full transition-colors ${link.enabled ? "bg-blue-600" : "bg-slate-700"}`}
                style={{ height: "18px", width: "32px" }}
              >
                <div
                  className={`absolute top-[2px] left-[2px] size-[14px] bg-white rounded-full transition-transform shadow ${link.enabled ? "translate-x-[14px]" : ""}`}
                />
              </button>
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

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────
export default function PortfolioSettingsPage() {
  const [activeTab, setActiveTab] = useState("seo");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isPublic, setIsPublic] = useState(true);
  const [notifications, setNotifications] = useState({
    email: true,
    browser: false,
    marketing: false,
  });

  const [profileData, setProfileData] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    bio: "Full-stack developer passionate about creating amazing digital experiences.",
    location: "San Francisco, CA",
    website: "https://johndoe.dev",
    avatar: null as File | null,
  });

  const [socialLinks, setSocialLinks] = useState([
    {
      id: "1",
      platform: "GitHub",
      url: "https://github.com/johndoe",
      icon: FiGithub,
      color: "text-slate-200",
      enabled: true,
    },
    {
      id: "2",
      platform: "LinkedIn",
      url: "https://linkedin.com/in/johndoe",
      icon: FiLinkedin,
      color: "text-blue-500",
      enabled: true,
    },
    {
      id: "3",
      platform: "Facebook",
      url: "https://facebook.com/johndoe",
      icon: FiFacebook,
      color: "text-blue-400",
      enabled: false,
    },
  ]);

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "general", label: "General", icon: Settings2 },
    { id: "appearance", label: "Appearance", icon: PaletteIcon },
    { id: "seo", label: "SEO", icon: Globe },
    { id: "integrations", label: "Integrations", icon: Puzzle },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Shield },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab />;

      case "general":
        return <GeneralTab />;

      case "appearance":
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-5">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
                Theme Engine
              </h3>
              <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2.5 rounded-xl ${isDarkMode ? "bg-purple-500/10 text-purple-400" : "bg-yellow-500/10 text-yellow-500"}`}
                  >
                    {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
                  </div>
                  <div>
                    <p className="font-black text-white text-xs uppercase tracking-tight">
                      Dark Appearance
                    </p>
                    <p className="text-[10px] text-slate-500">
                      Optimize UI for low-light environments
                    </p>
                  </div>
                </div>
                <Toggle active={isDarkMode} onChange={setIsDarkMode} />
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                Accent Color
              </h3>
              <div className="grid grid-cols-6 gap-3">
                {["blue", "purple", "emerald", "orange", "rose", "cyan"].map(
                  (color) => (
                    <div
                      key={color}
                      className="group cursor-pointer text-center space-y-1.5"
                    >
                      <div
                        className={`w-full aspect-square rounded-xl bg-${color}-500/20 border-2 border-transparent group-hover:border-${color}-500 transition-all flex items-center justify-center`}
                      >
                        <div
                          className={`w-6 h-6 rounded-full bg-${color}-500`}
                        />
                      </div>
                      <p className="text-[9px] font-bold text-slate-500 uppercase">
                        {color}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        );

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

  return (
    <div className="flex h-screen bg-[#0f1115] text-slate-200 overflow-hidden">
      <main className="flex-1 overflow-y-auto relative bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-8">
          <header className="mb-8 space-y-1">
            <div className="flex items-center gap-2 text-[10px] font-bold text-blue-500 uppercase tracking-widest">
              <span>System</span>
              <ChevronRight size={12} />
              <span className="text-slate-500">Settings</span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight uppercase">
              Portfolio Settings
            </h1>
            <p className="text-slate-500 text-sm">
              Customize your digital identity and global preferences.
            </p>
          </header>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Nav Tabs */}
            <aside className="lg:w-56 shrink-0">
              <nav className="bg-slate-900/40 border border-slate-800 rounded-2xl p-2 backdrop-blur-md sticky top-6 space-y-0.5">
                {tabs.map((tab) => (
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
                {renderTabContent()}

                {/* Save footer — hidden when tabs that have their own save buttons */}
                {activeTab !== "seo" &&
                  activeTab !== "integrations" &&
                  activeTab !== "profile" &&
                  activeTab !== "general" && (
                    <div className="flex justify-end pt-6 border-t border-slate-800 mt-6">
                      <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-500 transition-all active:scale-95 shadow-lg shadow-blue-900/40">
                        <Save size={15} /> Update Settings
                      </button>
                    </div>
                  )}
              </section>

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

// ─────────────────────────────────────────────
// Shared Sub-components
// ─────────────────────────────────────────────
const InputGroup = ({ label, value, onChange, type = "text" }: any) => (
  <div className="group space-y-1.5">
    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] group-focus-within:text-blue-400 transition-colors">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
    />
  </div>
);

const Toggle = ({ active, onChange }: any) => (
  <button
    onClick={() => onChange(!active)}
    className={`relative w-11 h-6 rounded-full transition-colors ${active ? "bg-blue-600" : "bg-slate-800"}`}
  >
    <div
      className={`absolute top-1 left-1 size-4 bg-white rounded-full shadow transition-transform ${active ? "translate-x-5" : ""}`}
    />
  </button>
);
