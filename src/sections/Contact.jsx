import { Box, Link, Stack, Typography } from '@mui/material';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import Section from '../components/Section';
import Reveal from '../components/Reveal';
import ContactForm from '../components/ContactForm';
import { profile } from '../data/profile';
import { isConfigured, linkProps } from '../utils/links';

export default function Contact() {
  const { github, linkedin, email } = profile.social;

  const links = [
    isConfigured(email) && { label: 'Email', value: email.trim(), props: { href: `mailto:${email.trim()}` } },
    linkProps(github) && { label: 'GitHub', value: 'View my code', props: linkProps(github) },
    linkProps(linkedin) && { label: 'LinkedIn', value: 'Connect with me', props: linkProps(linkedin) },
  ].filter(Boolean);

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let’s build something together."
      description="Have an opportunity, a project idea or just want to say hello? Send a message — I’d love to hear from you."
    >
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '0.8fr 1.2fr' }, gap: { xs: 6, md: 10 } }}>
        <Reveal>
          {links.length > 0 ? (
            <Stack component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }} aria-label="Contact links">
              {links.map(({ label, value, props }) => (
                <li key={label}>
                  <Link
                    {...props}
                    underline="none"
                    color="text.primary"
                    aria-label={props.target ? `${label}: ${value} (opens in a new tab)` : `${label}: ${value}`}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 2,
                      py: 2.5,
                      borderTop: '1px solid',
                      borderColor: 'divider',
                      transition: 'color .25s, padding-left .25s',
                      '&:hover': { color: 'primary.light', pl: 1 },
                      '& svg': { transition: 'transform .25s' },
                      '&:hover svg': { transform: 'translate(3px, -3px)' },
                    }}
                  >
                    <Box>
                      <Typography variant="overline" component="span" color="text.secondary" sx={{ display: 'block' }}>
                        {label}
                      </Typography>
                      <Typography component="span" sx={{ fontSize: '1.15rem', letterSpacing: '-0.01em', wordBreak: 'break-word' }}>
                        {value}
                      </Typography>
                    </Box>
                    <ArrowOutwardRoundedIcon fontSize="small" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </Stack>
          ) : (
            <Typography color="text.secondary" role="status">
              Contact links haven’t been added yet. Add your email, GitHub and LinkedIn in src/data/profile.js.
            </Typography>
          )}
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </Box>
    </Section>
  );
}
