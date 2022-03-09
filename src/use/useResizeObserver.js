/*
 * @Author: Yaowen Liu
 * @Date: 2022-03-08 15:06:34
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-03-09 15:47:11
 */
import { onMounted, onBeforeUnmount } from 'vue';

export function useResizeObserver(renderer) {
  let wrapperObserver = null;
  let currentWidth = 0;

  const addWrapperSizeListener = () => {
    const dom = document.getElementById('waterfallWrapper');
    wrapperObserver = new ResizeObserver((entries) => {
      const newWidth = ((entries[0] || {}).contentRect || {}).width || 0;
      if (newWidth === currentWidth) {
        return;
      }

      currentWidth = newWidth;
      renderer();
    });
    wrapperObserver.observe(dom);
  };

  const removeWrapperSizeListener = () => {
    const dom = document.getElementById('waterfallWrapper');
    wrapperObserver.unobserve(dom);
  };

  onMounted(() => {
    addWrapperSizeListener();
  });

  onBeforeUnmount(() => {
    removeWrapperSizeListener();
  });
}
