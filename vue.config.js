// vue.config.js
const path = require('path')
const webpack = require('webpack')
module.exports = {
  runtimeCompiler: true,
  outputDir: './dist',
  assetsDir: 'static',
  publicPath: 'HPA-model-zoo',
  devServer: {
    compress: true,
    port: 8000
  },
  configureWebpack: {
    module: {
      // for supressing webpack warnings
      exprContextCritical: false
    },
    plugins: [
    ]
  },
  chainWebpack: config => {
  },
  pluginOptions: {
  }
}
