// rem值转化为px值(echarts内使用)
export const rem2px = (rem) => {
  if (document.documentElement.style.fontSize) {
    return rem * document.documentElement.style.fontSize.replace('px', '');
  } else {
    return rem * 100;
  }
};
