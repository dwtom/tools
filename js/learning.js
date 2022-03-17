/*
 * @Description: lodash或者es已经有封装实现的方法，仅学习处理过程
 * @Author: Dong Wei
 * @Date: 2020-12-15 16:19:17
 * @LastEditors: Dong Wei
 * @LastEditTime: 2022-03-17 14:01:28
 * @FilePath: \tools\learning.js
 */
/**
 * @description: 防抖(仅作参考学习)
 * @param {Function} [fn] 事件处理函数
 * @param {Number} [wait] 响应时间
 * @return: {Function}
 */
const debounce = (fn, wait) => {
  let timeout = null;
  return function() {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(fn, wait);
  }
}

/**
 * @description: 节流(仅作参考学习)
 * @param {Function} [fn] 事件处理函数
 * @param {Number} [time=500] 响应时间间隔,默认500毫秒
 * @return: {Function}
 */
const throttle = (fn, time = 500) => {
  let notFirst = false; // 是否不是第一次触发
  let start = Date.now();
  return function(...args) {
    let current = Date.now();
    let limited = notFirst && current - start < time; // 节流阀开关
    if (!limited) {
      fn.apply(this, args);
      notFirst = true;
      start = Date.now();
    }
  }
}

/**
 * @description: 多维数组扁平化(仅作参考学习)
 * @param {Array} [arr]
 * @return: {Array} 扁平化之后的数组
 */
const flatArr = (arr) => {
  while (arr.some(val => Array.isArray(val))) {
    arr = [].concat(...arr);
  }
  return arr;
}

/**
 * @description: 数组去重(仅作参考学习)
 * @param {Array} [arr] 
 * @return: {Array} 去重后的数组
 */
const getUniqueArr = (arr) => {
  let tempArr = new Set(arr);
  return [...tempArr];
}