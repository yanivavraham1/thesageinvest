"use client";

import { PostCard } from "../cards/post-card";
import { Post } from "@/lib/types";

export function PostsContainer({ posts }: { posts: Post[] }) {
  return (
    <div className="space-y-6">
      <ul className="list-none grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {posts.map((post) => (
          <li key={post.id} className="col-span-1 ">
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
}
