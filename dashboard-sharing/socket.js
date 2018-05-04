var http = require('http');
var fs = require('fs');
// create a server
var server = http.createServer(function(request, response){});
server.listen(8000);


// create the websocket and tell it to listen to the server that was created
var io = require('socket.io').listen(server);
// define interactions with client
io.sockets.on('connection', function(socket){
    //send data to clienzt
    console.log('Connection Established')
    // when charts are shared with the sendCharts eventthose charts are sent to everyone using
    // the shareCharts event
    socket.on('sendCharts', function(sendValue){
      io.emit('shareCharts', sendValue)
    })

});
