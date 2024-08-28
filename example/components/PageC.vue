<template>
  <div class="page-b-content">
    <BScrollBox ref="bs" @pullingUp="pullingUp">
      <Waterfall
        :list="list"
        :row-key="options.rowKey"
        :gutter="options.gutter"
        :has-around-gutter="options.hasAroundGutter"
        :width="options.width"
        :breakpoints="options.breakpoints"
        :img-selector="options.imgSelector"
        :background-color="options.backgroundColor"
        :lazyload="options.lazyload"
        :load-props="options.loadProps"
      >
        <template #default="{ item, url }">
          <div class="bg-gray-900 rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-linear hover:shadow-lg hover:shadow-gray-600 group">
            <div class="overflow-hidden">
              <LazyImg :url="url" class="cursor-pointer transition-all duration-300 ease-linear group-hover:scale-105" @load="imageLoad" @error="imageError" @success="imageSuccess" />
            </div>
            <div class="px-4 pt-2 pb-4 border-t border-t-gray-800">
              <h2 class="pb-4 text-gray-50 group-hover:text-yellow-300">
                {{ item.name }}
              </h2>
            </div>
          </div>
        </template>
      </Waterfall>
    </BScrollBox>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import type { ViewCard } from '../../lib/types/waterfall'
import { LazyImg, Waterfall } from '../../lib/index'
// import { LazyImg, Waterfall } from 'vue-waterfall-plugin-next'
// import 'vue-waterfall-plugin-next/dist/style.css'
import { getList } from '../api'
import loading from '../assets/loading.png'
import error from '../assets/error.png'
import BScrollBox from './BScrollBox.vue'

const useList = function() {
  const pages = ref([1, 2, 3, 4, 5])
  const page = ref(1)
  const list = ref<ViewCard[]>([])

  function handleChangePage(val: number) {
    page.value = val
    return handleLoadMore()
  }

  // 加载更多
  function handleLoadMore() {
    return new Promise((resolve, reject) => {
      getList({
        page: page.value,
        pageSize: 20,
      }).then((res) => {
        list.value.push(...res)
        resolve(true)
      })
    })
  }

  return {
    list,
    page,
    pages,
    handleLoadMore,
    handleChangePage,
  }
}

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
  animationEffect: 'animate__fadeInUp',
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
  crossOrigin: true,
})

const {
  list,
  page,
  pages,
  handleLoadMore,
  handleChangePage,
} = useList()

onMounted(() => {
  handleLoadMore()
})

const bs = ref(null)
async function pullingUp() {
  page.value += 1
  await handleChangePage(page.value)
  if (bs.value)
    bs.value.finishPullUp()
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
.page-b-content {
  height: 100vh;
  background-color: #2C2E3A;
}

.page-menus {
  position: fixed;
  left: 20px;
  bottom: 20px;
}

.page-menus__item {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid #e7e7e7;
  background-color: #fff;
  margin-bottom: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  color: #666;
}

.page-menus__item.active {
  background-color: #e75932;
  color: #fff;
}

/* .box1 {
  height: 500px;
  background-color: red;
}

.box2 {
  height: 500px;
  background-color: yellow;
}

.box3 {
  height: 500px;
  background-color: blue;
} */
</style>
