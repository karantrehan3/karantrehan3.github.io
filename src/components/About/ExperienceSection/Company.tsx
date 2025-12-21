import { ReactElement, useMemo } from "react";

import { CollapsibleSection } from "@/components/About/CollapsibleSection";
import { CompanyContent } from "@/components/About/ExperienceSection/CompanyContent";
import { CompanyHeader } from "@/components/About/ExperienceSection/CompanyHeader";
import type { Company } from "@/components/About/ExperienceSection/types";
import { ImagePreviewModal } from "@/components/About/ImagePreviewModal";
import { useImagePreview } from "@/hooks/useImagePreview";

interface CompanyProps {
  company: Company;
  index: number;
}

export function Company({ company, index }: CompanyProps): ReactElement {
  const previewImages = useMemo(() => {
    const images = [];
    if (company.LOGO) {
      images.push({
        src: company.LOGO,
        alt: company.LOGO_ALT || `${company.NAME} logo`,
      });
    }
    if (company.ADDITIONAL_LOGO) {
      images.push({
        src: company.ADDITIONAL_LOGO,
        alt: company.ADDITIONAL_LOGO_ALT || `${company.NAME} additional logo`,
      });
    }
    return images;
  }, [
    company.LOGO,
    company.LOGO_ALT,
    company.ADDITIONAL_LOGO,
    company.ADDITIONAL_LOGO_ALT,
    company.NAME,
  ]);

  const {
    previewOpened,
    openPreview,
    closePreview,
    previewImages: images,
  } = useImagePreview({ images: previewImages });

  return (
    <>
      <ImagePreviewModal
        opened={previewOpened}
        onClose={closePreview}
        images={images}
      />
      {/* TODO: Review defaultExpanded and enableScrollAutoExpand */}
      <CollapsibleSection
        id={`company-${index}`}
        defaultExpanded={false}
        enableScrollAutoExpand={false}
        customHeader={
          <CompanyHeader
            name={company.NAME}
            url={company.URL}
            logo={company.LOGO}
            logoAlt={company.LOGO_ALT}
            additionalLogo={company.ADDITIONAL_LOGO}
            additionalLogoAlt={company.ADDITIONAL_LOGO_ALT}
            subtitle={company.SUBTITLE}
            onImageClick={openPreview}
          />
        }
      >
        <CompanyContent roles={company.ROLES} projects={company.PROJECTS} />
      </CollapsibleSection>
    </>
  );
}
