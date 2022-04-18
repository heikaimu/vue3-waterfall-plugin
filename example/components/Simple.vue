<template>
  <div ref="waterfallWrapper" :style="{ height: `${wrapperHeight}px` }">
    <div v-for="item in list" :key="item.id" class="waterfall-item">
      <img :src="item.url" @load="imageLoad">
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { getList } from '../api'

const list = ref([])
for (let i = 1; i < 30; i++) {
  list.value.push({
    url: `https://images.weserv.nl/?url=https://api.mz-moe.cn/img/img${i}.jpg`,
  })
}

const waterfallWrapper = ref(null)
const wrapperWidth = ref(0)
const wrapperHeight = ref(0)
onMounted(() => {
  wrapperWidth.value = waterfallWrapper.value.offsetWidth
})

const gutter = ref(20)
const colWidth = ref(300)
const cols = computed(() => {
  return Math.floor((wrapperWidth.value - gutter.value) / (colWidth.value + gutter.value))
})

const offsetX = computed(() => {
  const contextWidth = cols.value * (colWidth.value + gutter.value) + gutter.value
  return (wrapperWidth.value - contextWidth) / 2
})

function layout() {
  const posY = new Array(cols.value).fill(gutter.value)
  const items = document.querySelectorAll('.waterfall-item')
  for (let i = 0; i < items.length; i++) {
    const curItem = items[i]
    // 最小的y值
    const minY = Math.min.apply(null, posY)
    // 最小y的下标
    const minYIndex = posY.indexOf(minY)
    // 当前下标对应的x
    const curX = gutter.value * (minYIndex + 1) + colWidth.value * minYIndex + offsetX.value
    // 设置偏移
    curItem.style.transform = `translate3d(${curX}px,${minY}px, 0)`
    curItem.style.width = `${colWidth.value}px`
    // 更新当前index的y值
    const { height } = curItem.getBoundingClientRect()
    posY[minYIndex] += height + gutter.value
  }

  // 设置容器高度
  wrapperHeight.value = Math.max.apply(null, posY)
}

onMounted(() => {
  layout()
})

function imageLoad(e) {
  layout()
}

</script>

<style scoped>
.waterfall-item {
  position: absolute;
  left: 0;
  top: 0;
}

.waterfall-item img {
  display: black;
}
</style>
