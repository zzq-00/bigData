import { post, get } from 'axios'
/**
 * 意见反馈
 */
export default {
  // 意见反馈文件上传
  uploadFeedbackFile() {
    return post('feedback/uploadFeedbackFile')
  },
  // 保存意见反馈
  saveFeedback(params) {
    return post('feedback/saveFeedback', params)
  },
  // 条件查询反馈意见
  getFeedBackByCondition(params) {
    return post('feedback/getFeedBackByCondition', params)
  },
  // 修改反馈状态
  modifyDealStatus(params) {
    return post('feedback/modifyDealStatus', params)
  },
  // 预览附件
  reviewNewsPic(params) {
    return get('feedback/reviewNewsPic/' + params)
  }

}
