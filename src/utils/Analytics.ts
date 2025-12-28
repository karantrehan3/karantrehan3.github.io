/**
 * Google Analytics 4 (GA4) utility class
 * Provides type-safe methods for tracking page views and custom events
 *
 * Analytics is consent-based:
 * - GA4 script is injected at build time via vite/plugins/analytics.mjs
 * - But tracking only activates after user grants consent
 * - Call analytics.initialize() after consent is granted
 */

import config from "@/utils/Config";
import Constants from "@/utils/Constants";
import helpers from "@/utils/Helpers";

declare global {
  interface Window {
    gtag?: (
      command: "config" | "event" | "js" | "set" | "consent",
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
}

class Analytics {
  private initialized = false;
  private measurementId: string;

  constructor() {
    this.measurementId = config.get("ANALYTICS.GA4_MEASUREMENT_ID") || "";
  }

  /**
   * Initialize analytics after user consent
   * This enables the GA4 tracking that was loaded at build time
   */
  initialize(): void {
    if (this.initialized || !this.measurementId) {
      return;
    }
    if (typeof window === "undefined") {
      return;
    }

    // GA4 script is already loaded by vite plugin, just enable it
    if (window.gtag) {
      // Update consent state to granted
      window.gtag("consent", "update", {
        analytics_storage: Constants.CONSENT_STATUS_GRANTED,
      });

      // Configure GA4 with the measurement ID
      window.gtag("config", this.measurementId, {
        send_page_view: false, // We handle page views manually
      });

      this.initialized = true;
    }
  }

  /**
   * Check if analytics has been initialized
   */
  isInitialized(): boolean {
    return this.initialized;
  }

  /**
   * Track a custom event
   * @param eventName - Name of the event
   * @param eventParams - Additional event parameters
   */
  trackEvent(eventName: string, eventParams?: Record<string, unknown>): void {
    if (!this.initialized || typeof window === "undefined" || !window.gtag) {
      return;
    }

    window.gtag("event", eventName, eventParams);
  }

  /**
   * Track a page view
   * @param path - The path/route being viewed
   * @param title - Optional page title
   */
  trackPageView(path?: string, title?: string): void {
    // Get stored UTM parameters from sessionStorage
    const utmParams = helpers.getStoredUtmParams();

    // If no UTM parameters exist, use defaults for direct traffic
    const trackingParams: Record<string, string> = {
      utm_source: utmParams.utm_source || "direct",
      utm_medium: utmParams.utm_medium || "none",
      ...(utmParams.utm_campaign && { utm_campaign: utmParams.utm_campaign }),
      ...(utmParams.utm_term && { utm_term: utmParams.utm_term }),
      ...(utmParams.utm_content && { utm_content: utmParams.utm_content }),
    };

    this.trackEvent(Constants.GA4_EVENTS.PAGE_VIEW, {
      page_path: path || window.location.pathname + window.location.hash,
      page_title: title || document.title,
      page_location: window.location.href,
      ...trackingParams, // Include UTM parameters (with defaults if missing)
    });
  }

  /**
   * Track navigation clicks
   * @param link - The link URL
   * @param label - The link text/label
   * @param isExternal - Whether the link is external
   */
  trackNavigationClick(
    link: string,
    label: string,
    isExternal: boolean = false
  ): void {
    this.trackEvent(Constants.GA4_EVENTS.NAVIGATION_CLICK, {
      link,
      link_text: label,
      is_external: isExternal,
    });
  }

  /**
   * Track project card clicks
   * @param projectTitle - The project title
   * @param projectLink - The project URL
   */
  trackProjectClick(projectTitle: string, projectLink: string): void {
    this.trackEvent(Constants.GA4_EVENTS.PROJECT_CLICK, {
      project_title: projectTitle,
      project_link: projectLink,
    });
  }

  /**
   * Track social link clicks
   * @param platform - The social platform name
   * @param link - The link URL
   */
  trackSocialClick(platform: string, link: string): void {
    this.trackEvent(Constants.GA4_EVENTS.SOCIAL_CLICK, {
      platform,
      link,
    });
  }

  /**
   * Track CTA button clicks
   * @param ctaName - The CTA button name/text
   * @param destination - The destination section/URL
   */
  trackCTAClick(ctaName: string, destination: string): void {
    this.trackEvent(Constants.GA4_EVENTS.CTA_CLICK, {
      cta_name: ctaName,
      destination,
    });
  }

  /**
   * Track theme toggle
   * @param theme - The theme being switched to
   */
  trackThemeToggle(theme: "light" | "dark"): void {
    this.trackEvent(Constants.GA4_EVENTS.THEME_TOGGLE, {
      theme,
    });
  }

  /**
   * Track profile share
   * @param platform - The platform where the profile was shared
   * @param shareUrl - The URL that was shared
   */
  trackShareClick(platform: string, shareUrl: string): void {
    this.trackEvent(Constants.GA4_EVENTS.SHARE_CLICK, {
      platform,
      share_url: shareUrl,
    });
  }
}

export default new Analytics();
