'use strict';

module.exports = require('./make-webpack-config')({
  devtool: 'source-map',
  hot: true,
  dev: true,
});
