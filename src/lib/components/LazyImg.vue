<!--
 * @Author: Yaowen Liu
 * @Date: 2022-03-09 10:29:50
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-03-23 17:10:53
-->
<template>
  <div class="lazy__box">
    <img ref="lazyRef" class="lazy__img" alt="">
  </div>
</template>

<script lang="ts">
// import type { Ref } from 'vue'
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
    // const sizeChangeTime = inject('sizeChangeTime') as Ref<number>
    const imgLoaded = inject('imgLoaded') as () => void
    const lazy = inject('lazy') as Lazy
    const lazyRef = ref<Nullable<HTMLImageElement>>(null)

    // watch(sizeChangeTime, () => {
    //   resize()
    // })

    onMounted(() => {
      render()
    })

    onUnmounted(() => {
      unRender()
    })

    function render() {
      if (!lazyRef.value)
        return

      lazy.mount(lazyRef.value, props.url, () => {
        imgLoaded()
      })
    }

    function unRender() {
      if (!lazyRef.value)
        return

      lazy.unmount(lazyRef.value)
    }

    // function resize() {
    //   if (!lazyRef.value)
    //     return

    //   lazy.resize(lazyRef.value, () => {
    //     imgLoaded()
    //   })
    // }

    return {
      lazyRef,
    }
  },
})
</script>

<style scoped>
.lazy__box {
  width: 100%;
  display: flex;
  justify-content: center;
}
.lazy__img {
  display: block;
}

.lazy__img[lazy=loading] {
  padding: 5em 0;
  width: 48px;
}

.lazy__img[lazy=loaded] {
  width: 100%;
}

.lazy__img[lazy=error] {
  padding: 5em 0;
  width: 48px;
}
</style>
