import { createTheme } from '@mui/material/styles';

// Design tokens — change these to re-skin the whole site.
export const tokens = {
  bg: '#0b0b0e',
  paper: '#121217',
  ink: '#f4efe6', // warm white
  inkMuted: 'rgba(244, 239, 230, 0.66)',
  line: 'rgba(244, 239, 230, 0.1)',
  lavender: '#b4aefc',
  lavenderSoft: '#cfcbff',
  blue: '#8fb4ff',
};

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: tokens.lavender, light: tokens.lavenderSoft, dark: '#8c85e6', contrastText: tokens.bg },
    secondary: { main: tokens.blue },
    background: { default: tokens.bg, paper: tokens.paper },
    text: { primary: tokens.ink, secondary: tokens.inkMuted },
    divider: tokens.line,
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily:
      '"Space Grotesk Variable", "Space Grotesk", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    h1: { fontSize: 'clamp(2.9rem, 8.5vw, 6rem)', fontWeight: 500, lineHeight: 1.02, letterSpacing: '-0.045em' },
    h2: { fontSize: 'clamp(2.1rem, 5vw, 3.6rem)', fontWeight: 500, lineHeight: 1.06, letterSpacing: '-0.035em' },
    h3: { fontSize: 'clamp(1.2rem, 2vw, 1.45rem)', fontWeight: 500, lineHeight: 1.3, letterSpacing: '-0.015em' },
    h4: { fontSize: '1.125rem', fontWeight: 500, lineHeight: 1.35 },
    body1: { fontSize: '1.0625rem', lineHeight: 1.7 },
    body2: { fontSize: '0.9375rem', lineHeight: 1.65 },
    overline: { fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.2em', lineHeight: 1.5 },
    button: { textTransform: 'none', fontWeight: 500, letterSpacing: 0 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        html { scroll-behavior: auto; -webkit-text-size-adjust: 100%; }
        @media (prefers-reduced-motion: no-preference) { html { scroll-behavior: smooth; } }
        body { background: ${tokens.bg}; overflow-x: hidden; text-rendering: optimizeLegibility; }
        ::selection { background: rgba(180, 174, 252, 0.35); }
        *:focus-visible { outline: 2px solid ${tokens.lavender} !important; outline-offset: 3px; }
        section[tabindex="-1"]:focus, section[tabindex="-1"]:focus-visible { outline: none !important; }
        section[id] { scroll-margin-top: 64px; }

        @keyframes orbFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
        @keyframes statusPulse {
          0% { box-shadow: 0 0 0 0 rgba(126, 224, 168, 0.5); }
          70% { box-shadow: 0 0 0 8px rgba(126, 224, 168, 0); }
          100% { box-shadow: 0 0 0 0 rgba(126, 224, 168, 0); }
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `,
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 999, padding: '10px 22px', fontSize: '0.95rem' },
        sizeLarge: { padding: '13px 28px', fontSize: '1rem' },
        sizeSmall: { padding: '6px 14px', fontSize: '0.875rem' },
        containedPrimary: {
          backgroundColor: tokens.ink,
          color: tokens.bg,
          '&:hover': { backgroundColor: '#ffffff' },
        },
        outlinedPrimary: {
          borderColor: 'rgba(244, 239, 230, 0.24)',
          color: tokens.ink,
          '&:hover': { borderColor: 'rgba(244, 239, 230, 0.5)', backgroundColor: 'rgba(244, 239, 230, 0.06)' },
        },
        textPrimary: { color: tokens.inkMuted, '&:hover': { color: tokens.ink, backgroundColor: 'rgba(244,239,230,0.05)' } },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: tokens.inkMuted,
          border: `1px solid ${tokens.line}`,
          '&:hover': { color: tokens.ink, backgroundColor: 'rgba(244,239,230,0.06)', borderColor: 'rgba(244,239,230,0.28)' },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 999 },
        outlined: { borderColor: 'rgba(244, 239, 230, 0.16)', color: tokens.ink },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(244, 239, 230, 0.16)' },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(244, 239, 230, 0.34)' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: tokens.lavender },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': { borderColor: '#f48a8a' },
        },
      },
    },
    MuiLink: {
      defaultProps: { underline: 'hover' },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: { backgroundImage: 'none', backgroundColor: tokens.paper },
      },
    },
  },
});

export default theme;
