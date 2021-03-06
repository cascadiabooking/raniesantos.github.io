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

	$contactForm.vastia({
		rules: {
			"name": "required|str_between:2,80|alpha_space",
			"_replyto": "required|str_max:70|email",
			"message": "required|str_min:20"
		},
		customFieldNames: {
			"_replyto": "email",
		},
		errorClass: "form--error",
		start: function(){
			$(".page-contact--alert-container").empty()
		},
		passed: function(){
			submitContactForm($contactForm);
		}
	});

} // end pageReady
