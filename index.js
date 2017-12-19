const express = require('express');
const app = express();
const socket = require('socket.io');

//server
var server = app.listen(3000, function(){
  console.log('chat app live on port 3k');
});

//serving static files
app.use(express.static('public'));

//setting up sokcet.io
const io = socket(server);

io.on('connection', function(socket){
  console.log('made connection on a socket');

  socket.on('chat', function(data){
    io.sockets.emit('chat', data);
  });

  socket.on('typing', function(data){
    io.broadcast.emit('typing', data);
  });
});
