import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Expose to local network
    port: 5175,
    open: true, // Automatically open browser
    strictPort: true, // Fail if 5173 is busy so we notice conflict
    // Dev proxy to avoid browser CORS issues.
    // Frontend can call relative paths like '/api/...',
    // which will be proxied to the Laravel backend.
    proxy: {
      // Proxy contact_save.php to XAMPP server (MUST be before /api rule)
      '/contact_save.php': {
        target: 'http://localhost',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => {
          // Rewrite to full XAMPP path
          return '/WNL-Web4/WNL-WEB-frontend/public/contact_save.php';
        },
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            console.log('Proxy error for contact_save.php:', err.message);
          });
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('Proxying contact_save.php to:', proxyReq.path);
          });
        },
      },
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path,
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            console.error('API Proxy error:', err.message);
            console.error('Request URL:', req.url);
          });
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('Proxying API request to:', proxyReq.path);
          });
        },
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  publicDir: 'public'
})

