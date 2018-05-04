const fs = require('fs');
const express = require('express');
const spdy = require('spdy');
const path = require('path');
const compress = require('compression');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const history = require('connect-history-api-fallback');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const webpackConfig = require('./build/webpack.dev.conf');

const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy;
const pass = require('./passport.config')(passport, JwtStrategy)
const unless = require('express-unless');

const app = express();


app.use(compress());
app.use(history({
    verbose: true
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Tell the application to use passport to do authentication
app.use(pass.initialize())
// wrap the passport strategy in a function so that there is access to the req and res arguments
const passportAuth = function(req,res,next) {
  pass.authenticate('jwt', function(err, user, info) {
    // a check if the user's session is going to epire soon. if it will then they can be prompted to extend their session
    if (err && err.expiresSoon === true) {
      res.locals.expiresSoon = true
    } else {
      res.locals.expiresSoon = false
    }
    // clear the user's cookie if the token has expired. they are no longer authorized
    if (info && info.name === 'TokenExpiredError') {
      res.clearCookie("jwt");
    }
    next()
  }, {session: false, failureRedirect:'/'})(req,res,next)
}
// passport will be used on all routes other that the ones specified below
passportAuth.unless = unless
app.use(passportAuth.unless({
  path: [
    '/',
    '/auth/login',
    '/auth/logout',
    '/auth/signup',
    '/__webpack_hmr',
    /.*\.(js|html|jpg|jpeg|css)$/i
  ]
}))
// load the auth routes from the routes folder
app.use('/auth', require('./routes/auth'));
// route to check a user's authentication
app.get('/checkAuth', (req, res) => {
  if (req.cookies['jwt']) {
    res.locals.expiresSoon ? res.send({authenticated: true, expiresSoon: res.locals.expiresSoon}) : res.send({authenticated: true})
  } else {
    res.send({authenticated: false})
  }
})




module.exports = webpackConfig.then((webpackConfig) => {
    let compiler = webpack(webpackConfig);

    compiler.apply(new webpack.ProgressPlugin());

    app.use(middleware(compiler, {
        // webpack-dev-middleware options
        noInfo: true, publicPath: webpackConfig.output.publicPath
    }));

    app.use(require("webpack-hot-middleware")(compiler));

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handler
    app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500).end();
        // res.render('error');
    });

    app.listen(webpackConfig.devServer.port, () => console.log('Listening on port 8080'));
    // spdy
    //     .createServer(options, app)
    //     .listen(webpackConfig.devServer.port, (error) => {
    //         if (error) {
    //             console.error(error)
    //             return process.exit(1)
    //         } else {
    //             console.log('Listening on port: ' + webpackConfig.devServer.port + '.')
    //         }
    //     })
})
