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
	return PostReports(reportOptions,reportUrl,authKey)

	.then(data => {
		return res.json({
			status:200,
			data
		});
		
	})
	/*
	.then(data => {
		let xlsData = json2xls(data.records);
		return fs.writeFileSync('./data/testData.xlsx',xlsData,'binary');
		fs.writeFileSync('./data/testData.xlsx',xlsData,'binary');
		return res.json({
			status:200,
			xlsData
		});
		
	})
	
	.then(excelData => {
		res.setHeader('Content-Type', 'application/octet-stream');
		//console.log(__dirname + '/data/testData.xlsx');
		return res.sendFile(path.resolve('data/testData.xlsx'));
	})
	*/
	.catch(err=>{
		console.log('error',err);
		return res.json({
			status:500,
			err
		});
	})
	
});

module.exports = {router};