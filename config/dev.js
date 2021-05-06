// eslint-disable-next-line import/no-extraneous-dependencies
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  env: {
    NODE_ENV: '"development"',
  },
  defineConstants: {},
  mini: {
    // webpackChain(chain) {
    //   chain.mode("production");
    //   chain.optimization.minimize(true);
    //   chain.plugin("terser").use(TerserPlugin, [
    //     {
    //       cache: true,
    //       extractComments: false,
    //       terserOptions: {
    //         output: {
    //           comments: false,
    //         },
    //       },
    //     },
    //   ]);
    // },
  },
  h5: {},
};
