/*
 * @Description: 正则验证库
 * @Author: Dong Wei
 * @Date: 2020-01-22 14:15:08
 * @LastEditors: Dong Wei
 * @LastEditTime: 2023-04-07 16:36:34
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
  validateAddress: /^[A-Za-z\d_\-\u4e00-\u9fa5]{1,25}$/, // 校验收货地址（1-25个任意大小写字母数字横杠下划线加中文）
};

// 身份证校验
export function testIdCard(id) {
  // 1 "验证通过!", 0 //校验不通过
  const format =
    /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;

  // 号码规则校验
  if (!format.test(id)) {
    return "请输入正确的身份证号";
  }

  if (id && id.length === 18) {
    // 出生年月日校验
    const year = id.substr(6, 4); // 身份证年
    const month = id.substr(10, 2); // 身份证月
    const date = id.substr(12, 2); // 身份证日
    const time = Date.parse(`${month}-${date}-${year}`); // 身份证日期时间戳date
    const nowTime = Date.parse(new Date()); // 当前时间戳
    const dates = new Date(year, month, 0).getDate(); // 身份证当月天数
    if (time > nowTime || date > dates) {
      return "出生日期错误";
    }
    // 校验码判断
    const c = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; // 系数
    const b = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"]; // 校验码对照表
    const idArray = id.split("");
    let sum = 0;
    for (let k = 0; k < 17; k += 1) {
      sum += parseInt(idArray[k], 0) * parseInt(c[k], 0);
    }
    if (idArray[17].toUpperCase() !== b[sum % 11].toUpperCase()) {
      return "身份证校验码错误";
    }
  }
}
