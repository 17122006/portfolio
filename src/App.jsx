import { lazy, Suspense, useEffect } from 'react';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
import theme from './theme/theme';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import SectionFallback from './components/SectionFallback';
import SectionError from './components/SectionError';
import Hero from './sections/Hero';

// Everything below the fold is code-split and loaded after the hero is interactive.
const loaders = {
  about: () => import('./sections/About'),
  skills: () => import('./sections/Skills'),
  projects: () => import('./sections/Projects'),
  certificates: () => import('./sections/Certificates'),
  contact: () => import('./sections/Contact'),
};
const About = lazy(loaders.about);
const Skills = lazy(loaders.skills);
const Projects = lazy(loaders.projects);
const Certificates = lazy(loaders.certificates);
const Contact = lazy(loaders.contact);

function LazySection({ id, label, minHeight, children }) {
  return (
    <ErrorBoundary fallback={<SectionError id={id} label={label} />}>
      <Suspense fallback={<SectionFallback id={id} minHeight={minHeight} />}>{children}</Suspense>
    </ErrorBoundary>
  );
}

export default function App() {
  // Warm the section chunks while the browser is idle so nav links never wait on the network.
  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((callback) => window.setTimeout(callback, 1200));
    const cancel = window.cancelIdleCallback ?? window.clearTimeout;
    const handle = idle(() => Object.values(loaders).forEach((load) => load().catch(() => {})));
    return () => cancel(handle);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MotionConfig reducedMotion="user">
        <LazyMotion features={domAnimation}>
          <Box
            component="a"
            href="#main"
            sx={{
              position: 'fixed',
              top: 8,
              left: 8,
              zIndex: 2000,
              px: 2,
              py: 1,
              borderRadius: 2,
              bgcolor: 'text.primary',
              color: 'background.default',
              textDecoration: 'none',
              fontWeight: 500,
              transform: 'translateY(-200%)',
              '&:focus': { transform: 'translateY(0)' },
            }}
          >
            Skip to content
          </Box>

          <Navbar />

          <Box component="main" id="main">
            <Hero />
            <LazySection id="about" label="About" minHeight={560}>
              <About />
            </LazySection>
            <LazySection id="skills" label="Skills" minHeight={640}>
              <Skills />
            </LazySection>
            <LazySection id="projects" label="Projects" minHeight={900}>
              <Projects />
            </LazySection>
            <LazySection id="certificates" label="Certificates" minHeight={520}>
              <Certificates />
            </LazySection>
            <LazySection id="contact" label="Contact" minHeight={780}>
              <Contact />
            </LazySection>
          </Box>

          <Footer />
        </LazyMotion>
      </MotionConfig>
    </ThemeProvider>
  );
}
