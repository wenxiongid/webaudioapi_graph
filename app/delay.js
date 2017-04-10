import $ from 'jquery';
import audioCtx from './audio_context';

class DelayWidget{
	constructor(wrapper){
		var _this = this;
		_this.initDtd = $.Deferred();
		_this.initPromise = _this.initDtd.promise();
		_this.$wrapper = $(wrapper);
		var tmpl = '';
		tmpl += '<div><form action="#" class="input-form"><p>delay:</p><p><input type="text" value="0" class="delay-input" /></p><p><button type="submit">set</button></p></form></div>';
		$(tmpl).appendTo(_this.$wrapper);
		$('.input-form', _this.$wrapper).on('submit', function(e){
			e.preventDefault();
			_this.setParam({
				delay: $('.delay-input', _this.$wrapper).val()
			});
			$('button', _this.$wrapper).hide();
			return false;
		});
		_this.$wrapper.data({
			inited: true,
			widget: _this
		});
	}
	setParam(option){
		var _this = this;
		if(option){
			var delay = option.delay;
			if(delay < 1){
				delay = 1;
			}
			if(delay > 179){
				delay = 179;
			}
			_this.node = audioCtx.createDelay(delay);
			_this.initDtd.resolve();
		}
	}
}

export {DelayWidget as default}