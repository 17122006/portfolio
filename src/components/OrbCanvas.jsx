import { lazy, Suspense, useCallback, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { useReducedMotion } from 'framer-motion';
import ErrorBoundary from './ErrorBoundary';
import StaticOrb from './StaticOrb';
import usePageVisible from '../hooks/usePageVisible';
import useInView from '../hooks/useInView';
import { detectWebGL, isLowPowerDevice, isMobileDevice } from '../utils/capabilities';

// three.js + react-three-fiber only download when this chunk is requested.
const OrbScene = lazy(() => import('./OrbScene'));

/**
 * Decides *whether* and *how* to show the 3D orb:
 *  - no WebGL / low-power / reduced-motion → static CSS orb
 *  - phones & tablets → simplified scene (fewer polygons, no antialias, no pointer tracking)
 *  - tab hidden or hero scrolled offscreen → render loop paused
 *  - any load/runtime/context-loss error → static CSS orb
 * The wrapper ignores pointer events so it can never block text, links or scrolling.
 */
export default function OrbCanvas() {
  const containerRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const pageVisible = usePageVisible();
  const inView = useInView(containerRef);
  const [failed, setFailed] = useState(false);
  const [capable] = useState(() => detectWebGL() && !isLowPowerDevice());
  const [simplified] = useState(() => isMobileDevice());
  const handleFail = useCallback(() => setFailed(true), []);

  const show3D = capable && !reducedMotion && !failed;

  return (
    <Box ref={containerRef} aria-hidden="true" sx={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {show3D ? (
        <ErrorBoundary fallback={<StaticOrb />}>
          <Suspense fallback={<StaticOrb />}>
            <OrbScene active={pageVisible && inView} simplified={simplified} onFail={handleFail} />
          </Suspense>
        </ErrorBoundary>
      ) : (
        <StaticOrb animated={!reducedMotion} />
      )}
    </Box>
  );
}
