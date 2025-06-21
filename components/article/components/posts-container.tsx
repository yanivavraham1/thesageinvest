"use client";

import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PostCard } from "../cards/post-card";
import { Post } from "@/lib/types";

export function PostsContainer({ posts }: { posts: Post[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Early return with debug info if no posts

  // Calculate total number of pages
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Generate page numbers
  const pageNumbers: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Determine which page numbers to show
  const getVisiblePageNumbers = () => {
    if (totalPages <= 5) {
      return pageNumbers;
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5];
    }

    if (currentPage >= totalPages - 2) {
      return [
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
    ];
  };

  console.log("Rendering PostsContainer with", posts.length, "posts");

  return (
    <div className="space-y-6">
      {currentPosts.length === 0 || !currentPosts ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">לא נמצאו מאמרים.</p>
          <p className="mt-2 text-gray-500">אנא בדוק שוב מאוחר יותר.</p>
        </div>
      ) : (
        currentPosts.map((post) => (
          <PostCard key={post.id} post={post as Post} />
        ))
      )}

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) paginate(currentPage - 1);
                }}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
                aria-disabled={currentPage === 1}
              />
            </PaginationItem>

            {getVisiblePageNumbers().map((number) => (
              <PaginationItem key={number}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    paginate(number);
                  }}
                  isActive={currentPage === number}
                >
                  {number}
                </PaginationLink>
              </PaginationItem>
            ))}

            {totalPages > 5 && currentPage < totalPages - 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) paginate(currentPage + 1);
                }}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
                aria-disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <div className="text-sm text-gray-500 text-center">
        מוצגים {indexOfFirstPost + 1}-{Math.min(indexOfLastPost, posts.length)}{" "}
        מתוך {posts.length} מאמרים
      </div>
    </div>
  );
}
