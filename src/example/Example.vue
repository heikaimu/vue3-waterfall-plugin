<!--
 * @Description:
 * @Version: 2.0
 * @Author: Yaowen Liu
 * @Date: 2021-10-14 10:20:21
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-03-18 17:33:23
-->
<template>
  <div class="h-screen flex overflow-hidden">
    <!-- 左侧列表 -->
    <div class="flex-auto overflow-y-auto">
      <Waterfall
        :list="list"
        :row-key="options.rowKey"
        :gutter="options.gutter"
        :has-around-gutter="options.hasAroundGutter"
        :width="options.width"
        :breakpoints="options.breakpoints"
        :img-selector="options.imgSelector"
        :background-color="options.backgroundColor"
        :animation-effect="options.animationEffect"
        :animation-duration="options.animationDuration"
        :animation-delay="options.animationDelay"
        :lazyload="options.lazyload"
        :load-props="options.loadProps"
      >
        <template #item="{ item, url, index }">
          <div class="bg-gray-900 rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-linear hover:shadow-lg hover:shadow-gray-600 group">
            <div class="overflow-hidden">
              <LazyImg :url="url" class="cursor-pointer transition-all duration-300 ease-linear group-hover:scale-105" @click="handlePreview(item, url)" />
            </div>
            <div class="px-4 pt-2 pb-4 border-t border-t-gray-800">
              <h2 class="pb-4 text-gray-50 group-hover:text-yellow-500">
                {{ item.name }}
              </h2>
              <div class="pt-3 flex justify-between items-center border-t border-t-gray-800 border-opacity-50">
                <div class="w-7 h-7 rounded-full flex justify-center items-center cursor-pointer shadow-lg transition-all duration-300 ease-linear" :class="[item.star?'bg-yellow-900 text-yellow-500':'bg-gray-800 text-gray-700']" @click.stop="handleStar(item)">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div>
                  <button class="px-3 h-7 rounded-full bg-red-500 text-sm text-white shadow-lg transition-all duration-300 hover:bg-red-600" @click.stop="handleDelete(item, index)">
                    删除
                  </button>
                </div>
              </div>
            </div>
          </div>
        </template>
      </Waterfall>

      <div class="flex justify-center py-10 bg-gray-900">
        <button class="px-5 py-2 rounded-full bg-gray-700 text-md text-white cursor-pointer hover:bg-gray-800 transition-all duration-300" @click="handleLoadMore">
          加载更多
        </button>
      </div>
    </div>

    <!-- 右侧配置 -->
    <div class="h-full flex flex-col justify-between">
      <div class="p-4 border-b border-b-gray-100 shadow-md">
        <span v-if="isOpen" @click="handleToggleController(false)">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
          </svg>
        </span>
        <span v-else @click="handleToggleController(true)">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
          </svg>
        </span>
      </div>

      <div class="p-4 flex-auto overflow-y-auto">
        <ControllerForm v-if="isOpen" :form="options" />
      </div>

      <Github />
    </div>

    <!-- 大图预览 -->
    <el-dialog v-model="previewVisible" :title="previewTitle" width="800px">
      <img style="width:100%" :src="previewURL">
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
// import { LazyImg, Waterfall } from '../lib/index'
import { LazyImg, Waterfall } from 'vue-waterfall-plugin-next'
import 'vue-waterfall-plugin-next/style.css'
import loading from '../assets/loading.png'
import error from '../assets/error.png'
import type { ViewCard } from '../lib/types/waterfall'
import { getList } from './api'
import Github from './Github.vue'
import ControllerForm from './Form.vue'

// 侧边栏控制
function useSlideBar() {
  const isOpen = ref(true)
  function handleToggleController(flag: boolean) {
    isOpen.value = flag
  }

  return {
    isOpen,
    handleToggleController,
  }
}

function usePreview() {
  const previewVisible = ref(false)
  const previewTitle = ref<string | undefined>('')
  const previewURL = ref('')

  const handlePreview = (item: ViewCard, url: string) => {
    previewTitle.value = item.name
    previewURL.value = url
    previewVisible.value = true
  }

  return {
    previewVisible,
    previewTitle,
    previewURL,
    handlePreview,
  }
}

function useWaterfall() {
  const list = ref<ViewCard[]>([])
  const options = reactive({
    // 唯一key值
    rowKey: 'id',
    // 卡片之间的间隙
    gutter: 10,
    // 是否有周围的gutter
    hasAroundGutter: true,
    // 卡片在PC上的宽度
    width: 320,
    // 自定义行显示个数，主要用于对移动端的适配
    breakpoints: {
      1200: {
        // 当屏幕宽度小于等于1200
        rowPerView: 4,
      },
      800: {
        // 当屏幕宽度小于等于800
        rowPerView: 3,
      },
      500: {
        // 当屏幕宽度小于等于500
        rowPerView: 2,
      },
    },
    // 动画效果
    animationEffect: 'fadeInUp',
    // 动画时间
    animationDuration: 1000,
    // 动画延迟
    animationDelay: 300,
    // 背景色
    backgroundColor: '#2C2E3A',
    // imgSelector
    imgSelector: 'src.original',
    // 加载配置
    loadProps: {
      loading,
      error,
    },
    // 是否懒加载
    lazyload: true,
  })

  onMounted(() => {
    handleLoadMore()
  })

  // 加载更多
  function handleLoadMore() {
    list.value.push(...getList(30))
  }

  return {
    list,
    options,
    handleLoadMore,
  }
}

// 列表
const { list, options, handleLoadMore } = useWaterfall()

// 侧边栏控制
const { isOpen, handleToggleController } = useSlideBar()

const { previewVisible, previewTitle, previewURL, handlePreview } = usePreview()

// 编辑
function handleStar(item: ViewCard) {
  item.star = !item.star
}

// 删除
function handleDelete(item: ViewCard, index: number) {
  list.value.splice(index, 1)
}
</script>
