import $ from 'jquery';
import audioCtx from './audio_context';

// source
import OscillatorWidget from './oscillator';
import MicWidget from './mic';
import FileAudioWidget from './file_audio';

// filter
import BiquadFilterWidget from './biquad_filter';
import ConvolverWidget from './convolver';
import DelayWidget from './delay';
import DynamicsCompressorWidget from './dynamics_compressor';
import GainWidget from './gain';
import StereoPannerWidget from './stereo_panner';
import WaveShaperWidget from './wave_shaper';
import PeriodicWaveWidget from './periodicwave';

class AudioLine{
	constructor(wrapper) {
	  var _this = this;
		_this.$wrapper = $(wrapper);
		_this.update();
	}
	clear(){
		var _this = this;
		$.each(_this.nodeMap, function(i, node){
			if(node.disconnect){
				node.disconnect();
			}
		});
		_this.widgetList = [];
		_this.nodeMap = [];
		_this.initPromiseList = [];
	}
	update(){
		var _this = this;
		var $srcDOM = $('div[data-srctype]', _this.$wrapper);
		var srcType = $srcDOM.data('srctype');
		_this.clear();
		if(!$srcDOM.data('inited')){
			switch(srcType){
				case 'oscillator':
					_this.srcWidget = new OscillatorWidget($srcDOM);
					break;
				case 'mic':
					_this.srcWidget = new MicWidget($srcDOM);
					break;
				case 'audio':
					_this.srcWidget = new FileAudioWidget($srcDOM);
					break;
			}
		}else{
			_this.srcWidget = $srcDOM.data('widget');
		}
		_this.initPromiseList.push(_this.srcWidget.initPromise);
		_this.widgetList.push(_this.srcWidget);
		$('div[data-effecttype]', _this.$wrapper).each(function(i, card){
			var $card = $(card);
			var currentWidget;
			switch($card.data('effecttype')){
				case 'biquadfilter':
					currentWidget = new BiquadFilterWidget($card);
					break;
				case 'convolver':
					currentWidget = new ConvolverWidget($card);
					break;
				case 'delay':
					currentWidget = new DelayWidget($card);
					break;
				case 'dynamicscompressor':
					currentWidget = new DynamicsCompressorWidget($card);
					break;
				case 'gain':
					currentWidget = new GainWidget($card);
					break;
				case 'stereopanner':
					currentWidget = new StereoPannerWidget($card);
					break;
				case 'waveshaper':
					currentWidget = new WaveShaperWidget($card);
					break;
				case 'periodicwave':
					currentWidget = new PeriodicWaveWidget($card);
					break;
			}
			_this.widgetList.push(currentWidget);
			_this.initPromiseList.push(currentWidget.initPromise);
		});
		$.when.apply($, _this.initPromiseList).done(function(){
			$.each(_this.widgetList, function(i, widget){
				_this.nodeMap.push(widget.node);
			});
			for(let i = 0; i < _this.nodeMap.length - 1; i++){
				if(_this.nodeMap[i + 1] instanceof PeriodicWave){
					_this.nodeMap[0].setPeriodicWave(_this.nodeMap[i + 1]);
					_this.nodeMap[i + 1] = _this.nodeMap[i];
				}else{
					_this.nodeMap[i].connect(_this.nodeMap[i + 1]);
				}
			}
			_this.nodeMap[_this.nodeMap.length - 1].connect(audioCtx.destination);
		});
	}
}

export { AudioLine as default };