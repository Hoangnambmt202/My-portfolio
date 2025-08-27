import { client } from "@/lib/sanity/sanity";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const result = await client.create({
    _type: "post",
    ...data,
  });
  return NextResponse.json(result);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  const result = await client.delete(id);
  return NextResponse.json(result);
}
