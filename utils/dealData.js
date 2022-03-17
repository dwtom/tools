/*
 * @Description: 数据处理相关方法
 * @Author: Dong Wei
 * @Date: 2022-03-17 13:58:57
 * @LastEditors: Dong Wei
 * @LastEditTime: 2022-03-17 14:00:03
 * @FilePath: \tools\dealData.js
 */
// 判断是否为对象
export const isObject = obj => {
  return typeof obj === 'object' && obj !== null;
}
// 判断数据类型
export const getDataType = obj => {
  const type = typeof obj;
  if (type !== 'object') {
    return type;
  }
  return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1');
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
export const getThousandsNum = (num, fixed = 0) => {
  if (typeof num !== 'number') num = Number(num);
  if (isNaN(num)) return '';
  num = num.toFixed(fixed).split('.');
  if (fixed !== 0) {
    return [num[0].replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,'), num[1]].join('.');
  } else {
    return [num[0].replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,')].join('');
  }
};

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