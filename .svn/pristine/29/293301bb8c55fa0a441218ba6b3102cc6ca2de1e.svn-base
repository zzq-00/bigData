import { get, post } from 'axios'
/**
 * 系统管理
 */
export default {
  // 登录
  publishPeopleLogin(params) {
    return post('login?token=' + params)
  },
  // 注销
  logout() {
    return get('logout')
  },
  // 根据用户名或手机号匹配用户信息
  getInfoByCodeMassage(code) {
    return get('home/getInfoByCode/' + code)
  },
  // 获取图片校验码
  getVerifyCode() {
    return get('home/getVerifyCode')
  },
  // 发送短信验证码
  sendCaptcha(telephone) {
    return get('home/sendCaptcha/' + telephone)
  },
  // 图片校验
  validateVerifyCode(verifyCode) {
    return get('home/validateVerifyCode/' + verifyCode)
  },
  // 校验短信验证码
  validateCaptcha(params) {
    return post('home/validateCaptcha', params)
  },
  // 忘记密码提交
  subForgetPassword(params) {
    return post('home/subForgetPassword', params)
  }
}
