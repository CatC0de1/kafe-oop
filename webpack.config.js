const path = require('path');

module.exports = {
  entry: './public/js/index.js', // File entry point
  output: {
    filename: 'bundle.js', // Nama output file
    path: path.resolve(__dirname, 'public/dist'), // Direktori output
  },
  mode: 'development', // Mode development untuk debugging
  module: {
    rules: [
      {
        test: /\.js$/, // Gunakan loader untuk file .js
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Untuk mendukung fitur modern ES6+
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