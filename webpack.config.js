const path = require("path");

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
        "style-loader",
        "css-loader",
        "sass-loader"
      ],
      test: /\.s?css$/
    }]
  },
  devtool: "eval-cheap-module-source-map",
  devServer: {
    historyApiFallback: true
  }
};
