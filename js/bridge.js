/*
 * @Description: h5与原生webview交互(待验证)
 * @Author: Dong Wei
 * @Date: 2020-01-15 14:41:14
 * @LastEditors: Dong Wei
 * @LastEditTime: 2023-04-07 16:35:58
 */
class CrossPlatform {
    constructor() {
        this.isAndroidInit = false; // 安卓是否init
        this.name = this.getPlatformName(); // ios or android
    }
    // 获取终端类型
    getPlatformName() {
        const u = navigator.userAgent;
        const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
        const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if (isiOS) {
            return 'iOS';
        } else if (isAndroid) {
            return 'Android';
        } else {
            return 'others';
        }
    }
    // 建立与webview的连接
    setupWebViewJavascriptBridge(callback) {
        if (this.name == 'Android') {
            if (window.WebViewJavascriptBridge) {
                callback(WebViewJavascriptBridge);
            } else {
                document.addEventListener('WebViewJavascriptBridgeReady', function () {
                    callback(WebViewJavascriptBridge);
                }, false);
            }
        } else if (this.name == 'iOS') {
            if (window.WebViewJavascriptBridge) {
                return callback(WebViewJavascriptBridge);
            }
            if (window.WVJBCallbacks) {
                return window.WVJBCallbacks.push(callback);
            }
            window.WVJBCallbacks = [callback];
            let WVJBIframe = document.createElement('iframe');
            WVJBIframe.style.display = 'none';
            WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
            document.documentElement.appendChild(WVJBIframe);
            setTimeout(function () {
                document.documentElement.removeChild(WVJBIframe);
            }, 0);
        }
    }
    /**
     * @description: h5调用原生方法
     * @param {String} [fnName] 原生方法名
     * @param {String} [params] 传给原生的参数,没有可以不传
     * @param {Function} [callback] 给h5的回调函数
     * @return: {void}
     */
    bridge(fnName, params, callback = () => { }) {
        try {
            this.setupWebViewJavascriptBridge(function (bridge) {
                if (this.name == 'Android' && !this.isAndroidInit) {
                    bridge.init(function (message, responseCallback) {
                        responseCallback({ 'Javascript Responds': 'Wee!' });
                    });
                    this.isAndroidInit = true;
                }
                bridge.callHandler(fnName, params, callback);
            });
        } catch (e) {
            console.log(e);
        }
    }
    /**
     * @description: 原生调用h5方法
     * @param {String} [fnName] h5方法名
     * @param {Function} [callback] 回调函数,回调函数参数的最后一项可以是传给原生的回调函数
     * @return: 
     */
    on(fnName, callback) {
        try {
            this.setupWebViewJavascriptBridge(function (bridge) {
                if (this.name == 'Android' && !this.isAndroidInit) {
                    bridge.init(function (message, responseCallback) {
                        responseCallback({ 'Javascript Responds': 'Wee!' });
                    });
                    this.isAndroidInit = true;
                }
                bridge.registerHandler(fnName, callback);
            });
        } catch (e) {
            console.log(e);
        }
    }
}
// export default CrossPlatform;
