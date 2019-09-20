function Interfacer(options){
	this.startInput = options.startInput;
	this.endInput = options.endInput;
	this.getButton = options.getButton;
	this.initListeners();
}

Interfacer.prototype.initListeners = function() {
	$(this.getButton).bind('click',function(e){
		e.preventDefault();
		this.postReport(e)
	}.bind(this));
};

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
	})

	.catch(err => {
		console.log('err: ',err);
	})
};