/**
 * 获取最小值
 * @param {Array[number]} arr 
 * @returns 
 */
export function getMin(arr) {
  return arr.slice()
    .sort((a, b) => a - b)
    .shift();
}

/**
 * 获取最大值
 * @param {Array[number]} arr 
 * @returns 
 */
export function getMax(arr) {
  return arr.slice()
    .sort((a, b) => a - b)
    .pop();
}