import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/malayeka-hijab/', // Sesuaikan dengan nama repo di GitHub
  plugins: [react()],
})