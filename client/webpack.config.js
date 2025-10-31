const path = require("path");
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
    alias: {
      "@controllers": path.resolve(SRC_PATH, "controllers/"),
      "@core": path.resolve(SRC_PATH, "core/"),
      "@elements": path.resolve(SRC_PATH, "elements/"),
      "@html": path.resolve(SRC_PATH, "html/"),
      "@models": path.resolve(SRC_PATH, "models/"),
      "@services": path.resolve(SRC_PATH, "services/"),
    }
  },

  plugins: [
    new Dotenv(),
  ],
};