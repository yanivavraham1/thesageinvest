"use client";

import { PostsContainer } from "@/components/article/components/posts-container";
import { Post } from "@/lib/types";
import { useEffect, useRef, useState } from "react";

export default function InfinitePostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [cursor, setCursor] = useState<number | null>(null);
  const observerRef = useRef<HTMLDivElement | null>(null);

  // Load posts
  useEffect(() => {
    const loadPosts = async () => {
      if (loading || !hasMore) return;

      setLoading(true);
      const url = new URL("/api/articles", window.location.origin);
      if (cursor) url.searchParams.set("cursor", cursor.toString());

      const res = await fetch(url.toString());
      const data = await res.json();
      setPosts((prev) => [...prev, ...data.posts]);
      setCursor(data.nextCursor);
      setHasMore(data.nextCursor !== null);
      setLoading(false);
    };

    loadPosts();
  }, [cursor, hasMore, loading]);

  // Observe bottom div to load more
  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && hasMore && !loading) {
        // 👇 Only trigger next fetch if we actually have a nextCursor
        setCursor((prevCursor) => prevCursor); // Triggers effect if cursor is not null (which it won't change)
      }
    });

    const current = observerRef.current;
    observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [hasMore, loading]);

  return (
    <div>
      <PostsContainer posts={posts} />
      <div ref={observerRef} className="h-10" />
      {loading && <p>Loading...</p>}
    </div>
  );
}
