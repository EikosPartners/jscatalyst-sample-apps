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

const app = express();


app.use(compress());
app.use(history({
    verbose: true
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// add the data route for the chart data
app.use('/data', require('./routes/data'));

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
