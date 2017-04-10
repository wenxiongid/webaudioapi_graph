import $ from 'jquery';
import audioCtx from './audio_context';

class GainWidget{
	constructor(wrapper){
		var _this = this;
		_this.initDtd = $.Deferred();
		_this.initPromise = _this.initDtd.promise();
		_this.$wrapper = $(wrapper);
		_this.node = audioCtx.createGain();
		var tmpl = '';
		tmpl += '<div>'+
			'<p>gain:<span class="gain-val">1</span></p>'+
			'<p><input type="range" min="0" max="2" step="0.1" value="1" class="gain-input" /></p>'+
		'</div>';
		$(tmpl).appendTo(_this.$wrapper);
		$('input', _this.$wrapper).on('change', function(e){
			e.preventDefault();
			_this.setParam({
				gain: $('.gain-input', _this.$wrapper).val()
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
			_this.node.gain.value = 'undefined' == typeof option.gain ? 1 : +option.gain;
			$('.gain-val', _this.$wrapper).text(_this.node.gain.value);
		}
	}
}

export {GainWidget as default}