'use strict';

module.exports = require('./make-webpack-config')({
  devtool: 'eval',
  separateStylesheet: true,
  minimize: true,
  longTermCaching: true,
});
