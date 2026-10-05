
import DOMPurify from "dompurify";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface Props
  extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "children" | "dangerouslySetInnerHTML"
  > {
  content: string;
}

export default function RichTextRenderer({
  content,
  className,
  ...props
}: Props) {
  const sanitizedContent = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: [
      "p",
      "strong",
      "em",
      "b",
      "i",
      "a",
      "ul",
      "ol",
      "li",
      "br",
    ],
    ALLOWED_ATTR: ["href", "title"],
  });

  return (
    <div
      {...props}
      className={cn(
        // Base typography
        "text-sm leading-7 text-gray-500 sm:text-base",

        // Paragraph spacing
        "[&_p]:mb-3",
        "[&_p:last-child]:mb-0",

        // Lists
        "[&_ul]:my-3",
        "[&_ul]:list-disc",
        "[&_ul]:space-y-1",
        "[&_ul]:pl-6",

        "[&_ol]:my-3",
        "[&_ol]:list-decimal",
        "[&_ol]:space-y-1",
        "[&_ol]:pl-6",

        "[&_li]:pl-1",
        "[&_li]:leading-7",
        "[&_li]:marker:text-black",

        // Bold and italic
        "[&_strong]:font-semibold",
        "[&_strong]:text-gray-800",
        "[&_em]:italic",

        // Links
        "[&_a]:font-medium",
        "[&_a]:text-orange-600",
        "[&_a]:underline",
        "[&_a]:underline-offset-4",
        "[&_a]:transition-colors",
        "[&_a:hover]:text-orange-700",
        "[&_a:focus-visible]:rounded-sm",
        "[&_a:focus-visible]:outline-2",
        "[&_a:focus-visible]:outline-orange-500",

        className
      )}
      dangerouslySetInnerHTML={{
        __html: sanitizedContent,
      }}
    />
  );
}
