/*
 * @Description: 浏览器工具方法
 * @Author: Dong Wei
 * @Date: 2022-03-17 13:53:24
 * @LastEditors: Dong Wei
 * @LastEditTime: 2022-03-17 16:18:19
 * @FilePath: \tools\utils\browser.js
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

/**
 * @description: 检测元素是否在可视区并执行回调操作(只会在第一次可见的时候执行)
 * @param {object} target 被检测的目标元素
 * @param {function} callback 目标元素满足在可视区条件后的回调
 * @param {object} option IntersectionObserver参数,可选
 * @return {*}
 */
export const handleElementInClient = (target, callback, option = {}) => {
  const observerFn = entries => {
    entries.forEach(item => {
      // item.time 一个记录时间原点(time origin)到交叉被触发的时间的时间戳
      // item.target 目标元素
      // item.rootBounds 根元素，默认为浏览器视窗
      // item.boundingClientRect 目标元素的边界信息
      // item.intersectionRect 目标元素与根元素相交区域的信息
      // item.isIntersecting 目标元素与根元素是否相交(相交状态为threshold设置的值)
      // item.intersectionRatio 目标元素与根元素相交的比值
      if(item.isIntersecting) {
        callback();
        // 解除观察当前元素 避免不可见时候再次调用callback函数
        observer.unobserve(item.target);
      }
    });
  };
  const observerOption = {
    threshold: 1 // 0~1 默认为0，1代表目标元素完全出现时才会执行回调
  };
  Object.assign(observerOption, {...option});
  const observer = new IntersectionObserver(observerFn, observerOption);
  observer.observe(target);
}