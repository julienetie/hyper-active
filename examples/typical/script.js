import { mousedown, mousemove, keydown } from '../../dist/yogafire.js';

const mousemoveBox1 = document.querySelector('.mousemove1');
const mousemoveBox2 = document.querySelector('.mousemove2');
const mousemoveBox3 = document.querySelector('.mousemove3');

const mousemoveBox4 = document.querySelector('.mousemove4');
const mousemoveBox5 = document.querySelector('.mousemove5');
const mousemoveBox6 = document.querySelector('.mousemove6');

const logHandler = ({suspect}, name)=>{
	console.group('Log Handler')
	console.log('name: ',name)
	const background = getComputedStyle(suspect).getPropertyValue('background');
	console.log('%c className: ' + suspect.className, `background: ${background}; color: black`);
	console.groupEnd();
}

const clickHandler = ({suspect}, name)=>{
	console.group('click Handler')
	console.log('name: ',name)
	console.log('className: ',suspect.className);
	console.groupEnd();
}

const mousemove1Handler = (params) => logHandler(params, mousemove1Handler.name);
const mousemove2Handler = (params) => logHandler(params, mousemove2Handler.name);
const mousemove3Handler = (params) => logHandler(params, mousemove3Handler.name);

const mousemove4Handler = (params) => logHandler(params, mousemove4Handler.name);
const mousemove5Handler = (params) => logHandler(params, mousemove5Handler.name);
const mousemove6Handler = (params) => logHandler(params, mousemove6Handler.name);

mousemove.closest(mousemoveBox1, mousemoveBox2, mousemoveBox3).fire(mousemove1Handler, mousemove2Handler, mousemove3Handler);
mousemove.equals(mousemoveBox1, mousemoveBox2, mousemoveBox3).fire(mousemove1Handler, mousemove2Handler, mousemove3Handler);

mousemove.equals(mousemoveBox4, mousemoveBox5).fire(mousemove4Handler, mousemove5Handler);

mousedown.closest(mousemoveBox6).fire(clickHandler)
mousedown.equals(mousemoveBox6).fire(clickHandler)

// 
// mousemove.closest(document).fire(()=>{
// 	console.log('window should focus')
// 	window.focus();
// 	document.body.focus();
// })

keydown.closest(document).fire(({e})=>{
	console.log('keydown:',e.key)
})
