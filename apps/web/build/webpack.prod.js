const { merge } = require('webpack-merge');
const webpackBaseConfig = require('./webpack.config');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ArcoWebpackPlugin = require('@arco-design/webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(webpackBaseConfig, {
  mode: process.env.NODE_ENV,
  cache: {
    type: 'filesystem',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'cache-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer'],
              },
            },
          },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      // 分割代码块
    },
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new ArcoWebpackPlugin(), // Arco Ui的tree shaking
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash:4].css',
      chunkFilename: '[name].chunk.css',
    }),
    new CssMinimizerPlugin(),
    new CompressionPlugin({
      threshold: 20,
    }),
    new TerserPlugin({
      parallel: false,
      terserOptions: {
        nameCache: null,
      },
    }),
  ],
});
