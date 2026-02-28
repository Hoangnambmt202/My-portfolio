// src/lib/validations/project.ts
import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1),
  description: z.string().min(1),
  content: z.string().optional(),
  thumbnail: z.string().url().optional(),
  images: z.array(z.string().url()).default([]),
  techStack: z.array(z.string()).default([]),
  demoUrl: z.string().url().optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
  featured: z.boolean().default(false),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
  order: z.number().default(0),
});

export type ProjectInput = z.infer<typeof projectSchema>;
