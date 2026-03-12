/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/projects/route.ts
import { prisma } from "@/lib/prisma";
import { projectSchema } from "@/lib/validations/project";
import { NextResponse } from "next/server";
import { auth } from "@/lib/api/auth";
import { generateSlug } from "@/lib/utils/slug";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 10);
    const isFeatured = searchParams.get("isFeatured") === "true";
    const status = searchParams.get("status");

    const where = {
      ...(isFeatured && { isFeatured: true }),
      ...(status && { status: status as any }),
    };

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { order: "asc" },
      }),
      prisma.project.count({ where }),
    ]);
    return NextResponse.json({
      success: true,
      data: { projects, total, page, limit },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await req.json();
    const parsed = projectSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const slugBase = generateSlug(parsed.data.title);

    let slug = slugBase;
    let counter = 1;

    // đảm bảo slug unique
    while (await prisma.project.findUnique({ where: { slug } })) {
      slug = `${slugBase}-${counter++}`;
    }

    const project = await prisma.project.create({
      data: {
        ...parsed.data,
        slug,
        user: {
          connect: { id: session.user.id },
        },
      },
    });

    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create project" },
      { status: 500 },
    );
  }
}
