const https = require('https');//declaring http module
const fs = require('fs');//declaring file system module
const amex = './companylist/amex.csv'
const nasdaq = './companylist/nasdaq.csv'
const nyse = './companylist/nyse.csv'


var executeTrack =  function(processFailed){
	if(processFailed){
		executeFailed();
		return false;
	}
	tracker(amex)
	tracker(nasdaq)
	tracker(nyse)
}

function tracker(file_location){
	fs.readFile(file_location, function(err, data) {
		let splitDbQt =	data.toString("utf-8").split('\"');
		console.log('xxx'+splitDbQt.length)
		var i = splitDbQt.length;
		var j=19;
		var inc = 18;
		if(file_location.indexOf('nasdaq')>-1){
			j=17;
			inc=16;
		}
				var execute = function (j,splitDbQt){
					var ticker=splitDbQt[j].toLowerCase().trim();
					console.log(ticker)
					executeScrip(ticker)
					setTimeout(function(){
							j=j+inc
							if(j<i){
								execute(j,splitDbQt)
							}
						}
						, 666);
			}
		execute(j,splitDbQt);
			
	});
}

function pseudo(s){

	console.log('executing'+s)
}

 function executeScrip(ticker){

	var trackerFile='./datadump/'+ticker+'.html';
	var options = {
	  host: 'www.nasdaq.com',
	  port: 443,
	  path:'/symbol/'+ticker,
	  method:'GET',
	  headers: {
	    'accept': 'application/json',
	    'accept-language': 'en-US,en;q=0.8',
	    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
	  }
	};

	https.get(options, function(res) {
	  res.on("data", function(chunk) {
	  	    fs.appendFileSync(trackerFile,chunk.toString());
	  });
	}).on('error', function(e) {
	  console.log("Got error: " + e.message);
	});
}

function executeFailed(){
	fs.readFile('./failedlist.dat', function(err, data) {
	let splitDbQt =	data.toString("utf-8").split('Scrip process error:');
		console.log('xxx'+splitDbQt.length)
		var i = splitDbQt.length;
		var j=0;
				var execute = function (j,splitDbQt){
					var ticker=splitDbQt[j].toLowerCase().trim();
					console.log(ticker)
					executeScrip(ticker)
					setTimeout(function(){
							j=j+1
							if(j<i){
								execute(j,splitDbQt)
							}
						}
						, 3000);
			}
		execute(j,splitDbQt);
	});
}

module.exports=executeTrack;