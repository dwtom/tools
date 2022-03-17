/*
 * @Description: 避免接口报错多次弹出 基于view-UI
 * @Author: Dong Wei
 * @Date: 2020-11-23 16:35:23
 * @LastEditors: Dong Wei
 * @LastEditTime: 2022-03-17 14:07:06
 * @FilePath: \tools\utils\uniqueMessage.js
 */
import { Message } from 'view-design';
// element的版本
// import { Message } from 'element-ui';
// className el-message

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
            if (document.getElementsByClassName('ivu-message-notice').length === 0) {
                Message[type](options);
            }
        } else {
            Message[type](options);
        }
    }
};
