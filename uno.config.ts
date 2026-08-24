import { defineConfig, presetWind3, presetAttributify, presetIcons } from 'unocss'
import type { Theme } from '@unocss/preset-mini'


export default defineConfig({
  // ...UnoCSS options
  shortcuts: {
    'icon-btn': 'text-1.2em bg-transparent border-none cursor-pointer opacity-75 hover:text-primary',
    'bg-base': 'bg-white dark:bg-[#121212]',
    'square-btn': 'flex flex-gap-2 items-center border border-base px2 py1 relative !outline-none',
    'border-base': 'border-gray-400:10',
    'square-btn-mark': 'absolute h-2 w-2 bg-primary -right-0.2rem -top-0.2rem',
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