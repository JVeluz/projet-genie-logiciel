const path = require("path");
const Dotenv = require("dotenv-webpack");

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
      "@controllers": path.resolve(__dirname, "src/controllers/"),
      "@core": path.resolve(__dirname, "src/core/"),
      "@elements": path.resolve(__dirname, "src/elements/"),
      "@html": path.resolve(__dirname, "src/html/"),
      "@models": path.resolve(__dirname, "src/models/"),
      "@services": path.resolve(__dirname, "src/services/"),
    }
  },

  plugins: [
    new Dotenv(),
  ],
};