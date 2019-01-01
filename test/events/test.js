// import { mousedown } from '../../dist/yogafire.js';

const one = document.querySelector('.one');
// const closestInner = document.querySelector('.closest-inner');
const closestOuter = document.querySelector('.closest-outer');
const [closest1, closest2, closest3] = [...closestOuter.children];
const inner1 = closest1.firstElementChild;
const inner2 = closest2.firstElementChild;
const inner3 = closest3.firstElementChild;
 // console.log({inner3,inner2,inner2})
 // const containsOuter = document.querySelector('.contains-outer');
 // const containsInner = document.querySelector('.contains-inner');
 // const is = document.querySelector('.is');
 // const four = document.querySelector('.four');
 // const five = document.querySelector('.five');
 // const six = document.querySelector('.six');

const noop = () => {};



const testContainer = document.querySelector('#test-container');
// const elementsArray = Array.from(testContainer.children);
// const elements = {};
// const results = {};
// elementsArray.forEach(element => elements[element.className] = element);
const delay = {};
[...Array(20)].forEach((_, i) => delay[i] = (i + 1) * 50);
const { isArray } = Array;
console.log('delay', delay)


const { mousedown, click } = yogafire;


describe('Closest', () => {
    // it('click > closest > fire 1st suspect > should trigger the handler', done => {
    //     const one = () => done();
    //     const two = noop;
    //     const three = noop;
    //     click.closest(closest1, closest2, closest3)
    //         .fire(one, two, three);
    //     setTimeout(() => inner1.dispatchEvent(clickEvent), delay[0]);
    // });
    // it('click > closest > fire 2nd suspect > should trigger the handler', done => {
    //     const two = () => done();
    //     const one = noop;
    //     const three = noop;
    //     click.closest(closest1, closest2, closest3)
    //         .fire(one, two, three);
    //     setTimeout(() => inner2.dispatchEvent(clickEvent), delay[0]);
    // });
    // it('click > closest > fire 3rd suspect > should trigger the handler', done => {
    //     const three = () => done();
    //     const one = noop;
    //     const two = noop;
    //     click.closest(closest1, closest2, closest3)
    //         .fire(one, two, three);
    //     setTimeout(() => inner3.dispatchEvent(clickEvent), delay[0]);
    // });

     it('click > closest > fireAll 1st suspect > should trigger all handlers', done => {
        let count = 0;
        const allFired = count => count === 3 && done();
         const two = () => {count++; allFired(count)};
         const one = () => {count++; allFired(count)};
         const three = () => {count++; allFired(count)};
         click.closest(closest1, closest2, closest3)
             .fireAll(one, two, three);
         setTimeout(() => inner1.dispatchEvent(clickEvent), delay[1]);
     });
});


    // it('click > contains > one suspect > should trigger the handler', done => {
    //     click.contains(containsInner).fire(() => {
    //         console.log('contains')
    //         done()
    //     });
    //     setTimeout(() => containsOuter.dispatchEvent(clickEvent), delay[0]);
    // });
    // it('click > is > one suspect > should trigger the handler', done => {
    //     click.is(is).fire(() => {
    //         console.log('is')
    //         done()
    //     });
    //     setTimeout(() => is.dispatchEvent(clickEvent), delay[0]);
    // });

// let count = 0;
// const one = () => count++;
// const two = () => count++;
// const three = () => count === 2 && done();











// describe('yogafire', () => {
//     it('click > closest > one suspect > should trigger the handler', done => {
//         click.closest(testContainer).fire(() => done());
//         setTimeout(() => testContainer.dispatchEvent(clickEvent), delay[0]);
//     });
// });
// // 
// // describe('yogafire', () => {
// //     it('click > closest > one suspect > should trigger the first handler', done => {
// //         click.closest(testContainer).fire(() => done());
// //         setTimeout(() => testContainer.dispatchEvent(clickEvent), delay[5]);
// //     });
// // });




// 
// describe('yogafire', () => {
//     on('click > one suspect > should trigger the handler', done => {
//         yogafireFn({
//             click: {
//                 suspect: ['#test-container'],
//                 handler: ({ target }) => {
//                     flashTarget(target);
//                     done();
//                 }
//             }
//         })
//         setTimeout(() => testContainer.dispatchEvent(clickEvent), delay[0]);
//     });
// 
// 
//     on('click > multiple suspects > triggers handler', done => {
//         const suspects = ['.one', '.two', '.three'];
//         let count = 0;
//         yogafireFn({
//             click: {
//                 suspects,
//                 handler: ({ target }) => {
//                     count++;
//                     flashTarget(target);
//                     if (count === suspects.length) {
//                         done();
//                     }
//                 }
//             }
//         })
//         setTimeout(() => {
//             elements.one.dispatchEvent(clickEvent);
//         }, delay[1]);
//         setTimeout(() => {
//             elements.two.dispatchEvent(clickEvent);
//         }, delay[2]);
//         setTimeout(() => {
//             elements.three.dispatchEvent(clickEvent);
//         }, delay[3]);
//     });
// 
// 
//     on('click:mousemove > one suspect triggers handler', done => {
//         const types = [];
//         yogafireFn({
//             'click:mousemove': {
//                 suspect: ['.one'],
//                 handler: ({ target, type }) => {
//                     types.push(type);
//                     flashTarget(target);
//                     if (types.includes('click') && types.includes('mousemove')) {
//                         done();
//                     }
//                 }
//             }
//         })
//         setTimeout(() => {
//             elements.one.dispatchEvent(mousemoveEvent);
//         }, delay[4]);
//         setTimeout(() => {
//             elements.one.dispatchEvent(clickEvent);
//         }, delay[5]);
//     });
// 
// 
//     on('click:mousemove > multiple suspects triggers handler', done => {
//         const types = {};
//         let count = 0;
//         const suspects = ['.four', '.five', '.six'];
//          yogafireFn({
//             'click:mousemove': {
//                 suspects,
//                 handler: ({ target, type }) => {
//                     const name = target.className;
//                     flashTarget(target);
// 
//                     if (!isArray(types[name])) {
//                         types[name] = [];
//                     }
//                     types[name].push(type);
//                     if (types[name].includes('click') && types[name].includes('mousemove')) {
//                         count++;
//                         if(count === suspects.length){
//                            done(); 
//                         }
//                     }
//                 }
//             }
//         })
//         setTimeout(() => {
//             elements.four.dispatchEvent(mousemoveEvent);
//         }, delay[6]);
//         setTimeout(() => {
//             elements.four.dispatchEvent(clickEvent);
//         }, delay[7]);
//         setTimeout(() => {
//             elements.five.dispatchEvent(mousemoveEvent);
//         }, delay[8]);
//         setTimeout(() => {
//             elements.five.dispatchEvent(clickEvent);
//         }, delay[9]);
//         setTimeout(() => {
//             elements.six.dispatchEvent(mousemoveEvent);
//         }, delay[10]);
//         setTimeout(() => {
//             elements.six.dispatchEvent(clickEvent);
//         }, delay[11]);
//     });
// });




// window.testContainer = testContainer
// one.dispatchEvent(mousedownEvent)