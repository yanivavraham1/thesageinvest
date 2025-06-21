import { cn } from "@/lib/utils";

interface HeadingProps {
  text: string;
  id?: string;
  className?: string;
}

export function Heading({ text, id, className }: HeadingProps) {
  // Generate an ID from the text if none is provided
  const headingId = id || text.toLowerCase().replace(/\s+/g, "-");

  return (
    <h2
      id={headingId}
      className={cn(
        "text-3xl font-bold tracking-tight sm:text-4xl mb-6 scroll-m-20 border-b pb-2 text-center",
        className
      )}
    >
      {text}
    </h2>
  );
}
