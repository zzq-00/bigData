import { get, post } from 'axios'
/**
 * 权限
 */
export default {
  // 所有权限
  getAllFunction() {
    return get('function/getAllFunction')
  },
  // 用户拥有的权限
  getCurrentUserInfo(id) {
    return get(`function/getCurrentUserInfo/${id}`)
  },
}
