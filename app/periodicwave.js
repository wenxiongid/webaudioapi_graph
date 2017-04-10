import $ from 'jquery';
import audioCtx from './audio_context';

class PeriodicWaveWidget{
	constructor(wrapper){
		var _this = this;
		_this.initDtd = $.Deferred();
		_this.initPromise = _this.initDtd.promise();
		_this.$wrapper = $(wrapper);
		var tmpl = '';
		tmpl += '<div>'+
			'<form action="#" class="param-form">'+
				'<p>real:<span class="real-val">0,1</span></p>'+
				'<p><input type="text" value="0,1" class="real-input" /></p>'+
				'<p>imag:<span class="imag-val">0,0</span></p>'+
				'<p><input type="text" value="0,0" class="imag-input" /></p>'+
				'<p>disableNormalization: <input type="checkbox" class="disablenormalization-input" /></p>'+
				'<p><button type="submit">set</button></p>'+
			'</form>'+
		'</div>';
		$(tmpl).appendTo(_this.$wrapper);
		$('.param-form', _this.$wrapper).on('submit', function(e){
			e.preventDefault();
			_this.setParam({
				real: $('.real-input', _this.$wrapper).val(),
				imag: $('.imag-input', _this.$wrapper).val(),
				disableNormalization: $('.disablenormalization-input', _this.$wrapper).prop('checked')
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
			var real = new Float32Array(2);
			var imag = new Float32Array(2);
			var realVal = option.real.split(',');
			var imagVal = option.imag.split(',');
			real[0] = realVal[0];
			real[1] = realVal[1];
			imag[0] = imagVal[0];
			imag[1] = imagVal[1];
			_this.node = audioCtx.createPeriodicWave(real, imag, {
				disableNormalization: option.disableNormalization
			});
			_this.initDtd.resolve();
		}
	}
}

export {PeriodicWaveWidget as default}