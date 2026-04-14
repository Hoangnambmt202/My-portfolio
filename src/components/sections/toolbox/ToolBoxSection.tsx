import { skillsApi } from "@/lib/api/skills";
import ToolboxClient from "./ToolboxClient";

/* ─────────────────────────────────────────────────────
   Toolbox Section — Next.js / TypeScript / Tailwind
   Color: primary #137fec  |  bg-dark: #101922
   Font: Inter (add to layout.tsx via next/font/google)
───────────────────────────────────────────────────── */

/**
 * Server component fetching data from our internal API.
 * Uses skillsApi from `@/lib/api/skills` so it avoids direct Prisma imports,
 * keeping Prisma logic strictly within API routes.
 */
export default async function ToolboxSection() {
  // Try fetching data based on the API interface
  // Since we run in Server Component side, the API endpoint needs absolute URL (which skillsApi uses)
  let skills = [];
  let groups = [];

  try {
    const [skillsRes, groupsRes] = await Promise.all([
      skillsApi.getAll(),
      skillsApi.getAllGroups(),
    ]);

    if (skillsRes.success) skills = skillsRes.data;
    if (groupsRes.success) groups = groupsRes.data;
  } catch (error) {
    console.error("[ToolboxSection] Error fetching tools:", error);
    // Silent fail, will render empty state gracefully
  }

  // Filter out any unhighlighted tools if desired.
  // Let's assume we display highlighted tools by default, or all if we have a small set.
  // The user prompt mentioned "sắp xếp file thư mục hợp lý", we show all by default as before.

  return <ToolboxClient initialSkills={skills} initialGroups={groups} />;
}
