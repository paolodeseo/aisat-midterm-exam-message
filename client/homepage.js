login_button = document.getElementById('login')
submit_button = document.getElementById('send')

var socket = null

login_button.addEventListener('click', function(){
    socket = io('http://localhost:5000');

    username = document.getElementById('username').value
    messages = document.getElementById('messages')

    // messages.innerHTML = username + ' has logged in!';
    socket.emit('login', {'username' : username})
    alert('Logged in!')
    
    socket.on('login-user', function(msg) {
        messages.innerHTML = messages.innerHTML + "<br/>" + msg.username + ' has logged in!';
    })

    socket.on('message-user', function(msg) {
        formattedMessage = msg.username + ": " + msg.message
        messages.innerHTML = messages.innerHTML + "<br/>" + formattedMessage;
    })
})

submit_button.addEventListener('click', function() {
    username = document.getElementById('username').value
    message = document.getElementById('message').value
    
    if (socket == null) {
        alert('you are not connected to the server yet')
    }

    else {
        formattedMessage = username + ": " + message
        messages.innerHTML = messages.innerHTML + "<br/>" + formattedMessage;
        socket.emit('message', {'username' : username, 'message' : message})
    }
})

