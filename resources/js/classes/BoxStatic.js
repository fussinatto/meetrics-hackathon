/* global PubSub */
/* global TweenMax */
import * as _ from './helpers';
import loc from '../data/box-position';
import UnjumbleTxt from './UnjumbleTxt';
import radio from '../utils/radio';


export default class BoxStatic {

	constructor(context, indx) {
		if (!(context instanceof HTMLElement)) {
			console.warn('BoxSet is initiated with wrong element');
			return;
		}

		this.context = context;
		this.boxContainer = _.q('.js-boxes-bg');
		this.indx = indx;
		this.type = context.getAttribute('data-box-style') || 'one';
		this.isActive = false;
		this.init();
		this.animTxtList = _.qa('.js-anim-wrapper',this.context);
		this.directonNext = undefined;
	}

	init() {
		this.addEL();
		this.coords = loc(this.type);
		this.video = _.q(this.indx % 2 ? 'video.first': 'video.second');
		this.position();
	}

	addEL(){
		let btnPrev = _.q('.nav-btn.prev', this.context);
		let btnNext = _.q('.nav-btn.next', this.context);
		let viewCta = _.q('.js-view-more', this.context);
		let btnHeadline = _.q('.box--headline', this.context);

		btnPrev.addEventListener('click', this.callAnotherSlide.bind(this));
		btnNext.addEventListener('click', this.callAnotherSlide.bind(this));
		viewCta.addEventListener('click', this.handleViewClick.bind(this));
		btnHeadline.addEventListener('click', ()=>{viewCta.click()} );

		radio('window:resize').subscribe(this.resize.bind(this));
		radio('article:close').subscribe(this.activateAfterArticle.bind(this));
		radio('article:open').subscribe(this.viewArticle.bind(this));

		viewCta.addEventListener('mouseover', ()=> {_.addClass(document.body, 'is-view-hover')})
		// btnHeadline.addEventListener('mouseover', ()=> {_.addClass(document.body, 'is-view-hover')})
		viewCta.addEventListener('mouseout', ()=>{ _.removeClass(document.body, 'is-view-hover')})
		// btnHeadline.addEventListener('mouseout', ()=>{ _.removeClass(document.body, 'is-view-hover')})
	}

	handleViewClick(e){
		e.preventDefault();
		radio('article:open').broadcast(e.target.href);
	}

	viewArticle(e){

		this.deactivateBeforeArticle();

	}

	callAnotherSlide(e){
		const trgt = e.target;
		const goingNext = this.directonNext = _.hasClass(trgt,'next') ? true : false;
		let rect = trgt.getBoundingClientRect();
		
		TweenMax.to(_.q('.js-anim-wrapper',trgt),0.25,{width:0, clearProps:'all', onComplete:()=>{
			this.context.setAttribute('data-direction', goingNext ? 'next' : 'prev');
			radio('slide:change').broadcast({_showNext:goingNext, _x:rect.left, _y: rect.top})
		}})
		
		e.preventDefault();
	}

	position() {

		// Collection of elements(for every box, there is static and animated part)

		for (let i = 0; i < this.coords.length; i++) {
			let obj = this.coords[i];
			let el = _.q(obj.name, this.context);
			let el2 = _.q(obj.name, this.boxContainer);

			TweenMax.set([el,el2],{
				width: obj.width,
				height: obj.height,
				x: obj.x,
				y: obj.y,
				opacity: 1,
				scale: 1,
				overwrite: 1
			});
			// TweenMax.set(el2,{
			// 	rotation: 45
			// });
		}
	}

	resize() {
		this.coords = loc(this.type);
		if(this.isActive){
			this.position();
		}
	}

	activate() {
		this.isActive = true;
		
		// this.video.currentTime = 0;
		// this.video.play();
		
		this.context.removeAttribute('data-direction');

		// _.addClass(this.video,'is-active');
		radio('animation:completed').subscribe(this.displayBoxes.bind(this));

		return this;
	}

	displayBoxes(){

		if(this.isActive){
			this.position();

			_.addClass(this.context, 'is-active');
			_.addClass(this.boxContainer, 'is-active');
			this.isActive = true;

			// Text animation
			TweenMax.fromTo(this.animTxtList, 0.7,{width:0, x:20},{width:'100%',x:0, clearProps: 'all', ease:Expo.easeOut} );
		}
	}

	activateAfterArticle() {
		if(this.isActive){

			this.coords = loc(this.type);

			let tl = new TimelineLite({
				paused:true,
				delay: 0.3,
				onStart: ()=> {
					_.addClass(this.context, 'is-active');
					_.addClass(this.boxContainer, 'is-active');
					// this.video.pause();
				}
			});


			for (let i = 0; i < this.coords.length; i++) {
				let obj = this.coords[i];
				let el = _.q(obj.name, this.context);
				let el2 = _.q(obj.name, this.boxContainer);

				tl.to([el,el2], 0.8, {
					width: obj.width,
					height: obj.height,
					x: obj.x,
					y: obj.y,
					opacity: 1,
					scale: 1,
					delay: 0.05*i,
					ease: Expo.easeInOut
				},0)

			}

			tl.play();
		}
	}

	deactivateBeforeArticle() {
		if(this.isActive){
			this.deactivate( true, true, () => { radio('article:intro:end').broadcast()});
		}
	}

	deactivate( forceActiveState = false, useArticleAnim = false, callbackOnEnd = '' ) {

		this.isActive = forceActiveState;
		const coords = loc(this.type);

		// _.removeClass(this.video,'is-active');

		let tl = new TimelineLite({
			paused:true,
			onComplete: ()=> {
				_.removeClass(this.context, 'is-active');
				_.removeClass(this.boxContainer, 'is-active');
				// this.video.pause();
			}
		});

		// don't animate rectangle behind clicked element
		if(!forceActiveState){
			const clickedBtn = _.q(this.directonNext ? '.box--nav-next' : '.box--nav-prev' , this.boxContainer);
			clickedBtn && tl.set(clickedBtn, {opacity: 0});
		}

		// Add disapearing animation of boxes 
		for (let i = 0; i < coords.length; i++) {
			let obj = coords[i];

			let el = _.q(obj.name, this.context);
			let el2 = _.q(obj.name, this.boxContainer);


			const articleIntroAnim= {
				scale: 0, 
				ease: Expo.easeIn,
				delay: 0.05*i
			};
			const defaultAnim = {
				width:0, 
				x: this.directonNext ? "-=50" : "+=" + (el.getBoundingClientRect().width + 50) ,
				ease: Expo.easeInOut,
				delay: 0.03*i
			}; 

			// Text animation
			if(!forceActiveState){
				tl.to(this.animTxtList, 0.8 ,{width:0,opacity:0, x:'+=50', clearProps: 'all', ease: Expo.easeInOut}, 0 )
			}

			tl
				.to([el,el2], 0.8, useArticleAnim ? articleIntroAnim : defaultAnim, 0)
				.set(el, { opacity: 0 })

		}

		tl.add(callbackOnEnd) // add callback eg. after article load

		tl.play();

		return this;
	}

	get getType(){
		return this.type;
	}

}