import { m } from 'framer-motion';

/**
 * Fade-and-rise entrance, triggered once when scrolled into view.
 * <MotionConfig reducedMotion="user"> (see App.jsx) removes the movement for users who prefer reduced motion.
 */
export default function Reveal({ children, delay = 0, y = 24, style, ...rest }) {
  return (
    <m.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      style={style}
      {...rest}
    >
      {children}
    </m.div>
  );
}
