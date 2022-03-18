/*
 * @Author: Yaowen Liu
 * @Date: 2022-03-08 14:59:00
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-03-18 14:10:31
 */
import { ref } from 'vue'
import { getItemWidth } from '../utils/itemWidth'
import type { WaterfallProps } from '../types/waterfall'
import type { Nullable } from '../types/util'

export function useWrapperSize(props: WaterfallProps) {
  const waterfallWrapper = ref<Nullable<HTMLElement>>(null)
  let waterfallWrapperWidth = 0
  const itemWidth = ref(0)
  const rowCount = ref(0)
  const waterfallOffsetX = ref(0)

  const setWaterfallWrapperWidth = () => {
    if (!waterfallWrapper.value)
      return

    const wrapperEle = waterfallWrapper.value.getBoundingClientRect()
    waterfallWrapperWidth = wrapperEle ? wrapperEle.width : 0
  }

  const setItemWidth = () => {
    itemWidth.value = getItemWidth({
      breakpoints: props.breakpoints,
      wrapperWidth: waterfallWrapperWidth,
      gutter: props.gutter,
      hasAroundGutter: props.hasAroundGutter,
      initWidth: props.width,
    })
  }

  const setRowCount = () => {
    if (props.hasAroundGutter)
      rowCount.value = Math.floor((waterfallWrapperWidth - props.gutter) / (itemWidth.value + props.gutter))

    else
      rowCount.value = Math.floor((waterfallWrapperWidth + props.gutter) / (itemWidth.value + props.gutter))
  }

  const setWaterfallOffsetX = () => {
    let contextWidth = 0
    if (props.hasAroundGutter)
      contextWidth = rowCount.value * (itemWidth.value + props.gutter) + props.gutter

    else
      contextWidth = rowCount.value * (itemWidth.value + props.gutter) - props.gutter

    waterfallOffsetX.value = (waterfallWrapperWidth - contextWidth) / 2
  }

  return {
    waterfallWrapper,
    waterfallOffsetX,
    itemWidth,
    rowCount,
    setWaterfallWrapperWidth,
    setItemWidth,
    setRowCount,
    setWaterfallOffsetX,
  }
}
