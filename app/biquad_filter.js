import $ from 'jquery';
import audioCtx from './audio_context';

class BiquadFilterWidget{
	constructor(wrapper){
		var _this = this;
		var initDtd = $.Deferred();
		_this.initPromise = initDtd.promise();
		_this.$wrapper = $(wrapper);
		_this.node = audioCtx.createBiquadFilter();
		initDtd.resolve();
		_this.$wrapper.data({
			inited: true,
			widget: _this
		});
	}
}

export {BiquadFilterWidget as default}