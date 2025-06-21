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

export function PostCard1({ post, className }: PostCardProps) {
  if (!post) {
    return;
  }

  return (
    <article className={cn("group", className)}>
      <Link
        href={`/articles/${post.slug}`}
        className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg  border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 bg-white"
        aria-label={`Read article: ${post.title}`}
      >
        <div className="relative w-20 sm:w-24  md:w-32  flex-shrink-0 h-auto bg-red-200">
          <Image
            src={post.mainImageSrc || "/placeholder.svg?height=96&width=128"}
            alt={post.mainImageAlt || `Cover image for ${post.title}`}
            fill
            sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, 128px"
            className="object-cover rounded-md group-hover:scale-105 transition-transform duration-200"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col gap-2 flex-1 min-w-0">
          {post.categories?.[0]?.name && (
            <Badge variant="secondary" className="w-fit text-xs">
              {post.categories[0].name}
            </Badge>
          )}

          <h3 className="font-semibold text-sm sm:text-base md:text-lg leading-tight line-clamp-2 group-hover:text-emerald-600 transition-colors">
            {post.title}
          </h3>

          {post.description && (
            <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
              {post.description}
            </p>
          )}

          <div className="flex items-center justify-between mt-auto">
            {post.createdAt && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="h-3 w-3 mr-1 text-emerald-600" />
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
