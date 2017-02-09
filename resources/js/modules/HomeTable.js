/* global TweenMax */
import * as _ from '../classes/helpers';
import radio from '../utils/radio';
import samples from '../../ajax/db';

TweenMax.defaultEase = Expo.easeInOut;

window.App = window.App || {}
/****************************
 *
*  Home Constructor
*
******************************/

export default class HomeTable {

	constructor() {

		this.table = _.q('.js-table');
		this.currentSelected;
		this.init();
		
	}



	getUserAgent(){
		_.getUserAgent(obj.userAgent, (data)=>{
			return JSON.parse(data);
		}); 
	}

	addTileDom(data, elID){
		const UA = data.parse;
		const browserShort = UA.browser_name.replace(/\s+/g,'-').toLowerCase();
		const fnRemoveEl = this.removeEl.bind(this);

		let tile = document.createElement('a');
		_.addClass(tile, 'el-link');
		_.addClass(tile, 'before-render');

		tile.href = "#" + elID;

		tile.innerHTML = `<div class="element-wrapper is-${browserShort}">
				<h4 class="el-name">${UA.browser_name}</h4>
				<span class="el-version {{class}}">${UA.browser_version}</span>
			</div>
		</a>`
		this.table.appendChild(tile);
		setTimeout( ()=> {fnRemoveEl(tile)}, 10);
	}

	removeEl(tile){
		_.removeClass(tile, 'before-render');
	}

	parseSample(obj){

		 _.getUserAgent(obj.userAgent, (data)=>{
		 	console.log(obj.id);
		 	this.addTileDom(JSON.parse(data), obj.id)
		}); 
	}

	parseAllData(data){
		// const _parseSample = this.parseSample;

		samples.forEach((obj) =>{
			this.parseSample(obj);
		});
	}

	parseUserAgent(data){
		console.log('Ovoe je response', data);
	}

	init() {
		
		// _.loadHTML('/ajax/db.json', this.parseData);
		this.parseAllData();

		const ueString = 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:49.0) Gecko/20100101 Firefox/49.0';

		// _.getUserAgent(ueString, this.parseUserAgent);

	}


};