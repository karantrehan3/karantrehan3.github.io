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
}

export default new Helpers();
