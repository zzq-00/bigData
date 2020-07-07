import { get, post } from 'axios'
/**
 * 指标
 */
export default {
  // 获取单体名称
  monomerInformation(params) {
    return post(`analyse/monomerInformation`, params)
  },
  // 综合单价标准库
  integratedUnitPriceStandardLibrary(params) {
    return post('analyse/integratedUnitPriceStandardLibrary', params)
  },
  // 算量指标:安装指标flag =4,土建指标flag =5,钢筋指标flag =6
  getCostIndicatorAnalyse(data) {
    return post('analyse/getCalculateQuantityIndicators', data)
  },
  // 造价指标:建安费指标flag =1,综合单价指标flag =2,人材机分析指标flag =3
  getCostIndicatorsAnalyse(data) {
    return post('analyse/getCostIndicators', data)
  },
  // 安装指标
  installIndicator(data) {
    return post('analyse/installIndicator', data)
  },
  // 安装指标筛选
  getFilterAnalyse(data) {
    return post('analyse/getFilter', data)
  },
  // 综合单价详情
  comprehensiveUnitPriceDetails(unitPriceId) {
    return get('analyse/comprehensiveUnitPriceDetails/' + unitPriceId)
  },
  // 安装指标第一级
  installIndicatorOne(data) {
    return post('analyse/installIndicatorOne', data)
  },
  // 安装指标第2级
  installIndicatorTwo(data) {
    return post('analyse/installIndicatorTwo', data)
  },
  // 安装指标第3级
  installIndicatorThree(data) {
    return post('analyse/installIndicatorThree', data)
  },
  // 安装指标第4级
  installIndicatorFour(data) {
    return post('analyse/installIndicatorFour', data)
  },
  // 综合单价第1级
  complexUnitPriceOne(data) {
    return post('analyse/complexUnitPriceOne', data)
  },
  // 综合单价第2级
  complexUnitPriceTwo(data) {
    return post('analyse/complexUnitPriceTwo', data)
  },
  // 综合单价第3级
  complexUnitPriceThree(data) {
    return post('analyse/complexUnitPriceThree', data)
  },
  // 综合单价第4级
  complexUnitPriceFour(data) {
    return post('analyse/complexUnitPriceFour', data)
  },
  // 人材机第1级
  humanMachineOne(data) {
    return post('analyse/humanMachineOne', data)
  },
  // 人材机第2级
  humanMachineTwo(data) {
    return post('analyse/humanMachineTwo', data)
  },
  // 人材机第3级
  humanMachineThree(data) {
    return post('analyse/humanMachineThree', data)
  },
  // 人材机第4级
  humanMachineFour(data) {
    return post('analyse/humanMachineFour', data)
  },
  // 获取筛选条件
  getFilter(data) {
    return post('analyse/getFilter', data)
  },
  // 安装算量指标筛选之后的数据
  installFilters(data) {
    return post('analyse/Filters', data)
  },
  // 获取单体信息
  getMonomerDto(monomerId) {
    return get('analyse/getMonomerDto/' + monomerId)
  },
  // 新版土建指标
  civilEngineeringIndicatorsNew(data) {
    return post('analyse/civilEngineeringIndicatorsNew', data)
  },
  // 新版钢筋指标
  rebarQuantityNew(data) {
    return post('analyse/rebarQuantityNew', data)
  },
  // 钢筋土建每项的趋势图
  histogram(data) {
    return post('analyse/histogram', data)
  }
}
