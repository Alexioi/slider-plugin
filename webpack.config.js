const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const isDocs = process.env.NODE_isDocs;

const entry = isDocs ? './src/docs' : './src/plugin';

const plugins = isDocs
  ? [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/docs/page/docs.pug',
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, './src/docs/favicon'),
            to: path.resolve(__dirname, './dist/docs/favicon'),
          },
        ],
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
    ]
  : [
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
    ];

module.exports = {
  entry,
  output: {
    filename: '[name].js',
    path: isDocs ? path.resolve(__dirname, 'dist/docs') : path.resolve(__dirname, 'dist/plugin'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.pug$/i,
        use: ['pug-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins,
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    host: '0.0.0.0',
    port: 3000,
  },
};
