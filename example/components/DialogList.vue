<!--
 * @Date: 2023-03-01 15:43:09
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2023-03-01 16:40:07
 * @FilePath: /vue3-waterfall/example/components/DialogList.vue
-->
<template>
  <el-drawer v-model="drawer" size="50%" :with-header="false">
    <WaterfallList
      :page-size="20" :options="options"
    />
  </el-drawer>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { computed } from 'vue'
import WaterfallList from './WaterfallList.vue'

const props = defineProps({
  visible: {
    type: Boolean,
  },
  options: {
    type: Object as PropType<any>,
  },
})

const emits = defineEmits({
  'update:visible': null,
})

const drawer = computed({
  get() {
    return props.visible
  },
  set(val) {
    emits('update:visible', val)
  },
})
</script>

<style>
.el-drawer__body {
  padding: 0 !important;
}
</style>
