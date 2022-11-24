import { defineConfig } from 'vite'
import autoprefixer from 'autoprefixer'
import solidPlugin from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solidPlugin({})],
  server: {
    host: '0.0.0.0',
    port: 6868
  },
  css: {
    postcss: {
      plugins: [autoprefixer()]
    }
  },
  build: {
    outDir: './lib',
    lib: {
      entry: './src/main.ts',
      name: 'CyMenu',
      fileName: 'cy-menu',
      formats: ['es', 'cjs', 'umd', 'iife'],
    },
    rollupOptions: {
      output: {
        exports: 'named'
      }
    }
  }
})
