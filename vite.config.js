import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig((config) => {
  if (config.mode === 'lib') {
    return {
      plugins: [vue()],
      build: {
        lib: {
          entry: path.resolve(__dirname, 'src/index.js'),
          name: 'VueWaterfallPluginNext',
          fileName: (format) => `vue-waterfall-plugin-next.${format}.js`,
        },
        rollupOptions: {
          // 不想被打包进来的依赖
          external: ['vue'],
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          output: {
            globals: {
              vue: 'Vue',
            },
          },
        },
      },
    };
  } else if (config.mode === 'preview') {
    return {
      plugins: [vue()],
      base: 'https://heikaimu.github.io/vue3-waterfall-plugin/preview/',
      build: {
        outDir: 'preview',
      },
    };
  } else {
    return {
      plugins: [vue()],
    };
  }
});
