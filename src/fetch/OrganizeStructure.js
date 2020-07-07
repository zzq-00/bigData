import { get, post } from 'axios'
/**
 * 组织架构管理
 */
export default {
  // 获取下级部门
  getDepartmentById(deptId) {
    return get('OrganizeStructure/getDepartmentById/' + deptId)
  },
  // 面包屑  获取从天职咨询到该部门的所有层级名称
  getSingleDeptList(deptId) {
    return get('OrganizeStructure/getSingleDeptList/' + deptId)
  },
  // 编辑部门
  updateDepartments(obj) {
    return post('OrganizeStructure/updateDepartment', obj)
  },
  // 删除部门
  deleteDeptById(deptId) {
    return get('OrganizeStructure/deleteDeptById/' + deptId)
  },
  // 获取组织架构列表
  getOrganizeStructureList() {
    return get(`OrganizeStructure/getOrganizeStructureList`)
  },
  // 添加下级部门
  addJuniorDepartment(params) {
    return post('OrganizeStructure/addJuniorDepartment', params)
  },
  // 编辑用户
  getDepartmentList(params) {
    return post('OrganizeStructure/getDepartmentList', params)
  },
  // 同步组织架构
  getDeptStructureFromRemote() {
    return get(`OrganizeStructure/getDeptStructureFromRemote`)
  },
  // 通过parentId,获取所有的子部门
  getDeptStructureByParentId(parentId) {
    return get(`OrganizeStructure/getDeptStructureByParentId/${parentId}`)
  },
  // 获取初始的部门层级
  getInitDeptResult() {
    return get(`OrganizeStructure/getInitDeptResult`)
  }
}
