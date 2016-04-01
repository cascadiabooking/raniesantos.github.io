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

	$contactForm.validator({
		rules: {
			"name": "required|alpha_space|str_between:2,80",

			/* allow the use of aliases
			so error can display Email as fieldName */
			"_replyto": "required|email",
			"message": "required|str_min:20"
		},
		passed: function(){
			submitContactForm($contactForm);
		},
		failed: function(){
			console.log("validator failed");
		}
	});

} // end pageReady
