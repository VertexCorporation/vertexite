import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                tr: resolve(__dirname, 'tr/index.html'),
                en: resolve(__dirname, 'en/index.html'),
                fr: resolve(__dirname, 'fr/index.html'),
                es: resolve(__dirname, 'es/index.html'),
                id: resolve(__dirname, 'id/index.html'),
                az: resolve(__dirname, 'az/index.html'),
                ko: resolve(__dirname, 'ko/index.html'),
                nl: resolve(__dirname, 'nl/index.html'),
                hi: resolve(__dirname, 'hi/index.html'),
                de: resolve(__dirname, 'de/index.html'),
                ar: resolve(__dirname, 'ar/index.html'),
                zh: resolve(__dirname, 'zh/index.html'),
                pt: resolve(__dirname, 'pt/index.html'),
                ru: resolve(__dirname, 'ru/index.html'),
                it: resolve(__dirname, 'it/index.html'),
                ja: resolve(__dirname, 'ja/index.html')
            }
        }
    }
})
