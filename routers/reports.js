const express = require("express");
const {checkReportRequest,buildKey} = require('../tools/configTools');
const {PostReports} = require('../BamSDK/configBam');
const {URL,MERCHANT_ID,REPORT_KEY} = require('../config');
const router = express.Router();
const json2xls = require('json2xls');
const fs = require('fs');
const path = require('path');

router.post('/',checkReportRequest,(req,res) => {
	const reportOptions = req.body;
	const authKey = buildKey(MERCHANT_ID,REPORT_KEY);
	const reportUrl = URL + '/reports';
	console.log('report request',reportOptions);
	return PostReports(reportOptions,reportUrl,authKey)

	.then(data => {
		return res.json({
			status:200,
			data
		});
		
	})

	.catch(err=>{
		console.log('error',err);
		return res.json({
			status:500,
			err
		});
	})
	
});

module.exports = {router};