import { get, post } from 'axios'
/**
 * 可视化界面
 */
export default {
  // 单项工程混凝土单方含量走势图
  civilEngineerinConcreteChart(params) {
    return post('visualInterface/civilEngineerinConcreteChart', params)
  },
  // 单项工程砌体单方含量走势图
  civilEngineerinMasonryChart(params) {
    return post('visualInterface/civilEngineerinMasonryChart', params)
  },
  // 单项工程钢筋单方含量走势图
  rebarChart(params) {
    return post('visualInterface/rebarChart', params)
  },
  // 钢筋首页
  rebarSingleProjectlist(params) {
    return post('visualInterface/rebarSingleProjectlist', params)
  },
  // 钢筋各部分含量占比
  rebarContent(buildingId) {
    return get(`visualInterface/rebarContent/${buildingId}`)
  },
  // 钢筋单方含量走势图
  rebarIndexChart(buildingId) {
    return get(`visualInterface/rebarIndexChart/${buildingId}`)
  },
  // 土建首页-砌体
  masonrySingleProjectlist(params) {
    return post('visualInterface/masonrySingleProjectlist', params)
  },
  // 土建首页-混凝土
  concreteSingleProjectlist(params) {
    return post('visualInterface/concreteSingleProjectlist', params)
  },
  // 土建砌体单方含量走势图
  masonryChart(buildingId) {
    return get(`visualInterface/masonryChart/${buildingId}`)
  },
  // 土建砌体各部分含量占比
  masonryContent(buildingId) {
    return get(`visualInterface/masonryContent/${buildingId}`)
  },
  // 土建混凝土单方含量走势图
  concreteChart(buildingId) {
    return get(`visualInterface/concreteChart/${buildingId}`)
  },
  // 土建砌体各部分含量占比
  concreteContent(buildingId) {
    return get(`visualInterface/concreteContent/${buildingId}`)
  },
  // 造价首页
  costHome(params) {
    return post('visualInterface/costHome', params)
  },
  // 单方造价走势图
  unilateralCostChart(buildingId) {
    return get(`visualInterface/unilateralCostChart/${buildingId}`)
  },
  // 各部分单方造价占比
  costRatioContent(buildingId) {
    return get(`visualInterface/costRatioContent/${buildingId}`)
  },
  // 人材机占比下拉
  talentMachine(buildingId) {
    return get(`visualInterface/talentMachine/${buildingId}`)
  },
  // 各部分人材机占比分析
  talentMachineRatio(params) {
    return post('visualInterface/talentMachineRatio', params)
  },
  // 综合单价分布
  IntegrateDistributed(params) {
    return post('visualInterface/IntegrateDistributed', params)
  },
  // 综合单价下拉
  integratedunitpriceDetails(buildingId) {
    return get(`visualInterface/integratedunitpriceDetails/${buildingId}`)
  },
  // 已存在的业态第一级
  accessToBusinessOne(params) {
    return post('visualInterface/accessToBusinessOne', params)
  },
  // 已存在的业态第二级
  accessToBusinessTwo(params) {
    return post('visualInterface/accessToBusinessTwo', params)
  },
  // 单项工程单方造价走势
  singleProjectUnilateralCostChart(params) {
    return post('visualInterface/singleProjectUnilateralCostChart', params)
  },
  // 综合单价价格走势-首页
  homeUnilateralCostChart(params) {
    return post('visualInterface/unilateralCostChart', params)
  },
  // 综合单价下拉-首页
  integratedUnitPriceDrop() {
    return get('visualInterface/integratedUnitPriceDrop')
  },
  // 获取存在年份
  getTheYearOfExistence(params) {
    return post('visualInterface/getTheYearOfExistence', params)
  }
}
