const path = require('path');

module.exports = {
  entry: {
    index: './public/js/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public/dist'),
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  devtool: 'source-map', // Untuk debugging
};


// npm install webpack webpack-cli --save-dev
// npm install @babel/core babel-loader @babel/preset-env --save-dev