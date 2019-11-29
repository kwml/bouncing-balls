const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = env => ({
  mode: env === "production" ? "production" : "development",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename:
      env == "production"
        ? "[name].[chunkhash].bundle.js"
        : "[name].[hash].bundle.js",
    sourceMapFilename:
      env == "production"
        ? "[name].[chunkhash].bundle.map"
        : "[name].bundle.map",
    chunkFilename:
      env == "production"
        ? "[name].[chunkhash].chunk.js"
        : "[name].[hash].chunk.js"
  },
  devtool: env === "development" ? "cheap-module-source-map" : "",
  devServer: {
    contentBase: "./dist"
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Bouncing Balls",
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename:
        env == "development"
          ? "[name].[hash].bundle.css"
          : "[name].[contenthash].bundle.css",
      chunkFilename:
        env == "development"
          ? "[name].[hash].chunk.css"
          : "[name].[contenthash].chunk.css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "awesome-typescript-loader",
        include: path.join(__dirname, "src"),
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [
          env == "development" ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: false,
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".ts"]
  }
});
