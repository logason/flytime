'use strict';

const Firebase = require('firebase');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const fs = require('fs');
const path = require('path');

const scraper = require('./scraper');
const notifier = require('./notifier');
const api = require('./api');
const webpackConfig = require('../webpack-development.config.js');

const firebaseRef = new Firebase(process.env.FIREBASE_URL);
const app = express();
const isProduction = process.env.NODE_ENV === 'production';
const html = fs.readFileSync(path.join(__dirname, '../static/index.html'), 'utf-8');

firebaseRef.authWithCustomToken(process.env.FIREBASE_SECRET, (error) => {
  if (error) {
    console.log('Authentication failed!', error);
  } else {
    console.log('Authentication succesfull!');

    // Start scraper and notifier
    scraper();
    notifier();
  }
});

app.use('/healthy', (req, res) => {
  res.send('ok');
});
app.use('/api', api());

if (!isProduction) {
  const compiler = webpack(webpackConfig);
  const middleware = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
  });
  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
}

app.use('/_assets', express.static(path.join(__dirname, '../static'), { maxAge: '100y' }));

app.get('*', (req, res) => {
  res.send(html);
});

app.listen(process.env.APP_PORT, (error) => {
  if (error) {
    console.error(error);
    return;
  }
  console.log(`Server running at localhost:${process.env.APP_PORT}`);
});
