/*
 * @Author: Yaowen Liu
 * @Date: 2022-03-11 16:26:27
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-03-24 14:27:54
 */
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const target = process.env.TARGET

let buildConfig: Record<string, unknown> = {
  outDir: 'docs',
}

if (target === 'npm') {
  buildConfig = {
    lib: {
      entry: path.resolve(__dirname, 'lib/index.ts'),
      name: 'MyLib',
      fileName: (format: any) => `my-lib.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  }
}

export default defineConfig({
  base: './',
  plugins: [vue()],
  server: {
    hmr: true,
    port: 3000,
    host: '0.0.0.0',
  },
  build: { ...buildConfig },
})
