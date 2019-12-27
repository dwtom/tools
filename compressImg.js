/**
 * @description: 压缩图片方法(最好在外层判断图片格式)
 * @param {Object}[event] 上传事件对象(input type=file获取的event)
 * @param {Object}[config] 压缩配置项 width,height,quality(默认情况传空对象,quality值越小则压缩率越高)
 * @param {Number}[size] 处理压缩的阈值(MB)
 * @return: {void}
 */
function photoCompress(event, config) {
    let ready = new FileReader();
    let file = event.target.files[0];
    // 在外层判断
    // if (file.type.slice(0, 6) !== 'image/') {
    //     event.target.value = '';
    //     console.log('请上传正确格式的图片');
    //     return;
    // }
    // 大于指定大小才压缩,否则直接处理
    if (file.size / 1024 > 1024 * 2) {
        // 开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.
        ready.readAsDataURL(file);
        ready.onload = () => {
            let path = this.result;
            // 压缩后的base64
            let base64Url = canvasDataURL(path, config);
            let AllowImgFileSize = 2;
            let ImgFileLength = base64Url.substring(base64Url.indexOf(',') + 1).length;// 压缩后的图片长度
            let fileLength = parseInt(ImgFileLength - (ImgFileLength / 8) * 2, 0);
            let size = (fileLength / (1024 * 1024)).toFixed(2);// 压缩后的图片大小mb
            if (size < AllowImgFileSize) {
                file = convertBase64UrlToFile(base64Url, img.name);
                this.postUserIcon(file, e);
            } else {
                e.target.value = '';
                this.$toast('图片过大，请重新选择图片上传');
            }
        };
    } else {
        file = img;
        this.postUserIcon(file, e);
    }

}

/**
 * @description: canvas压缩主程序
 * @param {String}[path] 读取的图片内容字符串
 * @param {Object}[config] 压缩配置项 width,height,quality(quality值越小则压缩率越高)
 * @return: {Stirng} 图片base64值
 */
function canvasDataURL(path, config) {
    let img = new Image();
    img.src = path;
    img.onload = function () {
        let that = this;
        // 默认按比例压缩
        let w = that.width;
        let h = that.height;
        let scale = w / h;
        w = config.width || w;
        h = config.height || (w / scale);
        let quality = 0.7;  // 默认图片质量为0.7
        // 生成canvas
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        // 创建属性节点
        let anw = document.createAttribute('width');
        anw.nodeValue = w;
        let anh = document.createAttribute('height');
        anh.nodeValue = h;
        canvas.setAttributeNode(anw);
        canvas.setAttributeNode(anh);
        ctx.drawImage(that, 0, 0, w, h);
        // 图像质量
        if (config.quality && config.quality <= 1 && config.quality > 0) {
            quality = config.quality;
        }
        // quality值越小，所绘制出的图像越模糊
        return canvas.toDataURL('image/jpeg', quality);
    };
}

/**
 * @description: 将图片从base64转化为图片对象方便后台接收
 * @param {String} [urlData] 图片base64
 * @param {String} [fileName] 图片名称(event.target.files[0].name)
 * @return: {Object} 图片对象实例
 */
function convertBase64UrlToFile(urlData, fileName) {
    let arr = urlData.split(',');
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
}
export {
    photoCompress,
    convertBase64UrlToFile
};
