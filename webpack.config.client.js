import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import AssetsPlugin from 'assets-webpack-plugin';
import path from 'path';
import Dotenv from 'dotenv-webpack';
import 'babel-polyfill';

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  'process.env.BROWSER': true,
  __DEV__: false
};

export default {
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json']
  },
  devtool: 'source-map',
  entry: ['babel-polyfill', path.resolve(__dirname, 'server/client')],
  target: 'web',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'server/build/public'),
    publicPath: '/',
    filename: 'client.js'
  },
  plugins: [
    new webpack.DefinePlugin(GLOBALS),

    // Generate an external css file
    new ExtractTextPlugin('styles.css'),

    new Dotenv({
      path: path.resolve(__dirname, `.env.${process.env.ENV || 'prod'}`),
      systemvars: true,
    }),

    // Output our JS and CSS files in a manifest file called assets.json
    new AssetsPlugin({
      path: path.resolve(__dirname, 'server/build'),
      filename: 'assets.json',
    })
  ],
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
        use: ExtractTextPlugin.extract({
          use: [
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
                includePaths: [path.resolve(__dirname, 'src', 'scss')],
                sourceMap: true
              }
            }
          ]
        })
      }
    ]
  }
};
