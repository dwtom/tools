/*
 * @Description: 避免接口报错多次弹出 基于element-UI
 * @Author: Dong Wei
 * @Date: 2020-11-23 16:35:23
 * @LastEditors: Dong Wei
 * @LastEditTime: 2022-11-14 10:04:47
 * @FilePath: \tools\utils\uniqueMessage.js
 */
// element的版本
import { Message } from 'element-ui';

const showMessage = Symbol('showMessage');

export const alertMessage = {
    success(options, single = true) {
        this[showMessage]('success', options, single);
    },

    warning(options, single = true) {
        this[showMessage]('warning', options, single);
    },

    info(options, single = true) {
        this[showMessage]('info', options, single);
    },

    error(options, single = true) {
        this[showMessage]('error', options, single);
    },

    [showMessage](type, options, single) {
        if (single) {
            // 判断是否已存在Message
            if (!document.getElementsByClassName('el-message').length) {
              Message[type](options);
            }
        } else {
            Message[type](options);
        }
    }
};
