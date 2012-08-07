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
});

var load_slider = function(){
	var slider = $('#slider');	
	var size = "small";
	if ($(window).height() >= 850) {
		size = "large";
	}
	$.each(Galleries, function(key, gallery) {
		$("#galleries").append('<a href="javascript:;" data-slide="' + ($('img', slider).length+1) + '" class="numbers toSlide">' + gallery.title + '<span>&ndash;&nbsp;' +gallery.images.length + ' items</span>' + '</a>');
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
