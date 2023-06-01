/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlguin = require('copy-webpack-plugin'); // 拷贝静态资源到public目录下
const webpack = require('webpack');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const rootDir = path.resolve(__dirname, '..');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

require('dotenv').config({ path: path.join(__dirname, '../../../', `environments/.env.${process.env.SERVICES_ENV}`) });

const REACT_APP = /^VITE_/i;
function getClientEnvironment() {
  // PUBLIC_URL --> 公共URL
  const raw = Object.keys(process.env)
    .filter((key) => REACT_APP.test(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key];
        return env;
      },
      {
        NODE_ENV: process.env.NODE_ENV || 'development',
      },
    );

  // 注入环境变量
  const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };

  return { raw, stringified };
}
const env = getClientEnvironment();
module.exports = {
  mode: 'none',
  target: 'web',
  entry: {
    index: path.join(rootDir, 'template/js/index.js'),
    app: path.resolve(rootDir, 'src/index.tsx'),
  },
  output: {
    filename: 'js/[name].[chunkhash:4].js',
    path: path.resolve(rootDir, 'dist'),
    // publicPath: 'https://oss.yaogeng.top/prod/web/reactArcoAdmin',
    publicPath: '/',
    clean: true, // 清空打包旧文件
  },
  resolve: {
    alias: {
      '@': path.resolve(rootDir, 'src'),
      src: path.resolve(rootDir, 'src'),
    },
    extensions: ['.tsx', '.ts', '.js', '.jsx', 'css', 'less', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx?)$/,
        enforce: 'pre',
        use: [
          {
            loader: 'eslint-loader',
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx|tsx?)$/, // es6->es5
        use: ['cache-loader', 'thread-loader', 'babel-loader?cacheDirectory=true'], // thread-loader 多线程打包
        include: path.resolve(rootDir, 'src'),
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          'cache-loader',
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: { autoprefixer: {} },
              },
            },
          },
        ],
      },
      {
        test: /\.less$/i,
        use: [
          {
            loader: 'cache-loader',
          },
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: (resourcePath) => resourcePath.endsWith('.module.less'),
                localIdentName: '[local]___[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: { autoprefixer: {} },
              },
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: {
                  'arcoblue-6': 'red',
                  '--gray-6': '#ffffff',
                },
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(ico|png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './image',
              limit: 1024 * 10,
            },
          },
        ],
      },
      {
        test: /\.woff2$/,
        use: ['file-loader'],
      },
      {
        test: /\.ttf$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(rootDir, 'template/index.html'),
      inject: 'body',
      scriptLoading: 'blocking',
    }),
    new NodePolyfillPlugin(),
    new CopyWebpackPlguin({
      patterns: [
        {
          from: '*.js',
          context: path.resolve(rootDir, 'template/js'),
          to: path.resolve(rootDir, 'dist/js/[name].js'),
        },
        // {
        //   from: '*.ico',
        //   context: path.resolve(rootDir, 'template'),
        //   to: path.resolve(rootDir, 'public'),
        // },
      ],
    }),
    new webpack.DefinePlugin(env.stringified), // 配置环境变量
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        // messages: [`You application is running here ${env.stringified['process.env'].REACT_APP_SERVER_DOMAIN}`],
        messages: ['You application is running here http://localhost:8090'],
        notes: ['successful 🚀'],
      },
    }),
  ],
};
