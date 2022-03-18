/*
 * @Author: Yaowen Liu
 * @Date: 2022-03-11 16:26:27
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-03-17 13:50:13
 */
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  let buildConfig = {}
  if (mode === 'example') {
    buildConfig = {
      outDir: 'example',
    }
  }
  else if (mode === 'lib') {
    buildConfig = {
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'MyLib',
        fileName: (format: any) => `my-lib.${format}.js`,
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
  return {
    build: buildConfig,
    resolve: {
      alias: {
        '@/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
    plugins: [vue()],
    server: {
      open: true,
    },
  }
})
