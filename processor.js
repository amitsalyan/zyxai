

const fs = require('fs');//declaring file system module
const jsonfile = require('jsonfile')
const getDateYYYYMMDDFormat = require('./getDateYYYYMMDDFormat.js')
const deleteFolderRecursive = require('./deleteFolderRecursive.js')


const amex = './companylist/amex.csv'
const nasdaq = './companylist/nasdaq.csv'
const nyse = './companylist/nyse.csv'

deleteFolderRecursive('./datadump')

let date = getDateYYYYMMDDFormat();

if (!fs.existsSync('./datadump')){
    fs.mkdirSync('./datadump');
}

var processFiles =  function(){
	tracker(amex)
	tracker(nasdaq)
	tracker(nyse)
}

function tracker(fileLocation){
	fs.readFile(fileLocation, function(err, data) {
		let splitDbQt =	data.toString("utf-8").split('\"');
		console.log('xxx'+splitDbQt.length)
		var i = splitDbQt.length;
		var j=19;
		var inc = 18;
		if(fileLocation.indexOf('nasdaq')>-1){
			j=17;
			inc=16;
		}
				var execute = function (j,splitDbQt){
					var ticker=splitDbQt[j].toLowerCase();
					processTicker(ticker)
					setTimeout(function(){
							j=j+inc
							if(j<i){
								execute(j,splitDbQt)
							}
						}
						, 10);
			}
		execute(j,splitDbQt);
	});
}

var processTicker = function(ticker){


	if (!fs.existsSync('./data/'+date)){
    	fs.mkdirSync('./data/'+date);
	}

	var trackerFile='./datadump/'+ticker+'.html';
	var trickerData='./data/'+date+'/'+ticker+'.json';

	fs.readFile(trackerFile, function(err, data) {
	var section, section1,section2;
	try{
		section = data.toString("utf-8").split('Key Stock Data')[1].split('Intraday Chart')[0]
	 	section1 = section.split('Low')[1]
	 	section2 = section.split('Low')[2]

	}catch(error){
		console.log('Scrip process error:'+ticker)
	}

    var high,low,vol,prev_close,high52,low52,market_cap,p_e_ratio,forward_p_e,
    eps,ann_div,ex_div_date,div_pay_date,cur_yeild,beta,turnover_cap,close,perc_change,
    capital_move;

    try{
    	close = data.toString("utf-8").split('qwidget_lastsale')[1].split('>')[1].split('<')[0].split('$')[1]
    }catch(error){
    	close='-0'
    }

    try{
	 high = section1.split(';')[1].split('&')[0].trim()
	}catch(error){
		high='-0'
	}

	try{
	 low = section1.split('$')[2].split(';')[1].split('<')[0].trim()
	}catch(error){
		low='-0'
	}

	try{
	 vol = section1.split('Share Volume')[1].split('<div')[1].split('>')[1].split('<')[0].trim()
	}catch(error){
		vol='-0'
	}

	try{
	 prev_close = section1.split('Previous Close')[1].split('<div')[1].split('>')[1].split('<')[0].split(';')[1].trim()
	}catch(error){
		prev_close='-0'
	}

	try{
	 high52 = section2.split(';')[1].split('&')[0].trim()
	}catch(error){
		high52='-0'
	}
	try{
	 low52 = section2.split('$')[2].split(';')[1].split('<')[0].trim()
	}catch(error){
		low52='-0'
	}

	try{
	 market_cap = section2.split('Market Cap')[1].split('<div')[1].split('>')[1].split('<')[0].trim()
	}catch(error){
		market_cap='-0'
	}

	try{
	 p_e_ratio =  section2.split('Ratio')[1].split('<div')[1].split('>')[1].split('<')[0].trim()
	 if(!Number.isInteger(p_e_ratio)){
	 	p_e_ratio='-0';
	 }
	}catch(error){
		p_e_ratio='-0'
	}

	try{
	 forward_p_e = section2.split('Forward')[1].split('<div')[1].split('>')[1].split('<')[0].trim()
	  if(!Number.isInteger(forward_p_e)){
	 	forward_p_e='-0';
	 }
	}catch(error){
		forward_p_e='-0'
	}

	try{
	 eps = section2.split('Earnings Per Share')[1].split('<div')[1].split('>')[1].split('<')[0].split(';')[1].trim()
	}catch(error){
		eps='-0'
	}

	try{
	 ann_div = section2.split('Annualized Dividend')[1].split('<div')[1].split('>')[1].split('<')[0].split(';')[1].trim()
	}catch(error){
		ann_div='-0'
	}

	try{
	 ex_div_date = section2.split('Ex Dividend Date')[1].split('<div')[1].split('>')[1].split('<')[0].trim()
	}catch(error){
		ex_div_date='-0'
	}

	try{
	 div_pay_date = section2.split('Dividend Payment Date')[1].split('<div')[1].split('>')[1].split('<')[0].trim()
	}catch(error){
		div_pay_date='-0'
	}

	try{
	 cur_yeild = section2.split('Current Yield')[1].split('<div')[1].split('>')[1].split('<')[0].trim()
	}catch(error){
		cur_yeild='-0'
	}

	try{
	 beta = section2.split('Beta')[1].split('<div')[1].split('>')[1].split('<')[0].trim()
	}catch(error){
		beta='-0'
	}


	let date = new Date(Date.now())
	date = date.getMonth()+1+'-'+date.getDate()+'-'+date.getFullYear()
	/*console.log('date:'+date)
	console.log('high:'+high)
	console.log('low:'+low)
	console.log('vol:'+vol)
	console.log('prev_close:'+prev_close)
	console.log('high52:'+high52)
	console.log('low52:'+low52)
	console.log('p_e_ratio:'+p_e_ratio)
	console.log('forward_p_e:'+forward_p_e)
	console.log('eps:'+eps)
	console.log('ann_div:'+ann_div)
	console.log('ex_div_date:'+ex_div_date)
	console.log('div_pay_date:'+div_pay_date)
	console.log('cur_yeild:'+cur_yeild)
	console.log('beta:'+beta)*/

	try{
		high = high.replace(/\,/g,'')
		high = parseFloat(high)
	}catch(error){
		high = '-0'
	}

	try{
		low = low.replace(/\,/g,'')
		low = parseFloat(low )
	}catch(error){
		low = '-0'
	}

	try{
		market_cap = parseInt(market_cap.replace(/\,/g,''))
	}catch(error){
		market_cap = '-0'
	}

	try{
		high52 = high52.replace(/\,/g,'')
		high52 = parseFloat(high52)
	}catch(error){
		high52 = '-0'
	}

	try{
		low52 = low52.replace(/\,/g,'')
		low52 = parseFloat(low52)
	}catch(error){
		low52 = '-0'
	}

	//Additional Processing


	try{
	vol = vol.replace(/\,/g,'')
	close = parseFloat(close)
	vol = parseFloat(vol)
	if(close>0 && vol>0){
				turnover_cap = close*vol;
				//console.log(ticker+':'+data.vol)
			}else{
				turnover_cap='-0';
			}
	}catch(error){
		console.log('Unable to estimate turnover:'+ticker)
	}


	try{
	close = parseFloat(close)
	prev_close = parseFloat(prev_close)
	if(prev_close>0  && close>0){
		perc_change = (close-prev_close)*100/(prev_close)
	}else{
		perc_change='-0';
	}
	}catch(error){
		console.log('Unable to estimate percentage change:'+ticker)
	}


	try{
		close = parseFloat(close)
	prev_close = parseFloat(prev_close)
		capital_move = (close-prev_close) * vol
	}catch(error){
		console.log('Unable to estimate capital move:'+ticker)
	}


	var jsonData = {
			'ticker':ticker,
			'date':date,
			'close':close,
			'high':high,
			'low':low,
			'vol':vol,
			'market_cap':market_cap,
			'prev_close':prev_close,
			'high52':high52,
			'low52':low52,
			'p_e_ratio':p_e_ratio,
			'forward_p_e':forward_p_e,
			'eps':eps,
			'ann_div':ann_div,
			'ex_div_date':ex_div_date,
			'div_pay_date':div_pay_date,
			'cur_yeild':cur_yeild,
			'beta':beta,
			'turnover_cap':turnover_cap,
			'perc_change':perc_change,
			'capital_move':capital_move
					};

	/*jsonfile.writeFile(trickerData, jsonData, function (err) {
  	console.error(err)
	})*/
	jsonfile.writeFile(trickerData, jsonData, {flag: 'a'}, function (err) {
  		if(err){
  			console.log("Error writing ticker data to json: "+ticker)
  		}
})

});
}

module.exports=processFiles;
