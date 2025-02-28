import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    proxy: {
      '/api': {
        target: 'https://tcs-api.beaconfireinc.com/tcs-app/api/v1',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace('/api', ''),
      },
    },
  },
  plugins: [react()],
});
