
import * as _ from '../classes/helpers';
import radio from '../utils/radio';


/****************************
 *
*  Menu Constructor
*
******************************/
export default class Menu {
	constructor(){

		// LETS
		this.isMenuVisible = false;

		// CONST
		this.MENU_ACTIVE_CLASS = 'is-menu-visible';

		// DOM
		this.menuBtn = _.q('.header__menu-btn');
		this.context = _.q('.menu__container');

		this.init();
	}

	handleBtnClick(){
			this.isMenuVisible = !this.isMenuVisible;
			// radio('moveBg').broadcast(!this.isMenuVisible);
			_[this.isMenuVisible ? 'addClass' : 'removeClass'](document.body, this.MENU_ACTIVE_CLASS);
	}

	handleArticleLinkClick(target){

		if(target.nodeName != 'A'){
			return false;
		}

		const linkHref = target.href;

		this.isMenuVisible = false;
		_.removeClass(document.body, this.MENU_ACTIVE_CLASS);

		radio('article:open:menu').broadcast(+target.getAttribute('data-id'), linkHref);
		
 		
	}

	addEL(){

		// Menu btn attachment
		this.menuBtn.addEventListener('click', this.handleBtnClick.bind(this));

		/// Event deldegation for article links
		_.q('.menu__articles-list', this.context).addEventListener('click', (e)=>{
			e.preventDefault();
			this.handleArticleLinkClick(e.target)
		});
	}

	init(){
		this.addEL();
	}
}