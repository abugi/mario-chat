//connect socket
const socket = io.connect('localhost:3000');

//DOM Query
const output = document.querySelector('#output');
const message = document.querySelector('#message');
const handle = document.querySelector('#handle');
const send = document.querySelector('#send');
const feedback = document.querySelector('#feedback');

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