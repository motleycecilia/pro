import path from 'path'
import express from 'express'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from './webpack.config.js'
import ip from 'ip'
import https from 'https'
import fs from 'fs'
// import mock from './src/mock'

const isDeveloping = process.env.NODE_ENV !== 'production'
const port = isDeveloping ? 3012 : process.env.PORT
const app = express()

if (isDeveloping) {
  const compiler = webpack(config)
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'dist/',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  })
  app.use(middleware)
  app.use(webpackHotMiddleware(compiler))
  // mock(app)
}

app.listen(port, ip.address(), (err) => {
  if (err) {
    console.log(err)
  }
  console.info('==> 🌎 Listening on  ' + ip.address() + ':' + port)
})
