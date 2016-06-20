function findHeadHTML(data) {
	var headIni = data.toLowerCase().indexOf("<head");
	var headEnd = data.toLowerCase().indexOf("</head>");
	headIni = data.indexOf(">", headIni + 1) + 1;

	return data.substring(headIni, headEnd);
}

function setupHistory(contentSection, callback){
	var siteUrl = "http://"+(document.location.hostname||document.location.host);

	//	Catch all internal links and push a new state. External links not affected.
	$(document).delegate('a[href^="/"],a[href^="'+siteUrl+'"]', "click", function(e) {
		e.preventDefault();
		window.scrollTo(0, 0);
		History.pushState({}, "", this.pathname);
	});

	History.Adapter.bind(window, "statechange", function() {
		var State = History.getState();
		document.title = "Loading...";
		$.get(State.url, function(data){	// Use AJAX to get the new content.
			$("head").html(findHeadHTML(data));
			$(contentSection).html($(data).find(contentSection).html());
			callback();
		});
	});
}

function animateBarChart(){
	$(".bar-chart--bar--fill").each(function(){
		var rating = $(this).data("rating");
		$(this).width(rating * 10 + "%");
	});
}

function strContains(haystack, needle){
	return (haystack.indexOf(needle) >= 0) ? true : false;
}

function getFormSubmitURL(){
	var base64_email = "cmFuc2FuMzJAeWFob28uY29t";
	return "https://formspree.io/" + atob(base64_email);
}

function showAlert($container, $alert){
	$container.empty().append($alert);
}

function submitContactForm($contactForm){
	var $alertContainer = $(".page-contact--alert-container"),
			$submitButton = $contactForm.find('[type="submit"]');

	$.ajax({
		url: getFormSubmitURL(),
		method: "POST",
		data: $contactForm.serialize(),
		dataType: "json",
		beforeSend: function(){
			$submitButton.attr("disabled", true);
			showAlert($alertContainer, '<div class="alert"><i class="fa fa-spin fa-spinner"></i>Sending message...</div>');
		},
		success: function(data){
			$submitButton.attr("disabled", false);
			showAlert($alertContainer, '<div class="alert success"><i class="fa fa-check-circle"></i>Message sent.</div>');
			$contactForm.trigger("reset");
		},
		error: function(err){
			$submitButton.attr("disabled", false);
			showAlert($alertContainer, '<div class="alert danger"><i class="fa fa-times-circle"></i>Something went wrong. Try again.</div>');
		}
	});
};
