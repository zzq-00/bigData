import { post, get } from 'axios'
/**
 * 指标导出
 */
export default {
  // 单项工程指标导出 算量指标:安装指标flag =4,土建指标flag =5,钢筋指标flag =6
  ExcelCommon(data) {
    return post('export/SingleItemAnalyzeExcelCommon', data, { responseType: 'blob' })
  },
  // 指标导出
  accountBalanceExport(fileId) {
    return post('export/accountBalanceExport', fileId, { responseType: 'blob' })
  }
}
