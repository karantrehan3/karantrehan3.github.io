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
  const renderer = new marked.Renderer();

  // Override link renderer to add target="_blank" to all external links
  renderer.link = ({ href, title, text }) => {
    const isExternal =
      href && (href.startsWith("http://") || href.startsWith("https://"));
    const target = isExternal
      ? ' target="_blank" rel="noopener noreferrer"'
      : "";
    const titleAttr = title ? ` title="${title}"` : "";
    return `<a href="${href}"${titleAttr}${target}>${text}</a>`;
  };

  marked.setOptions({
    breaks: true, // Convert line breaks to <br>
    gfm: true, // GitHub Flavored Markdown
    renderer,
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
