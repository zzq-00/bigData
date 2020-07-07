import { get, post } from 'axios'
/**
 * 质检、对比
 */
export default {
  // // 条件查询单体
  // getMonomerByCondition(params) {
  //   return post('monomer/getMonomerByCondition', params)
  // },
  // 获取项目下每个阶段可以比对单项工程个数
  getCompareMonomerByProjectId(projectId) {
    return get(`dataComparison/getProjectStageMonomerNum/${projectId}`)
  },
  //获取阶段下可用单项工程
  getCompareMonomers(params) {
    return post(`/dataComparison/getStageAvailableMonomer`, params)
  },
  //开始比较单体内
  startCompare(params) {
    return post(`/quantity/innerMonomerCompare`, params)
  },
  //开始比较项目内
  startProCompare(params) {
    return post(`/quantity/innerProjectCompare`, params)
  },
  //开始比较人材机
  innerProjectResCompare(params) {
    return post(`/quantity/innerProjectResCompare`, params)
  },

  //保存比较结果
  saveCompareResults(params) {
    return post(`/quantity/saveInnerMonomerCompare`, params)
  },
  //保存比较同类项目结果
  saveInnerProjectCompare(params, type) {
    if (type == 7) {
      return post(`/quantity/saveInnerProjectResCompare`, params)
    } else {
      return post(`/quantity/saveInnerProjectCompare`, params)
    }
  },

  reCalc(params, type) {
    if (type == 1) {
      //总指标比对，根据偏差范围重新计算并返回
      return post(`/quantity/biasCalcOfIPIndexSummary`, params)
    } else if (type == 2) {
      //经济指标比对，根据偏差范围重新计算并返回
      return post(`/quantity/biasCalcOfIPEconomicIndex`, params)
    } else if (type == 4) {
      //工程量比对，根据偏差范围重新计算并返回
      return post(`/quantity/biasCalcOfIPQuantityIndex`, params)
    }
  },
  findInnerMonomerCompareOpinion(params) {
    return post(`/quantity/findInnerMonomerCompareOpinion`, params)
  },
  findInnerProjectCompareOpinion(params) {
    return post(`/quantity/findInnerProjectCompareOpinion`, params)
  },
  getInnerMonomerCompareOpinion(params) {
    return get(`/quantity/getInnerMonomerCompareOpinion/${params}`)
  },
  getInnerProjectCompareOpinion(params) {
    return get(`/quantity/getInnerProjectCompareOpinion/${params}`)
  },
  //库内单项工程详情 
  getLibraryMonomerDetail(params) {
    return post(`/dataComparison/getLibraryMonomerDetail`, params)
  },


}
