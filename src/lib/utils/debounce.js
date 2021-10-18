/*
 * @Description: 
 * @Version: 2.0
 * @Author: Yaowen Liu
 * @Date: 2021-10-15 09:57:48
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2021-10-15 10:02:46
 */
function debounce(fn, delay) {
  let timer = null;
  return function () {
    timer && clearTimeout(timer);
    timer = null;
    
    const args = arguments;
    const context = this;
    timer = setTimeout(() => {
      fn.call(context, args);
    }, delay);
  }
}

export {
  debounce
}