"use client";

import { PostCard } from "@/components/article/cards/post-card";
import { Post } from "@/lib/types";
import { useEffect, useRef, useState } from "react";

export default function InfinitePostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [cursor, setCursor] = useState<number | null>(null);
  const observerRef = useRef<HTMLDivElement | null>(null);

  // Load posts when cursor changes
  useEffect(() => {
    const loadPosts = async () => {
      if (loading || !hasMore) return;

      setLoading(true);
      const url = new URL("/api/articles", window.location.origin);
      if (cursor !== null) {
        url.searchParams.set("cursor", cursor.toString());
      }

      const res = await fetch(url.toString());
      const data = await res.json();

      setPosts((prev) => [...prev, ...data.posts]);
      setCursor(data.nextCursor);
      setHasMore(data.nextCursor !== null);
      setLoading(false);
    };

    loadPosts();
  }, [cursor, hasMore, loading]); // safe to include

  // Observe bottom ref and trigger cursor update
  useEffect(() => {
    const current = observerRef.current;
    if (!current) return;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && hasMore && !loading) {
        setCursor((prev) => (prev === null ? 0 : prev));
      }
    });

    observer.observe(current);

    return () => {
      observer.disconnect(); // safer cleanup
    };
  }, [hasMore, loading]); // ✅ include both as dependencies

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post as Post} />
      ))}
      <div ref={observerRef} className="h-10" />
      {loading && (
        <p className="text-center text-sm text-gray-500 py-4">טוען עוד...</p>
      )}
    </div>
  );
}
