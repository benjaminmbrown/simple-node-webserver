var http = require('http');
console.log("Creating server");
http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type': 'text/plain'});
	res.end('Hello World\n');
}).lisen(1337, '127.0.0.1');
console.log("Server running at http://127.0.0.1");