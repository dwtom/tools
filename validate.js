/*
 * @Description: 正则验证库
 * @Author: Dong Wei
 * @Date: 2020-01-22 14:15:08
 * @LastEditors  : Dong Wei
 * @LastEditTime : 2020-01-22 14:15:56
 */

const regList = {
    validateParkName: /^[A-Za-z\d_\-\u4e00-\u9fa5]{1,10}$/, // 校验停车点名称 （1-10个任意大小写字母数字横杠下划线加中文）
    validatePassword: /^[A-Za-z0-9\-_@]{6,20}$/, // 校验密码（长度6-20位,英文（大小写）/数字/-/_@）
    validateName: /^[\u4e00-\u9fa5]{2,}(·[\u4e00-\u9fa5]{2,})*$/, // 校验中文姓名(至少2位)
    validateIdCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, // 校验身份证号
    validateTel: /^[1][3,4,5,6,7,8,9][0-9]{9}$/, // 校验手机号
    validateBankCard: /^([1-9]{1})([0-9]{14,18})$/, // 校验银行卡号
    validateFileIsNum: /^(\d{1,8})(\.\d{0,2})?$/, // 校验价格输入(0-99999999.99)，最多保留2位小数
    validateVerifiCode: /^\d{6}$/, // 校验验证码（6位数字）
    validateVerifiCode4: /^\d{4}$/, // 校验验证码（4位数字）
    validateInvitedCode: /^[A-Z0-9]{6}$/, // 校验邀请码（6位的大写字符或数字组合）
    validateAmmeterCode: /^\d{9,13}$/, // 校验并网电表号长度（9~13位数字）
    validateVin: /^[A-Za-z0-9]+$/, // 车架号校验 只能输入英文和数字  不过规则产品还不确定，后期需要修改
    validateEngine: /^[A-Za-z0-9]+$/, // 电机号校验 只能输入英文和数字  不过规则产品还不确定，后期需要修改
    validateInputLenght: /^(?=([0-9]{0,6}$|[0-9]{0,3}\.))(0|[1-9][0-9]*)(\.[0-9]{1,2})?$/, // 校验输入长度判断最大6位，小数最多两位
    validateAddress: /^[A-Za-z\d_\-\u4e00-\u9fa5]{1,25}$/ // 校验收货地址（1-25个任意大小写字母数字横杠下划线加中文）
};