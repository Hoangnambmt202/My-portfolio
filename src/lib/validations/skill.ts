// src/lib/validations/skill.ts
import { z } from "zod";

export const skillSchema = z.object({
  name: z.string().min(1),
  icon: z.string().optional(),
  level: z.number().min(1).max(100),
  category: z.enum([
    "FRONTEND",
    "BACKEND",
    "DATABASE",
    "DEVOPS",
    "TOOL",
    "OTHER",
  ]),
  order: z.number().default(0),
});
