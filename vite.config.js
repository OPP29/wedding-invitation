import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: './', // Enables seamless hosting on GitHub Pages, Vercel, Netlify, etc.
  plugins: [
    react(),
    tailwindcss(),
  ],
})
