/**
 * Application-wide constants
 * Contains non-configurable constants like consent states, keys, versions, etc.
 */
class Constants {
  // Analytics Consent
  static readonly ANALYTICS_CONSENT_KEY = "analytics-consent";
  static readonly ANALYTICS_CONSENT_VERSION = "1";

  // Consent Status Values
  static readonly CONSENT_STATUS_GRANTED = "granted";
  static readonly CONSENT_STATUS_DENIED = "denied";
  static readonly CONSENT_STATUS_PENDING = "pending";

  // GA4 Event Names
  static readonly GA4_EVENTS = {
    PAGE_VIEW: "page_view",
    NAVIGATION_CLICK: "navigation_click",
    PROJECT_CLICK: "project_click",
    SOCIAL_CLICK: "social_click",
    CTA_CLICK: "cta_click",
    THEME_TOGGLE: "theme_toggle",
  } as const;
}

export default Constants;
