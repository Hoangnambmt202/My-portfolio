// src/app/api/skill-groups/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/lib/api/auth";

function generateSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export async function GET() {
  try {
    const groups = await prisma.skillGroup.findMany({
      orderBy: { order: "asc" },
      include: { _count: { select: { skills: true } } },
    });
    return NextResponse.json({ success: true, data: groups });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch skill groups" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { name, description, color, icon } = body;

    if (!name) {
      return NextResponse.json(
        { success: false, error: "Name is required" },
        { status: 400 }
      );
    }

    // Ensure unique slug
    const slugBase = generateSlug(name);
    let slug = slugBase;
    let counter = 1;
    while (await prisma.skillGroup.findUnique({ where: { slug } })) {
      slug = `${slugBase}-${counter++}`;
    }

    const maxOrder = await prisma.skillGroup.aggregate({ _max: { order: true } });
    const order = (maxOrder._max.order ?? 0) + 1;

    const group = await prisma.skillGroup.create({
      data: { name, slug, description, color: color || "#3b82f6", icon, order },
      include: { _count: { select: { skills: true } } },
    });

    return NextResponse.json({ success: true, data: group }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/skill-groups]", error);
    return NextResponse.json(
      { success: false, error: "Failed to create skill group" },
      { status: 500 }
    );
  }
}
