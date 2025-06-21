import { cn } from "@/lib/utils";

interface SubHeadingProps {
  text: string;
  id?: string;
  className?: string;
}

export function SubHeading({ text, id, className }: SubHeadingProps) {
  // Generate an ID from the text if none is provided
  const headingId = id || text.toLowerCase().replace(/\s+/g, "-");

  return (
    <h3
      id={headingId}
      className={cn(
        "text-2xl font-semibold tracking-tight mb-4 scroll-m-20 mt-10 text-gray-900 underline-offset-2 underline decoration-2",
        className
      )}
    >
      {text}
    </h3>
  );
}
