import { ReactElement } from "react";
import { Group, Image, Modal } from "@mantine/core";

import classes from "./ImagePreviewModal.module.css";

interface ImagePreviewModalProps {
  opened: boolean;
  onClose: () => void;
  images: Array<{
    src: string;
    alt: string;
  }>;
}

export function ImagePreviewModal({
  opened,
  onClose,
  images,
}: ImagePreviewModalProps): ReactElement {
  const hasMultipleImages = images.length === 2;

  const logoNames = images.map((image) => image.alt).join(", ");
  const title = `Image Preview - ${logoNames}`;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={title}
      size={hasMultipleImages ? "xl" : "lg"}
      centered
      className={classes.modal}
      classNames={{
        body: classes.modalBody,
        content: classes.modalContent,
        title: classes.modalTitle,
      }}
    >
      <Group
        gap="md"
        align="center"
        justify="center"
        className={
          hasMultipleImages ? classes.imageGroup : classes.singleImageGroup
        }
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={
              hasMultipleImages
                ? classes.imageWrapper
                : classes.singleImageWrapper
            }
          >
            <Image
              src={image.src}
              alt={image.alt}
              fit="contain"
              className={classes.previewImage}
            />
          </div>
        ))}
      </Group>
    </Modal>
  );
}
