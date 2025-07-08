// Common TypeScript types for the portfolio

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SEO {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
}

export interface NavItem {
  name: string;
  href: string;
  description?: string;
  icon?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  address?: string;
  website?: string;
}

export interface Theme {
  mode: 'light' | 'dark';
  system?: boolean;
}

export interface AnimationProps {
  duration?: number;
  delay?: number;
  easing?: string;
} 