import $ from 'jquery';
import audioCtx from './audio_context';

class OscillatorWidget{
	constructor(wrapper){
		var _this = this;
		var initDtd = $.Deferred();
		_this.initPromise = initDtd.promise();
		_this.$wrapper = $(wrapper);
		var tmpl = '';
		tmpl += '<div><p>Frequency: <span class="f-num"></span></p><p><input type="range" class="f-input" min="20" max="1000" /></p></div>';
		tmpl += '<div><p>Detune: <span class="dt-num"></span></p><p><input type="range" class="dt-input" min="0" max="200" /></p></div>';
		tmpl += '<div><p>type: <select class="type-input">';
		tmpl += '<option value="sine">sine</option>';
		tmpl += '<option value="square">square</option>';
		tmpl += '<option value="sawtooth">sawtooth</option>';
		tmpl += '<option value="triangle">triangle</option>';
		tmpl += '</select></p></div>';
		$('<div>'+ tmpl +'</div>').appendTo(_this.$wrapper);
		var $fInput = $('.f-input', _this.$wrapper);
		var $dtInput = $('.dt-input', _this.$wrapper);
		var $typeInput = $('.type-input', _this.$wrapper);
		$fInput.on('change', function(e){
			_this.setParam({
				frequency: $fInput.val()
			});
		});
		$dtInput.on('change', function(e){
			_this.setParam({
				detune: $dtInput.val()
			});
		});
		$typeInput.on('change', function(e){
			_this.setParam({
				type: $typeInput.val()
			});
		});
		_this.node = audioCtx.createOscillator();
		_this.setParam();
		_this.node.start(0);
		initDtd.resolve();
		_this.$wrapper.data({
			inited: true,
			widget: _this
		});
	}
	setParam(option){
		var _this = this;
		if(option){
			this.node.frequency.value = option.frequency || this.node.frequency.value;
			this.node.detune.value = option.detune || this.node.detune.value;
			this.node.type = option.type || this.node.type;
		}
		$('.f-num', _this.$wrapper).text(this.node.frequency.value);
		$('.dt-num', _this.$wrapper).text(this.node.detune.value);
		$('.f-input', _this.$wrapper).val(this.node.frequency.value);
		$('.dt-input', _this.$wrapper).val(this.node.detune.value);
	}
}

export {OscillatorWidget as default};