'use strict';

const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const webpackConfig = require('../webpack-development.config.js');

const app = express();
const isProduction = process.env.NODE_ENV === 'production';
const html = fs.readFileSync(
  path.join(__dirname, '../static/index.html'),
  'utf-8'
);

app.use('/healthy', (req, res) => {
  res.send('ok');
});

if (!isProduction) {
  const compiler = webpack(webpackConfig);
  const middleware = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath
  });
  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
}

app.use(
  '/_assets',
  express.static(path.join(__dirname, '../static'), {maxAge: '1y'})
);
app.use('/_assets', express.static(path.join(__dirname, '../app/static')));

app.get('*', (req, res) => {
  res.send(html);
});

app.listen(process.env.APP_PORT, error => {
  if (error) {
    console.error(error);
    return;
  }
  console.log(`Server running at localhost:${process.env.APP_PORT}`);
});
