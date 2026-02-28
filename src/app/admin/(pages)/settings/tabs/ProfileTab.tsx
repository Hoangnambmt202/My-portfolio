import React, { useState } from "react";
import {
  User,
  Upload,
  Trash2,
  Save,
  Mail,
  MapPin,
  ExternalLink,
  BadgeCheck,
} from "lucide-react";
import { IconInputGroup } from "@/components/ui/InputGroup";
import type { ProfileData } from "@/types/setting";
import { SocialProfilesCard } from "@/components/admin/setting/SocialProfileCard";
import { useAdminSessionStore } from "@/stores/admin-session.store";

const BIO_MAX = 280;

const DEFAULT_PROFILE: ProfileData = {
  fullName: "Alex Morgan",
  email: "alex.morgan@dev.com",
  bio: "Passionate Full Stack Developer with 5+ years of experience in building scalable web applications. Lover of clean code and modern UI/UX.",
  location: "San Francisco, CA",
  website: "https://alexmorgan.dev",
};

export const ProfileTab = () => {
  const [profileData, setProfileData] = useState<ProfileData>(DEFAULT_PROFILE);
  const [avatarHover, setAvatarHover] = useState(false);

  const bioLeft = BIO_MAX - profileData.bio.length;
  const bioOk = profileData.bio.length <= BIO_MAX;
  const user = useAdminSessionStore((s) => s.user);
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-6">
      {/* Avatar Section */}
      <div className="relative bg-slate-950/60 border border-slate-800 rounded-2xl p-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center gap-4">
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
            <div
              className={`absolute inset-0 rounded-full bg-black/60 flex items-center justify-center transition-opacity duration-200 ${
                avatarHover ? "opacity-100" : "opacity-0"
              }`}
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
            <button className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-red-600 text-slate-300 text-xs font-black uppercase tracking-widest rounded-lg border border-slate-700 transition-all">
              <Trash2 size={13} /> Remove
            </button>
          </div>
        </div>
      </div>

      {/* Personal Info + Social Links */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Personal Information */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="flex items-center gap-2.5 px-5 py-4 border-b border-slate-800">
            <BadgeCheck size={15} className="text-blue-400" />
            <h3 className="text-xs font-black text-white uppercase tracking-widest">
              Personal Information
            </h3>
          </div>
          <div className="p-5 flex flex-col gap-4">
            <IconInputGroup
              label="Full Name"
              icon={
                <User
                  size={15}
                  className="text-slate-500 group-focus-within:text-blue-400 transition-colors"
                />
              }
              value={user?.name || "Administrator"}
              placeholder="e.g. John Doe"
              onChange={(v) => setProfileData((p) => ({ ...p, fullName: v }))}
            />
            <IconInputGroup
              label="Email Address"
              icon={
                <Mail
                  size={15}
                  className="text-slate-500 group-focus-within:text-blue-400 transition-colors"
                />
              }
              value={user?.email || "admin@dev.com"}
              placeholder="e.g. john@example.com"
              type="email"
              onChange={(v) => setProfileData((p) => ({ ...p, email: v }))}
            />
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

        <SocialProfilesCard />
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
