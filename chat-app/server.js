var http = require('http');
var fs = require('fs');
let app = require('express')();
let cors = require('cors');

app.use(cors());

var server = http.createServer(app);
server.listen(4000, '0.0.0.0');

console.log('Websocket server is running on 4000!\n');

var io = require('socket.io').listen(server);
var connectCount = 0;
io.sockets.on('connection', function(socket){
    //send data to clienzt
    console.log('Connection Established')
	connectCount++;

    io.emit('users', socket.id)

    socket.on('externalMessage', function(msg){
      let newMsg = Object.assign(msg, {chat: true})
      console.log(msg)
      io.emit('broadcast', msg)
    })


})