'use strict';

const Firebase             = require('firebase'),
      express              = require('express'),
      webpack              = require('webpack'),
      webpackDevMiddleware = require('webpack-dev-middleware'),
      webpackHotMiddleware = require('webpack-hot-middleware'),
      fs                   = require('fs'),
      path                 = require('path');

const scraper       = require('./scraper'),
      notifier      = require('./notifier'),
      renderEmail   = require('./utils/renderEmail'),
      sendEmails    = require('./utils/sendEmails'),
      api           = require('./api'),
      webpackConfig = require('../webpack.config.js');

const firebaseRef = new Firebase(process.env.FIREBASE_URL);
const app = express();
const isProduction = process.env.NODE_ENV === 'production';

firebaseRef.authWithCustomToken(process.env.FIREBASE_SECRET, (error, authData) => {
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
} else {
  app.use('/_assets', express.static(path.join(__dirname, '../static')));
}

app.get('*', (req, res) => {
  res.send(fs.readFileSync(path.join(__dirname, '../static/index.html'), 'utf-8'));
});

app.listen(process.env.APP_PORT, (error) => {
  if (error) {
    console.error(err);
    return;
  }
  console.log(`Server running at localhost:${process.env.APP_PORT}`);
});
