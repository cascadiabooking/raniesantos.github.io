function pageReady(){
	var $menuTrigger = $("#menu--trigger"),
			$footerYear = $(".footer--year"),
			$contactForm = $("#contact-form"),
			$alertContainer = $(".page-contact--alert-container"),
			$barChart =  $(".bar-chart");

	$menuTrigger.attr("checked", false);
	$footerYear.text(new Date().getFullYear());
	Prism.highlightAll();

	$barChart.appear({ force_process: true });
	$barChart.on("appear", function(event, $affected){
		animateBarChart();
	});

	$contactForm.submit(function(e){
		e.preventDefault();

		var submitToFormspree = function(){

			$.ajax({
				url: getFormspreeSubmitURL(),
				method: "POST",
				data: $contactForm.serialize(),
				dataType: "json",
				beforeSend: function(){
					showAlert($alertContainer, '<div class="alert"><i class="fa fa-spin fa-spinner"></i>Sending message...</div>');
				},
				success: function(data){
					showAlert($alertContainer, '<div class="alert success"><i class="fa fa-check-circle"></i>Message sent.</div>');
					$contactForm.trigger("reset");
				},
				error: function(err){
					showAlert($alertContainer, '<div class="alert danger"><i class="fa fa-times-circle"></i>Something went wrong. Try again.</div>');
				}
			});
		};

		submitToFormspree();
	});

} // end pageReady
