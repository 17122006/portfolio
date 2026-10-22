import { Box } from '@mui/material';

/**
 * Pure-CSS stand-in for the 3D orb. Used while the 3D chunk loads, if WebGL is
 * unavailable or fails, on very low-powered devices, and for reduced-motion users.
 */
export default function StaticOrb({ animated = true }) {
  return (
    <Box sx={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
      <Box
        sx={{
          position: 'relative',
          width: 'min(76%, 360px)',
          aspectRatio: '1 / 1',
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 32% 26%, rgba(207,203,255,0.95) 0%, rgba(156,151,255,0.6) 34%, rgba(70,82,160,0.4) 66%, rgba(11,11,14,0) 71%)',
          boxShadow: 'inset -22px -32px 64px rgba(11,11,14,0.55), 0 40px 90px rgba(120,115,230,0.16)',
          animation: animated ? 'orbFloat 8s ease-in-out infinite' : 'none',
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: '-14%',
            borderRadius: '50%',
            border: '1px solid rgba(207,203,255,0.18)',
          },
        }}
      />
    </Box>
  );
}
