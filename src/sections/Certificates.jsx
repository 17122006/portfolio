import { Box } from '@mui/material';
import Section from '../components/Section';
import Reveal from '../components/Reveal';
import CertificateItem from '../components/CertificateItem';
import EmptyState from '../components/EmptyState';
import { certificates } from '../data/certificates';

export default function Certificates() {
  return (
    <Section
      id="certificates"
      eyebrow="Certificates"
      title="Learning & credentials"
      description="Courses and certifications that back up what I’ve been learning."
    >
      {certificates.length === 0 ? (
        <EmptyState title="No certificates yet" message="Add entries in src/data/certificates.js and they’ll be listed here." />
      ) : (
        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, borderBottom: '1px solid', borderColor: 'divider' }}>
          {certificates.map((certificate, index) => (
            <Box component="li" key={certificate.id ?? certificate.title}>
              <Reveal delay={Math.min(index, 4) * 0.06} y={16}>
                <CertificateItem certificate={certificate} />
              </Reveal>
            </Box>
          ))}
        </Box>
      )}
    </Section>
  );
}
