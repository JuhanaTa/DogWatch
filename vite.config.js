import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/DogWatch/",
  build: {
    sourcemap: true, // Enable source maps for the build
  },
})
