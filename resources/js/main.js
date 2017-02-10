import HomeTable from './modules/HomeTable';
import ElementTable from './modules/ElementTable';
import * as _ from './classes/helpers';

let App = window.App || {}

if(document.body.classList.contains('element-page')){
  new ElementTable;
} else {
  new HomeTable;
}

console.log('%c Welcome stranger! \n Take a look around. I hope you\'ll have a good time. ','background: #639; color: #FFcd0A');