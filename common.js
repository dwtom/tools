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
 * @description: 深拷贝
 * @param {any} [source] 原对象
 * @param {WeakMap} [hash]
 * @return: [target] 拷贝结果
 */
const deepClone = (source, hash = new WeakMap()) => {
    if (!isObject(source)) return source;
    if (hash.has(source)) return hash.get(source);
    let target = Array.isArray(source) ? [] : {};
    hash.set(source, target);
    Reflect.ownKeys(source).forEach(key => {
        if (isObject(source[key])) {
            target[key] = deepClone(source[key], hash);
        } else {
            target[key] = source[key];
        }
    });
    return target;
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