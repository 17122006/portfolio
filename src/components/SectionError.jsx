import { Box, Button, Container, Typography } from '@mui/material';

/** Error state for a section that failed to load (e.g. a dropped network connection). */
export default function SectionError({ id, label }) {
  return (
    <Box component="section" id={id} tabIndex={-1} aria-label={label} sx={{ py: { xs: 10, md: 16 } }}>
      <Container maxWidth="lg">
        <Box role="alert" sx={{ p: 4, border: '1px dashed', borderColor: 'divider', borderRadius: 3, maxWidth: 560 }}>
          <Typography variant="h3" component="h2" sx={{ mb: 1 }}>
            {label} couldn’t load
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2.5 }}>
            Something went wrong while loading this section. Check your connection and try again.
          </Typography>
          <Button variant="outlined" onClick={() => window.location.reload()}>
            Reload page
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
