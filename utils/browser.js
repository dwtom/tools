/*
 * @Description: 浏览器工具方法
 * @Author: Dong Wei
 * @Date: 2022-03-17 13:53:24
 * @LastEditors: Dong Wei
 * @LastEditTime: 2022-03-17 13:54:43
 * @FilePath: \tools\browser.js
 */
// 全屏 (dom为需要全屏的元素)
export const setFullScreen = dom => {
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

// 检测屏幕缩放比例
export const detectZoom = () => {
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

// 将文字复制到剪贴板
export const copyTextToClipboard = async (text) => {
  await navigator.clipboard.writeText(text);
}