import * as _ from '../classes/helpers';
import radio from '../utils/radio';

export default function preloader(slides) {

	if(!slides || !(slides instanceof  Array) || slides.length == 0){
		console.warn('Preloader error - slides are not set properly');
		return false;
	}

	let currentLoaded = 0;

	const preloadAnimBox = _.q('.js-preloader-box');


	init();


	function handleImgLoad(el) {
		
		if(el.type == 'load'){
			el.target.removeEventListener('load', handleImgLoad);
		}	

		currentLoaded++;

		TweenMax.to(preloadAnimBox, .5, {width: 100 / slides.length * currentLoaded})


		if (currentLoaded === slides.length) {
			preloadingComplete();
		}
	}


	function listenForComplete() {

		let _img;
		for (var i = 0, j = slides.length; i < j; i++) {
			_img = slides[i];
			if (_img.nodeName != 'IMG') {
				handleImgLoad('notimage');
				continue;
			}

			
			if (_img.complete) {
				handleImgLoad(_img);
			} else {
				_img.addEventListener('load', handleImgLoad);
			}

		}
	}

	function preloadingComplete() {
		// remove default class set on body
		_.removeClass(document.body, 'is-page-loading');
		radio('preloader:finished').broadcast();
	}

	function init() {
		// Add eventListener
		listenForComplete();
	}

};