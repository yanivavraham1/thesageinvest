// app/api/article/route.ts
import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { createPost } from "@/lib/prisma";
import { triggerGitHubAction } from "@/lib/github";

interface PostRequestBody {
  id: string;
  slug: string;
  title: string;
  description?: string;
  authorId: string;
  mainImageSrc?: string;
  mainImageAlt?: string;
  categoriesIds: number[];
  mdxContent: string;
  keywords?: string;
}

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const body: PostRequestBody = await req.json();
    const {
      slug,
      title,
      description,
      authorId,
      mainImageSrc,
      mainImageAlt,
      categoriesIds,
      mdxContent,
      keywords,
    } = body;

    // Create the post in the database
    const newPost = await createPost(
      slug,
      title,
      description || "",
      parseInt(authorId),
      mainImageSrc || "",
      mainImageAlt || "",
      categoriesIds,
      keywords || ""
    );
    const fullMdxContent = mdxContent;
    if (process.env.NODE_ENV === "production") {
      try {
        await triggerGitHubAction({
          slug,
          title,
          content: fullMdxContent,
        });
        console.log("GitHub Action triggered successfully");
      } catch (githubError) {
        console.error("Error triggering GitHub Action:", githubError);
        // Don't fail the request if GitHub Action fails
      }
    }

    // Only write file in development or if explicitly configured
    if (
      process.env.NODE_ENV === "development" ||
      process.env.ENABLE_FILE_WRITE === "true"
    ) {
      try {
        // Ensure the content directory exists
        const contentDir = path.join(process.cwd(), "public", "content");
        await mkdir(contentDir, { recursive: true });

        // Write the MDX file
        const filePath = path.join(contentDir, `${slug}.mdx`);
        await writeFile(filePath, fullMdxContent, "utf8");

        console.log(`MDX file written to: ${filePath}`);
      } catch (fileError) {
        console.error("Error writing MDX file:", fileError);
        // Don't fail the request if file writing fails
      }
    }

    // For production, you might want to:
    // 1. Store the MDX content in the database
    // 2. Use a GitHub Action to commit the file
    // 3. Use a headless CMS

    return NextResponse.json(
      {
        ...newPost,
        mdxContent: fullMdxContent,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding post:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
