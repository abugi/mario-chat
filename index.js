const express = require('express');
const app = express();
const socket = require('socket.io');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//server
var server = app.listen(3000, function(){
  console.log('chat app live on port 3k');
});

mongoose.connect('mongodb://localhost/test', { useMongoClient: true });
mongoose.connect('mongodb://localhost/mario_chat', { useMongoClient: true }, function(err){
  if(err){
    console.log(err);
  }else{
    console.log('MongoDB connected...');
  }
});

//serving static files
app.use(express.static('public'));

//setting up sokcet.io
const io = socket(server);

io.on('connection', function(socket){

  socket.on('chat', function(data){
    io.sockets.emit('chat', data);
  });

  socket.on('typing', function(data){
    socket.broadcast.emit('typing', data);
  });
 
});
