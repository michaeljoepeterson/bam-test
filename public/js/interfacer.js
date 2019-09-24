function Interfacer(options){
	this.startInput = options.startInput;
	this.endInput = options.endInput;
	this.nameInput = options.nameInput;
	this.getButton = options.getButton;
	this.downloadLink = options.downloadLink
	this.loader = options.loader;
	//console.log(options);
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
//to create the excel just do it client side
Interfacer.prototype.postReport = function(event) {
	let startDate = this.startInput.value;
	let endDate = this.endInput.value;
	let reportOptions = {
		start_date:startDate,
		end_date:endDate
	};
	let settings = {
		method:'POST',
		url:'/api/reports',
		data:JSON.stringify(reportOptions),
		contentType: 'application/json'

	};
	//console.log(this.loader);
	this.loader.classList.remove('hide');
	this.getButton.setAttribute('disabled','true');
	$.ajax(settings)

	.then(data => {
		console.log('data: ',data,this.nameInput.value);
		let fileName = this.nameInput.value !== '' ? this.nameInput.value : 'bambora-data';
		let excelArr = [];
		let headers = ['email','name','amount','Transaction Date'];
		excelArr.push(headers);
		this.buildExcelData(data.data.records,excelArr);
		/* Sheet Name */
		let ws_name = fileName;
		/* File Name */
        fileName += ".xlsx";
        console.log(excelArr);
		let wb = XLSX.utils.book_new(),
            ws = XLSX.utils.aoa_to_sheet(excelArr);
        XLSX.utils.book_append_sheet(wb, ws, ws_name);
        XLSX.writeFile(wb, fileName);
		this.loader.classList.add('hide');
		this.getButton.attributes.disabled = 'false';
		this.getButton.removeAttribute('disabled');
	})

	.catch(err => {
		console.log('err: ',err);
		this.loader.classList.add('hide');
		this.getButton.removeAttribute('disabled');
	})
};