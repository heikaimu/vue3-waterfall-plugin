/*
 * @Author: Yaowen Liu
 * @Date: 2022-03-23 13:28:54
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-03-23 13:34:18
 */
import type { Ref } from 'vue'
import { ref } from 'vue'
import { useResizeObserver, watchDebounced } from '@vueuse/core'
import type { Nullable } from './../types/util.d'

export function useWrapperResize(waterfallWrapper: Ref<Nullable<HTMLElement>>) {
  const lastWidth = ref(0)

  useResizeObserver(waterfallWrapper, (entries) => {
    const entry = entries[0]
    const { width } = entry.contentRect
    lastWidth.value = width
  })

  watchDebounced(lastWidth, () => {
    console.log('宽度改变了')
  }, {
    debounce: 300,
  })
}
