import { createPost } from "@/lib/prisma";
import { JsonValue } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

interface PostRequestBody {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  authorId: string;
  mainImageSrc: string;
  mainImageAlt: string;
  mainImageCaption: string;
  content: JsonValue;
  categoriesIds: number[];
}

export async function POST(req: Request): Promise<Response> {
  try {
    const body: PostRequestBody = await req.json();
    const {
      id,
      slug,
      title,
      subtitle,
      authorId,
      mainImageSrc,
      mainImageAlt,
      categoriesIds,
    } = body;
    const newPost = await createPost(
      id,
      slug,
      title,
      subtitle,
      parseInt(authorId),
      mainImageSrc,
      mainImageAlt,
      categoriesIds
    );
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Error adding post:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
