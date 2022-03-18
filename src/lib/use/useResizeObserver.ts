/*
 * @Author: Yaowen Liu
 * @Date: 2022-03-08 15:06:34
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-03-17 15:30:28
 */
import { onBeforeUnmount, onMounted } from 'vue'

export function useResizeObserver(renderer: () => void) {
  let wrapperObserver: ResizeObserver
  let currentWidth = 0

  const addWrapperSizeListener = () => {
    const dom = document.getElementById('waterfallWrapper') as HTMLElement
    wrapperObserver = new ResizeObserver((entries) => {
      const newWidth = ((entries[0] || {}).contentRect || {}).width || 0
      if (newWidth === currentWidth)
        return

      currentWidth = newWidth
      renderer()
    })
    wrapperObserver.observe(dom)
  }

  const removeWrapperSizeListener = () => {
    const dom = document.getElementById('waterfallWrapper') as HTMLElement
    wrapperObserver.unobserve(dom)
  }

  onMounted(() => {
    addWrapperSizeListener()
  })

  onBeforeUnmount(() => {
    removeWrapperSizeListener()
  })
}
