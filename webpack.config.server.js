const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

// transpiling serverside typescript code with unique config and then bundling file for distribution to the browser
const config = {
  name: 'server',
  entry: ['react-hot-loader/patch', path.resolve(__dirname, 'src/server/server.ts')],
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  /* Passing webpack-node-externals to the externals property will make webpack skip bundling files from the node_modules directory and instead import them at runtime. That's necessary because certain Node.js dependencies can't be bundled. Our compilation target is the Node.js runtime. Setting node.__dirname to false keeps the special __dirname path variable working as expected after the bundling.*/
  externals: [nodeExternals()],
  target: 'node',
  node: {
    __dirname: false,
  },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          configFile: 'tsconfig.server.json',
        },
      },
    ],
  },
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/*': 'http://localhost:3000',
    },
    static: {
      directory: './dist',
    },
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
};

module.exports = config;
