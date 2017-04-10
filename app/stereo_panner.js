import $ from 'jquery';
import audioCtx from './audio_context';

class StereoPannerWidget{
	constructor(wrapper){
		var _this = this;
		_this.initDtd = $.Deferred();
		_this.initPromise = _this.initDtd.promise();
		_this.$wrapper = $(wrapper);
		_this.node = audioCtx.createStereoPanner();
		var tmpl = '';
		tmpl += '<div>'+
			'<p>panner:<span class="pan-val">1</span></p>'+
			'<p><input type="range" min="-1" max="1" step="0.1" value="1" class="pan-input" /></p>'+
		'</div>';
		$(tmpl).appendTo(_this.$wrapper);
		$('input', _this.$wrapper).on('change', function(e){
			e.preventDefault();
			_this.setParam({
				pan: $('.pan-input', _this.$wrapper).val()
			});
			return false;
		});
		_this.$wrapper.data({
			inited: true,
			widget: _this
		});
		_this.initDtd.resolve();
	}
	setParam(option){
		var _this = this;
		if(option){
			_this.node.pan.value = 'undefined' == typeof option.pan ? 0 : +option.pan;
			$('.pan-val', _this.$wrapper).text(_this.node.pan.value);
		}
	}
}

export {StereoPannerWidget as default}