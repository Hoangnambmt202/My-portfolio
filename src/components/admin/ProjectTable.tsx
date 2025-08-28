import { Project } from "@/app/admin/(pages)/projects/page";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table"; // <-- import table UI bạn viết

export function ProjectTable({
  projects,
  onDelete,
}: {
  projects: Project[];
  onDelete: (id: string) => void;
}) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader>Title</TableHeader>
          <TableHeader>Description</TableHeader>
          <TableHeader>Status</TableHeader>
          <TableHeader>Actions</TableHeader>
        </TableRow>
      </TableHead>
      <tbody>
        {projects.map((project) => (
          <TableRow key={project.id}>
            <TableCell className="font-medium">{project.title}</TableCell>
            <TableCell>{project.description}</TableCell>
            <TableCell>
              <span
                className={`px-2 py-1 rounded text-sm ${
                  project.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {project.status}
              </span>
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => onDelete(project.id)}
                >
                  Delete
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
}
