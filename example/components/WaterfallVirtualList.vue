<template>
  <div style="min-height: 100%; width:100%">
    <WaterfallVirtual :list="list">
      <template #default="{ item, url, index }">
        <div>dwad</div>
      </template>
    </WaterfallVirtual>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getList } from '../api'
import { WaterfallVirtual } from '../../lib/index'

const sizeMap = [
  { width: 400, height: 800 },
  { width: 300, height: 800 },
  { width: 400, height: 500 },
  { width: 400, height: 400 },
]

// 随机返回一个尺寸对象
function getRandomSize() {
  const index = Math.floor(Math.random() * sizeMap.length)
  return sizeMap[index]
}

const list = ref([])
onMounted(async() => {
  const res = await getList({
    page: 0,
    pageSize: 200,
  })

  list.value = res.map((item) => {
    return {
      ...item,
      size: getRandomSize(),
    }
  })
})

</script>

<style scoped>

</style>
