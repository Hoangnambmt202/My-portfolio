// src/lib/api-helpers.ts
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export function successResponse(data: unknown, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function errorResponse(message: string, status = 400) {
  return NextResponse.json({ success: false, error: message }, { status });
}

export async function requireAuth() {
  const session = await auth();
  if (!session?.user) {
    return { session: null, error: errorResponse("Unauthorized", 401) };
  }
  return { session, error: null };
}
