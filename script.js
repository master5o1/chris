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

var traverse = function(direction, slide) {
	var count = $('*', slider).length;
	var next = 0;
	var current = 0;
	slide = slide || -1;
	for (current = 0; current < count; current++) {
		if ($('*', slider).eq(current).is('.displayed', slider)) {
			next = current + direction;
			next = (next < 0) ? count - 1 : next % count;
			break;
		}
	}
	
	if (direction == 0) {
		next = slide -1;
	}
	
	console.log(current, next, direction, slide);
	
	$('#caption p').fadeOut(0);
	$('*', slider).eq(current).fadeOut(180);
	$('*', slider).eq(next).delay(180).fadeIn(180);
	$('*', slider).eq(current).removeClass('displayed');
	$('*', slider).eq(next).attr('class', 'displayed');
	$(slider).height($('*', slider).eq(next).height());
	$(slider).width($('*', slider).eq(next).width());
	$(".numbering").html((next+1) + ' of ' + count);
	var title = '<span class="blue" style="font-weight: bold;">' + $('*', slider).eq(next).attr('title').split('; ')[0] + '</span>, ' + $('*', slider).eq(next).attr('title').split('; ')[1];
	$('#caption p').html(title).delay(180).fadeIn(180);
}

var load_slider = function(){
	var slider = $('#slider');
	var size = "small";
	if ($(window).height() >= 850) {
		size = "large";
	}
	$.each(Galleries, function(key, gallery) {
		$("#galleries").append('<a href="javascript:;" data-slide="' + ($('img', slider).length+1) + '" class="numbers toSlide">' + gallery.title + '<span>&larr;&nbsp;' +gallery.images.length + ' items</span>' + '</a>');
		$.each(gallery.images, function(k, item) {
			var className = '';
			if ($('*', slider).length == 0) className = 'displayed';
			slider.append('<img class="' + className + '" src="images_' + size + '/' + item.file + '" alt="' + item.title + '" title="' + item.title + '" />');
		});
	});
	
	$(".numbering").html('1 of ' + $('*', slider).length);
	
	$('.displayed', slider).fadeIn(180);
	slider.height($('.displayed', slider).height());
	slider.width($('.displayed', slider).width());
	
	var title = '<span class="blue" style="font-weight: bold;">' + $('.displayed', slider).attr('title').split('; ')[0] + '</span>, ' + $('.displayed', slider).attr('title').split('; ')[1];
	$('#caption p').fadeOut(0);
	$('#caption p').html(title).fadeIn(180);
	
	$('#next').click(function() {
		traverse(1);
	});
	$('#previous').click(function() {
		traverse(-1);
	});

	$('.toSlide').click(function() {
		traverse(0, $(this).data('slide')*1);
	});
	
	$('img', slider).click(function() {
		$('#zoom div').children('*').remove('*');
		$('#zoom div').append('<img src="' + $(this).attr('src').replace('small','large').replace('large','zoom') + '" alt="" />');
		$('#zoom div img').fadeIn(0);
		$('#zoom div img').css('margin', 0).css('padding', 0);
		$('#zoom div').height($(window).height() - 80);
		$('#zoom div').width($(window).width() - 80);
		$('#zoom div').css('margin', '40px auto');
		$('#zoom div').animate({
			scrollLeft: 0,
			scrollTop: 0
		}, 0);
		var title = '<span class="blue" style="font-weight: bold;">' + $('.displayed', slider).attr('title').split('; ')[0] + '</span>, ' + $('.displayed', slider).attr('title').split('; ')[1];
		$('#zoomcaption').fadeOut(0);
		$('#zoom').fadeIn(180);
		$('#zoomcaption').html(title).delat(60).fadeIn(180);
	});

	$('#zoom div').mousemove(function(event) {
		var x = event.pageX - $('#zoom div')[0].offsetLeft;
		var y = event.pageY - $('#zoom div')[0].offsetTop;
		var width = $('#zoom div img').width();
		var height = $('#zoom div img').height();
		var stepX = Math.floor(width / $('#zoom div').width());
		var stepY = Math.floor(height / $('#zoom div').height());
		$('#zoom div').animate({
			scrollLeft: x*stepX,
			scrollTop: y*stepY
		}, 0);
	});
	
	$('#zoom').click(function() {
		$('#zoom').fadeOut(180);
	});
	
	$($('img', slider)[0]).load(function() {
		slider.height($('img', slider).height());
		slider.width($('img', slider).width());
	});
	slider.css("display","block");
}
