<!--
 * @Description:
 * @Version: 2.0
 * @Author: Yaowen Liu
 * @Date: 2021-10-14 10:20:21
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2023-08-23 13:19:44
-->
<template>
  <div ref="waterfallWrapper" class="waterfall-list" :style="{ height: `${wrapperHeight}px` }">
    <div
      v-for="(item, index) in list"
      :key="getKey(item, index)"
      class="waterfall-item"
    >
      <div class="waterfall-card">
        <slot :item="item" :index="index" :url="getRenderURL(item)" />
        <slot name="item" :item="item" :index="index" :url="getRenderURL(item)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, provide, ref, watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { useCalculateCols, useLayout } from '../use'
import Lazy from '../utils/Lazy'
import type { LazyType } from '../types/lazy'
import { getValue } from '../utils/util'
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
    space: {
      type: Number,
      default: null,
    },
    hasAroundGutter: {
      type: Boolean,
      default: true,
    },
    posDuration: {
      type: Number,
      default: 300,
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
    animationCancel: {
      type: Boolean,
      default: false,
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
      default: () => { },
    },
    crossOrigin: {
      type: Boolean,
      default: true,
    },
    delay: {
      type: Number,
      default: 300,
    },
    align: {
      type: String,
      default: 'center',
    },
    horizontalOrder: {
      type: Boolean,
      default: false,
    },
    heightDifference: {
      type: Number,
      default: 0,
    },
  },

  setup(props, ctx) {
    const lazy: LazyType = new Lazy(props.lazyload, props.loadProps, props.crossOrigin)
    provide('lazy', lazy)

    // 容器块信息
    const {
      waterfallWrapper,
      wrapperWidth,
      colWidth,
      cols,
      offsetX,
    } = useCalculateCols(props)

    // 容器高度，块定位
    const { wrapperHeight, layoutHandle } = useLayout(
      props,
      colWidth,
      cols,
      offsetX,
      waterfallWrapper,
      props.horizontalOrder,
      props.heightDifference,
    )

    // 用单层防抖包住全部逻辑
    const renderer = useDebounceFn(() => {
      // 等一帧，让浏览器先应用新的 colWidth / wrapperWidth
      requestAnimationFrame(() => {
        layoutHandle().then(() => ctx.emit('afterRender'))
        // 🟢 关键：延时再执行一次修正布局
        setTimeout(() => {
          layoutHandle()
        }, props.posDuration + 50) // 延迟略大于动画时间
      })
    }, props.delay)

    // 监听 wrapperWidth、colWidth、list
    watch(
      () => [wrapperWidth.value, colWidth.value, props.list],
      () => {
        if (wrapperWidth.value > 0) renderer()
      },
      { deep: true },
    )

    // 尺寸宽度变化防抖触发
    const sizeChangeTime = ref(0)

    provide('sizeChangeTime', sizeChangeTime)

    // 图片加载完成
    provide('imgLoaded', renderer)

    // 根据选择器获取图片地址
    const getRenderURL = (item: ViewCard): string => {
      return getValue(item, props.imgSelector)[0]
    }

    // 获取唯一值
    const getKey = (item: ViewCard, index: number): string => {
      return item[props.rowKey] || index
    }

    return {
      colWidth,
      waterfallWrapper,
      wrapperHeight,
      getRenderURL,
      getKey,
      renderer,
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
