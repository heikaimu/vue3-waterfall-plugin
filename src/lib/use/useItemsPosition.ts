/*
 * @Author: Yaowen Liu
 * @Date: 2022-03-08 15:04:02
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-03-18 14:09:18
 */
import type { Ref } from 'vue'
import { nextTick, onBeforeUpdate, ref } from 'vue'
import { getMax, getMin } from '../utils/math'
import { addClass, hasClass, prefixStyle } from '../utils/dom'
import type { WaterfallProps } from '../types/waterfall'
import type { CssStyleObject } from '../types/util'

const transform = prefixStyle('transform')

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
    const style = content.style as CssStyleObject

    if (content && !hasClass(content, 'animated')) {
      const durationSec = `${props.animationDuration / 1000}s`
      const delaySec = `${props.animationDelay / 1000}s`
      style['animation-duration'] = durationSec
      style['-webkit-animation-duration'] = durationSec
      style['animation-delay'] = delaySec
      style['-webkit-animation-delay'] = delaySec
      style.visibility = 'visible'
      addClass(content, 'animated')
      addClass(content, props.animationEffect)
    }
  }

  const setPosX = () => {
    posX = []
    posY = []
    for (let i = 0; i < rowCount.value; i++) {
      let x = 0
      if (props.hasAroundGutter)
        x = props.gutter * (i + 1) + itemWidth.value * i + waterfallOffsetX.value

      else
        x = props.gutter * i + itemWidth.value * i + waterfallOffsetX.value

      posX.push(x)
      posY.push(props.hasAroundGutter ? props.gutter : 0)
    }
  }

  const setPosXY = () => {
    for (let i = 0; i < itemRefs.length; i++) {
      const item = itemRefs[i]

      const minPosY: number = getMin(posY)
      const minPosYIndex = posY.indexOf(minPosY)
      const currentPosX = posX[minPosYIndex]

      // set position
      const style = item.style as CssStyleObject
      style.visibility = 'hidden'
      if (transform) style[transform] = `translate3d(${currentPosX}px,${minPosY}px, 0)`

      // update group height by current item element
      const { height } = item.getBoundingClientRect()
      posY[minPosYIndex] += height + props.gutter

      // add animation
      addAnimation(item)
    }
  }

  const setWrapperHeight = () => {
    const maxHeight = props.list.length > 0 ? getMax(posY) : 0
    waterfallWrapperHeight.value = props.hasAroundGutter ? maxHeight : maxHeight - props.gutter
  }

  const setPosition = async() => {
    setPosX()
    await nextTick()
    setPosXY()
    setWrapperHeight()
  }

  return {
    waterfallWrapperHeight,
    setPosition,
    setItemRef,
  }
}
