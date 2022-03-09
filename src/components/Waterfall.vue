<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Yaowen Liu
 * @Date: 2021-10-14 10:20:21
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-03-09 17:56:59
-->
<template>
  <div
    id="waterfallWrapper"
    class="waterfall-list"
    ref="waterfallWrapper"
    :style="{ height: `${waterfallWrapperHeight}px` }"
  >
    <div
      class="waterfall-item"
      v-for="(item, index) in list"
      :ref="setItemRef"
      :key="item[rowKey] || index"
      :style="{ width: `${itemWidth}px` }"
    >
      <div class="waterfall-card">
        <slot name="item" :item="item" :index="index" :url="getRenderURL(item)" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, watch, provide } from 'vue';
import { useWrapperSize, useItemsPosition, useResizeObserver, useRenderer } from '../use';
import Lazy from '../lib/Lazy';
import { getValue } from '../lib/util';

export default defineComponent({
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    rowKey: {
      type: String,
      default: 'id'
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
    } = useWrapperSize(props);

    // 容器高度，块定位
    const { waterfallWrapperHeight, setPosition, setItemRef } = useItemsPosition(
      props,
      itemWidth,
      rowCount,
      waterfallOffsetX,
    );

    // 构造渲染器
    const { renderer } = useRenderer(
      setWaterfallWrapperWidth,
      setItemWidth,
      setRowCount,
      setWaterfallOffsetX,
      setPosition,
    );

    // 窗口大小变化的时候重新渲染
    useResizeObserver(renderer);

    // width,gutter变化的时候重新渲染
    watch(
      () => [props.width, props.gutter, props.hasAroundGutter],
      () => {
        renderer();
      },
    );

    // 列表发生变化的时候，重新加载图片
    watch(
      () => [props.list.length],
      () => {
        renderer(); 
      },
      { deep: true },
    );

    function updatePosition() {
      renderer();
    }

    function getRenderURL(item) {
      return getValue(item, props.imgSelector)[0];
    }

    const lazy = new Lazy(props.lazyload, props.loadProps);

    provide('lazy', lazy);
    provide('updatePosition', updatePosition);

    return {
      waterfallWrapper,
      itemWidth,
      rowCount,
      waterfallWrapperHeight,
      setItemRef,
      getRenderURL,
    };
  },
});
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
  transition: .3s;
  /* 初始位置设置到屏幕以外，避免懒加载失败 */
  transform: translate3d(0, 3000px, 0);
  visibility: hidden;
}

/* animation */
.animated {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
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
