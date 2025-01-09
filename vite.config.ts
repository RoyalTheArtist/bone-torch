import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx'

import path from 'path'
import { defineConfig } from 'vite'


export default defineConfig({
  base: './',
  root: './',
  publicDir: './resources',
  plugins: [
    vue(),
    vueJsx(),
  ],
  server: {
    
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, "./game"),
      'bt-engine': path.resolve(__dirname, "./bt-engine"),
      '@resources': path.resolve(__dirname, "./resources"),
    }
  }
})
