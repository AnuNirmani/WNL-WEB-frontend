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
    // Dev proxy to avoid browser CORS issues. Frontend can call 
    // relative paths like '/api/...', which will be proxied to the backend.
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
        // If backend is mounted under /api already, no rewrite needed;
        // keep it explicit in case of future changes.
        rewrite: (path) => path,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})

