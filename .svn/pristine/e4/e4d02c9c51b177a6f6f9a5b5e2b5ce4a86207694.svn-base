import { get, post } from 'axios'
/**
 * 字典枚举
 */
export default {
  // 所有省
  allProvinces() {
    return get('dic/allProvinces')
  },
  // 所有市
  citiesOfProvince(parentCode) {
    return get(`dic/citiesOfProvince/${parentCode}`)
  },
  // 所有县
  getDistrictByParentCode(parentCode) {
    return get(`dic/districtsOfCity/${parentCode}`)
  },
  // 创建项目时的常量 项目库的筛选条件
  getDicCommon(type) {
    return get(`dic/getDicCommon/${type}`)
  },
  // 根据行业查类别
  // getProjectTypeByIndustryBelongId(id) {
  //   return get(`dic/getProjectTypeByIndustryBelongId/${id}`)
  // },
  // 根据类别查子类别
  getSubProjectTypeIdByParentId(id) {
    return get(`dic/getSubProjectTypeIdByParentId/${id}`)
  },
  // 根据业务分类1找业务分类2
  getCategory2ByParentId(parentId) {
    return get(`dic/getCategory2ByParentId/${parentId}`)
  },
  // 根据建筑业态1找建筑业态2
  getStructureForm2ByParentId(parentId) {
    return get(`dic/getStructureForm2ByParentId/${parentId}`)
  },
  // 根据工程类别找所属行业
  getIndustryBelongByParentId(id) {
    return get(`dic/getIndustryBelongByParentId/${id}`)
  },
  /**
   * 
   * 
   */
  // 项目行业第一级
  getIndustryBelongFirst() {
    return get('dic/getIndustryBelongFirst')
  },
  // 根据项目行业第一级获取项目行业第二级
  getIndustrySecondByParentId(parentId) {
    return get('dic/getIndustrySecondByParentId/' + parentId)
  },
  // 建设性质
  getProjectNature() {
    return get('dic/getProjectNature')
  },
  // 编制阶段
  getStages() {
    return get('dic/getStages')
  },
  // 获取所有单项工程类别 按级别分类
  monomerGetMonomerTypeAll() {
    return get(`dic/getMonomerTypeAll`)
  },
  // 查询单项工程类别三个层级
  getProjectMonomerType(type, parentId) {
    return get(`dic/getProjectMonomerType/${type}/${parentId}`)
  },
}
