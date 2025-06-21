import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { Clock, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Post } from "@/lib/types";

interface PostCardProps {
  post: Post;
  className?: string;
}

export function PostCard3({ post, className }: PostCardProps) {
  return (
    <article className={cn("group h-full", className)}>
      <Link
        href={`/articles/${post.slug}`}
        className="flex flex-col h-full bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-gray-300 hover:shadow-lg transition-all duration-300"
        aria-label={`Read article: ${post.title}`}
      >
        <div className="relative w-full h-48 sm:h-52 lg:h-48 overflow-hidden rounded-b-3xl">
          <Image
            src={post.mainImageSrc || "/placeholder.svg?height=200&width=400"}
            alt={post.mainImageAlt || `Cover image for ${post.title}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />

          {post.categories?.[0]?.name && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-white/90 text-gray-900 hover:bg-white">
                {post.categories[0].name}
              </Badge>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 p-4 sm:p-5 flex-1">
          <h3 className="text-lg sm:text-xl font-semibold leading-tight line-clamp-2 group-hover:text-emerald-600 transition-colors">
            {post.title}
          </h3>

          <div className="flex items-center justify-between mt-auto pt-2">
            {post.createdAt && (
              <div className="flex  gap-1 items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-2 text-emerald-600" />
                <time dateTime={post.createdAt.toISOString()}>
                  {formatDate(post.createdAt)}
                </time>
              </div>
            )}

            <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all duration-200" />
          </div>
        </div>
      </Link>
    </article>
  );
}
