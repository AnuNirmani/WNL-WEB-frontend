import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Expose to local network
    port: 5174,
    open: true, // Automatically open browser
    strictPort: false, // Try next available port if 5173 is busy
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})

