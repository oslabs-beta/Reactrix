// const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin') //makes client.ejs template available at a relative location to the resulting JavaScript code

const config = {
  name: 'server',
  entry: ['react-hot-loader/patch', path.resolve(__dirname, 'src/server/server.ts')],
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  externals: [nodeExternals()],
  target: 'node',
  node: {
    __dirname: false,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          configFile: 'tsconfig.server.json',
        },
      },
      {
        test: /\.svg$/,
        use: 'file-loader',
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png',
            },
          },
        ],
      },
    ],
  },
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/': 'http://localhost:3000',
    },
    static: {
      directory: './dist',
    },
  },
  // devtool: 'source-map',
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     templateContent: ({ htmlWebpackPlugin }) =>
  //       '<!DOCTYPE html><html><head><meta charset="utf-8"><title>' +
  //       htmlWebpackPlugin.options.title +
  //       '</title></head><body><div id="app"></div></body></html>',
  //     filename: 'index.html',
  //   }),
  // ],
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: './index.html',
  //     inject: true,
  //   }),
  // ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
};

module.exports = config;
