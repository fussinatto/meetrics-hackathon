/* global TweenMax */
import * as _ from '../classes/helpers';
import radio from '../utils/radio';

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
		this.parser = new UAParser();
		this.majorVersions = [];
		this.allTiles = [];

		this.propertyEndPoint = "http://192.168.1.201:2222/home/window-prop/";
		this.apiEndPoint = "http://192.168.1.201:2222/home/window-prop/";
		this.currentSelected;
		this.init();
		
	}



	getUserAgent(){
		_.getUserAgent(obj.userAgent, (data)=>{
			return JSON.parse(data);
		}); 
	}

	makeTile(data, elID){
		console.log(data);
		const browserNameShort = data.browser.name.replace(/\s+/g,'-').toLowerCase();
		let tile = document.createElement('a');
			_.addClass(tile, 'el-link');

			tile.href = "/element.html#" + elID;

			tile.innerHTML = `<div class="element-wrapper is-${browserNameShort}">
					<h4 class="el-name">${data.browser.name}</h4>
					<span class="el-version {{class}}">${data.browser.major}</span>
				</div>
				<div class="back">OPEN</div>
			</a>`;
			return tile;
	}

	addTileDom(data, elID){
		if(typeof data.browser.name === 'undefined' || !data.browser.name.length || typeof data.browser.major === 'undefined'){
			return;
		}

		const flag = data.browser.name + data.browser.major;
		if(this.majorVersions.indexOf(flag) >=0){
			return;
		}

		let tile = this.makeTile(data, elID)
		
		this.majorVersions.push(flag);
		this.table.appendChild(tile);
	}

	removeEl(tile){
		_.removeClass(tile, 'before-render');
	}

	parseSample(obj){

		this.parser.setUA(obj.userAgent);
	  const result = this.parser.getResult();
	  this.addTileDom(result, obj.id);

	}

	parseAllData(jsondata){

		const _parseSample = this.parseSample.bind(this);
		const data = JSON.parse(jsondata);

		const parser = new UAParser();
		data.forEach((obj) => {
			_parseSample(obj);
		});

	}

	init() {
		 
		_.loadAJAX('http://192.168.1.201:2222/home/all-ids-and-agents', this.parseAllData.bind(this));
	}


};