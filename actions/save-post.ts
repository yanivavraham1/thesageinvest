"use server";

import { revalidatePath } from "next/cache";
import { slugify } from "@/lib/utils";
import { prisma } from "@/lib/prisma"; // Updated import
import fs from "fs/promises";
import path from "path";

interface SavePostParams {
  title: string;
  description: string;
  keywords?: string;
  authorId: number;
  categoryIds: number[];
  mainImageSrc?: string;
  mainImageAlt?: string;
  content: string;
}

export async function savePost(params: SavePostParams) {
  try {
    const {
      title,
      description,
      keywords,
      authorId,
      categoryIds,
      mainImageSrc,
      mainImageAlt,
      content,
    } = params;

    const slug = slugify(title);

    const existingPost = await prisma.post.findUnique({ where: { slug } });

    const finalSlug = existingPost ? `${slug}-${Date.now()}` : slug;

    const post = await prisma.post.create({
      data: {
        title,
        slug: finalSlug,
        description,
        keywords: keywords || "",
        authorId,
        mainImageSrc: mainImageSrc || "",
        mainImageAlt: mainImageAlt || "",
        categories: {
          connect: categoryIds.map((id) => ({ id })),
        },
      },
      include: {
        author: true,
        categories: true,
      },
    });

    const filePath = path.join(
      process.cwd(),
      "public",
      "content",
      "articles",
      `${finalSlug}.mdx`
    );

    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, content, "utf8");

    revalidatePath("/articles");
    revalidatePath(`/articles/${finalSlug}`);

    return { success: true, post, slug: finalSlug };
  } catch (error) {
    console.error("Error saving post:", error);
    return { success: false, error: (error as Error).message };
  }
}
