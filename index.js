const express = require('express');
const app = express();
const socket = require('socket.io');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//server
var server = app.listen(3000, function(){
  console.log('chat app live on port 3k');
});

mongoose.connect('mongodb://localhost/mario_chat', { useMongoClient: true }, function(err){
  if(err){
    console.log(err);
  }else{
    console.log('MongoDB connected...');
  }
});

const chatSchema = new mongoose.Schema({
  handle: String,
  message: String,
  createdAt: {type: Date, default: Date.now}
});

const Chat = mongoose.model('Chat', chatSchema);

//serving static files
app.use(express.static('public'));

//setting up sokcet.io
const io = socket(server);

io.on('connection', function(socket){
  Chat.find({}, function(err, chats){
    if(err) throw err;
    io.sockets.emit('recent chats', chats);
  });

  socket.on('chat', function(data){
    const msg = new Chat(data);
    msg.save(function(err){
      if(err)
        throw err;
    });
    io.sockets.emit('chat', data);
  });

  socket.on('typing', function(data){
    socket.broadcast.emit('typing', data);
  });
 
});
