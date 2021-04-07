/*
 * @Description: 避免接口报错多次弹出 基于view-UI
 * @Author: Dong Wei
 * @Date: 2020-11-23 16:35:23
 * @LastEditors: Dong Wei
 * @LastEditTime: 2021-04-07 10:27:06
 * @FilePath: \tools\singleMessage.js
 */
import { Message } from 'view-design';

const showMessage = Symbol('showMessage');

export const singleMessage = {
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
            if (document.getElementsByClassName('ivu-message-notice').length === 0) {
                Message[type](options);
            }
        } else {
            Message[type](options);
        }
    }
};
