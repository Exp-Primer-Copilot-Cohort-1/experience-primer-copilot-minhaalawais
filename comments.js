// Create web server
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var comments = [];

// Create a web server
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

// Create a web server
io.on('connection', function(socket) {
    console.log('A user connected');
    socket.emit('comments', comments);
    socket.on('disconnect', function() {
        console.log('A user disconnected');
    });
    socket.on('comment', function(comment) {
        comments.push(comment);
        io.emit('comment', comment);
    });
});

http.listen(3000, function() {
    console.log('Listening on *:3000');
});
