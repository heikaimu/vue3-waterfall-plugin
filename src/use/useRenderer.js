/*
 * @Author: Yaowen Liu
 * @Date: 2022-03-08 15:09:13
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-03-09 10:53:43
 */
import { nextTick } from 'vue';
import { debounce } from '../lib/util';

export function useRenderer(setWaterfallWrapperWidth, setItemWidth, setRowCount, setWaterfallOffsetX, setPosition) {
  const renderer = debounce(async function () {
    setWaterfallWrapperWidth();
    await nextTick();
    setItemWidth();
    await nextTick();
    setRowCount();
    await nextTick();
    setWaterfallOffsetX();
    await nextTick();
    setPosition();
  }, 300);

  return {
    renderer,
  };
}
