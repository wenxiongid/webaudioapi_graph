import $ from 'jquery';
import audioCtx from './audio_context';

class DynamicsCompressorWidget{
	constructor(wrapper){
		var _this = this;
		_this.initDtd = $.Deferred();
		_this.initPromise = _this.initDtd.promise();
		_this.$wrapper = $(wrapper);
		_this.node = audioCtx.createDynamicsCompressor();
		var tmpl = '';
		tmpl += '<div>'+
			'<p>threshold(db):<span class="threshold-val">-50</span></p>'+
			'<p><input type="range" min="-100" max="0" value="-50" class="threshold-input" /></p>'+
			'<p>knee(db):<span class="knee-val">40</span></p>'+
			'<p><input type="range" min="0" max="40" value="40" class="knee-input" /></p>'+
			'<p>ratio(db):<span class="ratio-val">12</span></p>'+
			'<p><input type="range" min="1" max="20" value="12" class="ratio-input" /></p>'+
			// '<p>reduction(float):</p>'+
			// '<p><input type="text" value="-20" class="reduction-input" /></p>'+
			'<p>attack(second):<span class="range-val">0</span></p>'+
			'<p><input type="range" min="0" max="1" value="0" step="0.01" class="attack-input" /></p>'+
			'<p>release(second):<span class="release-val">0.25</span></p>'+
			'<p><input type="range" min="0" max="1" value="0.25" step="0.01" class="release-input" /></p>'+
		'</div>';
		$(tmpl).appendTo(_this.$wrapper);
		$('input', _this.$wrapper).on('change', function(e){
			e.preventDefault();
			_this.setParam({
				threshold: $('.threshold-input', _this.$wrapper).val(),
				knee: $('.knee-input', _this.$wrapper).val(),
				ratio: $('.ratio-input', _this.$wrapper).val(),
				reduction: $('.reduction-input', _this.$wrapper).val(),
				attack: $('.attack-input', _this.$wrapper).val(),
				release: $('.release-input', _this.$wrapper).val()
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
			_this.node.threshold.value = 'undefined' == typeof option.threshold ? -50 : +option.threshold;
			_this.node.knee.value = 'undefined' == typeof option.knee ? 40 : +option.knee;
			_this.node.ratio.value = 'undefined' == typeof option.ratio ? 12 : +option.ratio;
			// _this.node.reduction.value = 'undefined' == typeof option.reduction ? -20 : +option.reduction;
			_this.node.attack.value = 'undefined' == typeof option.attack ? 0 : +option.attack;
			_this.node.release.value = 'undefined' == typeof option.release ? 0.25 : +option.release;
			$('.threshold-val', _this.$wrapper).text(_this.node.threshold.value);
			$('.knee-val', _this.$wrapper).text(_this.node.knee.value);
			$('.ratio-val', _this.$wrapper).text(_this.node.ratio.value);
			$('.reduction-val', _this.$wrapper).text(_this.node.reduction.value);
			$('.attack-val', _this.$wrapper).text(_this.node.attack.value);
			$('.release-val', _this.$wrapper).text(_this.node.release.value);
		}
	}
}

export {DynamicsCompressorWidget as default}