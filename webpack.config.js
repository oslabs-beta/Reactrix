const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/index.tsx',
  output: {
    path: path.join(__dirname, 'public'),
    // publicPath: '/public/',
    filename: 'bundle.js',
  },
  resolve:{
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  plugins: [
    new HtmlWebpackPlugin(
    {
      template: './index.html',
      inject: true
    }),
  ],
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'ts-loader',
        },
          // options: {
          //   presets: ['@babel/preset-env', '@babel/preset-react']
          // }
        //}
      },
      {
        enforce: "pre", test: /|.js$/,
        exclude: /node_modules/, 
        loader: "source-map-loader" 
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /(node_modules)/,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ]
  },
  devtool: "source-map",
  devServer: {
    host: 'localhost',
    port: 8080,
    static: './public/',
    proxy: {
      '/': 'http://localhost:3000'
    },
    compress: true,
    hot: true
  },
};