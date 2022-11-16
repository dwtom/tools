/*
 * @Description: rem配置
 * @Author: Dong Wei
 * @Date: 2021-09-07 17:09:28
 * @LastEditors: Dong Wei
 * @LastEditTime: 2022-11-16 14:59:40
 * @FilePath: \tools\utils\rem\rem.js
 */
(function (doc, win) {
  const docEl = doc.documentElement;
  const resizeEvt =
    'orientationchange' in window ? 'orientationchange' : 'resize';
  const baseSize = 100; // postcss.config.js中的rootvalue或者自定义的计算倍数,设置为100方便在echarts中计算

  function recalc() {
    const designWidth = 1920; // 设计稿尺寸
    const clientWidth = docEl.clientWidth;
    if (!clientWidth) return;
    docEl.style.fontSize = (baseSize * clientWidth) / designWidth + 'px';
  }
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
