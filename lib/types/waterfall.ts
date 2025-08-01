/*
 * @Author: Yaowen Liu
 * @Date: 2022-03-17 14:41:05
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-03-23 14:44:20
 */
export type ViewCard = Record<string, any>

interface Point {
  rowPerView: number
}

export type Breakpoints = Record<number, Point>

export interface WaterfallProps {
  breakpoints: Breakpoints
  width: number
  posDuration: number
  animationDuration: number
  animationDelay: number
  animationEffect: string
  animationCancel: boolean
  hasAroundGutter: boolean
  gutter: number
  space: number
  list: ViewCard[]
  animationPrefix: string
  align: string
}

export interface ItemWidthProps {
  breakpoints: Breakpoints
  wrapperWidth: number
  gutter: number
  hasAroundGutter: boolean
  initWidth: number
}

export interface ItemWidthByBreakpointProps extends ItemWidthProps {
  size: number
}
