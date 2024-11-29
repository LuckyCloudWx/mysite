module.exports = {
  devServer: {
    proxy: {
      '/res': {
        target: 'http://localhost:7001'
      },
      '/api': {
        target: 'http://localhost:7001'
      },
      '/static': {
        target: 'http://localhost:7001'
      },
    },
  },
  configureWebpack: require("./webpack.config")
}