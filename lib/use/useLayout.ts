/*
 * @Author: Yaowen Liu
 * @Date: 2022-03-08 15:04:02
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2023-03-01 16:38:44
 */
import type { Ref } from 'vue'
import { ref } from 'vue'
import { addClass, hasClass, prefixStyle } from '../utils/dom'
import type { WaterfallProps } from '../types/waterfall'
import type { CssStyleObject, Nullable } from '../types/util'

const transform = prefixStyle('transform')
const duration = prefixStyle('animation-duration')
const delay = prefixStyle('animation-delay')
const transition = prefixStyle('transition')
const fillMode = prefixStyle('animation-fill-mode')

export function useLayout(
  props: WaterfallProps,
  colWidth: Ref<number>,
  cols: Ref<number>,
  offsetX: Ref<number>,
  waterfallWrapper: Ref<Nullable<HTMLElement>>,
  horizontalOrder: Boolean,
  heightDifference: number,
) {
  const posY = ref<number[]>([])
  const wrapperHeight = ref(0)

  // 获取对应y下标的x的值
  const getX = (index: number): number => {
    const count = props.hasAroundGutter ? index + 1 : index
    return props.gutter * count + colWidth.value * index + offsetX.value
  }

  // 初始y
  const initY = (): void => {
    const curSpace = props.space || props.gutter
    posY.value = new Array(cols.value).fill(props.hasAroundGutter ? curSpace : 0)
  }

  // 添加入场动画
  const animation = addAnimation(props)

  // 排版
  const layoutHandle = async(): Promise<boolean> => {
    return new Promise((resolve) => {
    // 初始化y集合
      initY()

      // 构造列表
      const items: HTMLElement[] = []
      if (waterfallWrapper && waterfallWrapper.value) {
        waterfallWrapper.value.childNodes.forEach((el: any) => {
          if (el!.className === 'waterfall-item')
            items.push(el)
        })
      }

      // 获取节点
      if (items.length === 0) return false

      // 遍历节点
      for (let i = 0; i < items.length; i++) {
        const curItem = items[i] as HTMLElement

        // 最小的y值
        let yIndex = findIndexWithinHeightDifference(posY.value, heightDifference)
        let minY = posY.value[yIndex]
        // let minY = Math.min.apply(null, posY.value)
        // 最小y的下标
        // let yIndex = posY.value.indexOf(minY)

        // 如果配置了从左到右
        if (horizontalOrder) {
          yIndex = i % cols.value
          minY = posY.value[yIndex]
        }

        // 当前下标对应的x
        const curX = getX(yIndex)

        // 设置x,y,width
        const style = curItem.style as CssStyleObject

        // 设置偏移
        if (transform) style[transform] = `translate3d(${Math.floor(curX)}px,${Math.floor(minY)}px, 0)`
        style.width = `${colWidth.value}px`

        // 隐藏
        style.visibility = 'visible'

        // 更新当前index的y值
        const { height } = curItem.getBoundingClientRect()
        const curSpace = props.space || props.gutter
        posY.value[yIndex] += height + curSpace

        // 添加入场动画
        if (!props.animationCancel) {
          animation(curItem, () => {
            // 添加动画时间
            const time = props.posDuration / 1000
            if (transition) style[transition] = `transform ${time}s`
          })
        }
      }

      wrapperHeight.value = Math.max.apply(null, posY.value)

      setTimeout(() => {
        resolve(true)
      }, props.posDuration)
    })
  }

  return {
    wrapperHeight,
    layoutHandle,
  }
}

// 获取误差范围内的最小Y
function findIndexWithinHeightDifference(arr: number[], heightDifference: number): number {
  if (arr.length === 0) return -1

  const minValue = Math.min(...arr)
  const upperLimit = minValue + heightDifference

  let resultIndex = -1

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] >= minValue && arr[i] <= upperLimit) {
      resultIndex = i
      break // 找到第一个符合范围的直接返回
    }
  }

  return resultIndex
}

// 动画
function addAnimation(props: WaterfallProps) {
  return (item: HTMLElement, callback?: () => void) => {
    const content = item!.firstChild as HTMLElement
    if (content && !hasClass(content, props.animationPrefix)) {
      const durationSec = `${props.animationDuration / 1000}s`
      const delaySec = `${props.animationDelay / 1000}s`
      const style = content.style as CssStyleObject
      addClass(content, props.animationPrefix)
      addClass(content, props.animationEffect)

      if (duration)
        style[duration] = durationSec

      if (delay)
        style[delay] = delaySec

      if (fillMode)
        style[fillMode] = 'both'

      if (callback) {
        setTimeout(() => {
          callback()
        }, props.animationDuration + props.animationDelay)
      }
    }
  }
}
