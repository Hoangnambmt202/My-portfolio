export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  enabled: boolean;
}

export interface Integration {
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

export type ThemeMode = "light" | "dark" | "system";
export type FontStyle = "sans" | "serif" | "mono";

export interface ProfileData {
  fullName: string;
  email: string;
  bio: string;
  location: string;
  website: string;
}

export interface SocialData {
  linkedin: string;
  github: string;
  twitter: string;
}

export interface AccentColor {
  hex: string;
  label: string;
}