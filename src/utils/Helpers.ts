class Helpers {
  /**
   * Navigates the browser to the previous page in history.
   * @returns {void}
   */
  goBack(): void {
    window.history.back();
  }

  /**
   * Opens a given URL in the same tab.
   * @param {Object} param - The parameter object.
   * @param {string} [param.url] - The URL to open.
   * @returns {Window | null} - A reference to the newly opened window, or null if it failed.
   */
  openUrlOnTop({ url }: { url?: string }): Window | null {
    return window.open(url, "_top");
  }

  /**
   * Calculates years of experience from a start date
   * @param startDate - Date string in DD-MM-YYYY format
   * @param formatted - If true, returns formatted string like "3.5+ years", otherwise returns number
   * @returns Number of years (rounded to 1 decimal) or formatted string
   *
   * Note: Core logic is shared with vite/utils/date-helpers.mjs for build-time use.
   * If updating this function, ensure both are kept in sync.
   */
  calculateYearsOfExperience(
    startDate: string,
    formatted: boolean = false
  ): number | string {
    const [day, month, year] = startDate.split("-").map(Number);
    const start = new Date(year, month - 1, day);
    const current = new Date();

    const totalMonths =
      (current.getFullYear() - start.getFullYear()) * 12 +
      current.getMonth() -
      start.getMonth() -
      (current.getDate() < start.getDate() ? 1 : 0);

    const roundedYears = Math.round((totalMonths / 12) * 10) / 10;

    if (formatted) {
      return `${roundedYears}+ ${roundedYears === 1 ? "year" : "years"}`;
    }

    return roundedYears;
  }

  /**
   * Extracts section IDs from header navigation links
   * @param links - Array of navigation link objects with 'link' property
   * @returns Array of section IDs (without the '#' prefix)
   */
  getSectionIdsFromLinks(
    links: Array<{ link: string; hidden?: boolean }>
  ): string[] {
    return links
      .filter((link) => !link.hidden && link.link.startsWith("#"))
      .map((link) => link.link.replace("#", ""));
  }

  /**
   * Extracts UTM parameters from the current URL
   * @param url - Optional URL string to parse. If not provided, uses current window location
   * @returns Object containing UTM parameters (utm_source, utm_medium, utm_campaign, utm_term, utm_content)
   */
  extractUtmParams(url?: string): Record<string, string> {
    if (typeof window === "undefined") {
      return {};
    }

    const urlToParse = url || window.location.href;
    const urlObj = new URL(urlToParse);
    const utmParams: Record<string, string> = {};

    const utmKeys = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
    ];

    utmKeys.forEach((key) => {
      const value = urlObj.searchParams.get(key);
      if (value) {
        utmParams[key] = value;
      }
    });

    return utmParams;
  }

  /**
   * Stores UTM parameters in sessionStorage
   * UTM parameters persist for the browser session but are cleared when the tab/window closes
   * @param utmParams - Object containing UTM parameters
   */
  storeUtmParams(utmParams: Record<string, string>): void {
    if (typeof window === "undefined") {
      return;
    }

    if (Object.keys(utmParams).length > 0) {
      sessionStorage.setItem("utm_params", JSON.stringify(utmParams));
    }
  }

  /**
   * Retrieves stored UTM parameters from sessionStorage
   * @returns Object containing UTM parameters, or empty object if none exist
   */
  getStoredUtmParams(): Record<string, string> {
    if (typeof window === "undefined") {
      return {};
    }

    try {
      const stored = sessionStorage.getItem("utm_params");
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // If parsing fails, return empty object
    }

    return {};
  }

  /**
   * Extracts UTM parameters from URL and stores them in sessionStorage
   * This should be called on initial page load to capture UTM parameters
   * @param url - Optional URL string to parse. If not provided, uses current window location
   */
  captureAndStoreUtmParams(url?: string): void {
    const utmParams = this.extractUtmParams(url);
    if (Object.keys(utmParams).length > 0) {
      this.storeUtmParams(utmParams);
    }
  }
}

export default new Helpers();
