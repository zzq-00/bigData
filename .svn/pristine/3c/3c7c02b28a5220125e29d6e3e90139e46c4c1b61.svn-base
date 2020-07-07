import { get, post } from 'axios'
/**
 * 项目
 */
export default {
  // 创建或者修改项目
  saveOrUpdateProject(params) {
    return post('project/saveOrUpdateProject', params)
  },
  // 获取项目详情

  getProjectDetail(id) {
    return post('project/getProjectDetail', id)
  },
  // 获取企业项目详情
  // getEnterpriseProjectDetail(projectId) {
  //   return get(`project/getEnterpriseProjectDetail/${projectId}`)
  // },
  // 根据条件查询项目
  getProjectByCondition(params) {
    return post('project/getProjectByCondition', params)
  },
  // 获取初始化文件目录
  getInitFolder(projectId) {
    return get(`project/getInitFolder/${projectId}`)
  },
  // 获取初始化企业文件目录
  getEnterpriseInitFolder(projectId) {
    return get(`project/getEnterpriseInitFolder/${projectId}`)
  },
  // 造价指标:建安费指标flag =1,综合单价指标flag =2,建安费指标flag =3
  getCostIndicators(flag) {
    return post('project/getCostIndicators', flag)
  },
  // // 算量指标:安装指标flag =4,土建指标flag =5,钢筋指标flag =6
  getCostIndicatorA(data) {
    return post('project/getCalculateQuantityIndicators', data)
  },
  // 侧边栏造价指标下的单体名
  getAllOfTheMonomer() {
    return get(`project/getAllOfTheMonomer`)
  },
  // 安装指标下的单体详情
  getProjectForDetails(params) {
    return post('project/getProjectForDetails', params)
  },
  // 项目管理：获取本月或者累计上传文件/项目总数
  getCount(flag) {
    return get(`project/getCount/${flag}`)
  },
  // 知识库：获取本月或者累计文件上传/下载总数
  getKnowledgeCount(flag) {
    return get(`project/getKnowledgeCount/${flag}`)
  },
  // 获取项目/知识库文件 top5
  getTop5(flag) {
    return get(`project/getTop5/${flag}`)
  },
  // 删除项目
  delProject(projectId) {
    return get(`project/delProject/${projectId}`)
  },
  // 项目分析
  analysisData(params, config) {
    return post('project/analysisData', params, config)
  },
  // 点击分享
  // shareProject(projectId) {
  //   return get(`project/shareProject/${projectId}`)
  // },
  // 获取首页 我的项目" "企业项目" "单项工程" "综合单价" 数据
  getIndex4() {
    //return get('project/getIndex4')
    return get('home/getIndex4')
  },
  // 项目分类统计
  getProjectPercent() {
    //return get('project/getProjectPercent')
    return get('home/getProjectPercent')
  },
  // 项目单项工程贡献榜
  getProjectOrMonomerTop5(flag) {
    //return get(`project/getProjectOrMonomerTop5/${flag}`)
    return get(`home/getProjectOrMonomerTop5/${flag}`)
  },
  // 项目地域分布
   getProjectStatistics() {
      //return get('project/getProjectStatistics')
      return get('home/getProjectStatistics')
   },
  // 最新动态
  getIndexNews() {
    //return get('project/getIndexNews')
    return get('home/getIndexNews')
  },
  // 获取首页我的项目
  getMyProject() {
    //return get('project/getMyProject')
    return get('home/getMyProject')
  },
  // 获取初始化目录(项目数据专用)
  getInitFolder4ProjectData(projectId) {
    return get(`project/getInitFolder4ProjectData/${projectId}`)
  },
  // 获取企业项目详情(项目数据专用)
  getProjectDetail4ProjectData(projectId) {
    return get(`project/getProjectDetail4ProjectData/${projectId}`)
  },
  // 查询项目成员
  getMembersByPid(projectId) {
    return get(`project/getMembersByPid/${projectId}`)
  },
  // 判断项目是否重名
  duplicateNames(name) {
    return get(`project/duplicateNames/${name}`)
  },
}
