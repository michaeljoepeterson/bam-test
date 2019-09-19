let checkReportRequest = function(req,res,next){
	let availableKeys = {
		'start_date':'start_date',
		'end_date':'end_date',
		'start_row':'start_row',
		'end_row':'end_row'
	};

	let reportOptions = req.body;
	let optionsKeys = Object.keys(reportOptions);
	if(optionsKeys.length > 4 || optionsKeys.length < 1){
		return res.json({
			code:500,
			error:'Please check input'
		});
	}
	for (let i = 0; i < optionsKeys.length; i++) {
		if(!availableKeys[optionsKeys[i]]){
			return res.json({
				code:500,
				error:'Please check keys'
			});
		}
		if(typeof reportOptions[optionsKeys[i]] !== 'string'){
			return res.json({
				code:500,
				error:'Please check keys'
			});
		}
	}

	next();
}

module.exports = {checkReportRequest};