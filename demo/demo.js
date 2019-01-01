import { mousedown, mousemove } from '../dist/yogafire.js';
    
    // console.log(mousedown,mousemove)
const target1 = document.querySelector('#target1');
const target2 = document.querySelector('#target2');
const target3 = document.querySelector('#target3');
const target4 = document.querySelector('#target4');
// mousedown.closest(target1,target2,target3);
// mousedown.closest(...[target1,target2,target3]);
// mousedown.closest({target1,target2,target3});
// document.addEventListener('mousedown', (e)=>{
// 	// console.time('Target4');
// 	const target4 = e.target.closest('#target4');
// 	if(target4){
// 		target4.style.backgroundColor = `rgb(${Math.floor(Math.random() * 255)},100,100)`
// 	}
// 	// console.timeEnd('Target4');
// })

window.mousedown = mousedown


const makeColor = () => `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`;

const helloWorld1 = ({target})=>{
	 console.log('Target1:');
	target1.style.backgroundColor = makeColor();
}
const helloWorld2 = ({target})=>{
	 console.log('Target2:');
	 target2.style.backgroundColor = makeColor();
}
const helloWorld3 = ({target})=>{
	console.log('Target3:');
	target3.style.backgroundColor = makeColor();
}
const suspects = [target1, target2]
const handlers = [helloWorld1, helloWorld2]
mousedown.closest(...suspects).debounce(1000, true).fire(...handlers);
mousedown.closest(target4).throttle(2000).fire(({suspect}) => {
	console.log('Target4');
	suspect.style.background = makeColor();
});
mousedown.closest(target3).fire(({suspect}) => {
	console.log('Target3');
	suspect.style.background = makeColor();
});