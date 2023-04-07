/*
 * @Description: 数学方法
 * @Author: Dong Wei
 * @Date: 2022-03-17 13:56:37
 * @LastEditors: Dong Wei
 * @LastEditTime: 2023-04-07 16:33:59
 * @FilePath: \tools\utils\math.js
 */
// 生成Guid
export const setGuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

/**
 * @description: 已知起点和终点近似计算三次贝塞尔曲线控制点
 * @param {Array<number>} start 起点坐标
 * @param {Array<number>} end 终点坐标
 * @param {Number} curvature 曲率(默认0.1)
 * @return {Object}
 */
export const calcCubicBezierCurveControlPoint = (start, end, curvature = 0.1) => {
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