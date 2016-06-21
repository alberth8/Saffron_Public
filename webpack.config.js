const debug = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const path = require('path');

module.exports = {
 context: path.join(__dirname, ''),
 devtool: debug ? 'inline-sourcemap' : null,
 historyApiFallback: true,
 entry: ['./client/app.js'],
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
         presets: ['react', 'es2015', 'stage-1'],
       },
     },
   ],
 },
 output: {
   path: `${__dirname}/client/public`,
   filename: 'webpack.min.js',
 },
 plugins: [
   new webpack.optimize.OccurrenceOrderPlugin(),
   new webpack.HotModuleReplacementPlugin(),
   new webpack.NoErrorsPlugin(),
 ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015', 'react-hmre'],
        },
      },
    ],
  },
};
