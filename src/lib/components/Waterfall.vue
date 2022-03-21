<!--
 * @Description:
 * @Version: 2.0
 * @Author: Yaowen Liu
 * @Date: 2021-10-14 10:20:21
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-03-21 11:04:35
-->
<template>
  <div
    ref="waterfallWrapper"
    class="waterfall-list"
    :style="{ height: `${waterfallWrapperHeight}px` }"
  >
    <div
      v-for="(item, index) in list"
      :ref="setItemRef"
      :key="getKey(item, index)"
      class="waterfall-item"
      :style="{ width: `${itemWidth}px` }"
    >
      <div class="waterfall-card">
        <slot name="item" :item="item" :index="index" :url="getRenderURL(item)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, nextTick, provide, ref, watch } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import { useItemsPosition, useWrapperSize } from '../use'
import Lazy from '../utils/Lazy'
import { debounce, getValue } from '../utils/util'
import type { ViewCard } from '../types/waterfall'

export default defineComponent({
  props: {
    list: {
      type: Array as PropType<ViewCard[]>,
      default: () => [],
    },
    rowKey: {
      type: String,
      default: 'id',
    },
    imgSelector: {
      type: String,
      default: 'src',
    },
    width: {
      type: Number,
      default: 200,
    },
    breakpoints: {
      type: Object,
      default: () => ({
        1200: {
          // when wrapper width < 1200
          rowPerView: 3,
        },
        800: {
          // when wrapper width < 800
          rowPerView: 2,
        },
        500: {
          // when wrapper width < 500
          rowPerView: 1,
        },
      }),
    },
    gutter: {
      type: Number,
      default: 10,
    },
    hasAroundGutter: {
      type: Boolean,
      default: true,
    },
    animationPrefix: {
      type: String,
      default: 'animate__animated',
    },
    animationEffect: {
      type: String,
      default: 'fadeIn',
    },
    animationDuration: {
      type: Number,
      default: 1000,
    },
    animationDelay: {
      type: Number,
      default: 300,
    },
    backgroundColor: {
      type: String,
      default: '#fff',
    },
    lazyload: {
      type: Boolean,
      default: true,
    },
    loadProps: {
      type: Object,
      default: () => {},
    },
    delay: {
      type: Number,
      default: 300,
    },
  },

  setup(props) {
    // 容器块信息
    const {
      waterfallWrapper,
      waterfallOffsetX,
      itemWidth,
      rowCount,
      setWaterfallWrapperWidth,
      setItemWidth,
      setRowCount,
      setWaterfallOffsetX,
    } = useWrapperSize(props)

    // 容器高度，块定位
    const { waterfallWrapperHeight, setPosition, setItemRef } = useItemsPosition(
      props,
      itemWidth,
      rowCount,
      waterfallOffsetX,
    )

    // 渲染
    const renderer = debounce(async() => {
      setWaterfallWrapperWidth()
      await nextTick()
      setItemWidth()
      await nextTick()
      setRowCount()
      await nextTick()
      setWaterfallOffsetX()
      await nextTick()
      setPosition()
    }, props.delay)

    // 当容器宽度发生变化的时候更新位置
    const lastWidth = ref(0)
    useResizeObserver(waterfallWrapper, (entries) => {
      const entry = entries[0]
      const { width } = entry.contentRect
      lastWidth.value = width
    })

    watch(lastWidth, () => {
      renderer()
    })

    // width,gutter变化的时候重新渲染
    watch(
      () => [props.width, props.gutter, props.hasAroundGutter, props.list.length],
      () => {
        renderer()
      },
      { deep: true },
    )

    function updatePosition() {
      renderer()
    }

    function getRenderURL(item: ViewCard) {
      return getValue(item, props.imgSelector)[0]
    }

    function getKey(item: ViewCard, index: number) {
      return item[props.rowKey] || index
    }

    const lazy = new Lazy(props.lazyload, props.loadProps)
    provide('lazy', lazy)
    provide('updatePosition', updatePosition)

    return {
      waterfallWrapper,
      itemWidth,
      rowCount,
      waterfallWrapperHeight,
      setItemRef,
      getRenderURL,
      getKey,
    }
  },
})
</script>

<style scoped>
.waterfall-list {
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: v-bind(backgroundColor);
}
.waterfall-item {
  position: absolute;
  left: 0;
  top: 0;
  /* transition: .3s; */
  /* 初始位置设置到屏幕以外，避免懒加载失败 */
  transform: translate3d(0, 3000px, 0);
  visibility: hidden;
}

/* 初始的入场效果 */
@-webkit-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.fadeIn {
  -webkit-animation-name: fadeIn;
  animation-name: fadeIn;
}
</style>
