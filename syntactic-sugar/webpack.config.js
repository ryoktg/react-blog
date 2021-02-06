const path = require('path');

module.exports = {
  mode: 'development',
  entry: './index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: 'babel-loader',
      },
    ],
  },
}
