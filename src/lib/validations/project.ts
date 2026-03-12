/* eslint-disable @typescript-eslint/no-explicit-any */
// src/lib/validations/project.ts
import { z } from "zod";
const optionalUrl = z
  .string()
  .optional()
  .refine((val) => !val || /^https?:\/\/.+/.test(val), "Invalid URL");
export const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1),
  content: z.string().optional(),
  thumbnail: z.string().url().optional(),
  images: z.array(z.string().url()).default([]),
  techStack: z.array(z.string().min(1, "Tech stack is required")).default([]),
  demoUrl: optionalUrl,
  liveUrl: optionalUrl,
  githubUrl: optionalUrl,
  isFeatured: z.boolean().default(false),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
  order: z.number().default(0),
});

export type ProjectInput = z.infer<typeof projectSchema>;
export function validateProjectField(field: string, value: any) {
  const shape = projectSchema.shape as any;

  if (!shape[field]) return null;

  const result = shape[field].safeParse(value);

  if (!result.success) {
    return result.error.errors[0].message;
  }

  return null;
}
