const express = require("express");
const {checkReportRequest,buildKey} = require('../tools/configTools');
const {PostReports} = require('../BamSDK/configBam');
const {URL,MERCHANT_ID,REPORT_KEY} = require('../config');
const router = express.Router();

router.post('/',checkReportRequest,(req,res) => {
	const reportOptions = req.body;
	const authKey = buildKey(MERCHANT_ID,REPORT_KEY);
	const reportUrl = URL + '/reports';
	return PostReports(reportOptions,reportUrl,authKey)

	.then(data => {
		return res.json({
			status:400,
			data
		});
	})

	.catch(err=>{
		return res.json({
			status:500,
			err
		});
	})
	
});

module.exports = {router};