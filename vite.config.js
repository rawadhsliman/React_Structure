import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), autoprefixer({})],
});
