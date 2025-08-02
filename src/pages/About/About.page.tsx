import { ReactElement } from "react";
import { Container } from "@mantine/core";
import {
  AboutHeader,
  ProfessionalQuote,
  TypingEffect,
  ExperienceSection,
  FocusAreas,
  SkillsSection,
  EducationSection,
} from "@/components/About";
import config from "@/utils/Config";
import classes from "./About.module.css";

export default function AboutPage(): ReactElement {
  const aboutData = config.get("ABOUT");
  const typingTexts = aboutData.INTRODUCTION.TYPING_EFFECT;
  const experienceSummary = aboutData.EXPERIENCE_SUMMARY;
  const focusAreas = aboutData.FOCUS_AREAS;
  const professionalQuote = aboutData.QUOTE;
  const education = aboutData.EDUCATION;
  const skills = aboutData.SKILLS;

  return (
    <Container size="xl" className={classes.container}>
      {/* Header Section - Centered About Me */}
      <AboutHeader title={aboutData.TITLE} subtitle={aboutData.SUBTITLE} />

      {/* Professional Quote - Full Width */}
      <ProfessionalQuote quote={professionalQuote} author="Karan Trehan" />

      {/* Typing Effect Section - Full Width */}
      <TypingEffect texts={typingTexts} />

      {/* Experience Summary */}
      <ExperienceSection experienceSummary={experienceSummary} />

      {/* Focus Areas */}
      <FocusAreas areas={focusAreas} />

      {/* Skills Section */}
      <SkillsSection skills={skills} />

      {/* Education Section */}
      <EducationSection
        degree={education.DEGREE}
        university={education.UNIVERSITY}
        graduationDate={education.GRADUATION_DATE}
        marks={education.MARKS}
        logo={education.LOGO}
        achievements={education.ACHIEVEMENTS}
      />
    </Container>
  );
}
