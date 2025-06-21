// components/search-post.jsx
"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Client component for search input
export function SearchPosts({ initialQuery = "" }) {
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const placeholder = "";
  useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Update URL with search query
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set("search", query);
    } else {
      params.delete("search");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative m-3">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 sm:pl-4 pointer-events-none">
        <Search
          className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground"
          aria-hidden="true"
        />
      </div>

      <Input
        type="search"
        id="search-posts"
        name="search"
        value={searchQuery}
        onChange={handleChange}
        placeholder={placeholder}
        className={cn(
          "pl-10 sm:pl-12 pr-4 py-2 sm:py-3 md:py-6",
          "text-base sm:text-lg md:text-xl rounded-full w-full",
          "placeholder:text-muted-foreground/70",
          "bg-white"
        )}
        aria-label="Search posts by title or subtitle"
      />
    </div>
  );
}

// Server component wrapper
export function SearchPostsWrapper({ initialQuery }: { initialQuery: string }) {
  return <SearchPosts initialQuery={initialQuery} />;
}
