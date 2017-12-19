var express = require('express');
var app = express();

//server
var server = app.listen(3000, function(){
  console.log('chat app live on port 3k');
});

//serving static files
app.use(express.static('public'));

//setting up sokcet.io

