import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('chart.js') || id.includes('react-chartjs-2')) {
            return 'chartjs';
          }
          if (id.includes('@tanstack/react-query')) {
            return 'react-query';
          }
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
    cssCodeSplit: true,
  },
  server: {
    headers: {
      'Cache-Control': 'public, max-age=3600',
    },
  },
})
