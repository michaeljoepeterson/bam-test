const request = require('request');

function sanitizeRequest(reportOptions){
	reportOptions.name = 'Search';
	if(!reportOptions.end_row){
		reportOptions.end_row = '100';
	}
	if(!reportOptions.start_row){
		reportOptions.start_row = '1';
	}
}

function PostReports(reportOptions,url,key){
	sanitizeRequest(reportOptions);
	console.log('in post reports',reportOptions);
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
			console.log('sucessful call');
			if(body.records){
				console.log('sucessful call success');
				resolve(body);
			}
			else{
				console.log('sucessful call error');
				reject(body);
			}
			
		})
	});

	return promise;
}

module.exports = {PostReports};