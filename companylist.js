
const fs = require('fs');//declaring file system module
const jsonfile = require('jsonfile')
var nasdaqfile='./companylist/nasdaq.csv';
var nysefile='./companylist/nyse.csv';
var amexfile='./companylist/amex.csv';
var scripNameMapping = './companylist/scrip_name.csv'
var scripIpoMapping = './companylist/scrip_ipo.csv'
var scripIndustryMapping = './companylist/scrip_industry.csv'
var scripSectorMapping = './companylist/scrip_sector.csv'



var companylist =  function(){
	populateNasdaq()
}

 function populateAmex(){
	populateCompanyList(amexfile).then(()=>{
		console.log('Done')
	})
}

 function populateNyse(){
	populateCompanyList(nysefile).then(()=>{
		populateAmex()
})
}

 function populateNasdaq(){
	populateCompanyList(nasdaqfile).then(()=>{
		populateNyse()
	})
}

async function populateCompanyList(csvFile){
	await fs.readFile(csvFile, function(err, data) {
		let splitDbQt =	data.toString("utf-8").split('\"');
		var i = splitDbQt.length;
		console.log(csvFile+'xxx'+i)
		var j=19
		if(csvFile===nasdaqfile){
			j=17;
		}
		var asyncLoop = async (j) =>{
			if(j<i){
			try{
				var symbol= splitDbQt[j].toLowerCase().trim()
				var name=splitDbQt[j+2]
				var ipoYear,sector,industry;
				if(csvFile===nasdaqfile){	
					ipoYear=splitDbQt[j+8]
					sector=splitDbQt[j+10]
					industry=splitDbQt[j+12] 
				}else{
					ipoYear=splitDbQt[j+10]
					sector=splitDbQt[j+12]
					industry=splitDbQt[j+14] 
				}
				
				
         //fs.appendFileSync(scrip_name,symbol+'='+name+',');
				
			}catch(error){
				console.log("Loop Error writing company data : "+splitDbQt[j].toLowerCase())
			}
				if(csvFile===nasdaqfile){
					j=j+16
				}else{
					j=j+18
				}
			asyncLoop(j)
		}
		
		}
		asyncLoop(j)


		
		
	});
}

module.exports=companylist;