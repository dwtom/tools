/**
 * @description: 根据传入的时间范围获取范围内所有年月
 * @param {String} [start] 起始时间('2019-01')
 * @param {String} [end] 结束时间('2019-10')
 * @return: {Array} [result] 时间范围数组
 */
const getYearAndMonth = (start, end) => {
    let result = [];
    let starts = start.split('-');
    let ends = end.split('-');
    let staYear = parseInt(starts[0]);
    let staMon = parseInt(starts[1]);
    let endYear = parseInt(ends[0]);
    let endMon = parseInt(ends[1]);
    let sMon;
    while (staYear <= endYear) {
        if (staYear === endYear) {
            if (staMon === endMon) {
                return [start];
            }
            while (staMon <= endMon) {
                sMon = staMon;
                if (sMon < 10) {
                    sMon = '0' + sMon;
                }
                result.push(`${staYear}-${sMon}`);
                staMon++;
            }
            staYear++;
        } else {
            if (staMon > 12) {
                staMon = 1;
                staYear++;
            }
            sMon = staMon;
            if (sMon < 10) {
                sMon = '0' + sMon;
            }
            result.push(`${staYear}-${sMon}`);
            staMon++;
        }
    }
    return result;
}

/**
 * @description: 判断是否为对象
 * @param {any} [obj]
 * @return: {Boolean}
 */
const isObject = (obj) => {
    return typeof obj === 'object' && obj !== null;
}

/**
 * @description: 判断数据类型
 * @param {any} [obj] 
 * @return: {String}
 */
const getDataType = (obj) => {
    const type = typeof obj;
    if (type !== 'object') {
        return type;
    }
    return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1');
}

/**
 * @description: 防抖
 * @param {Function} [fn] 事件处理函数
 * @param {Number} [wait] 响应时间
 * @return: {Function}
 */
const debounce = (fn, wait) => {
    let timeout = null;
    return function () {
        if (timeout !== null) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(fn, wait);
    }
}

/**
 * @description: 节流
 * @param {Function} [fn] 事件处理函数
 * @param {Number} [time=500] 响应时间间隔,默认500毫秒
 * @return: {Function}
 */
const throttle = (fn, time = 500) => {
    let notFirst = false; // 是否不是第一次触发
    let start = Date.now();
    return function (...args) {
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
 * @description: 多维数组扁平化
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
 * @description: 数组去重
 * @param {Array} [arr] 
 * @return: {Array} 去重后的数组
 */
const getUniqueArr = (arr) => {
    let tempArr = new Set(arr);
    return [...tempArr];
}

/**
 * @description: 树结构扁平化
 * @param {Array} arr 树结构数组
 * @param {String} children children字段名 默认为children
 * @return {Array}
 */
const getFlatTree = (arr, children = 'children') => {
  let res = [];
  arr.forEach(v => {
      res.push(v);
      if (v[children] && Array.isArray(v[children])) {
          const childArr = getFlatTree(v[children], children);
          res.push(...childArr);
      }
  })
  return res;
}

// 全屏 dom为需要全屏的元素
const fullScreen = (dom) => {
  if (dom.requestFullscreen) {
      return dom.requestFullscreen();
  } else if (dom.webkitRequestFullScreen) {
      return dom.webkitRequestFullScreen();
  } else if (dom.mozRequestFullScreen) {
      return dom.mozRequestFullScreen();
  } else {
      return dom.msRequestFullscreen();
  }
};

// 退出全屏
const exitFullScreen = () => {
  if (document.exitFullscreen) {
      document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
  } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
  }
}

// 判断是否全屏
const isFullScreen = () => {
  return !!(
      document.fullScreenElement || 
    document.mozFullScreenElement ||                         
    document.webkitFullscreenElement ||       
    document.msFullscreenElement
  );
}

/**
 * @description: 字符串过长显示...
 * @param {String} str 原始字符串
 * @param {Number} length 需要截取（保留）的长度
 * @return {String}
 */
const getStringSlice = (str, length) => {
  const retainStr = str.slice(0, length);
  if (str.length === retainStr.length) {
    return str;
  } else {
    return `${retainStr}...`;
  }
};

/**
* @description: 数字添加千分符
* @param {Number|String} num
* @param {Number} [fixed=0] 需要保留的小数位数,默认保留整数
* @return {String}
*/
export const getThousandsNum = (num, fixed=0) => {
  if (typeof num !== 'number') num = Number(num);
  if (isNaN(num)) return '';
  num = num.toFixed(fixed).split('.');
  if (fixed !== 0) {
    return [num[0].replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,'), num[1]].join('.');
  } else {
    return [num[0].replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,')].join('');
  }
};