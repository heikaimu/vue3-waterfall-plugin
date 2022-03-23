/*
 * @Author: Yaowen Liu
 * @Date: 2022-03-17 14:49:55
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-03-22 17:27:55
 */
/**
 * 获取随机ID
 * @param {*} length
 * @returns
 */
export function randomID(length = 6) {
  return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36)
}
