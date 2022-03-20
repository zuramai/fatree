import { fileURLToPath, URL } from 'url'
import Icons from 'unplugin-icons/vite'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Icons({ 
      compiler: 'vue3',
      autoInstall: true,
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/assets/scss/abstracts/_animations.scss" as *;
          @use "@/assets/scss/abstracts/_variables.scss" as *;
          @use "@/assets/scss/abstracts/_mixins.scss" as *;
          @use "@/assets/scss/helpers/_helpers.scss" as *;
        `
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
})
