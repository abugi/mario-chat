//connect socket
const socket = io.connect('localhost:3000');

//DOM Query
const output = document.querySelector('#output');
const message = document.querySelector('#message');
const handle = document.querySelector('#handle');
const send = document.querySelector('#send');