import { get, post } from 'axios'
/**
 *  数据平台2.0指标数据
 */
export default {
  // 通过清单编码和单位工程id获取 综合单价分析详情
  compUnitPrice (params) {
    return post('index/compUnitPrice',params)
  },
  // 土建指标数据表
  indexCivil(params) {
    return post('index/civil', params)
  },
  // 安装指标数据表
  indexInstallation(params) {
    return post('index/installation', params)
  },
  // 钢筋指标数据表
  indexRebar(params) {
    return post('index/rebar', params)
  },
  // 项目指标汇总数据表
  projectSummary(params) {
    return post('index/costProject/projectSummary', params)
  },
  // 项目指标专业工程估价数据表
  provisionalEngineering(params) {
    return post('index/costProject/provisionalEngineering', params)
  },
  // 单项工程指标汇总表
  monomerSummary(params) {
    return post('index/costMonomer/monomerSummary', params)
  },
  // 分部工程技术指标
  subdivisionAmountIndex(params) {
    return post('index/costMonomer/subdivisionAmountIndex', params)
  },
  // 分部工程经济指标
  subdivisionCostIndex(params) {
    return post('index/costMonomer/subdivisionCostIndex', params)
  },
  // 分部分项及单价措施技经指标表
  monomerSummaryItems(params) {
    return post('index/costMonomer/monomerSummaryItems', params)
  },
  // 分部分项及单价措施技经指标表最后一级
  itemsByNineDigit(params) {
    return post('index/costMonomer/itemsByNineDigit', params)
  },
  // 获取综合单价分析表详情
  compUnitPrice(params) {
    return post('index/compUnitPrice', params)
  },
  // 人材机汇总表
  monomerResourceSummary(params) {
    return post('index/costMonomer/monomerResourceSummary', params)
  },
  // 主要人材机汇总表
  monomerMajorResource(params) {
    return post('index/costMonomer/monomerMajorResource', params)
  },


}
