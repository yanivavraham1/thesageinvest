// app/posts/page.jsx (Server Component)
import { Suspense } from "react";
import { searchPosts } from "@/lib/prisma";
import { PostsContainer } from "@/components/article/components/posts-container";
import { SearchPostsWrapper } from "@/components/article/components/search-post";
import { Metadata } from "next";
import { Post } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "מאמרים",
};

// This is a server component that can fetch data
export default async function PostsPage({
  searchParams,
}: {
  searchParams?: Promise<{ search?: string }>;
}) {
  const searchParamsResolved = await searchParams;
  const searchQuery = searchParamsResolved?.search || "";
  const posts = await searchPosts({
    searchFilter: searchQuery,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {searchQuery ? `Search results for "${searchQuery}"` : "מאמרים אחרונים"}
      </h1>

      <SearchPostsWrapper initialQuery={searchQuery} />

      <Suspense
        fallback={<div className="text-center py-10">Loading posts...</div>}
      >
        <PostsContainer posts={posts as Post[]} />
      </Suspense>
    </div>
  );
}

// app/api/posts/route.js (API Route for search)
