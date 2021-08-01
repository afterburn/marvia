const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')

const src = path.join(__dirname, 'src')
const dist = path.join(__dirname, 'dist')

module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', path.join(src, 'index.tsx')],
  output: {
    filename: '[name].bundle.js',
    path: dist
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          { loader: 'ts-loader' }
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(src, 'index.html')
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     { from: path.join(src, 'assets'), to: dist }
    //   ]
    // })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  }
}