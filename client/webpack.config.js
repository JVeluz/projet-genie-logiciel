const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  entry: './src/index.ts',
  mode: process.env.NODE_ENV || 'development',
  devtool: 'source-map',

  module: {
    rules: [
      {
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },

  optimization: {
    minimize: true,
    usedExports: true,
  },

  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'public/scripts'),
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ],
};