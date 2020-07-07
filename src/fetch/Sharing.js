import { get, post } from 'axios'
/**
 * project-sharing-controller
 */
export default {
  // 指标数据层级目录
  sidebarDirectory(projectId) {
    return get(`Sharing/sidebar/${projectId}`)
  },
  // 项目分享
  projectSharing(projectId) {
    return get(`Sharing/projectSharing/${projectId}`)
  },
  // 获取文件夹下的所有文件
  getEnterpriseFilesByFolderId(folderId) {
    return get(`Sharing/getFilesByFolderId/${folderId}`)
  },
  // 获取默认的文件夹
  getEnterpriseDefaultFolders(projectId) {
    return get(`Sharing/getDefaultFolders/${projectId}`)
  },
  // 根据条件查询企业项目
  getEnterpriseProjectByCondition(params) {
    return post('Sharing/getEnterpriseProjectByCondition', params)
  },
  // 获取企业项目详情
  getEnterpriseProjectDetail(params) {
    return post('Sharing/getEnterpriseProjectDetail', params)
  },

  // 企业库指标数据层级目录
  entSidebar(projectId) {
    return get(`Sharing/entSidebar/${projectId}`)
  },
  //侧边栏获取项目下有文件的编制阶段
  shareGetProjectDocumentsStage(projectId) {
    return get(`Sharing/getProjectDocumentsStage/${projectId}`)
  },
  // 查询项目成员
  getProjectStaff(projectId) {
    return get(`Sharing/getProjectStaff/${projectId}`)
  },
  // 企业库土建指标数据表
  indexCivilSharing(params) {
    return post('Sharing/civil', params)
  },
  // 企业库钢筋指标数据表
  indexRebarSharing(params) {
    return post('Sharing/rebar', params)
  },
  // 企业库安装指标数据表
  indexInstallationSharing(params) {
    return post('Sharing/installation', params)
  },
  // 企业库项目指标汇总数据表
  projectSummarySharing(params) {
    return post('Sharing/projectSummary', params)
  },
  // 企业库项目指标专业工程估价数据表
  provisionalEngineeringSharing(params) {
    return post('Sharing/provisionalEngineering', params)
  },
  // 企业库单项工程指标汇总表
  monomerSummarySharing(params) {
    return post('Sharing/monomerSummary', params)
  },
  // 企业库分部工程技术指标
  subdivisionAmountIndexSharing(params) {
    return post('Sharing/subdivisionAmountIndex', params)
  },
  // 企业库分部工程经济指标
  subdivisionCostIndexSharing(params) {
    return post('Sharing/subdivisionCostIndex', params)
  },
  // 企业库分部分项及单价措施技经指标表
  monomerSummaryItemsSharing(params) {
    return post('Sharing/monomerSummaryItems', params)
  },
  // 企业库分部分项及单价措施技经指标表最后一级
  itemsByNineDigitSharing(params) {
    return post('Sharing/itemsByNineDigit', params)
  },
  // 企业库获取综合单价分析表详情
  compUnitPriceSharing(params) {
    return post('Sharing/compUnitPrice', params)
  },
  // 企业库人材机汇总表
  monomerResourceSummarySharing(params) {
    return post('Sharing/monomerResourceSummary', params)
  },
  // 企业库主要人材机汇总表
  monomerMajorResourceSharing(params) {
    return post('Sharing/monomerMajorResource', params)
  },
  //企业库获取所有单项工程
  getAllMonomerSharing(projectId, stageId) {
    return get(`Sharing/getAllMonomer/${projectId}/${stageId}`)
  },

}


