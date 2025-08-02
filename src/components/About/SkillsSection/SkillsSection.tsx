import { ReactElement } from "react";
import { Paper, Title, Group, Image, Stack } from "@mantine/core";
import classes from "./SkillsSection.module.css";

interface Skill {
  name: string;
  badge: string;
}

interface SkillCategory {
  [key: string]: Skill[];
}

interface SkillsSectionProps {
  skills: SkillCategory;
}

export function SkillsSection({ skills }: SkillsSectionProps): ReactElement {
  const renderSkillCategory = (categoryName: string, skillList: Skill[]) => (
    <div key={categoryName} className={classes.skillCategory}>
      <Title order={4} className={classes.categoryTitle}>
        {categoryName.replace(/_/g, " ")}
      </Title>
      <Group gap="sm" className={classes.skillBadges}>
        {skillList.map((skill) => (
          <Image
            key={skill.name}
            src={skill.badge}
            alt={skill.name}
            className={classes.skillBadge}
            fit="contain"
          />
        ))}
      </Group>
    </div>
  );

  return (
    <Paper className={classes.skillsSection} p="xl" radius="md">
      <Title order={3} className={classes.sectionTitle}>
        Skills & Technologies
      </Title>
      <Stack gap="xl" className={classes.skillsContainer}>
        {Object.entries(skills).map(([category, skillList]) =>
          renderSkillCategory(category, skillList)
        )}
      </Stack>
    </Paper>
  );
}
