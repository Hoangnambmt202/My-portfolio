// src/app/api/projects/[id]/route.ts
import { prisma } from "@/lib/prisma";
import { projectSchema } from "@/lib/validations/project";
import { successResponse, errorResponse, requireAuth } from "@/lib/api-helpers";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) return errorResponse("Project not found", 404);
  return successResponse(project);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { error } = await requireAuth();
  if (error) return error;

  const { id } = await params;
  const body = await req.json();
  const parsed = projectSchema.partial().safeParse(body);
  if (!parsed.success) return errorResponse(parsed.error.message);

  const project = await prisma.project.update({
    where: { id },
    data: parsed.data,
  });
  return successResponse(project);
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { error } = await requireAuth();
  if (error) return error;

  const { id } = await params;
  await prisma.project.delete({ where: { id } });
  return successResponse({ message: "Deleted successfully" });
}
