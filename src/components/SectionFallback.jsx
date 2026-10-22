import { Box, Container, Skeleton } from '@mui/material';

/**
 * Shown while a lazy section's code loads. It keeps the section's id and a similar
 * height, so navigation links still land in the right place and the page doesn't jump.
 */
export default function SectionFallback({ id, minHeight = 520 }) {
  return (
    <Box component="section" id={id} tabIndex={-1} aria-busy="true" aria-label="Loading section" sx={{ minHeight, py: { xs: 10, md: 16 } }}>
      <Container maxWidth="lg">
        <Skeleton variant="text" width={110} sx={{ bgcolor: 'rgba(244,239,230,0.06)' }} />
        <Skeleton variant="text" width="min(420px, 80%)" height={72} sx={{ bgcolor: 'rgba(244,239,230,0.06)' }} />
        <Skeleton variant="rounded" height={200} sx={{ mt: 6, bgcolor: 'rgba(244,239,230,0.04)' }} />
      </Container>
    </Box>
  );
}
