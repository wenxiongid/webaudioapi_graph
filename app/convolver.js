import $ from 'jquery';
import audioCtx from './audio_context';

class ConvolverWidget{
	constructor(wrapper){
		var _this = this;
		var initDtd = $.Deferred();
		_this.initPromise = initDtd.promise();
		_this.$wrapper = $(wrapper);
		_this.node = audioCtx.createConvolver();
		initDtd.resolve();
		_this.$wrapper.data({
			inited: true,
			widget: _this
		});
	}
}

export {ConvolverWidget as default}