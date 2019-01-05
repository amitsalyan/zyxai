
const http = require('http')
const fs = require('fs')
const requestProcessor = require('./requestProcessor.js')

module.exports = (ip,port)=>{
	const server = http.createServer((rq, rs) => {
		requestProcessor(rq, rs)
	})
	server.on('clientError', (err, socket) => {
	  socket.end('HTTP/1.1 400 Bad Request')
	})
	server.listen(port,ip)
	console.log('HTTP Server Initialied at '+ip+':'+port)
}
