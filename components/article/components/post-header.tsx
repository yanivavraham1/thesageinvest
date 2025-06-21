import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Post } from "@/lib/types";
import { PostImage } from "./post-image";

interface PostHeaderProps {
  post: Post;
}

export function isValidImage(url: string | null | undefined): boolean {
  // First check if url exists and is not empty
  if (!url || url.trim() === "") {
    return false;
  }

  try {
    // Only attempt to create URL object if we have a string
    const parsedUrl = new URL(url);
    return /\.(jpeg|jpg|gif|png|webp|avif|svg)$/i.test(parsedUrl.pathname);
  } catch (e) {
    // Log errors only in development
    if (process.env.NODE_ENV !== "production") {
      console.log("Invalid image URL:", e);
    }
    return false; // Not a valid URL
  }
}

export function PostHeader({ post }: PostHeaderProps) {
  return (
    <header
      className="space-y-4 mb-6 md:mb-8 text-center"
      aria-labelledby="article-title"
    >
      {post.categories && post.categories.length > 0 && (
        <div
          className="flex flex-wrap gap-2 justify-center"
          aria-label="Article categories"
        >
          {post.categories.map((category) => (
            <Badge
              key={category.name}
              variant="secondary"
              style={{
                backgroundColor: category.bgColor,
                color: category.txtColor,
              }}
            >
              {category.name}
            </Badge>
          ))}
        </div>
      )}
      <h1
        id="article-title"
        className="text-4xl md:text-5xl font-bold  tracking-tight text-center leading-tight"
      >
        {post.title || ""}
      </h1>
      {post.description && (
        <p className="text-lg md:text-xl text-muted-foreground text-center max-w-3xl mx-auto">
          {post.description}
        </p>
      )}
      <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center">
        {post.author && (
          <div className="flex items-center gap-2">
            <div className="rounded-full border-2 border-background overflow-hidden">
              <Avatar>
                <AvatarImage
                  src={post.author.avatar || ""}
                  width={48}
                  height={48}
                  alt={`${post.author.name}'s profile picture`}
                />
                <AvatarFallback>
                  {post.author.name?.substring(0, 2).toUpperCase() || "IN"}
                </AvatarFallback>
              </Avatar>
            </div>

            <span className="font-medium">{post.author.name}</span>
          </div>
        )}
        <div className="text-muted-foreground flex items-center">
          <span className="hidden sm:inline mx-2" aria-hidden="true">
            •
          </span>
          {post.createdAt && (
            <time dateTime={post.createdAt.toISOString()} className="text-sm">
              {formatDate(post.createdAt)}
            </time>
          )}
        </div>
      </div>
      {isValidImage(post.mainImageSrc) && (
        <div className="relative mt-6 md:mt-8 mb-10 shadow-xl rounded-lg overflow-hidden">
          <PostImage
            image={{
              src: post.mainImageSrc,
              alt: post.mainImageAlt || `Featured image for ${post.title}`,
            }}
          />
        </div>
      )}
    </header>
  );
}
