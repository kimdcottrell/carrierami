import { defineConfig, loadEnv } from 'vite'
import postcss from 'postcss';
import vue from '@vitejs/plugin-vue'

export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return defineConfig({
    plugins: [vue(), postcss()],
    server: {
      host: "0.0.0.0",
      strictPort: true,
      port: 5173,
      origin: 'https://leads.carrierami.dev',
      // mailchimp throws cors errors if you access any of it via a browser, so it mumst be proxied
      proxy: {
        '/mailchimp': {
          target: 'https://us12.api.mailchimp.com/3.0/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/mailchimp/, ''),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `api_key ${process.env.VITE_MAILCHIMP_API_KEY}`
          },
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