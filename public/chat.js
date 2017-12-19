//connect socket
const socket = io.connect('localhost:3000');

//DOM Query
const output = document.querySelector('#output');
const message = document.querySelector('#message');
const handle = document.querySelector('#handle');
const send = document.querySelector('#send');

//Emit Events
send.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
});

//Listen for event from server
socket.on('chat', function(data){
    output.innerHTML += '<p><strong>' + data.handle + '</strong>:' + data.message + '</p>';
});