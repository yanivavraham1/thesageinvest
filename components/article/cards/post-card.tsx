"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, User, ArrowLeft } from "lucide-react";
import { Post } from "@/lib/types";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/articles/${post.slug}`} passHref>
      <Card className="group h-full overflow-hidden p-0  hover:border-emerald-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="relative h-56 overflow-hidden">
          <Image
            src={post.mainImageSrc || "/images/placeholder.jpg"}
            alt={post.mainImageAlt || post.title || "תמונת מאמר"}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110 "
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex flex-wrap gap-2">
              {post.categories?.map((category) => (
                <Badge
                  key={category.id}
                  variant="secondary"
                  className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <CardContent className="p-6 ">
          <h2 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-emerald-600 transition-colors">
            {post.title}
          </h2>
          <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
            {post.description}
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4 mr-1 text-emerald-600" />
              <span className="font-medium">{post.author?.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 mr-1 text-emerald-600" />
              {post.createdAt && (
                <time dateTime={post.createdAt.toISOString()}>
                  {formatDate(post.createdAt)}
                </time>
              )}
            </div>
          </div>
          <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center text-emerald-600 font-medium">
              קרא עוד
              <ArrowLeft className="h-4 w-4 mr-1" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
