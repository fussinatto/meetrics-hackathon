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

export default class ElementTable {

	constructor() {

		this.elementEndPoint = "http://192.168.1.201:2222/home/";

		this.table = _.q('.js-table');
		this.parser = new UAParser();
		this.majorVersions = [];

		this.propertyEndPoint = "http://192.168.1.201:2222/home/window-prop/";
		this.apiEndPoint = "http://192.168.1.201:2222/home/window-prop/";
		this.init();
		
	}

	makeTile(data, elID){

		const browserNameShort = data.browser.name.replace(/\s+/g,'-').toLowerCase();
		let tile = document.createElement('a');
			_.addClass(tile, 'el-link');

			tile.href = "#" + elID;

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

	parseSample(obj){
		this.parser.setUA(obj.userAgent);
	  const result = this.parser.getResult();
	  this.addTileDom(result, obj.id);

	}

	parseAllData(data){
		// const _parseSample = this.parseSample;
		
		setTimeout(()=>{console.log(this.majorVersions.sort())}, 2000);
		const parser = new UAParser();
		data.forEach((obj) =>{
			this.parseSample(obj);
		});
	}

	parseElementData(jsondata){
		const	data = JSON.parse(jsondata);
		const winProps = data.windowProps;
		const docProps = data.documentProps;

		const parser = new UAParser();
		parser.setUA(data.userAgent);
	  const browserObj = this.parser.getResult();
	  console.log(browserObj.browser.name);

	  document.body.classList.add('is-' + browserObj.browser.name.toLowerCase())

		let allWinFrag = document.createDocumentFragment();
		let allDocFrag = document.createDocumentFragment();

		for (var key in winProps) {
		  if (winProps.hasOwnProperty(key)) {
	    	var li = document.createElement("li");
				li.innerHTML = key;
				allWinFrag.appendChild(li);
			}
	  }

	  for (var key in docProps) {
		  if (docProps.hasOwnProperty(key)) {
	    	var li = document.createElement("li");
				li.innerHTML = key;
				allDocFrag.appendChild(li);
			}
	  }
	

		const winContainer = _.q('.js-window-props');
		winContainer.appendChild(allWinFrag, true);

		const docContainer = _.q('.js-doc-props');
		docContainer.appendChild(allDocFrag, true);

	}

	loadElementData(hash){
		const apiEndPoint = this.elementEndPoint + hash;
		_.loadAJAX(apiEndPoint, this.parseElementData.bind(this))
	}

	init() {

		var winBtn = _.q('.show-win-prop');
		var docBtn = _.q('.show-doc-prop');
		var closeBtn = _.q('.close-props');

		winBtn.addEventListener('click',()=>{
			document.body.classList.toggle('is-win-visible');
		});

		docBtn.addEventListener('click',()=>{
			document.body.classList.toggle('is-doc-visible');
		});

		closeBtn.addEventListener('click',()=>{
			document.body.classList.remove('is-win-visible', 'is-doc-visible');
		})



		const hash = window.location.hash.substr(1);
		if(hash.length){
			this.loadElementData(hash);
		}
		 
	}


};