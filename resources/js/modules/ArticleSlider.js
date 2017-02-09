import * as _ from '../classes/helpers';
import plyr from '../utils/plyr';
import radio from '../utils/radio';


export default class ArticleSlider {

	constructor(context, options){

		this.opts = {
			ACTIVE_CLASS: 'is-active',
			slideSelector: '',
			paginationSelector: ''
		};
		
		_.extend(this.opts, options);
		
		if(!this.opts.slideSelector || !context){
			return false;
		}

		this.context = context;
		this.slides = _.qa(this.opts.slideSelector, context);
		this.slideLength = this.slides.length;
		this.scrollDirectionNext = true;
		this.sidenavLinks = [];
		this.prevSlideIndex;
		this.currSlideIndex;
		this.player;
		this.isAnimating;
		
		this.closeArticleBtn = _.q('.js-btn-article-close',this.context);
		this.articleBg = _.q('.article__bg',this.context);
		this.btn_prev = _.q('.slide__nav-prev',this.context);
		this.btn_next = _.q('.slide__nav-next',this.context);
		
		// custom indicator
		this.currentIndicator = _.q('.js-current-index', this.context);
		
		this.init();
	}


	bindListeners() {

		// CONSTANTS
		const KEYS = {
			'up': 38,
			'down': 40,
			'left': 37,
			'right': 39,
			'esc': 27
		};

		// Keys events
		document.addEventListener('keyup', (e)=> {
			const key = e.keyCode;
			switch (key) {
				case KEYS.up:
				case KEYS.left:
					this.changeSlides(false);
					break;
				case KEYS.down:
				case KEYS.right:
					this.changeSlides(true);
					break;
				case KEYS.esc:
					this.closeArticle();
			}

		});
	
		// Wheel enevts
		window.addEventListener('wheel', (evt)=> {
			evt.preventDefault();
			this.handleScroll(evt);
		});

		// Mouse events
		this.closeArticleBtn.addEventListener('click', this.closeArticle.bind(this));
		this.btn_prev.addEventListener('click', ()=>{
			this.changeSlides(false);
		});
		this.btn_next.addEventListener('click', ()=>{
			this.changeSlides(true);
		});

		if('ontouchstart' in window){
			
			this.hammertime = new Hammer(document.body);

			this.hammertime.on('swiperight', ()=>{
				this.changeSlides(false);
			});

			this.hammertime.on('swipeleft', ()=>{
				this.changeSlides(true);
			});
		}
		
	}


	init() {
		if (this.slideLength) {

			const openArticle = this.openArticle.bind(this);

			if (this.opts.paginationSelector) {
				this.addPagination();
			}
			
			let totalIndicator = _.q('.js-total-index', this.context);
			totalIndicator.textContent = this.slideLength;
			
			this.currSlideIndex = 0;

			this.bindListeners();

			radio('article:intro:end').subscribe(function () {
				openArticle();
			});

		}
	}
	

	getDimensionImage(img, targetW, targetH) {
		const imgW = img.naturalWidth;
		const imgH = img.naturalHeight;

		let ratio = imgW/imgH;

		let obj = {};
		if(targetW / targetH < ratio){
			obj.width = targetW ;
			obj.height = targetW / ratio;
		} else {
			obj.width = targetH * ratio;
			obj.height = targetH;
		}

		return obj;
	}


	openArticle(){
		// const startingSlide = _.q('.article__starting-slide-img', this.context);
		const coverImgSlide = _.q('.bg-img.is-active');

		const smallImageRect =  this.slides[0].getBoundingClientRect();

		const targetDimensions = this.getDimensionImage(coverImgSlide, smallImageRect.width, smallImageRect.height)
		this.changeSlideByIndex(0);

		
		_.addClass(document.body, 'is-article-visible');

		new TimelineLite()
			.to(coverImgSlide, 1, {width: targetDimensions.width, height:targetDimensions.height, ease: Expo.easeInOut})
			.add(() => {
				_.addClass(document.body, 'is-bg-invisible'); 
			})
			.add(()=>{this.changeSlides(true)}, "+=0.2");
	}
	

	closeArticle(){

		if(this.player){
			this.player.destroy();
		}

		const coverImgSlide = _.q('.bg-img.is-active');

		let delay = this.currSlideIndex ? 0.85 : 0;// wait for changeSlideByIndex and than animate, unless slide is already bg

		this.changeSlideByIndex(0);

		new TimelineLite()
			.add(() => {
				_.removeClass(document.body, 'is-bg-invisible'); 
				radio("article:close").broadcast();
			}, delay)
			.to(coverImgSlide, 0.8, {width: "100%", height:"100%", clearProps: 'all', ease: Expo.easeInOut})
			.add(function(){
				_.removeClass(document.body, 'is-article-visible');
			})
	}
	
	handleScroll(evt) {
		if (!evt) evt = event;
		if(!this.isAnimating){
			var direction = (evt.deltaY > 0 || evt.wheelDelta < 0) ? true : false;
	    	this.changeSlides(direction);
	    	this.isAnimating = true;

	    	// To prevent scrolling from first to last in one scroll
	    	setTimeout(() => {
	    		this.isAnimating = false;
	    	},500)
		}
	}


	changeSlides(directionNext) {
		var idx = directionNext ? this.currSlideIndex + 1 : this.currSlideIndex - 1
		this.changeSlideByIndex(idx, directionNext);
	}

	changeSlideByIndex(index, directionNext) {

		if(index >= this.slideLength - 1){
			_.addClass(this.btn_next,'is-not-visible');
		} else {
			_.removeClass(this.btn_next,'is-not-visible');
		}

		if(index <= 0 ){
			_.addClass(this.btn_prev,'is-not-visible');
		} else {
			_.removeClass(this.btn_prev,'is-not-visible');
		}

		if (index <= this.slideLength - 1 && index >= 0) {
			this.prevSlideIndex = this.currSlideIndex;
			this.currSlideIndex = index;
		} else {
			return;
		}
		
		this.changeClasses();
	}

	changeClasses() {
		

		const currentSlide = this.slides[this.currSlideIndex];
		const prevSlide = this.slides[this.prevSlideIndex];

		let attrName = 'before';

		this.slides.forEach((el, i) => {
			if (el == currentSlide) {
				attrName = 'after';
			} else {
				el.setAttribute('data-position', attrName);
			}
		});

		// Change clides
		_.removeClass(prevSlide, this.opts.ACTIVE_CLASS);
		_.addClass(currentSlide, this.opts.ACTIVE_CLASS);
		
		// update paginatuion
		_.removeClass(this.sidenavLinks[this.prevSlideIndex], 'is-active');
		_.addClass(this.sidenavLinks[this.currSlideIndex], 'is-active');


		//Video
		this.handleVideo(currentSlide);
		
		// Change inditator numbers
		new TimelineLite()
			.to(this.currentIndicator, 0.2, {opacity: 0})
			.add(()=>{this.currentIndicator.textContent = this.currSlideIndex + 1;})
			.fromTo(this.currentIndicator, 0.2, {y:5},{opacity: 1,y:0})
		
	}
	
	handleVideo(slide){
		if(this.player){
			this.player.pause();
		}
		
		var playerNext = slide.querySelector('.plyr');
		if(playerNext){
			var player = plyr.setup(playerNext)[0];
		}
		this.player = player || null;

		if(this.player){
			player.restart();
			player.play();
		}

	}

	handlePaginationClick(cLink) {

		this.sidenavLinks.forEach((lnk, i) => {
			if (lnk === cLink && !_.hasClass(cLink,'is-active')) {
				this.changeSlideByIndex(i, this.prevSlideIndex < i);
				return;
			}
		});
	}

	addPagination() {
		var self = this;

		var pageContainer = _.q(self.opts.paginationSelector, this.context);

		if (!pageContainer) {
			return false;
		}

		var elements = '';
		for (let i = 0; i < self.slideLength; i++) {
			elements += '<li class="js-pagination-link"></li>';
		}
		pageContainer.innerHTML = elements;

		pageContainer.addEventListener('click', (e)=> {
			e.preventDefault();
			var cLink = e.target;
			self.handlePaginationClick(cLink);
		});

		this.sidenavLinks = _.qa('.js-pagination-link',pageContainer);
			
	}
	
};


