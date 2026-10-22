import { useCallback, useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { navItems, sectionIds } from '../data/navigation';
import { profile } from '../data/profile';
import { scrollToId } from '../utils/scroll';
import useActiveSection from '../hooks/useActiveSection';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 24 });

  const go = useCallback((event, id) => {
    event.preventDefault();
    scrollToId(id);
  }, []);

  const goFromDrawer = useCallback((event, id) => {
    event.preventDefault();
    setOpen(false);
    // Wait for the drawer to release its scroll lock before scrolling.
    window.setTimeout(() => scrollToId(id), 280);
  }, []);

  return (
    <AppBar
      position="fixed"
      color="transparent"
      elevation={0}
      sx={{
        backgroundImage: 'none',
        bgcolor: scrolled ? 'rgba(11, 11, 14, 0.72)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px) saturate(140%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(140%)' : 'none',
        borderBottom: '1px solid',
        borderColor: scrolled ? 'divider' : 'transparent',
        transition: 'background-color .3s, border-color .3s',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 72 }, justifyContent: 'space-between' }}>
          <Box
            component="a"
            href="#home"
            onClick={(e) => go(e, 'home')}
            aria-label={`${profile.name} — back to top`}
            sx={{
              display: 'inline-flex',
              alignItems: 'baseline',
              color: 'text.primary',
              textDecoration: 'none',
              fontSize: '1.5rem',
              fontWeight: 600,
              letterSpacing: '-0.04em',
              borderRadius: 1,
            }}
          >
            {profile.initials}
            <Box component="span" sx={{ color: 'primary.main' }}>
              .
            </Box>
          </Box>

          <Box component="nav" aria-label="Primary" sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box component="ul" sx={{ display: 'flex', gap: 0.5, listStyle: 'none', m: 0, p: 0 }}>
              {navItems.map(({ id, label }) => {
                const isActive = active === id;
                return (
                  <li key={id}>
                    <Button
                      component="a"
                      href={`#${id}`}
                      onClick={(e) => go(e, id)}
                      aria-current={isActive ? 'true' : undefined}
                      color="inherit"
                      size="small"
                      sx={{
                        position: 'relative',
                        color: isActive ? 'text.primary' : 'text.secondary',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          left: '50%',
                          bottom: 2,
                          width: 4,
                          height: 4,
                          borderRadius: '50%',
                          bgcolor: 'primary.main',
                          transform: `translateX(-50%) scale(${isActive ? 1 : 0})`,
                          transition: 'transform .25s',
                        },
                        '&:hover': { color: 'text.primary', bgcolor: 'rgba(244,239,230,0.05)' },
                      }}
                    >
                      {label}
                    </Button>
                  </li>
                );
              })}
            </Box>
          </Box>

          <IconButton
            aria-label="Open navigation menu"
            aria-controls="mobile-nav"
            aria-expanded={open}
            aria-haspopup="dialog"
            onClick={() => setOpen(true)}
            sx={{ display: { md: 'none' } }}
          >
            <MenuRoundedIcon />
          </IconButton>
        </Toolbar>
      </Container>

      <Drawer
        id="mobile-nav"
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ '& .MuiDrawer-paper': { width: 'min(86vw, 320px)', p: 2 } }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, px: 1 }}>
          <Typography variant="overline" color="text.secondary">
            Menu
          </Typography>
          <IconButton aria-label="Close navigation menu" size="small" onClick={() => setOpen(false)}>
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        </Box>
        <Box component="nav" aria-label="Mobile">
          <List disablePadding>
            {navItems.map(({ id, label }) => (
              <ListItemButton
                key={id}
                component="a"
                href={`#${id}`}
                selected={active === id}
                aria-current={active === id ? 'true' : undefined}
                onClick={(e) => goFromDrawer(e, id)}
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  '&.Mui-selected': { bgcolor: 'rgba(180,174,252,0.12)' },
                  '&.Mui-selected:hover': { bgcolor: 'rgba(180,174,252,0.18)' },
                }}
              >
                <ListItemText
                  primary={label}
                  sx={{ '& .MuiListItemText-primary': { fontSize: '1.2rem', letterSpacing: '-0.02em' } }}
                />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
