"use client";

import { useState } from "react";
import { ProjectTable } from "@/components/admin/ProjectTable";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { Button } from "@/components/ui/button";

export type Project = {
  id: string;
  title: string;
  description: string;
  status: "ongoing" | "completed";
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([
    { id: "1", title: "Portfolio Website", description: "My personal website", status: "completed" },
    { id: "2", title: "Task Manager App", description: "Vue + Laravel project", status: "ongoing" },
  ]);

  const [showForm, setShowForm] = useState(false);

  const handleAdd = (project: Project) => {
    setProjects([...projects, { ...project, id: Date.now().toString() }]);
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Button onClick={() => setShowForm(true)}>+ Add Project</Button>
      </div>

      <ProjectTable projects={projects} onDelete={handleDelete} />

      {showForm && (
        <div className="mt-6">
          <ProjectForm onSave={handleAdd} onCancel={() => setShowForm(false)} />
        </div>
      )}
    </div>
  );
}
