'use strict';

const firebase = require('firebase');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const scraper = require('./scraper');
const notifier = require('./notifier');
const api = require('./api');
const webpackConfig = require('../webpack-development.config.js');

const opbeat = require('opbeat').start({
  appId: process.env.OPBEAT_APP_ID,
  organizationId: process.env.OPBEAT_ORGANIZATION_ID,
  secretToken: process.env.OPBEAT_SECRET_TOKEN,
});

firebase.initializeApp({
  databaseURL: process.env.FIREBASE_URL,
  serviceAccount: path.join(__dirname, '../.firebaseKey.json'),
});
const db = firebase.database();

scraper(db);
notifier(db);

const app = express();
const isProduction = process.env.NODE_ENV === 'production';
const html = fs.readFileSync(path.join(__dirname, '../static/index.html'), 'utf-8');

app.use(opbeat.middleware.express());

app.use('/healthy', (req, res) => {
  res.send('ok');
});
app.use('/api', api(db));

if (!isProduction) {
  const compiler = webpack(webpackConfig);
  const middleware = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
  });
  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
}

app.use('/_assets', express.static(path.join(__dirname, '../static'), { maxAge: '1y' }));
app.use('/_assets', express.static(path.join(__dirname, '../app/static')));

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
