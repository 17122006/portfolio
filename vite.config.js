import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Set VITE_BASE=/repo-name/ when deploying to GitHub Pages project sites.
export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [react()],
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 900, // the lazy-loaded 3D chunk (three.js) is intentionally large
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('/three/') || id.includes('@react-three')) return 'three';
          if (id.includes('@mui') || id.includes('@emotion')) return 'mui';
          if (id.includes('framer-motion') || id.includes('motion-dom') || id.includes('motion-utils')) return 'motion';
          return undefined;
        },
      },
    },
  },
});
