/* global radio */
/* global TimelineLite */
/* global Power4 */

/* global TweenMax */
import * as _ from './helpers';
import loc from '../data/box-position';
import radio from '../utils/radio';

window.App = window.App || {}

export default class BoxAnim {

	constructor() {		
		this.context = _.q('.box-animated');
		this.init();
	}

	init() {
		let self = this;
		// Collection of elements(for every box, there is static and animated part) 

	}

	position(_type,_x,_y, _useAnimation = true) {
		
		const coords = loc(_type, _x, _y);
		let reportCompleted = ()=> {
			// let the current element know it can be displayed
			radio('animation:completed').broadcast();
			this._deactivate();
		}
		
		App.isAnimating = true;
				// Collection of elements(for every box, there is static and animated part) 
		// let tl = new TimelineLite({onComplete: reportCompleted,paused:true});
		let tl = new TimelineLite({paused:true, onComplete:()=>{App.isAnimating = false}});
		for (var i = 0; i < coords.length; i++) {
			
			var obj = coords[i];
			var el = _.q(obj.name, this.context);

			tl.fromTo(el, _useAnimation ? 1.2 : 0, {
				width: obj.from_width,
				height: obj.from_height,
				x: obj.from_x,
				y: obj.from_y,
				rotation: 0
			},{
				delay: 0.1 + 0.08*i,
				ease: Power4.easeInOut,
				width: obj.width,
				height: obj.height,
				x: obj.x,
				y: obj.y
			},0);
		}


		tl.add(reportCompleted, _useAnimation ? "-=0.25" : '1')
		
		tl.play();
			
		return this;

	}

	// Public
	_resize() {
		// this.position(_x,_y);
	}

	_activate(_x, _y,_type, _useAnimation) {
		_.addClass(this.context, 'is-active');
		this.position(_type,_x,_y, _useAnimation);
			

		return this;
	}

	_deactivate() {

		_.removeClass(this.context, 'is-active');
		return this;
	}


}


