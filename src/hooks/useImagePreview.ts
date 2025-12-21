import { useMemo, useState } from "react";

interface ImagePreview {
  src: string;
  alt: string;
}

interface UseImagePreviewOptions {
  images: Array<{ src: string; alt?: string }>;
}

/**
 * Hook to manage image preview modal state
 * Returns the preview state and handlers
 */
export const useImagePreview = (
  options: UseImagePreviewOptions
): {
  previewOpened: boolean;
  openPreview: () => void;
  closePreview: () => void;
  previewImages: ImagePreview[];
} => {
  const [previewOpened, setPreviewOpened] = useState(false);

  const previewImages: ImagePreview[] = useMemo(
    () =>
      options.images.map((img) => ({
        src: img.src,
        alt: img.alt || "",
      })),
    [options.images]
  );

  return {
    previewOpened,
    openPreview: () => setPreviewOpened(true),
    closePreview: () => setPreviewOpened(false),
    previewImages,
  };
};
