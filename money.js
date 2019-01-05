const http = require('http');//declaring http module
const fs = require('fs');//declaring file system module
var path = require('path');//declarin path api for file access
var url = require('url');//Intresting...
var stockTracker = require('./stockTracker.js');
var processor = require('./processor.js');
var capital = require('./capital.js');
var companylist = require('./companylist.js');
var logfile='./log';
var ip='127.0.0.1';
var port='80';
const server = http.createServer((request, response) => {//http.createServer(function (req, res) {


//Request: processing
//for localhost
var api=request.url.substr(1);
//for hosted site
//var api=JSON.stringify(request.headers["referer"]).replace(/"/g,'').split('/')[3];
console.log('\n Incoming URL:'+api)
    fs.appendFileSync(logfile,'\n Incoming URL:'+api);


//Request: redirect on path

    if (api == ''){
         fs.appendFileSync(logfile,'\nIncoming Action'+JSON.stringify(request.headers));
        api = './zyx.html';
    }else if(api == 'logon'){
         fs.appendFileSync(logfile,'\nIncoming Action'+JSON.stringify(request.headers));
        api = './logon/logon.html';
    }else if(api == 'stockTrackerFailed'){
         stockTracker('stockTrackerFailed');
    }else if(api == 'stockTracker'){
         stockTracker();
    }else if(api == 'process'){
         processor();
    }else if(api == 'capital'){
         capital();
    }else if(api == 'companylist'){
        companylist();
    }

//Request: Load Resources by default

    var extname = path.extname(api);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
    }

//Request: serve file
    fs.readFile(api, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT'){
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end();
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });
});
server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.listen(port,ip);
 fs.appendFileSync(logfile,'Server started at '+ip+':'+port);
