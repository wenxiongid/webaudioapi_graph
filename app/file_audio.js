import $ from 'jquery';
import audioCtx from './audio_context';

class FileAudioWidget{
	constructor(wrapper){
		var _this = this;
		_this.initDtd = $.Deferred();
		_this.initPromise = _this.initDtd.promise();
		_this.$wrapper = $(wrapper);
		var tmpl = '';
		tmpl += '<form action="#" class="file-form"><div><p>fileUrl:</p><p><input type="text" class="file-input" value="//static.360buyimg.com/jdcopr/activity/yingyin/audio.mp3" /></p><p><button type="submit">set</button></p></div></form>';
		$(tmpl).appendTo(_this.$wrapper);
		$('.file-form', _this.$wrapper).on('submit', function(e){
			e.preventDefault();
			_this.setParam({
				fileUrl: $('.file-input', _this.$wrapper).val()
			});
			$('.file-form button', _this.$wrapper).hide();
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
			var request = new XMLHttpRequest();
			request.open('GET', option.fileUrl, true);
			request.responseType = 'arraybuffer';
			request.onload = function(){
				audioCtx.decodeAudioData(request.response, function(buffer){
					_this.node = audioCtx.createBufferSource();
					_this.node.buffer = buffer;
					if('undefined' != typeof option.loop){
						_this.node.loop = option.loop;
					}else{
						_this.node.loop = true;
					}
					_this.node.start(0);
					_this.initDtd.resolve();
				}, function(err){
					console.log(err);
				});
			};
			request.send();
			$('.file-input', _this.$wrapper).val(option.fileUrl);
		}
	}
}

export {FileAudioWidget as default};