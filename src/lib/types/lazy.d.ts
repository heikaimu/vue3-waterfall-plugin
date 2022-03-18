/*
 * @Author: Yaowen Liu
 * @Date: 2022-03-18 14:11:45
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-03-18 14:15:33
 */
import type { LazyOptions, ValueFormatterObject } from '../types/waterfall'

export default class Lazy {
  lazyActive: boolean
  options: LazyOptions

  _images = new WeakMap()

  constructor(flag = true, options: LazyOptions)

  config(options = {}): void

  // mount
  mount(el: HTMLImageElement, binding: string | ValueFormatterObject, callback: () => void): void

  // update
  // update(el, binding, callback) {
  //   const imgItem = this._realObserver(el);
  //   imgItem && imgItem.unobserve(el);
  //   const { src, error } = this._valueFormatter(binding);
  //   this._initIntersectionObserver(el, src, error, callback);
  // }

  // unmount
  unmount(el: HTMLElement): void

  /**
   * 设置img的src
   * @param {*} el - img
   * @param {*} src - 原图
   * @param {*} error - 错误图片
   * @param {*} callback - 完成的回调函数，通知组件刷新布局
   * @returns
   */
  _setImageSrc(el: HTMLImageElement, src: string, callback: () => void, error?: string): void

  _isOpenLazy(): boolean

  /**
   * 添加img和对应的observer到weakMap中
   * 开启监听
   * 当出现在可视区域后取消监听
   * @param {*} el - img
   * @param {*} src - 图片
   * @param {*} error - 错误图片
   * @param {*} callback - 完成的回调函数，通知组件刷新布局
   */
  _initIntersectionObserver(el: HTMLImageElement, src: string, callback: () => void, error?: string): void

  // 格式化参数
  _valueFormatter(value: ValueFormatterObject | string): ValueFormatterObject

  // 日志
  _log(callback: () => void): void

  // 在map中获取对应img的observer事件
  _realObserver(el: HTMLElement): IntersectionObserver | undefined
}
