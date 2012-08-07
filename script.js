$.getScript = function(url, callback, cache){
	$.ajax({
			type: "GET",
			url: url,
			success: callback,
			dataType: "script",
			cache: cache
	});
};

$(window).load(function() {
	load_slider();
	//$.getScript('jquery.nivo.slider.js', load_slider, true);
	$('.overlay').each(function(k, v) {
		$('#overlay-links').append('<a href="#/' + $(v).data('overlay-title') + '" class="reveal-overlay" data-page="' + $(v).data('overlay-title') + '">' + $(v).data('overlay-title') + '</a>');
	});
	$(window).click(function(e) {
		if ($('.overlay').has(e.target).length === 0 && $('.reveal-overlay').is(e.target) === false) {
			$('.overlay').fadeOut(250);
		}
	});
	$('.reveal-overlay').click(function() {
		$('[data-overlay-title="' + $(this).data('page') + '"]').fadeIn(250);
		$('.overlay').not('[data-overlay-title="' + $(this).data('page') + '"]').fadeOut(250);
	});
	if (window.location.hash.length > 0) {
		$('a.reveal-overlay[data-page="' + window.location.hash.substring(2) + '"]').trigger('click');
	}
});

var load_slider = function(){
	var slider = $('#slider');
	var size = "small";
	if ($(window).height() >= 850) {
		size = "large";
	}
	$.each(Galleries, function(key, gallery) {
		$("#galleries").append('<a href="javascript:;" data-slide="' + ($('img', slider).length+1) + '" class="numbers toSlide">' + gallery.title + '<span>&larr;&nbsp;' +gallery.images.length + ' items</span>' + '</a>');
		$.each(gallery.images, function(k, item) {
			slider.append('<img src="images_' + size + '/' + item.file + '" alt="' + item.title + '" title="' + item.title + '" />');
		});
	});
	slider.nivoSlider({
		effect: 'fade',
		animSpeed: 180, // 180
		directionNavHide: false,
		manualAdvance: true,
		prevText: 'previous',
		nextText: 'next',
		captionOpacity: 1.0,
		controlNav: false,
		//startSlide: rand,
		beforeChange: function() {
			$('.nivoSlider').css("background-image", "none");
		}
	});
	$($('img', slider)[0]).load(function() {
		slider.height($('img', slider).height());
		slider.width($('img', slider).width());
	});
	slider.css("display","block");
}
