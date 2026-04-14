/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/projects/[id]/route.ts
import { prisma } from "@/lib/prisma";
import { projectSchema } from "@/lib/validations/project";
import { successResponse, errorResponse } from "@/lib/api-helpers";
import { auth } from "@/lib/api/auth";
import { NextResponse } from "next/server";

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
  try {
    const session = await auth();
    if (!session?.user.id) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 },
      );
    }
    const { id } = await params;
    const body = await req.json();
    const parsed = projectSchema.partial().safeParse(body);
    if (!parsed.success) return errorResponse(parsed.error.message);

    const updateData: any = { ...parsed.data };
    
    // Auto-generate new slug if title is updated
    if (parsed.data.title) {
      const { generateSlug } = await import("@/lib/utils/slug");
      const slugBase = generateSlug(parsed.data.title);
      let slug = slugBase;
      let counter = 1;
      
      // Ensure slug is unique, excluding the current project
      while (await prisma.project.findFirst({ where: { slug, id: { not: id } } })) {
        slug = `${slugBase}-${counter++}`;
      }
      updateData.slug = slug;
    }

    const project = await prisma.project.update({
      where: { id },
      data: updateData,
    });
    return successResponse(project);
  } catch (error: any) {
    return errorResponse(error.message);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();
    if (!session?.user.id) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 },
      );
    }
    const project = await prisma.project.findUnique({
      where: { id: (await params).id },
    });
    if (!project) {
      return NextResponse.json(
        {
          success: false,
          error: "Project not found",
        },
        { status: 404 },
      );
    }
    await prisma.project.delete({
      where: { id: (await params).id },
    });
    return successResponse({ message: "Project deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: `Failed to delete project: ${error}`,
      },
      { status: 500 },
    );
  }
}
