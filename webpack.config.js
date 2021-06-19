const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: { plugin: "./src/plugin/plugin.js", docs: "./src/docs/docs.js" },

  output: {
    filename: "[name]/[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.pug$/i,
        use: ["pug-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: `index.html`,
      template: `./src/docs/docs.pug`,
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
  },
};
