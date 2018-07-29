var orig_height = $('.entry1').height();
var orig_width = $('.entry1').width();

var new_width = (controlSize(center($('.entry1').position().left, $('.entry1').width())) * orig_width).toString();
var new_height = (controlSize(center($('.entry1').position().left, $('.entry1').width())) * orig_height).toString();
new_height += 'px';
new_width += 'px';
$('.entry1').css({'width': new_width, 'height': new_height});

function center(left, width) {
	return left + width/2;
}

function controlSize(position, width) {
	// 100% size if it's at the center
	var sizeFactor = 1 - Math.abs((position - $(window).width()/2) / ($(window).width()/2));
	return sizeFactor;
}

$('.timeline').scroll(function(){
  var new_width = (controlSize(center($('.entry1').position().left, $('.entry1').width(), $('.entry1').width())) * orig_width).toString();
  var new_height = (controlSize(center($('.entry1').position().left, $('.entry1').width(), $('.entry1').width())) * orig_height).toString();
  new_height += 'px';
  new_width += 'px';
	$('.entry1').css({'width': new_width, 'height': new_height});
});
