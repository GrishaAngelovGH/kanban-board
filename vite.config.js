import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['@babel/plugin-transform-private-methods']
      }
    })
  ],
  resolve: {
    alias: {
      components: "/src/components",
      hooks: "/src/hooks",
      persistent: "/src/persistent",
      assets: "/src/assets"
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setup.js'
  }
})
