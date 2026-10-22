import { Box } from '@mui/material';
import Section from '../components/Section';
import Reveal from '../components/Reveal';
import SkillGroup from '../components/SkillGroup';
import EmptyState from '../components/EmptyState';
import { skillCategories } from '../data/skills';

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Tools I work with"
      description="The languages, frameworks and tools I use to design, build and ship software."
    >
      {skillCategories.length === 0 ? (
        <EmptyState title="No skills added yet" message="Add categories and skills in src/data/skills.js and they’ll appear here." />
      ) : (
        <Box
          component="ul"
          sx={{
            listStyle: 'none',
            p: 0,
            m: 0,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: { xs: 5, md: 7 },
          }}
        >
          {skillCategories.map((category, index) => (
            <Box component="li" key={category.id}>
              <Reveal delay={(index % 3) * 0.08} style={{ height: '100%' }}>
                <SkillGroup category={category} />
              </Reveal>
            </Box>
          ))}
        </Box>
      )}
    </Section>
  );
}
