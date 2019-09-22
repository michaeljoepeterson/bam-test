

function Interfacer(options){
	this.startInput = options.startInput;
	this.endInput = options.endInput;
	this.getButton = options.getButton;
	this.downloadLink = options.downloadLink
	this.initListeners();
}

Interfacer.prototype.initListeners = function() {
	$(this.getButton).bind('click',function(e){
		e.preventDefault();
		this.postReport(e)
	}.bind(this));
};

Interfacer.prototype.createBlobExcel = function(data){
	let excelData = new Blob([data],{ type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' });
	let excelURL = URL.createObjectURL(excelData);
	return excelURL;
};

Interfacer.prototype.createDownload = function(data){
	this.downloadLink.classList.remove("hide");
	this.downloadLink.setAttribute("href","");
	this.downloadLink.setAttribute("href",data);
	this.downloadLink.setAttribute("download", "new_data.xlsx");
};

Interfacer.prototype.buildExcelData = function(records,excelArr){
	for (let i = 0; i < records.length; i++) {
		let innerData = [];
		innerData.push(records[i].b_name);
		innerData.push(records[i].b_email);
		innerData.push(records[i].trn_amount);
		innerData.push(records[i].trn_date_time.split('T')[0]);
		excelArr.push(innerData);
	}
};
//https://www.freakyjolly.com/create-and-download-xsl-excel-from-json-response-data-in-webpage/
//to create the excel just do it client side
Interfacer.prototype.postReport = function(event) {
	var startDate = this.startInput.value;
	var endDate = this.endInput.value;
	var reportOptions = {
		start_date:startDate,
		end_date:endDate
	};
	var settings = {
		method:'POST',
		url:'/api/reports',
		data:JSON.stringify(reportOptions),
		contentType: 'application/json'

	};
	console.log('event',startDate,endDate);
	$.ajax(settings)

	.then(data => {
		console.log('data: ',data);
		let excelArr = [];
		let headers = ['email','name','amount','Transaction Date'];
		excelArr.push(headers);
		this.buildExcelData(data.data.records,excelArr);
		/* File Name */
        let filename = "FreakyJSON_To_XLS.xlsx";
        console.log(excelArr);
        /* Sheet Name */
        let ws_name = "FreakySheet";
		let wb = XLSX.utils.book_new(),
            ws = XLSX.utils.aoa_to_sheet(excelArr);
        XLSX.utils.book_append_sheet(wb, ws, ws_name);
        XLSX.writeFile(wb, filename);
		//let excelData = this.createBlobExcel(workSheet);
		//let excelData = this.createBlobExcel(data.xlsData);
		//this.createDownload(excelData);
		
	})

	.catch(err => {
		console.log('err: ',err);
	})
};