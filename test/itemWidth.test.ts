/*
 * @Author: Yaowen Liu
 * @Date: 2022-03-11 17:54:36
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-11-07 11:37:25
 */
import { describe, expect, it } from 'vitest'
import { getItemWidth } from '../lib/utils/itemWidth'

describe('item 的宽度', () => {
  it('无断点', () => {
    const params = {
      breakpoints: {
        1200: { rowPerView: 3 },
        800: { rowPerView: 2 },
        500: { rowPerView: 1 },
      },
      wrapperWidth: 1400,
      initWidth: 200,
      gutter: 10,
      hasAroundGutter: true,
    }
    expect(getItemWidth(params)).toMatchInlineSnapshot('200')
  })

  it('有断点', () => {
    const params = {
      breakpoints: {
        1200: { rowPerView: 3 },
        800: { rowPerView: 2 },
        500: { rowPerView: 1 },
      },
      wrapperWidth: 940,
      initWidth: 200,
      gutter: 10,
      hasAroundGutter: true,
    }
    expect(getItemWidth(params)).toMatchInlineSnapshot('300')
  })
})
