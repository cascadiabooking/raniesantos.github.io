var $contactForm = $("#contact-form");

$contactForm.submit(function(e){
	e.preventDefault();

	$contactForm.validator({
		rules: {
			"name": "required|alpha_space|between:2,80",
			"_replyto": "required|email",
			"message": "required"
		},
		passed: function(){
			submitContactForm($contactForm);
		},
		failed: function(){
			console.log("validator failed");
		}
	});

});
