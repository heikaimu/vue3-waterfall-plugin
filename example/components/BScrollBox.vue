<script setup lang="ts">
import BScroll from '@better-scroll/core'
import ScrollBar from '@better-scroll/scroll-bar'
import ObserveDOM from '@better-scroll/observe-dom'
import MouseWheel from '@better-scroll/mouse-wheel'
import Pullup from '@better-scroll/pull-up'
import type { BScrollConstructor } from '@better-scroll/core/dist/types/BScroll'
import { onMounted, ref } from 'vue'

const emits = defineEmits({
  scroll: null,
  pullingUp: null,
})

// 鼠标插件
BScroll.use(MouseWheel)
BScroll.use(ObserveDOM)
BScroll.use(ScrollBar)
BScroll.use(Pullup)

// 滚动
const scrollEl = ref(null)
const bs = ref<BScrollConstructor>()
const loading = ref(false)
onMounted(() => {
  initBs()
})

function initBs() {
  if (!scrollEl.value)
    return

  bs.value = new BScroll(scrollEl.value, {
    probeType: 3,
    click: true,
    pullUpLoad: true,
    observeDOM: true, // 开启 observe-dom 插件
    mouseWheel: {
      speed: 20,
      invert: false,
      easeTime: 300,
    },
    scrollY: true,
    scrollbar: true,
  })

  bs.value.on('scroll', (data: any) => {
    emits('scroll', data)
  })

  bs.value.on('pullingUp', () => {
    emits('pullingUp')
    loading.value = true
  })
}

function finishPullUp() {
  if (bs.value) {
    bs.value.finishPullUp()
    bs.value.refresh()
    loading.value = false
  }
}

function scrollToElement(el: HTMLElement) {
  if (bs.value)
    bs.value.scrollToElement(el, 300, true, true)
}

defineExpose({
  scrollToElement,
  finishPullUp,
})
</script>

<template>
  <div ref="scrollEl" class="scroll-wrapper">
    <div>
      <slot />

      <p class="loading-text">
        {{ loading ? '加载中' : '触底后加载数据' }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.scroll-wrapper {
  height: 100%;
  position: relative;
  overflow: hidden;
  /* background-color: #f9f9f9; */
}

.loading-text {
  padding: 20px;
  text-align: center;
  background-color: #fff;
}
</style>
