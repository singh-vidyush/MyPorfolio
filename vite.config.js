import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  for (const k in env) {
    if (!process.env[k]) {
      process.env[k] = env[k];
    }
  }

  return {
    plugins: [
      react(), 
      tailwindcss(),
    {
      name: 'api-contact-mock',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url === '/api/contact' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => body += chunk.toString());
            req.on('end', async () => {
              try {
                req.body = JSON.parse(body);
              } catch(e) { 
                req.body = {}; 
              }
              
              const { default: handler } = await import('./api/contact.js');
              
              // Mock Vercel res methods
              res.status = function(code) { 
                this.statusCode = code; 
                return this; 
              };
              res.json = function(data) {
                this.setHeader('Content-Type', 'application/json');
                this.end(JSON.stringify(data));
              };
              
              await handler(req, res);
            });
            return;
          }
          next();
        });
      }
    }
  ]
  };
});
