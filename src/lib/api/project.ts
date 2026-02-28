// src/lib/api/projects.ts
const BASE = "/api/projects";

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

    const res = await fetch(`${BASE}?${query}`);
    if (!res.ok) throw new Error("Failed to fetch projects");
    return res.json();
  },

  create: async (data: unknown) => {
    const res = await fetch(BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create project");
    return res.json();
  },

  update: async (id: string, data: unknown) => {
    const res = await fetch(`${BASE}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update project");
    return res.json();
  },

  delete: async (id: string) => {
    const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete project");
    return res.json();
  },
};
