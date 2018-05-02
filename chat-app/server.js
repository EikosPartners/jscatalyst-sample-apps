var http = require('http');
var fs = require('fs');
let app = require('express')();
let cors = require('cors');
var ip = require('ip');
var myIPaddress = ip.address()
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
		// console.log(socket.conn)
		// console.log(socket.handshake)

	socket.on('pageOpened', function(thing){
		console.log(thing)
		let newThing = {location: true, id: socket.id, address: myIPaddress}
    	io.emit('broadcast', newThing)
	})

    socket.on('externalMessage', function(msg){
      let newMsg = Object.assign(msg, {chat: true, id: socket.id, address: myIPAddress})
      console.log(msg)
      io.emit('broadcast', msg)
    })


})