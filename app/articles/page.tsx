"use client";

import { Post } from "@/lib/types";
import { useEffect, useRef, useState } from "react";

export default function InfinitePostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [cursor, setCursor] = useState<number | null>(null);
  const observerRef = useRef<HTMLDivElement | null>(null);
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
  }, [cursor, loading, hasMore]); // ✅ include missing deps

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && hasMore && !loading) {
        setCursor((prev) => prev); // trigger fetch again
      }
    });

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [hasMore, loading]);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="p-4 border-b">
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p>{post.description}</p>
        </div>
      ))}
      <div ref={observerRef} className="h-10" />
      {loading && <p>Loading...</p>}
    </div>
  );
}
