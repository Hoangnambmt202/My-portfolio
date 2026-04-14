/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/experiences/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/lib/api/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      // Optional: You might want to allow public GET, but if it's strictly admin or specific user:
      // return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const experiences = await prisma.experience.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ success: true, data: experiences });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
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

    // Verify user exists in DB (to prevent foreign key constraint error if session is stale)
    const userExists = await prisma.user.findUnique({
      where: { id: session.user.id },
    });
    if (!userExists) {
      return NextResponse.json(
        {
          success: false,
          error: "User session is stale. Please logout and login again.",
        },
        { status: 401 },
      );
    }

    const body = await req.json();
    // Exclude system fields from body to avoid conflicts
    const {
      id: _id,
      userId: _userId,
      createdAt: _c,
      updatedAt: _u,
      ...safeData
    } = body;

    // Check last order and set new experience to the top (-1 from min)
    const minOrder = await prisma.experience.aggregate({
      _min: { order: true },
    });
    const newOrder = (minOrder._min.order ?? 0) - 1;

    const experience = await prisma.experience.create({
      data: {
        ...safeData,
        userId: session.user.id,
        order: newOrder,
        startDate: body.startDate ? new Date(body.startDate) : undefined,
        endDate: body.endDate ? new Date(body.endDate) : null,
      },
    });

    return NextResponse.json(
      { success: true, data: experience },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("XP POST Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
