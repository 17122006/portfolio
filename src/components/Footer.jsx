import { Box, Button, Container, Stack, Typography } from '@mui/material';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import SocialLinks from './SocialLinks';
import { profile } from '../data/profile';
import { scrollToId } from '../utils/scroll';

export default function Footer() {
  return (
    <Box component="footer" sx={{ borderTop: '1px solid', borderColor: 'divider', py: 4 }}>
      <Container maxWidth="lg">
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </Typography>
          <SocialLinks size="small" includeEmail />
          <Button
            component="a"
            href="#home"
            size="small"
            color="primary"
            variant="text"
            startIcon={<ArrowUpwardRoundedIcon />}
            onClick={(e) => {
              e.preventDefault();
              scrollToId('home');
            }}
          >
            Back to top
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
