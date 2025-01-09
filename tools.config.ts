import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx'

import path from 'path'
import { defineConfig } from 'vite'


export default defineConfig({
  base: './',
  root: './tools',
  publicDir: '../resources',
  build: {
    rollupOptions: {
      input: {
        app: './tools/index.html'
      }
    }
  },
  plugins: [
    vue(),
    vueJsx(),
  ],
  server: {
    
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, "./tools/src"),
      'bt-engine': path.resolve(__dirname, "./bt-engine"),
      '@resources': path.resolve(__dirname, "./resources"),
      'sewerMaster': path.resolve(__dirname, "./game/apps/sewerMaster"),
    }
  }
})
