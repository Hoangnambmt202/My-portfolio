import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/api/auth";
import { z } from "zod";

const commentSchema = z.object({
  content: z
    .string()
    .min(1, "Comment cannot be empty")
    .max(500, "Comment is too long"),
  parentId: z.string().optional().nullable(),
  postId: z.string().optional().nullable(),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");

    const comments = await prisma.comment.findMany({
      where: { 
        parentId: null,
        ...(postId ? { postId } : {}),
      },
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { id: true, name: true, avatar: true } },
        replies: {
          orderBy: { createdAt: "asc" },
          include: {
            user: { select: { id: true, name: true, avatar: true } },
          },
        },
      },
    });
    return NextResponse.json(comments);
  } catch (error) {
    console.error("[COMMENTS_GET]", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please login to comment." },
        { status: 401 },
      );
    }

    const body = await req.json();
    const parsed = commentSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.message },
        { status: 400 },
      );
    }

    const { content, parentId, postId } = parsed.data;

    // Basic anti-spam: 15-second cooldown
    const lastComment = await prisma.comment.findFirst({
      where: { userId: session.user.id as string },
      orderBy: { createdAt: "desc" },
    });

    if (
      lastComment &&
      Date.now() - new Date(lastComment.createdAt).getTime() < 15000
    ) {
      return NextResponse.json(
        { error: "Please wait a moment before commenting again." },
        { status: 429 },
      );
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        userId: session.user.id as string,
        parentId: parentId || null,
        postId: postId || null,
      },
      include: {
        user: { select: { id: true, name: true, avatar: true } },
      },
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error("[COMMENTS_POST]", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 },
    );
  }
}
