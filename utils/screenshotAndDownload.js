/*
 * @Description: 页面区域截图并下载
 * @Author: Dong Wei
 * @Date: 2020-08-31 16:43:14
 * @LastEditors: Dong Wei
 * @LastEditTime: 2022-03-17 14:10:16
 * @FilePath: \tools\utils\screenshotAndDownload.js
 */
// npm i html2canvas -S
import html2canvas from 'html2canvas';
/**
 * @description: 页面截图生成base64
 * @param {String} [id] 截图区域dom的id
 * @param {String} [fileName] 生成的截图文件名
 * 
 */
export const downLoadImage = (id, fileName = 'screenshot') => {
  const originNode = document.getElementById(id);
  html2canvas(originNode).then(canvas => {
    setDownLoadElement(canvas.toDataURL(), fileName);
  });
};

const setDownLoadElement = (imgUrl, fileName) => {
  const a = document.createElement('a');
  a.href = imgUrl;
  a.setAttribute('download', fileName);
  a.click();
};
