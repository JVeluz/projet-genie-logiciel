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
    alias: {
      "@utils": path.resolve(__dirname, "src/utils/"),
      "@models": path.resolve(__dirname, "src/models/"),
      "@services": path.resolve(__dirname, "src/services/"),
      "@repositories": path.resolve(__dirname, "src/repositories/"),
      "@data": path.resolve(__dirname, "src/data/"),
      "@pages": path.resolve(__dirname, "src/presentation/pages/"),
      "@components": path.resolve(__dirname, "src/presentation/components/")
    }
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ],
};