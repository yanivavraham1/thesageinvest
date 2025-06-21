// app/posts/page.jsx (Server Component)

import { Metadata } from "next";

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {searchQuery ? `Search results for "${searchQuery}"` : "מאמרים אחרונים"}
      </h1>
    </div>
  );
}

// app/api/posts/route.js (API Route for search)
