import { Box, Typography } from '@mui/material';

const gradients = [
  'linear-gradient(135deg, #2a2850 0%, #14141f 60%), radial-gradient(circle at 80% 20%, rgba(180,174,252,.35), transparent 55%)',
  'linear-gradient(135deg, #1e2a4a 0%, #121219 60%), radial-gradient(circle at 20% 80%, rgba(143,180,255,.3), transparent 55%)',
  'linear-gradient(135deg, #2b2440 0%, #131318 60%), radial-gradient(circle at 70% 70%, rgba(207,203,255,.28), transparent 55%)',
];

/** Generated placeholder shown when a project has no preview image (or the image fails to load). */
export default function ProjectVisual({ index = 0, title }) {
  return (
    <Box
      role="img"
      aria-label={`Placeholder preview for ${title}`}
      sx={{
        position: 'absolute',
        inset: 0,
        background: gradients[index % gradients.length],
        backgroundBlendMode: 'screen',
        display: 'flex',
        alignItems: 'flex-end',
        p: 2.5,
      }}
    >
      <Typography
        aria-hidden="true"
        sx={{ fontSize: 'clamp(3.5rem, 9vw, 5.5rem)', fontWeight: 500, lineHeight: 0.9, letterSpacing: '-0.06em', color: 'rgba(244,239,230,0.14)' }}
      >
        {String(index + 1).padStart(2, '0')}
      </Typography>
    </Box>
  );
}
