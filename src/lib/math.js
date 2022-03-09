/*
 * @Author: Yaowen Liu
 * @Date: 2022-03-09 16:42:58
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-03-09 17:52:08
 */
/**
 * 获取最小值
 * @param {Array[number]} arr
 * @returns
 */
export function getMin(arr) {
  return arr
    .slice()
    .sort((a, b) => a - b)
    .shift();
}

/**
 * 获取最大值
 * @param {Array[number]} arr
 * @returns
 */
export function getMax(arr) {
  return arr
    .slice()
    .sort((a, b) => a - b)
    .pop();
}

/**
 * 获取随机ID
 * @param {*} length 
 * @returns 
 */
export function randomID(length = 6) {
  return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
}
