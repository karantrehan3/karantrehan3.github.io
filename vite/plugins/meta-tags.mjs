import { readFileSync } from "fs";
import { resolve } from "path";

import { calculateYearsOfExperience } from "../utils/date-helpers.mjs";

/**
 * Vite plugin to inject meta tags into index.html at build time
 * This ensures social media crawlers (WhatsApp, Facebook, Twitter) can read the meta tags
 */
export function metaTagsPlugin() {
  return {
    name: "meta-tags-plugin",
    transformIndexHtml(html) {
      try {
        // Read config at build time
        const configPath = resolve(process.cwd(), "config/default.json");
        const config = JSON.parse(readFileSync(configPath, "utf-8"));

        const title = config.META?.TITLE || "";
        const descriptionTemplate = config.META?.DESCRIPTION_TEMPLATE || "";
        const startDate = config.ABOUT?.EXPERIENCE_SUMMARY?.START_DATE;

        // Calculate years of experience
        let description = descriptionTemplate;
        if (descriptionTemplate && startDate) {
          const years = calculateYearsOfExperience(startDate);
          description = descriptionTemplate.replace("{YEARS}", years);
        }

        // Base URL for social media previews
        const baseUrl = "https://karantrehan3.github.io";
        const imageUrl = `${baseUrl}/assets/dp/profile.webp`;

        // Escape HTML entities in description
        const escapeHtml = (str) => {
          return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
        };

        const escapedDescription = escapeHtml(description);
        const escapedTitle = escapeHtml(title);

        // Build meta tags HTML
        const metaTags = `
    <title>${escapedTitle}</title>
    <meta name="description" content="${escapedDescription}" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${baseUrl}/" />
    <meta property="og:title" content="${escapedTitle}" />
    <meta property="og:description" content="${escapedDescription}" />
    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:site_name" content="${escapedTitle}" />
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${baseUrl}/" />
    <meta name="twitter:title" content="${escapedTitle}" />
    <meta name="twitter:description" content="${escapedDescription}" />
    <meta name="twitter:image" content="${imageUrl}" />
    
    <!-- Additional meta tags -->
    <meta name="author" content="${escapedTitle}" />
    <meta name="theme-color" content="#000000" />
`;

        // Replace the meta tags comment or insert before </head>
        if (
          html.includes("<!-- Note: Title and description are set dynamically")
        ) {
          return html.replace(
            /<!-- Note: Title and description are set dynamically from config\/default.json via App.tsx -->/,
            metaTags.trim()
          );
        }

        return html.replace("</head>", `${metaTags.trim()}\n  </head>`);
      } catch (error) {
        console.warn("Failed to inject meta tags:", error);
        return html;
      }
    },
  };
}
