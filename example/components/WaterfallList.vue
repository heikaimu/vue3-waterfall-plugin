<!--
 * @Date: 2023-03-01 15:43:25
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2023-09-21 09:23:42
 * @FilePath: /vue3-waterfall/example/components/WaterfallList.vue
-->
<template>
  <div style="width:100%">
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
      :cross-origin="options.crossOrigin"
    >
      <template #item="{ item, url, index }">
        <div class="bg-gray-900 rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-linear hover:shadow-lg hover:shadow-gray-600 group" @click="handleClick(item)">
          <div class="overflow-hidden">
            <LazyImg :url="url" class="cursor-pointer transition-all duration-300 ease-linear group-hover:scale-105" @load="imageLoad" @error="imageError" @success="imageSuccess" />
          </div>
          <div class="px-4 pt-2 pb-4 border-t border-t-gray-800">
            <h2 class="pb-4 text-gray-50 group-hover:text-yellow-300">
              {{ item.name }}
            </h2>
            <div class="pt-3 flex justify-between items-center border-t border-t-gray-600 border-opacity-50">
              <div class="text-gray-50">
                $ {{ item.price }}
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
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { onMounted, ref } from 'vue'
import { LazyImg, Waterfall } from '../../lib/index'
// import { LazyImg, Waterfall } from 'vue-waterfall-plugin-next'
// import 'vue-waterfall-plugin-next/dist/style.css'
import type { ViewCard } from '../../lib/types/waterfall'
import { getList } from '../api'

const props = defineProps({
  list: {
    type: Array,
  },
  options: {
    type: Object as PropType<any>,
  },
  pageSize: {
    type: Number,
    default: 100,
  },
})

const emits = defineEmits({
  cardClick: null,
})

// 列表
const list = ref<ViewCard[]>([])
const page = ref(1)

onMounted(() => {
  handleLoadMore()
})

// 加载更多
function handleLoadMore() {
  getList({
    page: page.value,
    pageSize: props.pageSize,
  }).then((res) => {
    list.value.push(...res)
    page.value += 1
  })
}

// 删除
function handleDelete(item: ViewCard, index: number) {
  list.value.splice(index, 1)
}

function handleClick(item: ViewCard) {
  emits('cardClick', item)
}

function imageLoad(url: string) {
  // console.log(`${url}: 加载完成`)
}

function imageError(url: string) {
  console.error(`${url}: 加载失败`)
}

function imageSuccess(url: string) {
  // console.log(`${url}: 加载成功`)
}
</script>

<style scoped>

</style>
