var http = require('http');
var fs = require('fs');
var io = require('socket.io');

var rootPath = 'C:/Users/azheng/Desktop/miaov_JS/html5';

// 创建一个server
var server = http.createServer(function(req, res) {
	var file = rootPath + req.url;
	console.log(file);
	fs.readFile(file, function(err, data) {
		if (err) {
			res.writeHeader(404, {
				'content-type': 'text/html;charset="utf-8"'
			});
			res.write('<h1>404</h1><p>你找的页面不存在</p>');
			res.end();
		} else {
			res.writeHeader(200, {
				'content-type': 'text/html;charset="utf-8"'
			});
			res.write(data);
			res.end();
		}
	});
}).listen(8888);

// 监听server
var socket = io.listen(server);

// 监听socket连接事件
socket.sockets.on('connection', function(socket) {
	console.log('连接成功');
});