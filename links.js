const fs = require('fs')

module.exports = (link)=>{
	fs.readFile('./HTML_ELEMENT/'+link+'/'+link+'.html', function(error, content) {
		if (error) {
            if(error.code == 'ENOENT'){
           		rs.writeHead(404, { 'Content-Type': 'text/plain' });
              	rs.write('ZYX_AI_CODE:EL1')
              	rs.end();
              	return rs;
            }else {
           		rs.writeHead(500, { 'Content-Type': 'text/plain' });
                rs.end('ZYX_AI_CODE:EL2');
                rs.end();
            }
        }
        else {
            rs.writeHead(200, { 'Content-Type': 'text/html' });
    		rs.end(content, 'utf-8');
        }


    
    });
}