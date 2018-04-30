var http = require('http');
var fs = require('fs');

var server = http.createServer(function(request, response){});
server.listen(8000);


// create the websocket server
var io = require('socket.io').listen(server);
// define interactions with client
io.sockets.on('connection', function(socket){
    //send data to clienzt
    console.log('Connection Established')

    socket.on('sendCharts', function(sendValue){
      io.emit('shareCharts', sendValue)
    })

});
