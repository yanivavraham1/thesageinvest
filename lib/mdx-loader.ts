// lib/mdx-loader.ts
import { readFile } from "fs/promises";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";

export async function getPostMDX(slug: string) {
  try {
    // Path to your MDX file
    const filePath = path.join(
      process.cwd(),
      "public",
      "content",
      "articles",
      `${slug}.mdx`
    );

    // Read the MDX file
    const source = await readFile(filePath, "utf8");

    // Compile the MDX source
    const { content, frontmatter } = await compileMDX({
      source,
      options: {
        parseFrontmatter: true,
      },
    });

    return {
      mdxSource: source,
      content,
      frontmatter,
    };
  } catch (error) {
    console.error("Error loading MDX file:", error);
    throw new Error(`Failed to load MDX file for slug: ${slug}`);
  }
}

// Alternative simpler version if you don't need frontmatter parsing
export async function getPostMDXSimple(slug: string) {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "content",
      "articles",
      `${slug}.mdx`
    );
    const mdxSource = await readFile(filePath, "utf8");

    return { mdxSource };
  } catch (error) {
    console.error("Error loading MDX file:", error);
    throw new Error(`Failed to load MDX file for slug: ${slug}`);
  }
}
