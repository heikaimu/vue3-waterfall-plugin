<template>
  <div class="tab-wrapper">
    <div class="tab-wrapper__top">
      <p v-for="(id, index) in list" :key="index" :class="{active: activeIndex === index}" @click="handleTab(index)">
        TAB-{{ id }}
      </p>
    </div>
    <div class="tab-wrapper__bottom">
      <div v-for="(id, index) in list" :key="index" class="tab-page">
        <div v-show="activeIndex === index" class="tab-page-box">
          <WaterfallList
            :page-size="20" :options="options"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import loading from '../assets/loading.png'
import error from '../assets/error.png'
import WaterfallList from './WaterfallList.vue'

const activeIndex = ref(0)
const list = ['1', '2', '3']
function handleTab(index) {
  activeIndex.value = index
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
  animationCancel: false,
  // 背景色
  backgroundColor: '#2C2E3A',
  // imgSelector
  imgSelector: 'src.original',
  // 加载配置
  loadProps: {
    loading,
    error,
    ratioCalculator: (width: number, height: number) => {
      // 我设置了最小宽高比
      const minRatio = 3 / 4
      const maxRatio = 4 / 3
      return Math.random() > 0.5 ? minRatio : maxRatio
    },
  },
  // 是否懒加载
  lazyload: true,
  align: 'center',
})
</script>

<style lang="scss" scoped>
.tab-wrapper {
  width: 400px;
  height: 100vh;
  box-sizing: border-box;
  padding-top: 60px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  &__top {
    flex: none;
    background-color: #e7e7e7;
    display: flex;

    p {
      flex: 1;
      text-align: center;
      line-height: 2;
      cursor: pointer;

      &.active {
        background-color: #ccc;
        color: #fff;
      }
    }
  }

  &__bottom {
    background-color: #f2f2f2;
    flex: 1;
    position: relative;
    overflow: hidden;
  }
}

.tab-page {

}

.tab-page-box {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow-y: auto;
}
</style>
