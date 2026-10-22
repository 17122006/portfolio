import { Box, Container } from '@mui/material';
import SectionHeading from './SectionHeading';

/** Shared layout for every content section: semantic <section>, labelled by its heading. */
export default function Section({ id, eyebrow, title, description, children }) {
  return (
    <Box
      component="section"
      id={id}
      tabIndex={-1}
      aria-labelledby={`${id}-title`}
      sx={{ py: { xs: 10, md: 16 }, position: 'relative' }}
    >
      <Container maxWidth="lg">
        <SectionHeading id={`${id}-title`} eyebrow={eyebrow} title={title} description={description} />
        <Box sx={{ mt: { xs: 6, md: 9 } }}>{children}</Box>
      </Container>
    </Box>
  );
}
