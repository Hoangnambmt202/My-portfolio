// src/lib/api/projects.ts
const BASE = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const BASE_URL = `${BASE}/api/projects`;

export const projectsApi = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    featured?: boolean;
    status?: string;
  }) => {
    const query = new URLSearchParams();
    if (params?.page) query.set("page", String(params.page));
    if (params?.limit) query.set("limit", String(params.limit));
    if (params?.featured) query.set("featured", "true");
    if (params?.status) query.set("status", params.status);

    const res = await fetch(`${BASE_URL}?${query}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch projects");
    return res.json();
  },

  create: async (data: unknown) => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to create project");
    return res.json();
  },

  update: async (id: string, data: unknown) => {
    const res = await fetch(`${BASE}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to update project");
    return res.json();
  },

  delete: async (id: string) => {
    const res = await fetch(`${BASE}/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to delete project");
    return res.json();
  },
};
