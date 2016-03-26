function pageReady(){
	$("#menu--trigger").attr("checked", false);
	$(".footer--year").text(new Date().getFullYear());

	Prism.highlightAll();

	$("#contact-form").submit(function(e){
		e.preventDefault();

		var submitToFormspree = function(form){
			var submitUrl = getFormspreeSubmitUrl();

			$.ajax({
				url: submitUrl,
				method: "POST",
				data: $(form).serialize(),
				dataType: "json",
				beforeSend: function(){
					console.log("Sending message...");
				},
				success: function(data){
					console.log("Message sent.");
				},
				error: function(err){
					console.log("Something went wrong.");
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
