import { ReactElement } from "react";
import { marked } from "marked";

import classes from "./MarkdownRenderer.module.css";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({
  content,
  className,
}: MarkdownRendererProps): ReactElement {
  // Configure marked options for security and customization
  marked.setOptions({
    breaks: true, // Convert line breaks to <br>
    gfm: true, // GitHub Flavored Markdown
  });

  // Convert markdown to HTML
  const htmlContent = marked(content);

  return (
    <div
      className={`${classes.markdown} ${className || ""}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
