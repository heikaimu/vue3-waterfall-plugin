/*
 * @Author: Yaowen Liu
 * @Date: 2022-03-08 15:04:02
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-03-09 16:43:24
 */
import { onBeforeUpdate, ref, nextTick } from 'vue';
import { getMin, getMax } from '../lib/math';
import { hasClass, addClass, prefixStyle } from '../lib/dom';

const transform = prefixStyle('transform');

export function useItemsPosition(props, itemWidth, rowCount, waterfallOffsetX) {
  let itemRefs = [];
  let posX = [];
  let posY = [];
  const waterfallWrapperHeight = ref(0);

  const setItemRef = (el) => {
    if (el) {
      itemRefs.push(el);
    }
  };

  onBeforeUpdate(() => {
    itemRefs = [];
  });

  const addAnimation = (item) => {
    const content = item.firstChild;
    if (!hasClass(content, 'animated')) {
      const durationSec = `${props.animationDuration / 1000}s`;
      const delaySec = `${props.animationDelay / 1000}s`;
      content.style['animation-duration'] = durationSec;
      content.style['-webkit-animation-duration'] = durationSec;
      content.style['animation-delay'] = delaySec;
      content.style['-webkit-animation-delay'] = delaySec;
      content.style.visibility = 'visible';
      addClass(content, 'animated');
      addClass(content, props.animationEffect);
    }
  };

  const setPosX = () => {
    posX = [];
    posY = [];
    for (let i = 0; i < rowCount.value; i++) {
      let x = 0;
      if (props.hasAroundGutter) {
        x = props.gutter * (i + 1) + itemWidth.value * i + waterfallOffsetX.value;
      } else {
        x = props.gutter * i + itemWidth.value * i + waterfallOffsetX.value;
      }
      posX.push(x);
      posY.push(props.hasAroundGutter ? props.gutter : 0);
    }
  };

  const setPosXY = () => {
    for (let i = 0; i < itemRefs.length; i++) {
      const item = itemRefs[i];

      const minPosY = getMin(posY);
      const minPosYIndex = posY.indexOf(minPosY);
      const currentPosX = posX[minPosYIndex];

      // set position
      item.style.visibility = 'hidden';
      item.style[transform] = 'translate3d(' + currentPosX + 'px,' + minPosY + 'px, 0)';

      // update group height by current item element
      const { height } = item.getBoundingClientRect();
      posY[minPosYIndex] += height + props.gutter;

      // add animation
      addAnimation(item);
    }
  };

  const setWrapperHeight = () => {
    const maxHeight = props.list.length > 0 ? getMax(posY) : 0;
    waterfallWrapperHeight.value = props.hasAroundGutter ? maxHeight : maxHeight - props.gutter;
  };

  const setPosition = async () => {
    setPosX();
    await nextTick();
    setPosXY();
    setWrapperHeight();
  };

  return {
    waterfallWrapperHeight,
    setPosition,
    setItemRef,
  };
}
