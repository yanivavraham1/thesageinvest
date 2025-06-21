import { cn, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowUpRight } from "lucide-react";
import { Post } from "@/lib/types";

interface PostCardProps {
  post: Post;
  className?: string;
}

export function PostCard2({ post, className }: PostCardProps) {
  return (
    <article className={cn("group", className)}>
      <Link
        href={`/articles/${post.slug}`}
        className={cn(
          "relative block rounded-lg overflow-hidden text-white",
          "aspect-[16/9] sm:aspect-[4/3] lg:aspect-[16/9]",
          "hover:scale-[1.02] transition-all duration-300 ease-out"
        )}
        aria-label={`Read article: ${post.title}`}
      >
        <Image
          src={post.mainImageSrc || "/placeholder.svg?height=400&width=600"}
          alt={post.mainImageAlt || `Cover image for ${post.title}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end">
          <div className="space-y-2 sm:space-y-3">
            {post.categories?.[0]?.name && (
              <Badge className="w-fit bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30">
                {post.categories[0].name}
              </Badge>
            )}

            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold leading-tight line-clamp-2">
              {post.title}
            </h3>

            {post.description && (
              <p className="text-sm sm:text-base text-gray-200 line-clamp-2 leading-relaxed">
                {post.description}
              </p>
            )}

            <div className="flex items-center justify-between pt-2">
              {post.createdAt && (
                <div className="flex items-center text-xs sm:text-sm text-gray-300">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  <time dateTime={post.createdAt.toISOString()}>
                    {formatDate(post.createdAt)}
                  </time>
                </div>
              )}

              <ArrowUpRight className="h-5 w-5 sm:h-6 sm:w-6 text-white/80 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200" />
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
