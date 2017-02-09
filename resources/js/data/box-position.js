import * as _ from '../classes/helpers';
export default function (_type='one',_x=0, _y=0){
	
	const W = _.W();
	const scale = W.w / 1366;
	const $button_w = 100;
	const $button_h = 100;
	let locX, locY;
	
	if(_type == 'one'){
		locX = W.w2 - 100 * scale;
		locY = W.h2 - 100 * scale;
	} else if(_type == 'two'){
		locX = W.w2 - 180 * scale;
		locY = W.h2 - 110 * scale;
	} else if(_type == 'three'){
		locX = W.w2 - 120 * scale;
		locY = W.h2 - 150 * scale;
	}
	
	// type=one
	let coords = {};
	
	coords.one = [
		{
			name: '.box--headline',
			width: 220 * scale,
			height: 220 * scale,
			x: locX,
			y: locY,
			from_width: $button_w*0.6,
			from_height: $button_h*0.5,
			from_x: _x,
			from_y: _y
		},
		{
			name: '.box--coords',
			width: 170 * scale,
			height: 100 * scale,
			x: locX - 100 * scale - 170 * scale,
			y: locY,
			from_width: $button_w*0.4,
			from_height: $button_h*0.5,
			from_x: _x + $button_w*0.6,
			from_y: _y
		},
		{
			name: '.box--date',
			width: 100 * scale,
			height: 110 * scale,
			x: locX - 100 * scale,
			y: locY - 110 * scale,
			from_width: $button_w*0.5,
			from_height: $button_h*0.5,
			from_x: _x + $button_w*0.5,
			from_y: _y + $button_h*0.5

			
		},
		{
			name: '.box--cta',
			width: 100 * scale,
			height: 100 * scale,
			x: locX + 220 * scale,
			y: locY + 220 * scale,
			from_width: $button_w*0.5,
			from_height: $button_h*0.25,
			from_x: _x,
			from_y: _y + $button_h*0.5
		},
		{
			name: '.box--nav-prev',
			width: $button_w,
			height: $button_h,
			x: 50,
			y: W.h2 + 20,
			from_width: $button_w*0.25,
			from_height: $button_h*0.25,
			from_x: _x,
			from_y: _y + $button_h*0.75
		},
		{
			name: '.box--nav-next',
			width: $button_w,
			height: $button_h,
			x: W.w - $button_w - 50,
			y: W.h2 - 50,
			from_width: $button_w*0.25,
			from_height: $button_h*0.25,
			from_x: _x + $button_w*0.25,
			from_y: _y + $button_h*0.75
		}
		
	]
	
	coords.two = [
		{
			name: '.box--headline',
			width: 220 * scale,
			height: 220 * scale,
			x: locX,
			y: locY,
			from_width: $button_w*0.6,
			from_height: $button_h*0.5,
			from_x: _x,
			from_y: _y
		},
		{
			name: '.box--coords',
			width: 140 * scale,
			height: 100 * scale,
			x: locX + 220 * scale,
			y: locY - 100 * scale,
			from_width: $button_w*0.4,
			from_height: $button_h*0.5,
			from_x: _x + $button_w*0.6,
			from_y: _y
		},
		{
			name: '.box--date',
			width: 160 * scale,
			height: 110 * scale,
			x: locX + 220 * scale + 140 * scale,
			y: locY ,
			from_width: $button_w*0.5,
			from_height: $button_h*0.5,
			from_x: _x + $button_w*0.5,
			from_y: _y + $button_h*0.5
		},
		{
			name: '.box--cta',
			width: 100 * scale,
			height: 100 * scale,
			x: locX - 100 * scale,
			y: locY + 220 * scale,
			from_width: $button_w*0.5,
			from_height: $button_h*0.25,
			from_x: _x,
			from_y: _y + $button_h*0.5
		},
		{
			name: '.box--nav-prev',
			width: $button_w,
			height: $button_h,
			x: 50,
			y: W.h2 - 20,
			from_width: $button_w*0.25,
			from_height: $button_h*0.25,
			from_x: _x,
			from_y: _y + $button_h*0.75
		},
		{
			name: '.box--nav-next',
			width: $button_w,
			height: $button_h,
			x: W.w - $button_w - 50,
			y: W.h2 + 50,
			from_width: $button_w*0.25,
			from_height: $button_h*0.25,
			from_x: _x + $button_w*0.25,
			from_y: _y + $button_h*0.75
		}
		
	]
	
	coords.three = [
		{
			name: '.box--headline',
			width: 210 * scale,
			height: 210 * scale,
			x: locX + 50 * scale,
			y: locY + 50 * scale,
			from_width: $button_w*0.6,
			from_height: $button_h*0.5,
			from_x: _x,
			from_y: _y
		},
		{
			name: '.box--coords',
			width: 160 * scale,
			height: 80 * scale,
			x: locX - 210 * scale,
			y: locY + 180 * scale,
			from_width: $button_w*0.5,
			from_height: $button_h*0.5,
			from_x: _x + $button_w*0.5,
			from_y: _y + $button_h*0.5
		},
		{
			name: '.box--date',
			width: 140 * scale,
			height: 90 * scale,
			x: locX + 260 * scale,
			y: locY - 40 * scale,
			from_width: $button_w*0.4,
			from_height: $button_h*0.5,
			from_x: _x + $button_w*0.6,
			from_y: _y
		},
		{
			name: '.box--cta',
			width: 100 * scale,
			height: 100 * scale,
			x: locX  - 50 * scale,
			y: locY + 260 * scale,
			from_width: $button_w*0.5,
			from_height: $button_h*0.25,
			from_x: _x,
			from_y: _y + $button_h*0.5
		},
		{
			name: '.box--nav-prev',
			width: $button_w,
			height: $button_h,
			x: 50,
			y: W.h2 - 70,
			from_width: $button_w*0.25,
			from_height: $button_h*0.25,
			from_x: _x,
			from_y: _y + $button_h*0.75
		},
		{
			name: '.box--nav-next',
			width: $button_w,
			height: $button_h,
			x: W.w - $button_w - 50,
			y: W.h2 + 30,
			from_width: $button_w*0.25,
			from_height: $button_h*0.25,
			from_x: _x + $button_w*0.25,
			from_y: _y + $button_h*0.75
		}
		
	]
	
	
	
	return coords[_type];

}
