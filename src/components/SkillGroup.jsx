import { Box, Chip, Stack, Typography } from '@mui/material';

export default function SkillGroup({ category }) {
  const { title, icon: Icon, items = [] } = category;
  return (
    <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 3, height: '100%' }}>
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 2.5 }}>
        <Box
          aria-hidden="true"
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2.5,
            display: 'grid',
            placeItems: 'center',
            color: 'primary.main',
            bgcolor: 'rgba(180,174,252,0.1)',
            border: '1px solid rgba(180,174,252,0.2)',
          }}
        >
          {Icon && <Icon fontSize="small" />}
        </Box>
        <Typography variant="h3" component="h3">
          {title}
        </Typography>
      </Stack>
      <Stack component="ul" direction="row" aria-label={`${title} skills`} sx={{ flexWrap: 'wrap', gap: 1, listStyle: 'none', p: 0, m: 0 }}>
        {items.map((item) => (
          <li key={item}>
            <Chip label={item} variant="outlined" sx={{ fontSize: '0.9rem' }} />
          </li>
        ))}
      </Stack>
    </Box>
  );
}
