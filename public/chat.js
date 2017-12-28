//connect socket
const socket = io.connect();

//DOM Query
const output = document.querySelector('#output');
const message = document.querySelector('#message');
const handle = document.querySelector('#handle');
const send = document.querySelector('#send');
const feedback = document.querySelector('#feedback');
const recent = document.querySelector('#recent');

//Emit Events
send.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
});

message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
});

//Listen for event from server
socket.on('chat', function(data){
    if(data.message && data.message.length > 0){
        output.innerHTML += '<p><strong>' + data.handle + '</strong>:' + data.message + '</p>';
    }
    
    handle.value = '';
    message.value = '';
    feedback.innerHTML = '';
    
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});

socket.on('recent chats', function (chats) {
    for (var i = chats.length - 1; i >= 0; i--){
        recent.innerHTML += '<p><strong> ' + chats[i].handle + '</strong>:' + chats[i].message + '</p>'
    }
});