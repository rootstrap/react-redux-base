import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import webpackNodeExternals from 'webpack-node-externals';
import Dotenv from 'dotenv-webpack';
import 'babel-polyfill';

import resolve from './shared/resolve';

const GLOBALS = {
  window: {},
  'process.env.NODE_ENV': JSON.stringify('production'),
  'process.env.BROWSER': false,
  __DEV__: false
};

export default {
  resolve,
  devtool: 'source-map',
  entry: ['babel-polyfill', path.resolve(__dirname, '../server')],
  target: 'node',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../server/build'),
    publicPath: '/',
    filename: 'server.js'
  },
  plugins: [
    new webpack.DefinePlugin(GLOBALS),

    // Generate an external css file
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),

    new Dotenv({
      path: path.resolve(__dirname, `../.env.${process.env.ENV || 'prod'}`),
      systemvars: true,
    })
  ],
  externals: [webpackNodeExternals({
    whitelist: ['actioncable']
  })],
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'url-loader?name=[name].[ext]' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=[name].[ext]' },
      { test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=[name].[ext]' },
      { test: /\.svg(\?v=\d+.\d+.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=[name].[ext]' },
      { test: /\.(jpe?g|png|gif)$/i, loader: 'file-loader?name=[name].[ext]' },
      { test: /\.ico$/, loader: 'file-loader?name=[name].[ext]' },
      {
        test: /(\.css|\.scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: true,
              sourceMap: true
            }
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer')
              ],
              sourceMap: true
            }
          }, {
            loader: 'sass-loader',
            options: {
              includePaths: [path.resolve(__dirname, '../src', 'scss')],
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
};
