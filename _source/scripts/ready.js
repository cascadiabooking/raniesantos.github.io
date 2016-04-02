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
			"name": "required|str_between:2,80|alpha_space",

			/* allow the use of aliases to
			replace fieldName in error */
			"_replyto": "required|str_max:70|email",
			"message": "required|str_min:20"
		},
		errorClass: "form--error",
		passed: function(){
			submitContactForm($contactForm);
		},
		failed: function(){
			console.log("validator failed");
		}
	});

} // end pageReady
