const fs = require('fs')
const links = require('./links.js')

module.exports = (rq,rs)=>{
	let link = getLink(rq)
	if(link.length==0){
		rs = loadMotherShip(rs, './home/home.html')
	}else if(link.length>1){
		rs = links(link)
	}
	return rs;
}

function getLink(rq){
	var requestQuery=''
	if(rq.headers["referer"]){
		try{
 			requestQuery=JSON.stringify(rq.headers["referer"]).replace(/"/g,'').split('/')[3]
		}catch(err){
			link=rq.url.substr(1)
		}
	}
	return requestQuery
}

function loadMotherShip(rs, file){
	fs.readFile(file, function(error, content) {
            rs.writeHead(200, { 'Content-Type': 'text/html' });
            rs.end(content, 'utf-8');
    });
}