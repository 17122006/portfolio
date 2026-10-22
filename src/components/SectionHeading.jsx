import { Box, Typography } from '@mui/material';
import Reveal from './Reveal';

export default function SectionHeading({ id, eyebrow, title, description }) {
  return (
    <Reveal>
      <Box sx={{ maxWidth: 720 }}>
        {eyebrow && (
          <Typography variant="overline" component="p" color="primary" sx={{ mb: 2 }}>
            {eyebrow}
          </Typography>
        )}
        <Typography id={id} variant="h2" component="h2">
          {title}
        </Typography>
        {description && (
          <Typography color="text.secondary" sx={{ mt: 2.5, maxWidth: 560 }}>
            {description}
          </Typography>
        )}
      </Box>
    </Reveal>
  );
}
