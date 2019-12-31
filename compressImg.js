/**
 * @description: 压缩图片方法(将图片上传之后无论成功或失败都要将event.target.value置空)
 * @param {Object}[event] 上传事件对象(input type=file获取的event)
 * @param {Object}[config] 压缩配置项 width,height,quality(默认可传空对象,quality值越小则压缩率越高)
 * @param {Number}[allowSize] 处理压缩的阈值(MB),图片大小小于阈值则不压缩
 * @param {Function}[callback] 回调函数 传出对象 success-是否有返回值,msg-错误信息,file-文件对象
 * @return: {void}
 */
function photoCompress(event, config, allowSize, callback) {
    let ready = new FileReader();
    let file = event.target.files[0];
    // 判断图片格式
    if (file.type.slice(0, 6) !== 'image/') {
        return callback({
            success: false,
            msg: '请上传正确格式的图片',
            file: ''
        });
    }
    // 判断阈值
    if (typeof allowSize !== 'number'
        || allowSize === NaN
        || allowSize <= 0) {
        return callback({
            success: false,
            msg: '请传入正确的阈值',
            file: ''
        });
    }
    // 避免部分安卓手机点击上传但不传图片后取消会走下去
    if (!file.size) {
        return;
    }
    // 大于指定大小才压缩,否则直接处理
    if (file.size / 1024 > 1024 * allowSize) {
        // 开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.
        ready.readAsDataURL(file);
        ready.onload = function () {
            let path = this.result;
            // 压缩后的base64
            canvasDataURL(path, config, base64Url => {
                let ImgFileLength = base64Url.substring(base64Url.indexOf(',') + 1).length;// 压缩后的图片长度
                let fileLength = parseInt(ImgFileLength - (ImgFileLength / 8) * 2, 0);
                let size = (fileLength / (1024 * 1024)).toFixed(2);// 压缩后的图片大小mb
                if (size < allowSize) {
                    // 将压缩后的base64转化为file对象
                    let compressFile = convertBase64UrlToFile(base64Url, file.name);
                    return callback({
                        success: true,
                        msg: '',
                        file: compressFile
                    });
                } else { // 压缩后仍然超过阈值
                    return callback({
                        success: false,
                        msg: '图片过大，请重新选择图片上传',
                        file: ''
                    });
                }
            });
        }
    } else {
        return callback({
            success: true,
            msg: '',
            file: file
        });
    }
}

/**
 * @description: canvas压缩主程序 (默认压缩率30%)
 * @param {String}[path] 读取的图片内容字符串
 * @param {Object}[config] 压缩配置项 width,height,quality(quality值越小则压缩率越高)
 * @param {Function}[callback] 回调函数传出图片base64值
 * @return: {void} 
 */
function canvasDataURL(path, config, callback) {
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
        let res = canvas.toDataURL('image/jpeg', quality);
        // 只能用回调函数传出,return无法接收
        callback(res);
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
