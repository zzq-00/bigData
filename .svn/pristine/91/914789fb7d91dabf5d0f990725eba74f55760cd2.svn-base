import axios from 'axios'
import { Message } from "element-ui"
// axios 配置
axios.defaults.timeout = 0
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/proxyHeader' : process.env.VUE_APP_API

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (!config.url.includes('ali')) {
      config.withCredentials = true
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 返回状态判断
axios.interceptors.response.use(
  response => {
    // if (response.data.size || response.data.type === 'application/vnd.ms-excel' || response.data.type === 'application/octet-stream' || (response.headers && (response.headers['content-type'] === 'application/vnd.ms-excel' || response.headers['content-type'] === 'application/vnd.ms-excel;charset=UTF-8' || response.headers['content-type'] === 'application/octet-stream;charset=UTF-8'))) {
    if (response.data.toString() === '[object Blob]') return response.data
    if (response.data.code !== 200) {
      Message({ showClose: true, type: 'error', message: response.data.info })
      // 登录状态丢失，未登录 1001
      if (response.data.code === 4001) {
        window.localStorage.clear()
        window.location.href = '/login?redirectUrl=' + window.location.href
      }
      return Promise.reject(response.data)
    }
    return response.data
  },
  error => {
    console.log(error.toString());
    return Promise.reject(error.toString())
  }
)

let apiObject = {
  // 上传aliyun文件
  uploadToAliFile(host, params, config) {
    return axios.post(host, params, config)
  }
}
// 自动导入当前文件夹下的文件内容，合并为一个Object。
// 不太好，以后放弃
const apiFiles = require.context('.', false, /\.js$/)
apiFiles.keys().forEach(key => {
  if (key === './api.js') return
  apiObject = {
    ...apiObject,
    ...apiFiles(key).default
  }
})
console.log(apiObject)
export default apiObject
