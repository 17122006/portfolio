import { Box, Button, Chip, Typography } from '@mui/material';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import { linkProps } from '../utils/links';

export default function CertificateItem({ certificate }) {
  const { title, issuer, date, credentialUrl, isPlaceholder } = certificate;
  const credentialProps = linkProps(credentialUrl);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '180px 1fr auto' },
        gap: { xs: 1, md: 4 },
        alignItems: { md: 'center' },
        py: { xs: 3, md: 4 },
        px: { md: 1 },
        borderTop: '1px solid',
        borderColor: 'divider',
        transition: 'background-color .3s, padding-left .3s',
        '&:hover': { bgcolor: 'rgba(255,255,255,0.025)', pl: { md: 2 } },
      }}
    >
      <Typography variant="body2" color="text.secondary" component="p">
        {date}
      </Typography>
      <Box>
        <Typography variant="h3" component="h3" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
          {title}
          {isPlaceholder && <Chip label="Placeholder" size="small" variant="outlined" sx={{ color: 'primary.light' }} />}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {issuer}
        </Typography>
      </Box>
      {credentialProps && (
        <Button
          component="a"
          size="small"
          variant="outlined"
          endIcon={<OpenInNewRoundedIcon />}
          aria-label={`View credential for ${title} (opens in a new tab)`}
          sx={{ justifySelf: { xs: 'start', md: 'end' }, mt: { xs: 1.5, md: 0 } }}
          {...credentialProps}
        >
          View credential
        </Button>
      )}
    </Box>
  );
}
