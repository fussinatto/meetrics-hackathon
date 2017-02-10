export function addClass(el, className) {
	if (el.classList) {
		el.classList.add(className);
	} else {
		el.className += ' ' + className
	}
}

export function removeClass(el, className) {
	if (el.classList) {
		el.classList.remove(className);
	} else {
		el.className -= className
	}
}

export function hasClass(el, className) {
	if (el.classList) {
		return el.classList.contains(className);
	}
}

export function q(className, el) {
	if (typeof el == 'undefined') {
		el = document;
	}
	return el.querySelector(className);
}
export function qa(className, el) {
	if (typeof el == 'undefined') {
		el = document;
	}
	return Array.prototype.slice.call(el.querySelectorAll(className), 0);
}

export function W() {
	const WW = window.innerWidth;
	const WH = window.innerHeight;
	const obj = {
		w: WW,
		h: WH,
		w2: Math.ceil(WW / 2),
		h2: Math.ceil(WH / 2)
	}
	return obj;
};


export function extend(a, b){
    for(var key in b)
        if(b.hasOwnProperty(key))
            a[key] = b[key];
    return a;
}


export function debounce(func, wait, immediate) {
	let timeout;
	return function () {
		let context = this, args = arguments;
		let later = function () {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		let callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

	
export function loadAJAX(url, callback) {
	var request = new XMLHttpRequest();
	request.open('GET', url, true);

	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			callback(request.responseText);
		} else {
			console.warn('Cannot load article ' + url);
		}
	};

	request.onerror = function() {
	// There was a connection error of some sort
	};

	request.send();

}

export function getUserAgent(userAgent, callback) {
	var userKey = 'bda4acedafe407653dc3e186a191e8be';
	var apiEndpoint = 'http://api.whatismybrowser.com/api/v1/user_agent_parse';
	var data = new FormData();

	data.append('user_agent', userAgent);
	data.append('user_key', userKey);

	var request = new XMLHttpRequest();
	request.open('POST', apiEndpoint, true);
	request.onload = function () {
		if (request.status >= 200 && request.status < 400) {
			callback(request.responseText);
		} else {
			console.warn('Cannot load user agent for  ' + url);
		}

	};

	request.send(data);

}

export function fullscreenImage(img) {
		const wW =  window.innerWidth;
		const wH =  window.innerHeight;
		const imgW = img.naturalWidth;
		const imgH = img.naturalHeight;

		let ratio = imgW/imgH;

		if(wW / wH < ratio){
			img.width = wH * ratio;
			img.height = wH;
		} else {
			img.width = wW;
			img.height = wW * ratio;
		}
	}