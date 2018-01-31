var http = require('http');

function start() {
	http.createServer(function (req, res) {
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.write("Hello");
		res.write("Cool");
		res.end();
	}).listen(8080);
}

start();

console.log("Hi");