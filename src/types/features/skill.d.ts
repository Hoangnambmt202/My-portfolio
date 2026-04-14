// src/types/features/skill.ts

export interface SkillGroup {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  color: string;
  icon?: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
  skills?: Skill[];
  _count?: { skills: number };
}

export interface Skill {
  id: string;
  name: string;
  iconUrl?: string | null;
  iconPublicId?: string | null;
  proficiency: number;
  level: string;
  whenToUse?: string | null;
  whyItMatters?: string | null;
  isHighlighted: boolean;
  order: number;
  groupId?: string | null;
  group?: SkillGroup | null;
  createdAt: string;
  updatedAt: string;
}

export type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert" | "Master";

export const SKILL_LEVELS: SkillLevel[] = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Expert",
  "Master",
];

export function levelFromProficiency(pct: number): SkillLevel {
  if (pct <= 20) return "Beginner";
  if (pct <= 40) return "Intermediate";
  if (pct <= 60) return "Advanced";
  if (pct <= 80) return "Expert";
  return "Master";
}
