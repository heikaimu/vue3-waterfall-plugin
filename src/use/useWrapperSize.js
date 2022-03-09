/*
 * @Author: Yaowen Liu
 * @Date: 2022-03-08 14:59:00
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-03-09 10:47:08
 */
import { ref, nextTick } from 'vue';

export function useWrapperSize(props) {
  const waterfallWrapper = ref(null);
  let waterfallWrapperWidth = 0;
  const itemWidth = ref(0);
  const rowCount = ref(0);
  const waterfallOffsetX = ref(0);

  const setWaterfallWrapperWidth = () => {
    const wrapperEle = waterfallWrapper.value.getBoundingClientRect();
    waterfallWrapperWidth = wrapperEle ? wrapperEle.width : 0;
  };

  const setItemWidth = () => {
    itemWidth.value = getItemWidth({
      breakpoints: props.breakpoints,
      wrapperWidth: waterfallWrapperWidth,
      gutter: props.gutter,
      hasAroundGutter: props.hasAroundGutter,
      initWidth: props.width,
    });
  };

  const setRowCount = () => {
    if (props.hasAroundGutter) {
      rowCount.value = Math.floor((waterfallWrapperWidth - props.gutter) / (itemWidth.value + props.gutter));
    } else {
      rowCount.value = Math.floor((waterfallWrapperWidth + props.gutter) / (itemWidth.value + props.gutter));
    }
  };

  const setWaterfallOffsetX = () => {
    let contextWidth = 0;
    if (props.hasAroundGutter) {
      contextWidth = rowCount.value * (itemWidth.value + props.gutter) + props.gutter;
    } else {
      contextWidth = rowCount.value * (itemWidth.value + props.gutter) - props.gutter;
    }

    waterfallOffsetX.value = (waterfallWrapperWidth - contextWidth) / 2;
  };

  return {
    waterfallWrapper,
    waterfallOffsetX,
    itemWidth,
    rowCount,
    setWaterfallWrapperWidth,
    setItemWidth,
    setRowCount,
    setWaterfallOffsetX,
  };
}

// 宽度获取
export function getItemWidth({ breakpoints, wrapperWidth, gutter, hasAroundGutter, initWidth }) {
  const orderSize = _getOrderBreakpoints({ breakpoints });
  const width = _getItemWidth({ breakpoints, orderSize, wrapperWidth, gutter, hasAroundGutter, initWidth });
  return width;
}

function _getOrderBreakpoints({ breakpoints }) {
  return Object.keys(breakpoints)
    .map((key) => {
      return Number(key);
    })
    .sort((a, b) => a - b);
}

function _getItemWidthByBreakpoint({ breakpoints, wrapperWidth, size, gutter, hasAroundGutter }) {
  const currentBreakpoint = breakpoints[size];
  if (currentBreakpoint) {
    if (hasAroundGutter) {
      return (wrapperWidth - gutter) / currentBreakpoint.rowPerView - gutter;
    } else {
      return (wrapperWidth - (currentBreakpoint.rowPerView - 1) * gutter) / currentBreakpoint.rowPerView;
    }
  }
}

function _getItemWidth({ breakpoints, orderSize, wrapperWidth, gutter, hasAroundGutter, initWidth }) {
  for (const size of orderSize) {
    if (wrapperWidth <= size) {
      return _getItemWidthByBreakpoint({ breakpoints, wrapperWidth, size, gutter, hasAroundGutter });
    }
  }
  return initWidth;
}
