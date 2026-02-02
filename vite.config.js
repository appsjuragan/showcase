import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    base: '/showcase/',
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                diskofflaner: resolve(__dirname, 'diskofflaner/index.html'),
            },
        },
    },
})
