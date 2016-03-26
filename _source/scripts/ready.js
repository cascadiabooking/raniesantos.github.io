function pageReady(){
	$("#menu--trigger").attr("checked", false);
	$(".footer--year").text(new Date().getFullYear());

	Prism.highlightAll();

	setContactFormAction();

	$(".bar-chart").appear({ force_process: true });

	$(".bar-chart").on("appear", function(event, $affected){
		animateBarChart();
	});
}
