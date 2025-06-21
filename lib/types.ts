import { Author, Category } from "@prisma/client";

export type Post = {
  slug: string;
  id: number;
  title: string;
  description: string;
  author: Author;
  categories: Category[];
  mainImageSrc: string | null;
  mainImageAlt?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  keywords?: string | null;
};

// This type is used for creating new posts
export type NewPost = {
  id: number;
  title: string;
  description: string;
  author: number;
  categories: number[];
  mainImageSrc: string;
  mainImageAlt?: string;
  createdAt?: Date;
  updatedAt?: Date;
  keywords?: string;
};
