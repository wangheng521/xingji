const {
  defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 开发服务器设置
  devServer: {
    open: false,
    // vue项目代理请求
    proxy: {
      "/admin": {
        // 把相对地址中的域名 映射到 目标地址中
        target: "http://192.168.0.129:6003/",
        // 修改host请求的域名为目标域名
        changeOrigin: true,
        pathRewrite: {
          "^/admin": "",
        },
      },
      "/api": {
        // 把相对地址中的域名 映射到 目标地址中
        target: "http://192.168.0.118:8004/",
        // 修改host请求的域名为目标域名
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
})
