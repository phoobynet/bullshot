import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {dirname, resolve} from 'path'
const __dirname = dirname(new URL(import.meta.url).pathname)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
        '@': resolve(__dirname, 'src')
    }
  }
})
