const path = require('path')

const sourcePath = path.join(__dirname, 'client/src')
const outputPath = path.join(__dirname, 'client/dist')

module.exports.config = {
  entry: './client/src/app.js',
  output: {
    path: outputPath,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['react'],
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      sourcePath,
    ],
  },
}
