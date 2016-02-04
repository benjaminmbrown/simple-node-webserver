var http = require('http');
var url = require('url');
var path = require('path');
var fileSysem = require('fs');

//mime types we'll be using on this server
var mimeTypes = {
	"html" : 'text/html',
	"jpeg": 'image/jpeg',
	'jpg': 'image/jpg',
	'png' : 'image/png',
	'javascript'  : 'text/javascript',
	'css' : 'text/css'
};

http.createServer(function(req,res){
	var uri = url.parse(req.url).pathname;
	//process.cwd returns the current working directory of the process
	var fileName = path.join(process.cwd(),unescape(uri));
	console.log('loading the file from uri:'+ uri);

	var stats;

	//Look for the local file that matches the uri 
console.log('trying to sync filesystem');
	try{
		//look for filename in system
		console.log('in try');
		stats = fileSystem.lstatSync(fileName);
		console.log(stats);

	}catch(e){
		
		e.log('couldnot sync');
		//if file's not here, send 404 error
		res.writeHead(404, {'Content-Type':'text/plain'});
		res.write('404 Not Found');
		res.end();
		return;
	}

	//check to see if we're getting a file or directory
	if(stats.isFile()){
		//if it's a file, get the mime type based on the path
		var mimeType = mimeTypes[path.extname(fileName).split('.').reverse()[0]];
		res.writeHead(200, {'Content-Type': mimeType});

		//create a file stream 
		var fileStream = fileSystem.createReadStream(fileName);
		fileStream.pipe(res);
	}else if(stats.isDirectory()){
		//easy mode: redirect to index page
		res.writeHead(302,{
			'location': 'index.html'
		});
		res.end();
	}else{//if nothing there, 500 error
		res.writeHead(500, {'Content-Type': 'text/plain'})
		res.write("500 Internal Server Error");
	}

}).listen(3000);
console.log("server started at localhost/3000");


