import { cn } from "@/lib/utils";

interface ParagraphProps {
  text: string;
  className?: string;
}

export function Paragraph({ text, className }: ParagraphProps) {
  return (
    <p
      className={cn(
        "leading-7 mb-6 text-base md:text-lg text-gray-800 whitespace-pre-line",
        className
      )}
    >
      {text}
    </p>
  );
}
