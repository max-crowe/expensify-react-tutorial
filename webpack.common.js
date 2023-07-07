const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/App.js",
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js"
  },
  mode: "development",
  module: {
    rules: [{
      loader: "babel-loader",
      test: /\.js$/
    }, {
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: "css-loader",
          options: {
            sourceMap: true
          }
        },
        {
          loader: "sass-loader",
          options: {
            sourceMap: true
          }
        }
      ],
      test: /\.s?css$/
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.css"
    })
  ],
};
