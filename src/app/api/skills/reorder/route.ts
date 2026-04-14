// src/app/api/skills/reorder/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/lib/api/auth";

export async function PUT(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { items } = await req.json() as { items: { id: string; order: number }[] };

    await prisma.$transaction(
      items.map(({ id, order }) =>
        prisma.skill.update({ where: { id }, data: { order } })
      )
    );

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to reorder skills" },
      { status: 500 }
    );
  }
}
