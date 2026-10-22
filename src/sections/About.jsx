import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import Section from '../components/Section';
import Reveal from '../components/Reveal';
import { profile } from '../data/profile';
import { linkProps } from '../utils/links';

function Label({ children }) {
  return (
    <Typography variant="overline" component="h3" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
      {children}
    </Typography>
  );
}

export default function About() {
  const { about, resumeUrl } = profile;
  const [lead, ...rest] = about.paragraphs;
  const resumeProps = linkProps(resumeUrl);

  return (
    <Section id="about" eyebrow="About" title="A little about me">
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.3fr 1fr' }, gap: { xs: 6, md: 10 } }}>
        <Reveal>
          {lead && (
            <Typography sx={{ fontSize: { xs: '1.35rem', md: '1.75rem' }, lineHeight: 1.4, letterSpacing: '-0.02em' }}>
              {lead}
            </Typography>
          )}
          {rest.map((paragraph) => (
            <Typography key={paragraph} color="text.secondary" sx={{ mt: 3 }}>
              {paragraph}
            </Typography>
          ))}
          {resumeProps && (
            <Button
              component="a"
              variant="outlined"
              size="large"
              startIcon={<DownloadRoundedIcon />}
              sx={{ mt: 5 }}
              {...resumeProps}
              {...(resumeProps.target ? {} : { download: true })}
            >
              Download resume
            </Button>
          )}
        </Reveal>

        <Reveal delay={0.1}>
          <Stack spacing={5}>
            {about.education?.length > 0 && (
              <Box>
                <Label>Education</Label>
                <Stack spacing={2.5} component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                  {about.education.map((entry) => (
                    <li key={`${entry.institution}-${entry.degree}`}>
                      <Typography variant="h4" component="p">
                        {entry.degree}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {entry.institution}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {entry.period}
                      </Typography>
                    </li>
                  ))}
                </Stack>
              </Box>
            )}

            {about.interests?.length > 0 && (
              <Box>
                <Label>Career interests</Label>
                <Stack component="ul" direction="row" sx={{ flexWrap: 'wrap', gap: 1, listStyle: 'none', p: 0, m: 0 }}>
                  {about.interests.map((interest) => (
                    <li key={interest}>
                      <Chip label={interest} variant="outlined" />
                    </li>
                  ))}
                </Stack>
              </Box>
            )}
          </Stack>
        </Reveal>
      </Box>
    </Section>
  );
}
