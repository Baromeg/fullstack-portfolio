const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DotEnv = require('dotenv-webpack')
const env =
  process.env.NODE_ENV === 'production'
    ? new webpack.EnvironmentPlugin({ ...process.env })
    : new DotEnv()

module.exports = () => {
  return {
    entry: './frontend/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve('./backend/dist'),
      publicPath: '/'
    },
    // target: 'web',
    devtool: 'source-map',
    module: {
      rules: [
        { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
        { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        {
          test: /\.s(a|c)ss$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        },
        { test: /\.(png|jpe?g|gif)$/i, use: 'file-loader' }
      ]
    },
    devServer: {
      contentBase: path.resolve('frontend'),
      hot: true,
      open: true,
      port: 8001,
      watchContentBase: true,
      historyApiFallback: true,
      proxy: {
        '/api': {
          target: 'http://localhost:8000',
          secure: false
        }
      }
    },
    plugins: [
      new DotEnv(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.ProvidePlugin({
        React: 'react'
      }),
      new HtmlWebpackPlugin({
        template: 'frontend/index.html',
        filename: 'index.html',
        inject: 'body'
      }),
      env
    ]
  }
}
