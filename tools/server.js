import express from 'express';
import webpack from 'webpack';
import path from 'path';
import open from 'open';
import favicon from 'serve-favicon';
import bodyparser from 'body-parser';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { Router, browserHistory, match, RouterContext } from 'react-router';
import webpackConfig from '../webpack.config.dev';

/**
 * Authentication
 * */
import passport from 'passport';
import session from 'express-session';
const config = require('./config.json');
// import { loginStrategy, signupStrategy } from './auth/init';
// import * as db from './database';
// import authCheckMiddleware from './auth/auth-check';


/**
 * REACT ROUTES AND TEMPLATES */
/* eslint-disable no-console */
import App from '../src/containers/App';
import configureStore from '../src/store/configureStore';
import indexTemplate from './assets/indexTemplate';
import routes from '../src/routes';




/**BASIC SERVER INITIALIZATION */
const port = 3000;
const app = express();

app.use(favicon(path.join(__dirname, 'assets', 'public', 'favicon.png')));
app.use(express.static(path.resolve(__dirname, '../src')));
app.use('/styles', express.static(path.join(__dirname, '..', 'dist/styles/')));
app.use(bodyparser.urlencoded({ extended: false }))

/**WEBPACK CONFIGURATION */
const compiler = webpack(webpackConfig);
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));




/**DATABASE */
// require('./models').connect(config.dbUri);


// /**AUTH SESSION AND PATHS */
// app.use(passport.initialize());

// const signupStrategy = require('./passport/local-signup');
// const loginStrategy = require('./passport/local-login');


// passport.use('local-signup', signupStrategy);
// passport.use('local-login', loginStrategy);

// const authCheckMiddleware = require('./middleware/auth-check');

// app.use('/api', authCheckMiddleware);

// // routes
// import authRouter from './routes/auth';
// import apiRouter from './routes/api';

// app.use('/auth', authRouter);
// app.use('/api', apiRouter);





app.get('*', handleRender);

function handleRender(req, res) {
  match({ routes: routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const title = 'Kurssipalaute - Digit ry'
      res.send(indexTemplate({
        title: title
      }));
    } else {
      res.status(404).send('Not found')
    }
  });
}


app.listen(port, err => {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
