import { Box, Typography } from '@mui/material';

/** Friendly placeholder when a data array is empty. */
export default function EmptyState({ title, message }) {
  return (
    <Box
      role="status"
      sx={{ p: { xs: 4, md: 6 }, border: '1px dashed', borderColor: 'divider', borderRadius: 3, textAlign: 'center' }}
    >
      <Typography variant="h3" component="p" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Typography color="text.secondary" sx={{ maxWidth: 440, mx: 'auto' }}>
        {message}
      </Typography>
    </Box>
  );
}
