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

function setContactFormAction(){
	var base64_email = "cmFuc2FuMzJAeWFob28uY29t",
			base_url = "//formspree.io/",
			action = base_url + atob(base64_email);

	$("#contact-form").attr("action", action);
}
