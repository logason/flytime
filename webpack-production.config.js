'use strict';

module.exports = require('./make-webpack-config')({
  devtool: 'eval',
  separateStylesheet: true,
  longTermCaching: true,
  minimize: true,
});
