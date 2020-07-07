import { get, post } from 'axios'
/**
 * 人员管理
 */
export default {
  // 用户列表
  getUserList (params) {
    return post('user/getUserList', params)
  },
  // 添加用户
  addUser (params) {
    return post('user/addUser', params)
  },
  // 删除用户
  deleteUserById (userId) {
    return get('user/deleteUserById/' + userId)
  },
  // 重置密码
  resetPassword (userId) {
    return get('user/resetPassword/' + userId)
  },
  // 获取用户详情(编辑)
  getUserInfo (userId) {
    return get('user/getUserInfo/' + userId)
  },
  // 根据手机号匹配用户信息
  getUserInfoByTelephone (telephone) {
    return get('user/getUserInfoByTelephone/' + telephone)
  },
  // 搜索
  getInfoByCode (code) {
    return get('user/getInfoByCode/' + code)
  },
  // 添加下级部门,纯添加
  addDepartment (params) {
    return post('user/addDepartment', params)
  },
  // 修改用户信息
  updateUserInfo (params) {
    return post('user/updateUserInfo', params)
  },
  // 设置用户角色
  setRole4User (params) {
    return post('user/setRole4User', params)
  },
  // 获取所有角色
  getRoleList () {
    return get('user/getRoleList')
  },
  // 添加角色
  saveOrUpdateRole (params) {
    return post('user/saveOrUpdateRole', params)
  },
  // 获取角色详情
  getRoleByUserId (id) {
    return get(`user/getRoleByUserId/${id}`)
  },
  // 删除角色
  deleteRole (id) {
    return get(`user/deleteRole/${id}`)
  },
  // 保存角色
  savePermission (params) {
    return post('user/savePermission', params)
  },
  // 角色设置权限
  setFunction4Role (params) {
    return post('user/setFunction4Role', params)
  },
  // 角色获取权限
  getFunctionByRoleId (id) {
    return get(`user/getFunctionByRoleId/${id}`)
  },
}
