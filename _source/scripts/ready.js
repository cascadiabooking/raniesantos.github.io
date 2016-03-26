function pageReady(){
	Prism.highlightAll();

	$(".footer--year").text(new Date().getFullYear());

	setContactFormAction();

	$(".bar-chart").appear({ force_process: true });

	$(".bar-chart").on("appear", function(event, $affected){
		animateBarChart();
	});
}
