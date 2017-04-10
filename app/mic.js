import $ from 'jquery';
import audioCtx from './audio_context';

class MicWidget{
	constructor(wrapper){
		var _this = this;
		var initDtd = $.Deferred();
		_this.initPromise = initDtd.promise();
		_this.$wrapper = $(wrapper);
		navigator.getUserMedia({
			audio: true
		}, function(stream){
			_this.node = audioCtx.createMediaStreamSource(stream);
			initDtd.resolve();
		}, function(err){
			console.warn(err);
		});
		_this.setParam();
		_this.$wrapper.data({
			inited: true,
			widget: _this
		});
	}
	setParam(option){
		// nothing to do
	}
}

export {MicWidget as default};