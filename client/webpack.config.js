const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const SRC_PATH = path.resolve(__dirname, "./src");

module.exports = {
  entry: "./src/index.ts",
  mode: process.env.NODE_ENV || "development",
  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: "raw-loader",
      },
    ],
  },

  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "public/scripts"),
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    plugins: [
      new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })
    ],
  },

  plugins: [
    new Dotenv(),
  ],
};