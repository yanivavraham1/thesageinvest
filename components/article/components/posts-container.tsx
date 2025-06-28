"use client";

import { PostCard } from "../cards/post-card";
import { Post } from "@/lib/types";

export function PostsContainer({ posts }: { posts: Post[] }) {
  return (
    <div className="space-y-6">
      <ul className="list-none">
        {posts.map((post) => (
          <li key={post.id}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
}
