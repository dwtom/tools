/*
 * @Description: 其它方法
 * @Author: Dong Wei
 * @Date: 2022-11-14 10:05:20
 * @LastEditors: Dong Wei
 * @LastEditTime: 2022-12-07 17:53:55
 * @FilePath: \tools\utils\others.js
 */
/**
 * @description: 动态引入字体文件
 * @param {string} fontFamily 字体名称
 * @param {string} fontUrl 字体路径-需放在public
 * @param {*} callback 回调函数
 * @return {any}
 */
export const loadFont = async ({ fontFamily, fontUrl }, callback) => {
  if (window.FontFace) {
    const fontFile = new FontFace(fontFamily, `url(${fontUrl})`);
    try {
      await fontFile.load();
      document.fonts.add(fontFile);
      if (typeof callback === 'function') {
        callback();
      }
    } catch (error) {
      console.log(error);
    }
  }
};

/**
 * @description: setTimeout的同步写法
 * @param {function} callback 回调
 * @param {number} time 延时时间
 * @return {Promise}
 */
export const sleep = (callback, time = 500) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(callback());
    }, time);
  });
};