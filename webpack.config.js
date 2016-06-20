const debug = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const path = require('path');

module.exports = {
 context: path.join(__dirname, ''),
 devtool: debug ? 'inline-sourcemap' : null,
 historyApiFallback: true,
 entry: ['webpack-hot-middleware/client', './client'],
 module: {
   preLoaders: [
     {
       test: /\.jsx?$/,
       loader: 'eslint',
       exclude: /(node_modules|bower_components)/,
     },
   ],
   loaders: [
     {
       test: /\.jsx?$/,
       exclude: /(node_modules|bower_components)/,
       loader: 'babel-loader',
       query: {
         presets: ['react', 'es2015'],
       },
     },
   ],
 },
 output: {
   path: `${__dirname}/client/public`,
   filename: 'webpack.min.js',
 },
 devServer: {
  context:'./',
  historyApiFallback: true,
  hot: true,
  inline: true
},
 eslint: {
   failOnWarning: false,
   failOnError: true,
 },

};
