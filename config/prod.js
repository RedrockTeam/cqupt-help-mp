/* eslint-disable import/no-extraneous-dependencies */
const TerserPlugin = require("terser-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  env: {
    NODE_ENV: '"production"',
  },
  defineConstants: {},
  mini: {
    webpackChain(chain) {
      chain.mode("production");
      chain.optimization.minimize(true);
      chain.plugin("terser").use(TerserPlugin, [
        {
          cache: true,
          extractComments: false,
          terserOptions: {
            output: {
              comments: false,
            },
          },
        },
      ]);
      chain.plugin("bundle analyzer").use(BundleAnalyzerPlugin);
    },
  },
  h5: {
    /**
     * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
     * 参考代码如下：
     * webpackChain (chain) {
     *   chain.plugin('analyzer')
     *     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
     * }
     */
  },
};
