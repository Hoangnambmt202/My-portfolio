// src/lib/api/skills.ts

const BASE = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const SKILLS_URL = `${BASE}/api/skills`;
const GROUPS_URL = `${BASE}/api/skill-groups`;

export const skillsApi = {
  // --- Skills ---
  getAll: async (params?: { groupId?: string; search?: string }) => {
    const q = new URLSearchParams();
    if (params?.groupId) q.set("groupId", params.groupId);
    if (params?.search) q.set("search", params.search);
    const res = await fetch(`${SKILLS_URL}?${q}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch skills");
    return res.json();
  },

  create: async (data: FormData) => {
    const res = await fetch(SKILLS_URL, {
      method: "POST",
      body: data,
      credentials: "include",
    });
    const json = await res.json();
    if (!res.ok) throw json;
    return json;
  },

  update: async (id: string, data: FormData) => {
    const res = await fetch(`${SKILLS_URL}/${id}`, {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    const json = await res.json();
    if (!res.ok) throw json;
    return json;
  },

  delete: async (id: string) => {
    const res = await fetch(`${SKILLS_URL}/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const json = await res.json();
    if (!res.ok) throw json;
    return json;
  },

  reorder: async (items: { id: string; order: number }[]) => {
    const res = await fetch(`${SKILLS_URL}/reorder`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
      credentials: "include",
    });
    const json = await res.json();
    if (!res.ok) throw json;
    return json;
  },

  // --- Skill Groups ---
  getAllGroups: async () => {
    const res = await fetch(`${GROUPS_URL}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch skill groups");
    return res.json();
  },

  createGroup: async (data: {
    name: string;
    description?: string;
    color?: string;
    icon?: string;
  }) => {
    const res = await fetch(GROUPS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });
    const json = await res.json();
    if (!res.ok) throw json;
    return json;
  },

  updateGroup: async (
    id: string,
    data: { name?: string; description?: string; color?: string; icon?: string }
  ) => {
    const res = await fetch(`${GROUPS_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });
    const json = await res.json();
    if (!res.ok) throw json;
    return json;
  },

  deleteGroup: async (id: string) => {
    const res = await fetch(`${GROUPS_URL}/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const json = await res.json();
    if (!res.ok) throw json;
    return json;
  },

  reorderGroups: async (items: { id: string; order: number }[]) => {
    const res = await fetch(`${GROUPS_URL}/reorder`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
      credentials: "include",
    });
    const json = await res.json();
    if (!res.ok) throw json;
    return json;
  },
};
