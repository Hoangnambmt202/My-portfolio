/* eslint-disable @typescript-eslint/no-explicit-any */
// src/hooks/useProjects.ts

import { useState, useEffect, useCallback } from "react";
import { Project } from "@/lib/types";
import { ProjectInput } from "@/lib/validations/project";
import { projectsApi } from "@/lib/api/project";
interface UseProjectsParams {
  page?: number;
  limit?: number;
  featured?: boolean;
  status?: string;
}

export function useProjects(params?: UseProjectsParams) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await projectsApi.getAll(params);
      setProjects(res.data.projects);
      setTotal(res.data.total);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [params?.page, params?.limit, params?.featured, params?.status]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const createProject = async (data: ProjectInput) => {
    const res = await projectsApi.create(data);
    setProjects((prev) => [...prev, res.data]);
    return res.data;
  };

  const updateProject = async (id: string, data: Partial<ProjectInput>) => {
    const res = await projectsApi.update(id, data);
    setProjects((prev) => prev.map((p) => (p.id === id ? res.data : p)));
    return res.data;
  };

  const deleteProject = async (id: string) => {
    await projectsApi.delete(id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return {
    projects,
    total,
    loading,
    error,
    refetch: fetchProjects,
    createProject,
    updateProject,
    deleteProject,
  };
}
