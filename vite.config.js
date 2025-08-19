import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Essential for Heroku deployments of SPAs to ensure correct asset paths
  base: '/',
  build: {
    // Vite's default output directory for built static files
    outDir: 'dist',
  }
})
