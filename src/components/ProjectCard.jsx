import { useState } from 'react';
import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import ProjectVisual from './ProjectVisual';
import { isConfigured, linkProps, safeUrl } from '../utils/links';

export default function ProjectCard({ project, index }) {
  const [imageFailed, setImageFailed] = useState(false);
  const { title, description, tech = [], image, github, demo, isSample } = project;

  const imageSrc = safeUrl(image);
  const githubProps = linkProps(github);
  const demoProps = linkProps(demo);
  const hasLinks = Boolean(githubProps || demoProps);
  const showImage = isConfigured(imageSrc) && !imageFailed;

  return (
    <Box
      component="article"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 4,
        bgcolor: 'rgba(255,255,255,0.02)',
        overflow: 'hidden',
        transition: 'transform .35s ease, border-color .35s ease, background-color .35s ease',
        '&:hover, &:focus-within': {
          transform: 'translateY(-4px)',
          borderColor: 'rgba(180,174,252,0.4)',
          bgcolor: 'rgba(255,255,255,0.035)',
        },
        '&:hover .project-media, &:focus-within .project-media': { transform: 'scale(1.04)' },
      }}
    >
      <Box sx={{ position: 'relative', aspectRatio: '16 / 10', overflow: 'hidden', bgcolor: 'background.paper' }}>
        <Box className="project-media" sx={{ position: 'absolute', inset: 0, transition: 'transform .6s ease' }}>
          {showImage ? (
            <img
              src={imageSrc}
              alt={`Preview of ${title}`}
              width={1280}
              height={800}
              loading="lazy"
              decoding="async"
              onError={() => setImageFailed(true)}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          ) : (
            <ProjectVisual index={index} title={title} />
          )}
        </Box>
        {isSample && (
          <Chip
            label="Sample"
            size="small"
            sx={{ position: 'absolute', top: 14, left: 14, bgcolor: 'rgba(11,11,14,0.72)', backdropFilter: 'blur(6px)', color: 'primary.light' }}
          />
        )}
      </Box>

      <Box sx={{ p: { xs: 3, md: 3.5 }, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Typography variant="h3" component="h3" sx={{ mb: 1.25 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
          {description}
        </Typography>

        <Stack component="ul" direction="row" aria-label={`Technologies used in ${title}`} sx={{ flexWrap: 'wrap', gap: 0.75, listStyle: 'none', p: 0, m: 0, mb: 3 }}>
          {tech.map((name) => (
            <li key={name}>
              <Chip label={name} size="small" variant="outlined" />
            </li>
          ))}
        </Stack>

        <Stack direction="row" spacing={1} sx={{ mt: 'auto', flexWrap: 'wrap', rowGap: 1 }}>
          {githubProps && (
            <Button component="a" size="small" variant="outlined" startIcon={<GitHubIcon />} aria-label={`${title} on GitHub (opens in a new tab)`} {...githubProps}>
              Code
            </Button>
          )}
          {demoProps && (
            <Button component="a" size="small" variant="contained" endIcon={<OpenInNewRoundedIcon />} aria-label={`${title} live demo (opens in a new tab)`} {...demoProps}>
              Live demo
            </Button>
          )}
          {!hasLinks && (
            <Typography variant="caption" color="text.secondary">
              Links not added yet
            </Typography>
          )}
        </Stack>
      </Box>
    </Box>
  );
}
