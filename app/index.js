import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import $ from 'jquery';
import AudioLine from './audio_line';

UIkit.use(Icons);

function initAudioLine($line){
	var contentTmpl = '<div class="src-wrapper uk-width-1-4"></div>';
	contentTmpl += '<div class="uk-width-3-4"><ul class="effect-wrapper uk-child-width-1-2 uk-grid-small"></ul><hr /><div class="analyser-wrapper"></div></div>';
	$line.html(contentTmpl).addClass('inited-line uk-grid uk-grid-divider uk-child-width-expand@s');
	UIkit.grid($('.effect-wrapper', $line));
}

function dropItem($drag, $target){
	$target
	.removeClass('uk-text-center hover-zone')
	.addClass('has-content')
	.find('.placeholder').remove();

	$drag.attr('style', '')
	.appendTo($target);

	if(!$target.hasClass('inited-line')){
		initAudioLine($target)
	}
	switch($drag.data('type')){
		case 'src':
			$('.src-wrapper', $target).empty().append($drag);
			break;
		case 'effect':
			var $li = $('<li></li>');
			$li.append($drag).appendTo($('.effect-wrapper', $target));
			UIkit.grid($('.effect-wrapper', $target));
			break;
		case 'analyser':
			$('.analyser-wrapper', $target).empty().append($drag);
			break;
	}
	if(!$target.data('audio')){
		var lineAudio = new AudioLine($target);
		$target.data('audio', lineAudio);
	}else{
		$target.data('audio').update();
	}
}

$(function(){
	var $draggingItem = null
	var $dropingTarget = null
	var dragOffset = {};
	$('body').delegate('.dragable', 'mousedown', function(e){
		var $oItem = $(this);
		$draggingItem = $(this)
			.clone()
			.removeClass('dragable')
			.appendTo('body')
			.css({
				position: 'fixed',
				width: $oItem.css('width'),
				height: $oItem.css('height'),
				top: $oItem.offset().top - window.scrollY + 'px',
				left: $oItem.offset().left - window.scrollX + 'px',
				opacity: 0.8,
				cursor: 'move'
			});
		dragOffset = {
			top: e.pageY - $oItem.offset().top,
			left: e.pageX - $oItem.offset().left
		};
		$dropingTarget = null;
	}).on('mousemove', function(e){
		if($draggingItem){
			$draggingItem.css({
				top: e.pageY - dragOffset.top + 'px',
				left: e.pageX - dragOffset.left + 'px',
			});
			var $tempTarget = null;
			$('.dropable').each(function(i, zone){
				var $zone = $(zone);
				if(e.pageX >= $zone.offset().left
					&& e.pageX <= $zone.offset().left + $zone.outerWidth()
					&& e.pageY >= $zone.offset().top
					&& e.pageY <= $zone.offset().top + $zone.outerHeight()){
					$zone.addClass('hover-zone');
					$tempTarget = $zone;
				}else{
					$zone.removeClass('hover-zone');
				}
			});
			if($tempTarget){
				$dropingTarget = $tempTarget;
			}else{
				$dropingTarget = null;
			}
		}
	}).on('mouseup', function(e){
		if($dropingTarget){
			dropItem($draggingItem, $dropingTarget);
		}else{
			if($draggingItem){
				$draggingItem.remove();
			}
		}
		$draggingItem = null;
		$dropingTarget = null;
	});
});