import * as _ from './helpers';
	
export default class UnjumbleTxt {
	
	constructor(el,delay=0) {

		const txt = el.textContent;
		let count = 0;
		const max = txt.length;
		const possible = "£$&@123456";
		
		el.textContent = '';
		
		let randomChar = function(){
			let char
			char = possible.charAt(Math.floor(Math.random() * 13));
			if(count == max){
				char = '';
			}
			return char;
		}
		
		let timerHandler = function () {
			
			if (count == max) {
				TweenLite.ticker.removeEventListener("tick", timerHandler);
			}
			
			let startnormaltext = txt.substr(0,count);
			// el.textContent = startnormaltext + randomChar();
			el.textContent = startnormaltext;
			count++;
		}
		
		setTimeout(()=>{
			TweenLite.ticker.addEventListener("tick", timerHandler);
		},delay)
		
	}
}	

/*
 export default class UnjumbleTxt {
	
	constructor(el) {
		var el = el;
		var txt = el.textContent;
		var count = 0;
		var max = txt.length;
		var passarray = [];
		var startnormaltext;
		var endjumbledtext;
		el.textContent = '';
		
		
		
		let timerHandler = function () {
			
			startnormaltext = txt.substr(0,count);
			passarray  = txt.substr(count, max).split("");
			endjumbledtext = randomize(passarray).join("");
			el.textContent = (startnormaltext + endjumbledtext)
			count++;

			if (count == max) {
				TweenLite.ticker.removeEventListener("tick", timerHandler);
			}
		}
		
		let randomize = function(array){
			let i = array.length;
			let j;
			let tmp1;
			let tmp2;
			
			if (i == 0) {
				return [];
			}

			while (--i){
				j = Math.floor(Math.random()*(i+1));
				tmp1 = array[i];
				tmp2 = array[j];
				array[i] = tmp2;
				array[j] = tmp1;
			}

			return array;
		}
		
		TweenLite.ticker.addEventListener("tick", timerHandler);
	}

}*/