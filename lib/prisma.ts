import { Post, PrismaClient } from "@prisma/client";

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

export async function getPosts(amount: number) {
  const posts = await prisma.post.findMany({
    take: amount,
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
  id: number,
  slug: string,
  title: string,
  description: string,
  authorId: number,
  mainImageSrc: string,
  mainImageAlt: string,
  categoriesIds: number[]
): Promise<Post> {
  return await prisma.post.create({
    data: {
      id,
      slug,
      title,
      description,
      authorId,
      mainImageSrc,
      mainImageAlt,

      categories: {
        connect: categoriesIds.map((categoryId) => ({ id: categoryId })),
      },
    },
  });
}
