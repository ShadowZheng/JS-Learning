var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8888);

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/socket.html');
});

// 静态资源目录设置
app.use('/static', express.static(__dirname + '/static'));

io.on('connection', function(socket) {
	socket.emit('join', '欢迎');
	socket.broadcast.emit('listenJoin', '有新人进来了');
});