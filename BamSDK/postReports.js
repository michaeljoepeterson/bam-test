const request = require('request');

function PostReports(reportOptions,url,key){
	reportOptions.name = 'Search';
	let promise = new Promise((resolve,reject) => {
		const options = {
			url:url,
			method:"POST",
			headers:{
				"Authorization":"Passcode " + key,
				'Content-Type':'application/json'
			},
			json:reportOptions
		};

		request(options,function(error,response,body){
			//console.log(body);
			if(body.records){
				resolve(body);
			}
			else{
				reject(body);
			}
			
		})
	});

	return promise;
}

module.exports = {PostReports};