function pageReady(){
	var $menuTrigger = $("#menu--trigger"),
			$footerYear = $(".footer--year"),
			$barChart =  $(".bar-chart"),
			$contactForm = $("#contact-form");

	$menuTrigger.attr("checked", false);
	$footerYear.text(new Date().getFullYear());
	Prism.highlightAll();

	$barChart.appear({ force_process: true });
	$barChart.on("appear", function(event, $affected){
		animateBarChart();
	});

	$contactForm.submit(function(e){
		e.preventDefault();
		submitContactForm($contactForm);
	});

} // end pageReady
