// src/app/api/skills/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/lib/api/auth";
import { uploadImage } from "@/lib/cloudinary";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const groupId = searchParams.get("groupId");
    const search = searchParams.get("search");

    const where = {
      ...(groupId && { groupId }),
      ...(search && {
        name: { contains: search, mode: "insensitive" as const },
      }),
    };

    const skills = await prisma.skill.findMany({
      where,
      include: { group: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });

    return NextResponse.json({ success: true, data: skills });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch skills" },
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

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const groupId = formData.get("groupId") as string | null;
    const proficiency = parseInt((formData.get("proficiency") as string) || "75");
    const level = (formData.get("level") as string) || "Intermediate";
    const whenToUse = (formData.get("whenToUse") as string) || null;
    const whyItMatters = (formData.get("whyItMatters") as string) || null;
    const isHighlighted = formData.get("isHighlighted") === "true";
    const iconFile = formData.get("icon") as File | null;

    if (!name) {
      return NextResponse.json(
        { success: false, error: "Name is required" },
        { status: 400 }
      );
    }

    let iconUrl: string | null = null;
    let iconPublicId: string | null = null;

    if (iconFile && iconFile.size > 0) {
      const buffer = await iconFile.arrayBuffer();
      const base64 = `data:${iconFile.type};base64,${Buffer.from(buffer).toString("base64")}`;
      const uploaded = await uploadImage(base64, "portfolio/skills");
      iconUrl = uploaded.url;
      iconPublicId = uploaded.publicId;
    }

    const skill = await prisma.skill.create({
      data: {
        name,
        iconUrl,
        iconPublicId,
        proficiency,
        level,
        whenToUse,
        whyItMatters,
        isHighlighted,
        groupId: groupId || null,
        userId: session.user.id,
      },
      include: { group: true },
    });

    return NextResponse.json({ success: true, data: skill }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/skills]", error);
    return NextResponse.json(
      { success: false, error: "Failed to create skill" },
      { status: 500 }
    );
  }
}
