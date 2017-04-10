import $ from 'jquery';
import audioCtx from './audio_context';

function makeDistortionCurve(amount) {
  var k = typeof amount === 'number' ? amount : 50,
    n_samples = 44100,
    curve = new Float32Array(n_samples),
    deg = Math.PI / 180,
    i = 0,
    x;
  for ( ; i < n_samples; ++i ) {
    x = i * 2 / n_samples - 1;
    curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
  }
  return curve;
}

class WaveShaperWidget{
	constructor(wrapper){
		var _this = this;
		_this.initDtd = $.Deferred();
		_this.initPromise = _this.initDtd.promise();
		_this.$wrapper = $(wrapper);
		_this.node = audioCtx.createWaveShaper();
		_this.node.oversample = '4x';
		var tmpl = '';
		tmpl += '<div>'+
			'<p>amount:<span class="amount-val">50</span></p>'+
			'<p><input type="range" min="1" max="400" value="50" class="amount-input" /></p>'+
		'</div>';
		$(tmpl).appendTo(_this.$wrapper);
		$('input', _this.$wrapper).on('change', function(e){
			e.preventDefault();
			_this.setParam({
				amount: $('.amount-input', _this.$wrapper).val()
			});
			return false;
		}).change();
		_this.$wrapper.data({
			inited: true,
			widget: _this
		});
		_this.initDtd.resolve();
	}
	setParam(option){
		var _this = this;
		if(option){
			_this.node.curve = 'undefined' == typeof option.amount ? makeDistortionCurve() : makeDistortionCurve(option.amount);
			$('.amount-val', _this.$wrapper).text(option.amount);
		}
	}
}

export {WaveShaperWidget as default}