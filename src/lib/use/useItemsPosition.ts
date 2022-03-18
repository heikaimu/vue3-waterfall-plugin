/*
 * @Author: Yaowen Liu
 * @Date: 2022-03-08 15:04:02
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-03-18 17:29:27
 */
import type { Ref } from 'vue'
import { onBeforeUpdate, ref } from 'vue'
import { getMax, getMin } from '../utils/math'
import { addClass, hasClass, prefixStyle } from '../utils/dom'
import type { WaterfallProps } from '../types/waterfall'
import type { CssStyleObject } from '../types/util'

const transform = prefixStyle('transform')
const duration = prefixStyle('animation-duration')
const delay = prefixStyle('animation-delay')
const transition = prefixStyle('transition')
const fillMode = prefixStyle('animation-fill-mode')

export function useItemsPosition(props: WaterfallProps, itemWidth: Ref<number>, rowCount: Ref<number>, waterfallOffsetX: Ref<number>) {
  let itemRefs: HTMLElement[] = []
  let posX: number[] = []
  let posY: number[] = []
  const waterfallWrapperHeight = ref(0)

  const setItemRef = (el: any): void => {
    if (el)
      itemRefs.push(el)
  }

  onBeforeUpdate(() => {
    itemRefs = []
  })

  const addAnimation = (item: HTMLElement) => {
    const content = item!.firstChild as HTMLElement

    if (content && !hasClass(content, 'animated')) {
      const durationSec = `${props.animationDuration / 1000}s`
      const delaySec = `${props.animationDelay / 1000}s`
      const style = content.style as CssStyleObject
      style.visibility = 'visible'
      if (duration)
        style[duration] = durationSec

      if (delay)
        style[delay] = delaySec

      if (fillMode)
        style[fillMode] = 'both'

      addClass(content, 'animated')
      addClass(content, props.animationEffect)
    }
  }

  // 初始化x集合y集合
  const initXandY = () => {
    posX = new Array(rowCount.value).fill(0)
    posY = new Array(rowCount.value).fill(props.hasAroundGutter ? props.gutter : 0)
  }

  // 计算x集合
  const setPosX = () => {
    for (let i = 0; i < rowCount.value; i++) {
      let x = 0
      if (props.hasAroundGutter)
        x = props.gutter * (i + 1) + itemWidth.value * i + waterfallOffsetX.value

      else
        x = props.gutter * i + itemWidth.value * i + waterfallOffsetX.value

      posX[i] = x
    }
  }

  const setPosY = () => {
    for (const item of itemRefs) {
      const curY: number = getMin(posY)
      const curYIndex = posY.indexOf(curY)
      const curX = posX[curYIndex]

      // 设置x,y
      const style = item.style as CssStyleObject
      if (transform) style[transform] = `translate3d(${curX}px,${curY}px, 0)`

      // 更新当前index的y值
      const { height } = item.getBoundingClientRect()
      posY[curYIndex] += height + props.gutter

      // 添加动画时间
      console.log('transition', transition)
      if (transition) style[transition] = '.3s'

      // 添加入场动画
      addAnimation(item)
    }
  }

  const setWrapperHeight = () => {
    const maxHeight = props.list.length > 0 ? getMax(posY) : 0
    waterfallWrapperHeight.value = props.hasAroundGutter ? maxHeight : maxHeight - props.gutter
  }

  const setPosition = async() => {
    initXandY()
    setPosX()
    setPosY()
    setWrapperHeight()
  }

  return {
    waterfallWrapperHeight,
    setPosition,
    setItemRef,
  }
}
