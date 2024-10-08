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
      entry: path.resolve(__dirname, 'lib/index.ts'), // 入口文件
      name: 'MyLib', // 库的全局变量名称
      fileName: (format: any) => `my-lib.${format}.js`, // 输出文件名
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
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
