// src/app/api/skills/[id]/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/lib/api/auth";
import { uploadImage, deleteImage } from "@/lib/cloudinary";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const skill = await prisma.skill.findUnique({
      where: { id },
      include: { group: true },
    });
    if (!skill) {
      return NextResponse.json(
        { success: false, error: "Skill not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: skill });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch skill" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const existing = await prisma.skill.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Skill not found" },
        { status: 404 }
      );
    }

    const formData = await req.formData();
    const name = (formData.get("name") as string) || existing.name;
    const groupId = formData.has("groupId")
      ? (formData.get("groupId") as string) || null
      : existing.groupId;
    const proficiency = formData.has("proficiency")
      ? parseInt(formData.get("proficiency") as string)
      : existing.proficiency;
    const level = (formData.get("level") as string) || existing.level;
    const whenToUse = formData.has("whenToUse")
      ? (formData.get("whenToUse") as string) || null
      : existing.whenToUse;
    const whyItMatters = formData.has("whyItMatters")
      ? (formData.get("whyItMatters") as string) || null
      : existing.whyItMatters;
    const isHighlighted = formData.has("isHighlighted")
      ? formData.get("isHighlighted") === "true"
      : existing.isHighlighted;
    const iconFile = formData.get("icon") as File | null;

    let iconUrl = existing.iconUrl;
    let iconPublicId = existing.iconPublicId;

    if (iconFile && iconFile.size > 0) {
      // Delete old icon from Cloudinary
      if (existing.iconPublicId) {
        await deleteImage(existing.iconPublicId);
      }
      const buffer = await iconFile.arrayBuffer();
      const base64 = `data:${iconFile.type};base64,${Buffer.from(buffer).toString("base64")}`;
      const uploaded = await uploadImage(base64, "portfolio/skills");
      iconUrl = uploaded.url;
      iconPublicId = uploaded.publicId;
    }

    const skill = await prisma.skill.update({
      where: { id },
      data: {
        name,
        iconUrl,
        iconPublicId,
        proficiency,
        level,
        whenToUse,
        whyItMatters,
        isHighlighted,
        groupId,
      },
      include: { group: true },
    });

    return NextResponse.json({ success: true, data: skill });
  } catch (error) {
    console.error("[PUT /api/skills/[id]]", error);
    return NextResponse.json(
      { success: false, error: "Failed to update skill" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const skill = await prisma.skill.findUnique({ where: { id } });
    if (!skill) {
      return NextResponse.json(
        { success: false, error: "Skill not found" },
        { status: 404 }
      );
    }

    if (skill.iconPublicId) {
      await deleteImage(skill.iconPublicId);
    }

    await prisma.skill.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to delete skill" },
      { status: 500 }
    );
  }
}
