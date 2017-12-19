var express = require('express');

var app = express();

var server = app.listen(3000, function(){
  console.log('chat app live on port 3k');
});

app.use(express.static('public'));
