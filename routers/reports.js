const express = require("express");
const {checkReportRequest} = require('../tools/configTools');
const router = express.Router();

router.post('/',checkReportRequest,(req,res) => {
	return res.json({
		status:400,
		message:"done"
	});
});

module.exports = {router};