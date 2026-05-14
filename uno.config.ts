import { defineConfig, presetWind3, presetAttributify, presetIcons } from 'unocss'
import type { Theme } from '@unocss/preset-mini'


export default defineConfig({
  // ...UnoCSS options
  shortcuts: {
    'icon-btn': 'text-1.2em bg-transparent border-none cursor-pointer opacity-75 hover:text-primary',
  },
  theme: <Theme>{
    colors: {
      'ok': 'var(--c-ok)',
      'primary': 'var(--c-primary)',
      'primary-deep': 'var(--c-primary-deep)',
      'mis': 'var(--c-mis)'
    }
  },
  presets: [
    presetWind3(),
    presetAttributify(),
    presetIcons({
      scale: 1.2
    }),
  ]
})