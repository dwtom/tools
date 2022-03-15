/**
 * @description: 根据传入的时间范围获取范围内所有年月
 * @param {String} [start] 起始时间('2019-01')
 * @param {String} [end] 结束时间('2019-10')
 * @return: {Array} [result] 时间范围数组
 */
export const getYearAndMonth = (start, end) => {
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

// 计算两个日期间的天数
export const calcDaysDiff = (date, date2) => {
  return Math.ceil(Math.abs(date - date2) / 86400000);
}

/**
 * @description: 判断是否为对象
 * @param {any} [obj]
 * @return: {Boolean}
 */
export const isObject = (obj) => {
    return typeof obj === 'object' && obj !== null;
}

/**
 * @description: 判断数据类型
 * @param {any} [obj] 
 * @return: {String}
 */
 export const getDataType = (obj) => {
    const type = typeof obj;
    if (type !== 'object') {
        return type;
    }
    return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1');
}

/**
 * @description: 树结构扁平化
 * @param {Array} arr 树结构数组
 * @param {String} children children字段名 默认为children
 * @return {Array}
 */
export const getFlatTree = (arr, children = 'children') => {
  const res = [];
  arr.forEach(v => {
      res.push(v);
      if (v[children] && Array.isArray(v[children])) {
          const childArr = getFlatTree(v[children], children);
          res.push(...childArr);
      }
  })
  return res;
}

/**
 * @description: 扁平数组组装成树结构
 * @param {array} arr 扁平数组
 * @param {object} parentNode 父节点/根节点
 * @param {string} parentIdKey 父节点id键名
 * @param {string} currentIdKey 当前节点id键名
 * @param {string} childrenKey 子节点id键名
 * @return {array}
 */
export const setTreeNodes = (arr, parentNode, parentIdKey, currentIdKey, childrenKey) => {
  const tree = [];
  for (const item of arr) {
      let tempNode = null;
      if (item[parentIdKey] === parentNode[currentIdKey]) {
          tempNode = setTreeNodes(arr, item, parentIdKey, currentIdKey, childrenKey);
          if (tempNode.length) {
              item[childrenKey] = tempNode;
          }
          tree.push(item);
      }
  }
  // 不包括根节点
  return tree;
  // 完整树结构
  // parentNode[childrenKey] = tree;
  // return parentNode;
};

// 全屏 dom为需要全屏的元素
export const fullScreen = (dom) => {
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
export const exitFullScreen = () => {
  if (document.exitFullscreen) {
      document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
  } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
  }
}

// 判断是否全屏
export const isFullScreen = () => {
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
export const getStringSlice = (str, length) => {
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

// 生成Guid
export const setGuid = () => {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
	    const r = Math.random() * 16 | 0,
	        v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	});
};

// 检测屏幕缩放比例
export const detectZoom = ()=> {
  let ratio = 0;
  const screen = window.screen;
  const ua = navigator.userAgent.toLowerCase();
  if (window.devicePixelRatio !== undefined) {
      ratio = window.devicePixelRatio;
  } else if (~ua.indexOf('msie')) {
      if (screen.deviceXDPI && screen.logicalXDPI) {
          ratio = screen.deviceXDPI / screen.logicalXDPI;
      }
  } else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
      ratio = window.outerWidth / window.innerWidth;
  }
  return ratio;
}

/**
 * @description: 已知起点和终点近似计算三次贝塞尔曲线控制点
 * @param {Array<number>} start 起点坐标
 * @param {Array<number>} end 终点坐标
 * @param {Number} curvature 曲率(默认0.1)
 * @return {Object}
 */
 export const calcCubicBezierCurveControlPoint = (start, end, curvature = 0.1)=> {
  const [x1, y1] = start;
  const [x2, y2] = end;
  const cx1 = x1 + (x2 - x1) / 3 + (y2 - y1) * curvature;
  const cy1 = y1 + (y2 - y1) / 3 + (x1 - x2) * curvature;
  const cx2 = x1 + (x2 - x1) * 2 / 3 + (y1 - y2) * curvature;
  const cy2 = y1 + (y2 - y1) * 2 / 3 + (x2 - x1) * curvature;
  return {
      c1: [Math.abs(cx1), Math.abs(cy1)],
      c2: [Math.abs(cx2), Math.abs(cy2)]
  };
}

// 生成给定区间的随机数
export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// 生成随机布尔值
export const getRandomBoolean = () => Math.random() >= 0.5;

// 将文字复制到剪贴板
export const copyTextToClipboard = async (text) => {
  await navigator.clipboard.writeText(text);
}

// 以下方法lodash中已经含有
/**
 * @description: 防抖(仅作参考学习)
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
 * @description: 节流(仅作参考学习)
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