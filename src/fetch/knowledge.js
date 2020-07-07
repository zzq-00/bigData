import { get, post } from 'axios'
/**
 * 知识库
 */
export default {
  // 上传文库文件
  uploadKnowFile (params) {
    return post('knowledge/uploadKnowFile', params)
  },
  // 删除文库文件
  deleteKnowFile (fileId) {
    return get(`knowledge/deleteKnowFile/${fileId}`)
  },
  // 添加文库文档
  addKnowledgeBase (params) {
    return post('knowledge/addKnowledgeBase', params)
  },
  // 获取文件属性分类列表
  getKnowFileServiceType () {
    return get('knowledge/getKnowFileServiceType')
  },
  // 个人中心获取我的贡献列表
  getKnowUploadList () {
    return get('knowledge/getKnowUploadList')
  },
  // 个人中心获取已下载列表
  getKnowDownloadList () {
    return get('knowledge/getKnowDownloadList')
  },
  // 个人中心删除文档
  deleteKnowById (id) {
    return get(`knowledge/deleteKnowById/${id}`)
  },
  // 根据文档id获取文档详情
  getKnowBaseById (id) {
    return get(`knowledge/getKnowBaseById/${id}`)
  },
  // 保存文档修改
  updateKnowBase (params) {
    return post('knowledge/updateKnowBase', params)
  },
  // 热门推荐列表
  getKnowHotList (params) {
    return post('knowledge/getKnowHotList', params)
  },
  // 获取搜索文档列表
  getKnowBaseHomeList (params) {
    return post('knowledge/getKnowBaseHomeList', params)
  },
  // 获取搜索热词
  getNewSearchList () {
    return get('knowledge/getNewSearchList')
  },
  // 文件预览
  filePreview (fileId) {
    return get(`knowledge/filePreview/${fileId}`)
  }
}
