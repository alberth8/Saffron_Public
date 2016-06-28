const bodyParser = require('body-parser');
const morgan = require('morgan');

// Good for once we add webpack
// const webpackConfig = require('../../webpack.config.js');
// const webpack = require('webpack');
// const compiler = webpack(webpackConfig);
// const webpackHotMiddleware = require('webpack-hot-middleware');
// const webpackDevMiddleware = require('webpack-dev-middleware');

module.exports = (app, express) => {
  // app.use(webpackDevMiddleware(compiler, {
  // noInfo: true, publicPath: webpackConfig.output.publicPath}))
  // app.use(webpackDevMiddleware(compiler))
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(express.static(`${__dirname} /../../client/public/`));
};
