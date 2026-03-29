import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    host: '0.0.0.0',
    allowedHosts: ['3000-imvfvhmipr96zn8g8lz1n-e93689a4.us2.manus.computer', 'localhost', '127.0.0.1']
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
