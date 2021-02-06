const path = require('path');

module.exports = {
  mode: 'development',
  entry: './index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.tsx'],
  },
}
