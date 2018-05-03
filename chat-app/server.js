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
console.log(myIPaddress)
var io = require('socket.io').listen(server);
var connectCount = 0;
io.sockets.on('connection', function(socket){
    //send data to clienzt
  console.log('Connection Established')
	connectCount++;
		// console.log(socket.conn)
		// console.log(socket.handshake)


	socket.on('pageOpened', function(){
		let personID = {connected: true, id: socket.id, address: myIPaddress, username: `${socket.id}@${myIPaddress}`}
    console.log(personID)
    io.emit('broadcast', personID)
	})

  socket.on('externalMessage', function(msg){
    let newMsg = Object.assign(msg, {chat: true, id: socket.id, address: myIPaddress, username: `${socket.id}@${myIPaddress}`})
    console.log(msg)
    io.emit('broadcast', msg)
  })


})