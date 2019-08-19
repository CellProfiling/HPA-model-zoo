// vue.config.js
const webpack = require("webpack");
module.exports = {
  runtimeCompiler: true,
  outputDir: "./dist",
  assetsDir: "static",
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  devServer: {
    compress: true,
    port: 8000,
  },
  configureWebpack: {
    module: {
      // for supressing webpack warnings
      exprContextCritical: false,
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV || "development"),
        },
      }),
    ],
  },
  pluginOptions: {},
  lintOnSave: false,
};
