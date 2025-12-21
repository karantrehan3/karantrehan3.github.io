import { useEffect } from "react";

import config from "@/utils/Config";
import helpers from "@/utils/Helpers";

/**
 * Hook to manage document title and meta description from config
 * Sets the document title and meta description on mount
 * Calculates years of experience dynamically from ABOUT.EXPERIENCE_SUMMARY.START_DATE
 */
export const useDocumentMeta = (): void => {
  useEffect(() => {
    // Set document title from config
    const title = config.get("META.TITLE");
    if (title) {
      document.title = title;
    }

    // Get description template and calculate years of experience
    const descriptionTemplate = config.get("META.DESCRIPTION_TEMPLATE");
    const startDate = config.get("ABOUT.EXPERIENCE_SUMMARY.START_DATE");

    if (descriptionTemplate && startDate) {
      const years = helpers.calculateYearsOfExperience(startDate);
      const description = descriptionTemplate.replace(
        "{YEARS}",
        years.toString()
      );

      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.setAttribute("name", "description");
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute("content", description);
    }
  }, []);
};
