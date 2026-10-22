import { Box } from '@mui/material';
import Section from '../components/Section';
import Reveal from '../components/Reveal';
import ProjectCard from '../components/ProjectCard';
import EmptyState from '../components/EmptyState';
import { projects } from '../data/projects';

export default function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Featured work"
      description="A selection of things I’ve built. The cards below are editable samples until you add your own."
    >
      {projects.length === 0 ? (
        <EmptyState title="No projects yet" message="Add your first project in src/data/projects.js and it will show up here." />
      ) : (
        <Box
          component="ul"
          sx={{
            listStyle: 'none',
            p: 0,
            m: 0,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
            gap: { xs: 3, md: 4 },
          }}
        >
          {projects.map((project, index) => (
            <Box component="li" key={project.id ?? project.title}>
              <Reveal delay={(index % 3) * 0.08} style={{ height: '100%' }}>
                <ProjectCard project={project} index={index} />
              </Reveal>
            </Box>
          ))}
        </Box>
      )}
    </Section>
  );
}
