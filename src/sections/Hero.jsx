import { Fragment } from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import { m } from 'framer-motion';
import OrbCanvas from '../components/OrbCanvas';
import SocialLinks from '../components/SocialLinks';
import { profile } from '../data/profile';
import { scrollToId } from '../utils/scroll';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const { name, title, intro, availability } = profile;
  const titleParts = title.split('|').map((part) => part.trim());

  const jump = (id) => (event) => {
    event.preventDefault();
    scrollToId(id);
  };

  return (
    <Box
      component="section"
      id="home"
      tabIndex={-1}
      aria-label="Introduction"
      sx={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        pt: { xs: 11, md: 8 },
        pb: { xs: 8, md: 6 },
      }}
    >
      {/* soft background gradients — purely decorative */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(60% 50% at 82% 28%, rgba(180,174,252,0.14), transparent 70%), radial-gradient(45% 40% at 8% 92%, rgba(143,180,255,0.08), transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.15fr 0.85fr' },
            alignItems: 'center',
            gap: { xs: 1, md: 4 },
          }}
        >
          {/* Text column */}
          <Box sx={{ order: { xs: 2, md: 1 } }}>
            <m.div variants={container} initial="hidden" animate="show">
              <Box>
              {availability?.enabled && (
                <m.div variants={item}>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 1.25,
                      px: 1.75,
                      py: 0.75,
                      mb: { xs: 3, md: 4 },
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 999,
                      bgcolor: 'rgba(255,255,255,0.03)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    <Box
                      aria-hidden="true"
                      sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#7ee0a8', animation: 'statusPulse 2.4s ease-out infinite' }}
                    />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {availability.label}
                    </Typography>
                  </Box>
                </m.div>
              )}

              <m.div variants={item}>
                <Typography variant="h1" component="h1">
                  <Typography component="span" sx={{ display: 'block', fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', color: 'text.secondary', fontWeight: 400, letterSpacing: 0, mb: 1.5 }}>
                    Hello, I’m
                  </Typography>
                  {name}
                  <Box component="span" sx={{ color: 'primary.main' }}>
                    .
                  </Box>
                </Typography>
              </m.div>

              <m.div variants={item}>
                <Typography
                  component="p"
                  sx={{ mt: { xs: 2.5, md: 3 }, fontSize: { xs: '1.1rem', md: '1.3rem' }, fontWeight: 500, letterSpacing: '-0.015em' }}
                >
                  {titleParts.map((part, index) => (
                    <Fragment key={part}>
                      {index > 0 && (
                        <Box component="span" aria-hidden="true" sx={{ mx: 1.25, color: 'primary.main', fontWeight: 300 }}>
                          |
                        </Box>
                      )}
                      <Box component="span" sx={{ color: index === 0 ? 'text.primary' : 'primary.light' }}>
                        {part}
                      </Box>
                    </Fragment>
                  ))}
                </Typography>
              </m.div>

              <m.div variants={item}>
                <Typography color="text.secondary" sx={{ mt: 2.5, maxWidth: 520 }}>
                  {intro}
                </Typography>
              </m.div>

              <m.div variants={item}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: { xs: 4, md: 5 }, alignItems: { xs: 'stretch', sm: 'center' } }}>
                  <Button
                    component="a"
                    href="#projects"
                    size="large"
                    variant="contained"
                    endIcon={<ArrowDownwardRoundedIcon />}
                    onClick={jump('projects')}
                  >
                    View Projects
                  </Button>
                  <Button
                    component="a"
                    href="#contact"
                    size="large"
                    variant="outlined"
                    startIcon={<MailOutlineRoundedIcon />}
                    onClick={jump('contact')}
                  >
                    Contact Me
                  </Button>
                </Stack>
              </m.div>

              <m.div variants={item}>
                <SocialLinks sx={{ mt: { xs: 4, md: 5 } }} />
              </m.div>
              </Box>
            </m.div>
          </Box>

          {/* 3D column — fixed height box so loading the scene never shifts the layout */}
          <Box sx={{ order: { xs: 1, md: 2 }, position: 'relative', height: { xs: 280, sm: 360, md: 580 } }}>
            <OrbCanvas />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
