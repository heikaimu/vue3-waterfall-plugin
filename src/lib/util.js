/**
 * 取值
 * @param {Object | Array} form
 * @param  {...any} selectors
 * @returns
 */
export function getValue(form, ...selectors) {
  const res = selectors.map((s) => {
    return s
      .replace(/\[(\w+)\]/g, '.$1')
      .split('.')
      .reduce((prev, cur) => {
        return prev && prev[cur];
      }, form);
  });
  return res;
}

/**
 * 防抖
 * @param {*} fn
 * @param {*} delay
 * @returns
 */
export function debounce(fn, delay) {
  let timer = null;
  return function () {
    timer && clearTimeout(timer);
    timer = null;

    const args = arguments;
    const context = this;
    timer = setTimeout(() => {
      fn.call(context, args);
    }, delay);
  };
}

export const inBrowser = typeof window !== 'undefined' && window !== null;

/**
 * 判断是否支持IntersectionObserver
 * @returns {boolean}
 */
export function checkIntersectionObserver() {
  if (
    inBrowser &&
    'IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'intersectionRatio' in window.IntersectionObserverEntry.prototype
  ) {
    // Minimal polyfill for Edge 15's lack of `isIntersecting`
    // See: https://github.com/w3c/IntersectionObserver/issues/211
    if (!('isIntersecting' in window.IntersectionObserverEntry.prototype)) {
      Object.defineProperty(window.IntersectionObserverEntry.prototype, 'isIntersecting', {
        get() {
          return this.intersectionRatio > 0;
        },
      });
    }
    return true;
  }
  return false;
}

export const hasIntersectionObserver = checkIntersectionObserver();

/**
 * is object
 *
 * @param {*} val
 * @returns {boolean}
 */
export function isObject(val) {
  return typeof val === 'function' || toString.call(val) === '[object Object]';
}

/**
 * is primitive
 *
 * @param {*} val
 * @returns {boolean}
 */
export function isPrimitive(val) {
  return typeof val === 'object' ? val === null : typeof val !== 'function';
}

/**
 * check private key
 *
 * @export
 * @param {*} key
 * @returns {boolean}
 */
export function isValidKey(key) {
  return key !== '__proto__' && key !== 'constructor' && key !== 'prototype';
}

/**
 * Assign the enumerable es6 Symbol properties from one
 * or more objects to the first object passed on the arguments.
 * Can be used as a supplement to other extend, assign or
 * merge methods as a polyfill for the Symbols part of
 * the es6 Object.assign method.
 * https://github.com/jonschlinkert/assign-symbols
 *
 * @param {*} target
 * @param {Array} args
 * @returns
 */
function assignSymbols(target, ...args) {
  if (!isObject(target)) {
    throw new TypeError('expected the first argument to be an object');
  }

  if (args.length === 0 || typeof Symbol !== 'function' || typeof getSymbols !== 'function') {
    return target;
  }

  for (const arg of args) {
    const names = getSymbols(arg);

    for (const key of names) {
      if (isEnumerable.call(arg, key)) {
        target[key] = arg[key];
      }
    }
  }
  return target;
}

/**
 * Deeply assign the values of all enumerable-own-properties and symbols
 * from one or more source objects to a target object. Returns the target object.
 * https://github.com/jonschlinkert/assign-deep
 *
 * @param {*} target
 * @param {Array} args
 * @returns
 */
export function assign(target, ...args) {
  let i = 0;
  if (isPrimitive(target)) target = args[i++];
  if (!target) target = {};
  for (; i < args.length; i++) {
    if (isObject(args[i])) {
      for (const key of Object.keys(args[i])) {
        if (isValidKey(key)) {
          if (isObject(target[key]) && isObject(args[i][key])) {
            assign(target[key], args[i][key]);
          } else {
            target[key] = args[i][key];
          }
        }
      }
      assignSymbols(target, args[i]);
    }
  }
  return target;
}
