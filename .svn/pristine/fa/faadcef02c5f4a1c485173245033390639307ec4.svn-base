import { get, post } from 'axios'
/**
 * 单体
 */
export default {
  // 条件查询单体
  getMonomerByCondition(params) {
    return post('monomer/getMonomerByCondition', params)
  },
  // 批量修改单体
  modifyMonomer(params) {
    return post('monomer/modifyMonomer', params)
  },
  // 单体信息
  addSingleInfo(params) {
    return post('monomer/addOrModifyMonomer', params)
  },
  // 获取某个项目下的所有单体
  getMonomerByProjectId(projectId) {
    return get(`monomer/getMonomerByProjectId/${projectId}`)
  },
  // 获取某个企业库项目下已经解析出的所有单体
  getMonomerByEnterpriseProjectId(projectId) {
    return get(`monomer/getMonomerByEnterpriseProjectId/${projectId}`)
  },
  // 获取单体详情
  getMonomerDetail(monomerId) {
    return get(`monomer/getMonomerDetail/${monomerId}`)
  },
  // 压缩文件下的单体信息
  getMonomerByParseFile(pid) {
    return post(`monomer/getMonomerByParseFile/${pid}`)
  },
  // 通过分析后的文件，解析单体信息
  resolveMonomerByFileIds(fileId) {
    return post('monomer/resolveMonomerByFileIds', fileId)
  },
  // 获取广联达文件下对应的所有单体
  getMonomerByFileIds(fileId) {
    return post('monomer/getMonomerByFileIds', fileId)
  },
  // 完成解析
  finishResolving(projectId) {
    return get(`monomer/finishResolving/${projectId}`)
  },
  // 单项工程信息
  getMonomerWithProject(id) {
    return get(`monomer/getMonomerWithProject/${id}`)
  },
  // 条件查询项目数据
  getProjectDataByCondition(params) {
    return post(`monomer/getProjectDataByCondition`, params)
  },
  // 获取项目下已经解析出的所有单体(项目数据专用)
  getMonomerByProjectId4ProjectData(projectId) {
    return get(`monomer/getMonomerByProjectId4ProjectData/${projectId}`)
  },

  // 2.0数据平台 分析文件步骤
  //获取编制阶段
  getProjectStage(projectId) {
    return get(`/monomer/getProjectStage/${projectId}`)
  },
  // 选择文件 获取可分析的初始文件
  getAnalyticalInitFolder(params) {
    return post('monomer/getAnalyticalInitFolder', params)
  },
  // 匹配单项工程 左侧已匹配的表格
  getMatches(params) {
    return post('monomer/getMatches', params)
  },
  // 匹配单项工程 右侧未匹配的所有单体
  getMonomers(params) {
    return post('monomer/getMonomers', params)
  },
  // 匹配单项工程 其他文件匹配列表
  otherFileMatchList(params) {
    return post('monomer/otherFileMatchList', params)
  },
  // 匹配单项工程 下一步 匹配临时保存功能
  matchTmpMonomer(params) {
    return post('monomer/matchTmpMonomer', params)
  },
  //1.1.3 获取所有临时单项工程 指标分析 第三步
  monomerGetAllMonomerTmp(projectId, stageId) {
    return get(`monomer/getAllMonomerTmp/${projectId}/${stageId}`)
    //return get(`monomer/getFileCorrespondenceMonomerTmp/${projectId}/${stageId}`)
  },
  //1.1.3 获取所有正式单项工程 我的项目 单项工程信息
  monomerGetAllMonomer(projectId, stageId) {
    return get(`monomer/getAllMonomer/${projectId}/${stageId}`)
  },
  //指标分析 第三步的列表 之前接口是上面哪一个 替换掉
  monomerGetFileCorrespondenceMonomerTmp(commonId, stageId, fileIds) {
    return get(`monomer/getFileCorrespondenceMonomerTmp/${commonId}/${stageId}/${fileIds}`)
  },
  //1.1.3 保存单个单项工程信息
  monomerSaveMonomers(params) {
    return post('monomer/saveMonomers', params)
  },
  //我的项目保存单个单项工程信息
  saveMonomersOfficial(params) {
    return post('monomer/saveMonomersOfficial', params)
  },
  //编辑按钮（正式表）
  monomerGetMonomer(monomerId, commonId) {
    return get(`monomer/getMonomer/${monomerId}/${commonId}`)
  },
   //编辑按钮（临时表 指标分析第三步用）
  monomerGetMonomerTmp(monomerId, commonId) {
    return get(`monomer/getMonomerTmp/${monomerId}/${commonId}`)
  },
  // 鼠标滑过获取信息
  getMonomerLeft(monomerId, commonId) {
    return get(`monomer/getMonomerLeft/${monomerId}/${commonId}`)
  },
  //点击下一步
  monomerNextSaveMonomers(params) {
    return post('monomer/nextSaveMonomers', params)
  },
  //删除 正式的
  monomerDelMonomer(params) {
    return post(`monomer/delMonomerTmp`, params)
  },
  //删除 测试的（除了详情左侧有列表的 详情）
  DelMonomerMonomer(params) {
    return post(`monomer/delMonomer`, params)
  },
  //获取单项工程类别
  monomerGetMonomerType(params) {
    return post(`monomer/getMonomerType`, params)
  },
  //侧边栏获取项目下有单项工程的编制阶段
  getProjectDocumentsStage(projectId) {
    return get(`monomer/getProjectMonomerBaseStage/${projectId}`)
  },
  monomerDelMonomerDetail(params) {
    return post(`monomer/delMonomerDetail`, params)
  },
  // 指标分析记录
  findMonomerUpdateTaskByProject(params) {
    return post(`monomer/findMonomerUpdateTaskByProject`, params)
  },
  // 获取项目下文件可分析的编制阶段
  getProjectDocumentsAnalyzableStage(commonId) {
    return get(`monomer/getProjectDocumentsAnalyzableStage/${commonId}`)
  },
  //单项工程名称是否重复
  monomerNameIsRepeat(params) {
    return post(`monomer/monomerNameIsRepeat`, params)
  },

}
