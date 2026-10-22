import { IconButton, Stack, Tooltip } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import { profile } from '../data/profile';
import { isConfigured, linkProps } from '../utils/links';

/** Icon links for every social/contact value that is configured in data/profile.js. Renders nothing if none are. */
export default function SocialLinks({ size = 'medium', includeEmail = false, sx }) {
  const { github, linkedin, email } = profile.social;

  const items = [
    { key: 'github', label: 'GitHub', Icon: GitHubIcon, props: linkProps(github) },
    { key: 'linkedin', label: 'LinkedIn', Icon: LinkedInIcon, props: linkProps(linkedin) },
    includeEmail && isConfigured(email)
      ? { key: 'email', label: 'Email', Icon: MailOutlineRoundedIcon, props: { href: `mailto:${email.trim()}` } }
      : null,
  ].filter((item) => item && item.props);

  if (items.length === 0) return null;

  return (
    <Stack direction="row" spacing={1.25} component="ul" aria-label="Social links" sx={{ listStyle: 'none', p: 0, m: 0, ...sx }}>
      {items.map(({ key, label, Icon, props }) => (
        <li key={key}>
          <Tooltip title={label} arrow>
            <IconButton
              component="a"
              size={size}
              aria-label={props.target ? `${label} (opens in a new tab)` : label}
              {...props}
            >
              <Icon fontSize={size === 'small' ? 'small' : 'medium'} />
            </IconButton>
          </Tooltip>
        </li>
      ))}
    </Stack>
  );
}
