const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = () => {
  return {
    entry: "./src/index.js",
    output: {
      path: path.join(__dirname, "/dist"),
      filename: "index_bundle.js"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.(s?css)$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: true,
                localIdentName: "[name]__[local]__[hash:base64:5]",
                importLoaders: 1
              }
            },
            {
              loader: "sass-loader",
              options: {
                includePaths: ["node_modules"]
              }
            }
          ]
        },
        {
          test: /\.(jpg|png)$/,
          use: {
            loader: "url-loader",
            options: {
              limit: 25000
            }
          }
        }
      ]
    },
    devServer: {
      publicPath: "/",
      historyApiFallback: true,
      contentBase: "./"
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html"
      })
    ]
  };
};
