<!--
 * @Author: Yaowen Liu
 * @Date: 2022-03-09 10:29:50
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-03-18 14:15:54
-->
<template>
  <img ref="lazyRef" class="lazyload-box__img" alt="" srcset="">
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, onUnmounted, ref } from 'vue'
import type Lazy from '../types/lazy'
import type { Nullable } from '../types/util'

export default defineComponent({
  props: {
    url: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const updatePosition = inject('updatePosition') as () => void
    const lazy = inject('lazy') as Lazy
    const lazyRef = ref<Nullable<HTMLImageElement>>(null)

    // watch(
    //   () => props.url,
    //   () => {
    //     lazy.update(lazyRef.value, props.url, () => {
    //       updatePosition();
    //     });
    //   },
    // );

    onMounted(() => {
      if (!lazyRef.value)
        return

      lazy.mount(lazyRef.value, props.url, () => {
        updatePosition()
      })
    })

    onUnmounted(() => {
      if (!lazyRef.value)
        return

      lazy.unmount(lazyRef.value)
    })

    return {
      lazyRef,
    }
  },
})
</script>

<style scoped>
.lazyload-box__img {
  display: block;
  width: 100%;
  line-height: 1;
}
</style>
