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
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: 'raw-loader',
      },
    ],
  },

  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'public/scripts'),
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      "@models": path.resolve(__dirname, "src/models/"),
      "@services": path.resolve(__dirname, "src/services/"),
      "@data": path.resolve(__dirname, "src/data/"),
      "@presentation": path.resolve(__dirname, "src/presentation/"),
      "@controllers": path.resolve(__dirname, "src/presentation/controllers/"),
      "@elements": path.resolve(__dirname, "src/presentation/elements/"),
      "@html": path.resolve(__dirname, "src/presentation/html/"),
    }
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ],
};