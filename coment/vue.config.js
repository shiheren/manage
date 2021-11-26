module.exports = {
    publicPath: './',
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000', //API服务器的地址
          changeOrigin: true, // 是否跨域
          pathRewrite: {
            '^/api': '', //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
          },
        },
      },
    },
  }