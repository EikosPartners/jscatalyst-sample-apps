var http = require('http');
var fs = require('fs');
let app = require('express')();
let cors = require('cors');
var ip = require('ip');
var myIPaddress = ip.address()
app.use(cors());

var server = http.createServer(app);
server.listen(4000, '0.0.0.0');
let allUsers = []

console.log('Websocket server is running on 4000!\n');
console.log(myIPaddress)
var io = require('socket.io').listen(server);
var connectCount = 0;
io.sockets.on('connection', function(socket){
    //send data to clienzt
  console.log('Connection Established')
	connectCount++;
		// console.log(socket.conn)
		// console.log(socket.handshake)
    let personID = {id: socket.id, address: myIPaddress, username: `${socket.id}@${myIPaddress}`}

	socket.on('pageOpened', function(){
    console.log('pageOpened')
    io.emit('allUsers', allUsers)
    allUsers.push(personID)
    io.emit('userConnected', personID)
	})

  socket.on('chatMessage', function(msg){
    console.log('chatMessage')
    let newMsg = {...msg, from: personID}
    console.log(newMsg)
    io.emit('chatMessage', newMsg)
  })

  socket.on('directMessage', function(msg){
    console.log('directMessage')
    let newMsg = {...msg, from: personID}
    console.log(newMsg)

    io.emit('directMessage', newMsg)
  })

  socket.on('pageClosed', function(msg){
    console.log('pageClosed')
    allUsers = allUsers.filter(item=>(item.username !== msg.username))
    console.log(msg)
    io.emit('userDisconnected', msg)
  })


})
// HTK start socketserver and webpackserver at same time 
// module.exports = webpackConfig.then((webpackConfig) => {
//     let compiler = webpack(webpackConfig);

//     compiler.apply(new webpack.ProgressPlugin());

//     app.use(middleware(compiler, {
//         // webpack-dev-middleware options
//         noInfo: true, publicPath: webpackConfig.output.publicPath
//     }));

//     app.use(require("webpack-hot-middleware")(compiler));

//     // catch 404 and forward to error handler
//     app.use(function(req, res, next) {
//         var err = new Error('Not Found');
//         err.status = 404;
//         next(err);
//     });

//     // error handler
//     app.use(function(err, req, res, next) {
//         // set locals, only providing error in development
//         res.locals.message = err.message;
//         res.locals.error = req.app.get('env') === 'development' ? err : {};

//         // render the error page
//         res.status(err.status || 500).end();
//         // res.render('error');
//     });

//     app.listen(webpackConfig.devServer.port, () => console.log('Listening on port 8080'));
//     // spdy
//     //     .createServer(options, app)
//     //     .listen(webpackConfig.devServer.port, (error) => {
//     //         if (error) {
//     //             console.error(error)
//     //             return process.exit(1)
//     //         } else {
//     //             console.log('Listening on port: ' + webpackConfig.devServer.port + '.')
//     //         }
//     //     })
// })
