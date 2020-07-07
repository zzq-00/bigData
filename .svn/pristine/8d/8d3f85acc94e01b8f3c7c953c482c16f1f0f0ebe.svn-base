import { get, post } from 'axios'
/**
 * 文件
 */
export default {
  // 新增文件夹
  addFolder(params) {
    return post('file/addFolder', params)
  },
  // 删除文件
  delFile(id) {
    return get(`file/delFile/${id}`)
  },
  // 删除文件夹
  delFolder(id) {
    return get(`file/delFolder/${id}`)
  },
  // 文件下载
  downloadFile(folderIds) {
    return post('file/downloadFile', folderIds)
  },
  // 获取默认的文件夹
  getDefaultFolders(projectId) {
    return get('file/getDefaultFolders/' + projectId)
  },
  // 获取指定文件id的信息详情
  getFileById(fileId) {
    return get(`file/getFileById/${fileId}`)
  },
  // 获取该文件夹下的所有文件(夹)
  getFilesByFolderId(folderId) {
    return get(`file/getFilesByFolderId/${folderId}`)
  },
  // 修改文件名
  renameFile(params) {
    return post('file/renameFile', params)
  },
  // 修改文件夹名
  renameFolder(params) {
    return post('file/renameFolder', params)
  },
  // 文件预览
  previewFile(id) {
    return get(`file/previewFile/${id}`)
  },
  // 上传文件
  uploadFile4Test(params, config) {
    return post('file/uploadFile4Test', params, config)
  },
  // 上传aliyun文件
  uploadFileToAli(params, config) {
    return post('file/uploadFileToAli', params, config)
  },
  // 移动文件
  moveFile(params) {
    return post('file/move', params)
  },
  
}
