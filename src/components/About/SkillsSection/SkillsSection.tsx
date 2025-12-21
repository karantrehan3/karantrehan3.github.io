import { memo, ReactElement, useState } from "react";
import { Card, Group, Paper, Table, Text, Tooltip } from "@mantine/core";
import clsx from "clsx";

import Icon from "@/components/Common/Icons";

import classes from "./SkillsSection.module.css";

interface Skill {
  name: string;
  icon: string;
  color: string;
  backgroundColor: string;
  textColor: string;
  subSkills?: Skill[];
}

interface SkillCategory {
  [key: string]: Skill[];
}

interface SkillsConfig {
  STYLING: {
    CATEGORY_ICONS: { [key: string]: string };
    CATEGORY_NAMES: { [key: string]: string };
  };
  [key: string]: Skill[] | any;
}

interface SkillsSectionProps {
  skills: SkillCategory;
  config: SkillsConfig;
}

// Memoized components for better performance
const SkillIcon = memo(({ skill }: { skill: Skill }) => {
  return <Icon name={skill.icon as any} size={20} />;
});

const CategoryIcon = memo(
  ({
    categoryName,
    config,
  }: {
    categoryName: string;
    config: SkillsConfig;
  }) => {
    const iconName = config.STYLING.CATEGORY_ICONS[categoryName];
    return <Icon name={iconName as any} size={24} />;
  }
);

const CategoryName = memo(
  ({
    categoryName,
    config,
  }: {
    categoryName: string;
    config: SkillsConfig;
  }) => {
    return (
      config.STYLING.CATEGORY_NAMES[categoryName] ||
      categoryName.replace(/_/g, " ")
    );
  }
);

const SkillCard = memo(({ skill }: { skill: Skill }) => {
  return (
    <Card
      key={skill.name}
      className={classes.skillCard}
      style={{
        [skill.backgroundColor.includes("gradient")
          ? "background"
          : "backgroundColor"]: skill.backgroundColor,
        color: skill.color,
      }}
    >
      <div className={classes.skillIcon} style={{ color: skill.textColor }}>
        <SkillIcon skill={skill} />
      </div>
      <Text
        size="xs"
        fw={600}
        className={classes.skillName}
        style={{ color: skill.textColor }}
      >
        {skill.name}
      </Text>
    </Card>
  );
});

// Parent Skill Card with layered sub-skills underneath
const ParentSkillCard = memo(({ skill }: { skill: Skill }) => {
  const firstTwoSubSkills = skill.subSkills?.slice(0, 2) || [];

  return (
    <div className={classes.parentSkillWrapper}>
      {/* Layered sub-skills underneath */}
      {firstTwoSubSkills.map((subSkill, index) => (
        <Card
          key={`${skill.name}-${subSkill.name}-${index}`}
          className={clsx(classes.skillCard, classes.layeredSubSkill)}
          style={{
            [subSkill.backgroundColor.includes("gradient")
              ? "background"
              : "backgroundColor"]: subSkill.backgroundColor,
            color: subSkill.color,
            zIndex: 1 - index, // Stack them with decreasing z-index
            transform: `translate(${(index + 1) * 2}px, ${(index + 1) * 2}px)`, // Offset diagonally
          }}
        >
          <div
            className={classes.skillIcon}
            style={{ color: subSkill.textColor }}
          >
            <SkillIcon skill={subSkill} />
          </div>
          <Text
            size="xs"
            fw={600}
            className={classes.skillName}
            style={{ color: subSkill.textColor }}
          >
            {subSkill.name}
          </Text>
        </Card>
      ))}

      {/* Main parent card on top */}
      <Card
        key={skill.name}
        className={clsx(classes.skillCard, classes.parentSkillCard)}
        style={{
          [skill.backgroundColor.includes("gradient")
            ? "background"
            : "backgroundColor"]: skill.backgroundColor,
          color: skill.color,
          zIndex: 10,
        }}
      >
        <div className={classes.skillIcon} style={{ color: skill.textColor }}>
          <SkillIcon skill={skill} />
        </div>
        <Text
          size="xs"
          fw={600}
          className={classes.skillName}
          style={{ color: skill.textColor }}
        >
          {skill.name}
        </Text>
      </Card>
    </div>
  );
});

// Grouped Skills Component
const GroupedSkills = memo(({ skills }: { skills: Skill[] }) => {
  const [expandedParent, setExpandedParent] = useState<string | null>(null);

  return (
    <Group className={classes.technologiesGroup} wrap="wrap">
      {skills.map((skill) => {
        const hasSubSkills = skill.subSkills && skill.subSkills.length > 0;

        return (
          <div key={skill.name} className={classes.skillContainer}>
            <div
              className={classes.skillGroup}
              onMouseEnter={() => hasSubSkills && setExpandedParent(skill.name)}
              onMouseLeave={() => hasSubSkills && setExpandedParent(null)}
            >
              {hasSubSkills ? (
                <Tooltip
                  label={`${skill.name} Services (${skill.subSkills!.length})`}
                  position="top"
                >
                  <div>
                    <ParentSkillCard skill={skill} />
                  </div>
                </Tooltip>
              ) : (
                <SkillCard skill={skill} />
              )}
            </div>

            {/* Expanded Sub-Skills beneath parent */}
            {hasSubSkills && (
              <div
                className={clsx(classes.expandedSubSkills, {
                  [classes.expanded]: expandedParent === skill.name,
                })}
              >
                <Group className={classes.subSkillsGroup} wrap="wrap">
                  {skill.subSkills!.map((subSkill) => (
                    <Tooltip
                      key={subSkill.name}
                      label={subSkill.name}
                      position="top"
                    >
                      <Card
                        className={classes.skillCard}
                        style={{
                          [subSkill.backgroundColor.includes("gradient")
                            ? "background"
                            : "backgroundColor"]: subSkill.backgroundColor,
                          color: subSkill.color,
                        }}
                      >
                        <div
                          className={classes.skillIcon}
                          style={{ color: subSkill.textColor }}
                        >
                          <SkillIcon skill={subSkill} />
                        </div>
                        <Text
                          size="xs"
                          fw={600}
                          className={classes.skillName}
                          style={{ color: subSkill.textColor }}
                        >
                          {subSkill.name}
                        </Text>
                      </Card>
                    </Tooltip>
                  ))}
                </Group>
              </div>
            )}
          </div>
        );
      })}
    </Group>
  );
});

export function SkillsSection({
  skills,
  config,
}: SkillsSectionProps): ReactElement {
  return (
    <Paper className={classes.skillsSection} p="xl" radius="md">
      <Table className={classes.skillsTable}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th className={classes.categoryColumn}>Category</Table.Th>
            <Table.Th className={classes.technologiesColumn}>
              Technologies
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {Object.entries(skills).map(([category, skillList]) => (
            <Table.Tr key={category}>
              <Table.Td className={classes.categoryColumn}>
                <Group gap="sm">
                  <CategoryIcon categoryName={category} config={config} />
                  <Text fw={600} size="sm">
                    <CategoryName categoryName={category} config={config} />
                  </Text>
                </Group>
              </Table.Td>
              <Table.Td className={classes.technologiesColumn}>
                <GroupedSkills skills={skillList} />
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Paper>
  );
}
