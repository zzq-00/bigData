const Timestamp = new Date().getTime();
module.exports = {
  lintOnSave: false,
  devServer: {
    open: true,
    port: 8086,
    // 代理
    proxy: {
      '/proxyHeader': {
        target: 'http://datads.tzecc.com/api/',
        // target: 'http://172.16.209.212:8090', // 师将
        // target: 'http://172.16.209.103:8090', // 文昌
        // target: 'http://172.16.209.186:8090', // 天遥
        pathRewrite: {
          '^/proxyHeader': '/', // rewrite path
        }
      },
    }
  },
  configureWebpack: { // webpack 配置
    output: { // 输出重构  打包编译后的 文件名称  【模块名称.时间戳】
      filename: `[name].${Timestamp}.js`,
      chunkFilename: `[name].${Timestamp}.js`
    },
  },
}