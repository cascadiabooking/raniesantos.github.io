function pageReady(){
	$("#menu--trigger").attr("checked", false);
	$(".footer--year").text(new Date().getFullYear());

	Prism.highlightAll();

	$("#contact-form").submit(function(e){
		e.preventDefault();

		var submitToFormspree = function(form){
			var submitUrl = getFormspreeSubmitUrl(),
					$contactPage = $(".page-contact"),
					$alertSending = $('<div class="alert"><i class="fa fa-spin fa-spinner"></i>Sending message...</div>');

			$.ajax({
				url: submitUrl,
				method: "POST",
				data: $(form).serialize(),
				dataType: "json",
				beforeSend: function(){
					$contactPage.prepend($alertSending);
				},
				success: function(data){
					$alertSending.remove();
					$contactPage.prepend('<div class="alert success"><i class="fa fa-check-circle"></i>Message sent.</div>');
				},
				error: function(err){
					$alertSending.remove();
					$contactPage.prepend('<div class="alert danger"><i class="fa fa-times-circle"></i>Something went wrong. Try again.</div>');
				}
			});
		};

		submitToFormspree( $("#contact-form") );
	});

	$(".bar-chart").appear({ force_process: true });

	$(".bar-chart").on("appear", function(event, $affected){
		animateBarChart();
	});
}
