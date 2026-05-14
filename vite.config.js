import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        // Uncomment as case study pages are added:
        // 'project-a': resolve(__dirname, 'src/projects/project-a.html'),
      },
    },
  },
})
