import { defineConfig, loadEnv } from 'vite'
import postcss from 'postcss';
import vue from '@vitejs/plugin-vue'

export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return defineConfig({
    plugins: [vue(), postcss()],
    esbuild: {
      drop: ['console', 'debugger']
    },
    server: {
      host: "0.0.0.0",
      strictPort: true,
      port: 5173,
      origin: 'https://leads.carrierami.dev',
      // TODO: this is not working as there is no node server with an engine running in docker
      proxy: {
        '/.netlify/functions': {
          target: 'http://127.0.0.1:8000/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/\.netlify\/functions/, ''),

          configure: (proxy, _options) => {
            proxy.on('error', (err, _req, _res) => {
              console.log('proxy error', err);
            });
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              console.log('Sending Request to the Target:', req.method, req.url);
            });
            proxy.on('proxyRes', (proxyRes, req, _res) => {
              console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
            });
          },
        },
      },
      fs: {
        deny: [
          'vite.config.js', 
          'tailwind.config.js', 
          'postcss.config.js',
          'package.json',
          'package-lock.json',
        ]
      }
    },
  });
}