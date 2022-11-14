/*
 * @Description: 其它方法
 * @Author: Dong Wei
 * @Date: 2022-11-14 10:05:20
 * @LastEditors: Dong Wei
 * @LastEditTime: 2022-11-14 10:05:22
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