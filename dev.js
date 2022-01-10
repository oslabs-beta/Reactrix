const spawn = require('cross-spawn')
const path = require('path')
const webpack = require('webpack')
const webpackConfigClient = require('./webpack.config.client')
const webpackConfigServer = require('./webpack.config.server')

//bundle the two different configurations and alter them to development mode
const compiler = webpack([
  {
    ...webpackConfigClient,
    mode: 'development',
    devtool: 'source-map',
    output: {
      ...webpackConfigClient.output,
      filename: '[name].js',
    },
  },
  {
    ...webpackConfigServer,
    mode: 'development',
    devtool: 'source-map',
  },
])

let node

//state which bundle is compiling and if the server is already running, kill it
compiler.hooks.watchRun.tap('Dev', (compiler) => {
  console.log(`Compiling ${compiler.name} ...`)
  if (compiler.name === 'server' && node) {
    node.kill()
    node = undefined
  }
})

//watches or detects changes in source code and automatically re-compiles and restarts server with the changes
compiler.watch({}, (err, stats) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(stats?.toString('minimal'))
  const compiledSuccessfully = !stats?.hasErrors()
  if (compiledSuccessfully && !node) {
    console.log('Starting Node.js ...')
    node = spawn(
      'node',
      ['--inspect', path.join(__dirname, 'dist/main.js')],
      {
        stdio: 'inherit',
      }
    )
  }
})