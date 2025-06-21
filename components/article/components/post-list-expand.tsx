"use client";

import { cn } from "@/lib/utils";
import { SubHeading } from "../typography/sub-heading";

type ListItem = {
  main: string; // Main text of the list item
  paragraph: string; // Additional paragraph text for the list item
};

interface ExpandListProps {
  listArray?: ListItem[]; // Optional prop for listArray
  caption?: string; // Optional prop for caption
  className?: string; // Additional class names
}

export function ExpandList({
  listArray = [],
  caption,
  className = "",
}: ExpandListProps) {
  return (
    <div className={`my-6 ${cn(className)}`} aria-label="Expandable list">
      {caption && (
        <SubHeading
          text={caption}
          className="mb-4"
          id={caption.toLowerCase().replace(/\s+/g, "-")}
        />
      )}
      <ul className="space-y-4" aria-label={caption || "Expandable list"}>
        {listArray.map((item, index) => (
          <li
            key={`${index}-${item.main}`}
            className="rounded-lg overflow-hidden "
          >
            <h3 className="font-bold text-lg">{item.main}</h3>
            <p className="whitespace-pre-line">{item.paragraph}</p>{" "}
          </li>
        ))}
      </ul>
    </div>
  );
}
