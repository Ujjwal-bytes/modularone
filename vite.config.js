import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1000,
    minify: 'esbuild',
    sourcemap: false,
    // Remove manualChunks completely - let Vite handle it automatically
  },
  server: {
    port: 5173,
  },
})