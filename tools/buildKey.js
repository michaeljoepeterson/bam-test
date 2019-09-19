let buildKey = function(merchantId,apiKey){
	return Buffer.from(merchantId + ":" + apiKey).toString('base64');
};

module.exports = {buildKey};