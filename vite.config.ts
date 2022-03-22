/*
 * @Author: Yaowen Liu
 * @Date: 2022-03-11 16:26:27
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-03-21 18:21:41
 */
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const target = process.env.TARGET

let buildConfig: Record<string, unknown> = {
  lib: {
    entry: path.resolve(__dirname, 'src/index.ts'),
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

if (target === 'page') {
  buildConfig = {
    outDir: 'example',
  }
}

export default defineConfig({
  build: { ...buildConfig },
  plugins: [vue()],
  server: {
    open: true,
  },
})
