<!--
 * @Author: Yaowen Liu
 * @Date: 2022-03-09 10:29:50
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2023-09-21 09:24:00
-->
<template>
  <div class="lazy__box">
    <div class="lazy__resource">
      <img ref="lazyRef" class="lazy__img" :title="title" :alt="alt" @load="imageLoad">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, onUnmounted, ref } from 'vue'
import type { LazyType } from '../types/lazy'
import type { Nullable } from '../types/util'

export default defineComponent({
  props: {
    url: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    alt: {
      type: String,
      default: '',
    },
  },

  setup(props, ctx) {
    const imgLoaded = inject('imgLoaded') as () => void
    const lazy = inject('lazy') as LazyType
    const lazyRef = ref<Nullable<any>>(null)

    onMounted(() => {
      render()
    })

    onUnmounted(() => {
      unRender()
    })

    function render() {
      if (!lazyRef.value)
        return

      lazy.mount(lazyRef.value, props.url, (status) => {
        imgLoaded()
        if (status)
          ctx.emit('success', props.url)
        else
          ctx.emit('error', props.url)
      })
    }

    function unRender() {
      if (!lazyRef.value)
        return

      lazy.unmount(lazyRef.value)
    }

    function imageLoad() {
      ctx.emit('load', props.url)
    }

    return {
      lazyRef,
      imageLoad,
    }
  },
})
</script>

<style scoped>
.lazy__box {
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  overflow: hidden;
  position: relative;
}

.lazy__resource {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
}

.lazy__img {
  display: block;
}

.lazy__img[lazy="loading"] {
  padding: 5em 0;
  width: 48px;
  width: 48px;
}

.lazy__img[lazy="loaded"] {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.lazy__img[lazy="error"] {
  padding: 5em 0;
  width: 48px;
  height: auto;
}
</style>
