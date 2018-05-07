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
    var amINew = allUsers.filter(item=>item.id === personID.id)
    
    if (amINew.length === 0) {
      allUsers.push(personID)
      io.emit('userConnected', personID)
    }
	})

  socket.on('newUsername', function(msg){
    console.log('newUsername')
    io.emit('userDisconnected', personID)
    personID.username = msg.username
    allUsers.map(item=> {
      if (item.id === msg.id) {
        item.username === msg.username
      }
      return item
    })
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

