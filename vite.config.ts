import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS()
  ],
  resolve: {
    alias: {
      '~/': `${path.resolve(import.meta.dirname, 'src')}/`,
      '@hankit/tools': path.resolve(import.meta.dirname, 'packages/tools/src/index.ts'),
    }
  }
})
