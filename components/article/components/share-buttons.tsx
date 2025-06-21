"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Linkedin, Copy, Check } from "lucide-react";

interface ShareButtonsProps {
  url?: string;
  title: string;
  description?: string;
}

export function ShareButtons({ url, title, description }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  // Corrected URL assignment
  const shareUrl =
    url && url.trim() !== ""
      ? url
      : typeof window !== "undefined"
      ? window.location.href
      : "";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link: ", err);
    }
  };

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        shareUrl
      )}&text=${encodeURIComponent(title)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}&quote=${encodeURIComponent(description || title)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        shareUrl
      )}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(
        description || ""
      )}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 justify-between border-t border-b border-gray-200 py-4 my-8">
      <span className="text-sm font-medium text-muted-foreground">
        שתף את הפוסט הזה!
      </span>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-9 w-9 transition-colors hover:bg-blue-50 hover:text-blue-600 border-blue-100"
          onClick={shareOnTwitter}
          aria-label="Share on Twitter"
        >
          <Twitter className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-9 w-9 transition-colors hover:bg-blue-50 hover:text-blue-600 border-blue-100"
          onClick={shareOnFacebook}
          aria-label="Share on Facebook"
        >
          <Facebook className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-9 w-9 transition-colors hover:bg-blue-50 hover:text-blue-600 border-blue-100"
          onClick={shareOnLinkedIn}
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-9 w-9 transition-colors hover:bg-blue-50 hover:text-blue-600 border-blue-100"
          onClick={handleCopyLink}
          aria-label={copied ? "Copied" : "Copy link"}
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
