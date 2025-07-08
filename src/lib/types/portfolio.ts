// Portfolio related types
import { BaseEntity } from './common';

export interface Project extends BaseEntity {
  title: string;
  description: string;
  content: string;
  image: string;
  images?: string[];
  technologies: string[];
  category: ProjectCategory;
  status: ProjectStatus;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  tags: string[];
}

export type ProjectCategory = 
  | 'web-development'
  | 'mobile-development'
  | 'ui-ux-design'
  | 'full-stack'
  | 'frontend'
  | 'backend'
  | 'other';

export type ProjectStatus = 
  | 'completed'
  | 'in-progress'
  | 'planned'
  | 'archived';

export interface Skill {
  name: string;
  category: SkillCategory;
  level: number; // 1-100
  icon?: string;
  color?: string;
}

export type SkillCategory = 
  | 'frontend'
  | 'backend'
  | 'database'
  | 'devops'
  | 'design'
  | 'other';

export interface Experience extends BaseEntity {
  company: string;
  position: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  technologies: string[];
  achievements: string[];
} 