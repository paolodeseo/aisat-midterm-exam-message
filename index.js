const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);  

app.use(express.static('client'))

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/homepage.html');
});

app.get('/login', function(req, res) {
    res.sendFile(__dirname + '/client/login.html');
})

server.listen(5000, function() {
    console.log('listening on *:5000');
});

io.on('connection', function(socket) {

    socket.on('login', function(msg) {
        socket.broadcast.emit('login-user', {'username' :msg.username})
    })

    socket.on('message', function(msg){
        
        socket.broadcast.emit('message-user', {'username' : msg.username, 'message' : msg.message})
    })
    
})
