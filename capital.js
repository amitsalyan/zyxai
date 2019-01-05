//
const fs = require('fs');//declaring file system module
const sortMap = require('sort-map')
const util = require('util');
const readFile = util.promisify(fs.readFile);
const jsonfile = require('jsonfile')
const getDateYYYYMMDDFormat = require('./getDateYYYYMMDDFormat.js')
const deleteFolderRecursive = require('./deleteFolderRecursive.js')

var capitalMapFile='';
var capitalGainLossMapFile='';
var capitalToMarketCapFile='';
var percGainLossFile='';
var scrip52HighFile='';
var scrip52LowFile='';

let date = getDateYYYYMMDDFormat();
date = '20181001'

var capital =  function(){
	getCapitalMap()
}

async function getCapitalMap(){

capitalMapFile ='./data/'+date+'/capitalMap.json'
capitalGainLossMapFile ='./data/'+date+'/capitalGainLossMap.json'
capitalToMarketCapFile ='./data/'+date+'/capitalToMarketCapMap.json'
percGainLossFile ='./data/'+date+'/capitalPercGainLossFile.json'
scrip52LowFile ='./data/'+date+'/capital52LowFile.json'
scrip52HighFile ='./data/'+date+'/capital52HighFile.json'

var capitalMap = new Map();
var capitalGainLossMap = new Map();
var capitalToMarketCapMap = new Map();
var percGainLossMap = new Map();
var scrip52HighMap = new Map();
var scrip52LowMap = new Map();

fs.readdir('./data/'+date+'/', function(err, filenames) {
	var asyncLoop = async () =>{
		await filenames.forEach(function(filename) {
			readData(date,filename).then(content=>{

				if(content.turnover_cap && content.turnover_cap>0){
					capitalMap.set(content.turnover_cap,content.ticker)
				}

				if(content.capital_move && (content.capital_move>0 || content.capital_move<0)){
					capitalGainLossMap.set(content.capital_move, content.ticker)
				}

				var c2mc=0
				try{
					c2mc = content.turnover_cap/content.market_cap
				}catch(error){
					c2mc=0
				}

				if (c2mc<0 || c2mc>0) {
					if(content.perc_change<0){
						c2mc = c2mc* -1
					}
					capitalToMarketCapMap.set(c2mc,content.ticker)
				}

				if(content.perc_change<0 || content.perc_change>0){
					percGainLossMap.set(content.perc_change,content.ticker)
				}

				if(content.high == content.high52 || content.high > content.high52 ){
					console.log()
					scrip52HighMap.set(content.high52,content.ticker)
				}

				if(content.low == content.low52 || content.low < content.low52){
					scrip52LowMap.set(content.low52,content.ticker)
				}


			}).catch(err=>{
				console.log('error read data: '+filename)
			})
    });
	return [capitalMap,capitalGainLossMap,capitalToMarketCapMap,percGainLossMap,scrip52LowMap,scrip52HighMap]
	}

asyncLoop().then(arryResult=>{

	console.log('Size of  Capital Data: '+arryResult[0].size)
	console.log('Size of  CapitalGainLossMap Data: '+arryResult[1].size)
	console.log('Size of  CapitalToMarketCapMap Data: '+arryResult[2].size)
	console.log('Size of  percGainLossMap Data: '+arryResult[3].size)

	const sortedCapitalMap= sortMap(arryResult[0])
	const sortedCapitalGainLossMap= sortMap(arryResult[1])
	const sortedCapitalToMarketCapMap= sortMap(arryResult[2])
	const sortedPercGainLossMap= sortMap(arryResult[3])
	//var iterator1 = capitalMap.keys();
	console.log('Size of sorted Capital Data: '+sortedCapitalMap.size)
	console.log('Size of sorted sortedCapitalGainLossMap Data: '+sortedCapitalGainLossMap.size)
	console.log('Size of sorted sortedCapitalToMarketCapMap Data: '+sortedCapitalToMarketCapMap.size)

	writeMapToDisk(sortedCapitalMap,capitalMapFile)
	writeMapToDisk(sortedCapitalGainLossMap,capitalGainLossMapFile)
	writeMapToDisk(sortedCapitalToMarketCapMap,capitalToMarketCapFile,false)
	writeMapToDisk(sortedPercGainLossMap,percGainLossFile)
	writeMapToDisk(arryResult[4],scrip52LowFile)
	writeMapToDisk(arryResult[5],scrip52HighFile)
	console.log('Completed Writing cpaital files...')

}).catch(err=>{
	console.log('error capital map')
})

async function readData(date,filename){
	var data = fs.readFileSync('./data/'+date+'/' + filename, 'utf-8');
    return JSON.parse(data);
}

async function writeMapToDisk(sortedMap, mapFile,isParseInt){
	await sortedMap.forEach((key,value)=>{
		try{
			if(isParseInt){value=parseInt(value)}
			fs.appendFileSync(mapFile,key+':'+value+',\n');
		}catch(e){
			console.log('Failed writing '+key+' to'+mapFile)
		}
	});
}


  });
}

module.exports=capital;
