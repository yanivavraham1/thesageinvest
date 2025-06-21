import { Check, ChevronRight, TrendingUp } from "lucide-react";
import { SubHeading } from "../typography/sub-heading";

interface ListProps {
  listArray?: []; // Optional prop for listArray
  caption?: string; // Optional prop for caption
  decoration?: "dots" | "numbers" | "none" | "checkmarks" | "arrows" | "trends"; // Decoration style
  className?: string; // Additional class names
}

export function List({
  listArray = [],
  caption,
  decoration = "none",
  className = "",
}: ListProps) {
  // Determine list style based on decoration prop
  const getListStyle = () => {
    switch (decoration) {
      case "dots":
        return "list-disc";
      case "numbers":
        return "list-decimal";
      case "none":
        return "list-none";
      default:
        return "list-disc";
    }
  };

  // Get the appropriate icon for custom decorations
  const getIcon = (decoration: string) => {
    switch (decoration) {
      case "checkmarks":
        return (
          <Check className="inline-block mr-2 h-4 w-4 text-emerald-500 flex-shrink-0" />
        );
      case "arrows":
        return (
          <ChevronRight className="inline-block mr-2 h-4 w-4 text-blue-600 flex-shrink-0" />
        );
      case "trends":
        return (
          <TrendingUp className="inline-block mr-2 h-4 w-4 text-green-600 flex-shrink-0" />
        );
      default:
        return null;
    }
  };

  return (
    <div className={`my-6 ${className}`}>
      {caption && <SubHeading text={caption} />}
      <ul
        className={`space-y-3 ${getListStyle()} ml-6`}
        aria-label={caption || "List"}
      >
        {listArray.map((item, index) => (
          <li key={`${item}-${index}`} className="text-base leading-relaxed">
            {(decoration === "checkmarks" ||
              decoration === "arrows" ||
              decoration === "trends") && (
              <p className="inline-flex items-center whitespace-pre-line">
                {getIcon(decoration)}
                <span>{item}</span>
              </p>
            )}
            {decoration !== "checkmarks" &&
              decoration !== "arrows" &&
              decoration !== "trends" &&
              item}
          </li>
        ))}
      </ul>
    </div>
  );
}
