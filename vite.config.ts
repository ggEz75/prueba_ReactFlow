import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Cualquier request a /api/* se redirige al servidor Express
      '/api': 'http://localhost:3001',
    },
  },
})