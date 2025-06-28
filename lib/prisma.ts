import { PrismaClient } from "@prisma/client";
import { Post } from "./types";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function getPostBySlug(slug: string) {
  return await prisma.post.findUnique({
    where: { slug },
    include: {
      categories: {
        select: {
          name: true,
          bgColor: true,
          txtColor: true,
        },
      },
      author: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });
}

export async function getPosts(amount?: number) {
  const posts = await prisma.post.findMany({
    ...(amount && { take: amount }),
    orderBy: {
      createdAt: "desc",
    },
    include: {
      categories: true,
      author: true,
    },
  });

  return posts;
}

export async function getAuthors() {
  return await prisma.author.findMany({
    select: {
      id: true,
      name: true,
      avatar: true,
    },
  });
}

export async function getCategories() {
  return await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      bgColor: true,
      txtColor: true,
    },
  });
}
export async function getPostsByCategory(categoryId: number) {
  return await prisma.post.findMany({
    where: {
      categories: {
        some: {
          id: categoryId,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      categories: {
        select: {
          id: true,
          name: true,
          bgColor: true,
          txtColor: true,
        },
      },
      author: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });
}
export async function getPostsByCategories(categoryIds: number[]) {
  return await prisma.post.findMany({
    where: {
      categories: {
        some: {
          id: {
            in: categoryIds,
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      categories: {
        select: {
          id: true,
          name: true,
          bgColor: true,
          txtColor: true,
        },
      },
      author: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });
}
export async function createPost(
  slug: string,
  title: string,
  description: string,
  authorId: number,
  mainImageSrc: string,
  mainImageAlt: string,
  categoriesIds: number[],
  keywords: string
): Promise<Post> {
  return await prisma.post.create({
    data: {
      slug,
      title,
      description,
      authorId,
      mainImageSrc,
      mainImageAlt,
      keywords,
      categories: {
        connect: categoriesIds.map((categoryId) => ({ id: categoryId })),
      },
    },
    include: {
      author: true,
      categories: true,
    },
  });
}
/**
 * Search posts with infinite scroll (cursor-based pagination)
 * @param {Object} params - Search parameters
 * @param {string} params.query - Search query string
 * @param {number} params.cursor - Cursor for pagination (post ID to start after)
 * @param {number} params.limit - Number of results to fetch (default: 8)
 * @param {string} params.sortBy - Sort field: 'relevance', 'date', 'title' (default: 'relevance')
 * @param {string} params.sortOrder - Sort order: 'asc', 'desc' (default: 'desc')
 * @param {number[]} params.categoryIds - Optional array of category IDs to filter by
 * @param {number} params.authorId - Optional author ID to filter by
 * @param {Date} params.dateFrom - Optional start date filter
 * @param {Date} params.dateTo - Optional end date filter
 * @returns {Object} Search results with infinite scroll metadata
 */
