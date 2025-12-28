import { readFileSync } from "fs";
import { resolve } from "path";

/**
 * Vite plugin to inject Google Analytics 4 script into index.html at build time
 * Reads the measurement ID from config/default.json
 *
 * GDPR Compliance:
 * - Sets default consent to "denied" for analytics_storage
 * - Analytics only activates when user grants consent via CookieConsent component
 * - User consent is stored in localStorage and persists across sessions
 */
export function analyticsPlugin() {
  return {
    name: "analytics-plugin",
    transformIndexHtml(html) {
      try {
        // Read config at build time
        const configPath = resolve(process.cwd(), "config/default.json");
        const config = JSON.parse(readFileSync(configPath, "utf-8"));

        const ga4MeasurementId = config.ANALYTICS?.GA4_MEASUREMENT_ID || "";

        // Skip if no measurement ID is configured
        if (!ga4MeasurementId) {
          // Remove the placeholder comment if present
          return html.replace(/\s*<!-- Google Analytics 4 -->\s*/g, "\n");
        }

        // Build GA4 script with default consent denied (GDPR compliant)
        const ga4Script = `
    <!-- Google Analytics 4 (GDPR Compliant - Default Consent Denied) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${ga4MeasurementId}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      
      // Set default consent to denied - no tracking until user consents
      gtag('consent', 'default', {
        'analytics_storage': 'denied'
      });
      
      gtag('js', new Date());
      gtag('config', '${ga4MeasurementId}', { send_page_view: false });
    </script>`;

        // Replace the GA4 comment or insert before </head>
        if (html.includes("<!-- Google Analytics 4 -->")) {
          return html.replace(/<!-- Google Analytics 4 -->/, ga4Script.trim());
        }

        // Fallback: insert before </head>
        return html.replace("</head>", `${ga4Script.trim()}\n  </head>`);
      } catch (error) {
        console.warn("Failed to inject GA4 script:", error);
        return html;
      }
    },
  };
}
