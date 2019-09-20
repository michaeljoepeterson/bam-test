function App(options){
	this.interface = new Interfacer({
		startInput:$('#' + options.startId)[0],
		endInput:$('#' + options.endId)[0],
		getButton:$('#' + options.getButtonId)[0]
	});

}

var app = new App({
	startId:'start_date',
	endId:'end_date',
	getButtonId:'get-data'
});