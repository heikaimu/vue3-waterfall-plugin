/*
 * @Description: 
 * @Version: 2.0
 * @Author: Yaowen Liu
 * @Date: 2021-10-14 14:56:19
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2021-10-18 14:23:22
 */
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

function getItemWidthByBreakpoint({ breakpoints, wrapperWidth, size, gutter, hasAroundGutter }) {
  const currentBreakpoint = breakpoints[size];
  if (currentBreakpoint) {
    if (hasAroundGutter) {
      return (wrapperWidth - gutter) / currentBreakpoint.rowPerView - gutter;
    } else {
      return (wrapperWidth - ((currentBreakpoint.rowPerView - 1) * gutter)) / currentBreakpoint.rowPerView;
    }
  }
}

function _getItemWidth({ breakpoints, orderSize, wrapperWidth, gutter, hasAroundGutter, initWidth }) {
  for (const size of orderSize) {
    if (wrapperWidth <= size) {
      return getItemWidthByBreakpoint({ breakpoints, wrapperWidth, size, gutter, hasAroundGutter });
    }
  }
  return initWidth;
}
