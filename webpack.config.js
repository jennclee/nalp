const path = require('path')

const config = {
  entry: './client/src/app.js',
  output: {
    path: path.resolve(__dirname, 'client/dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['es2016'], 'react',
          ],
          plugins: [
            'babel-plugin-transform-class-properties',
          ],
        },
      },
    ],
  },
}

module.exports = config
