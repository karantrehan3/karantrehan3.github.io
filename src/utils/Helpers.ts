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
}

export default new Helpers();
