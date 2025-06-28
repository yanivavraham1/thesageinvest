import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const cursor = searchParams.get("cursor");
  const limit = 5;

  const posts = await prisma.post.findMany({
    take: limit + 1, // Fetch one extra to check if there's more
    ...(cursor
      ? {
          skip: 1,
          cursor: { id: parseInt(cursor) },
        }
      : {}),
    orderBy: { createdAt: "desc" },
    include: {
      author: true,
      categories: true,
    },
  });

  let nextCursor: number | null = null;
  if (posts.length > limit) {
    const nextItem = posts.pop();
    nextCursor = nextItem!.id;
  }

  return NextResponse.json({ posts, nextCursor });
}
