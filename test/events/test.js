const testContainer = document.querySelector('#test-container');
const elementsArray = Array.from(testContainer.children);
const elements = {};
const results = {};
elementsArray.forEach(element => elements[element.className] = element);
const delay = {};
[...Array(20)].forEach((_, i) => delay[i] = (i + 1) * 50);
const { isArray } = Array;

describe('yogafire', () => {
    on('click > one suspect > should trigger the handler', done => {
        yogafireFn({
            click: {
                suspect: ['#test-container'],
                handler: ({ target }) => {
                    flashTarget(target);
                    done();
                }
            }
        })
        setTimeout(() => testContainer.dispatchEvent(clickEvent), delay[0]);
    });


    on('click > multiple suspects > triggers handler', done => {
        const suspects = ['.one', '.two', '.three'];
        let count = 0;
        yogafireFn({
            click: {
                suspects,
                handler: ({ target }) => {
                    count++;
                    flashTarget(target);
                    if (count === suspects.length) {
                        done();
                    }
                }
            }
        })
        setTimeout(() => {
            elements.one.dispatchEvent(clickEvent);
        }, delay[1]);
        setTimeout(() => {
            elements.two.dispatchEvent(clickEvent);
        }, delay[2]);
        setTimeout(() => {
            elements.three.dispatchEvent(clickEvent);
        }, delay[3]);
    });


    on('click:mousemove > one suspect triggers handler', done => {
        const types = [];
        yogafireFn({
            'click:mousemove': {
                suspect: ['.one'],
                handler: ({ target, type }) => {
                    types.push(type);
                    flashTarget(target);
                    if (types.includes('click') && types.includes('mousemove')) {
                        done();
                    }
                }
            }
        })
        setTimeout(() => {
            elements.one.dispatchEvent(mousemoveEvent);
        }, delay[4]);
        setTimeout(() => {
            elements.one.dispatchEvent(clickEvent);
        }, delay[5]);
    });


    on('click:mousemove > multiple suspects triggers handler', done => {
        const types = {};
        let count = 0;
        const suspects = ['.four', '.five', '.six'];
         yogafireFn({
            'click:mousemove': {
                suspects,
                handler: ({ target, type }) => {
                    const name = target.className;
                    flashTarget(target);

                    if (!isArray(types[name])) {
                        types[name] = [];
                    }
                    types[name].push(type);
                    if (types[name].includes('click') && types[name].includes('mousemove')) {
                        count++;
                        if(count === suspects.length){
                           done(); 
                        }
                    }
                }
            }
        })
        setTimeout(() => {
            elements.four.dispatchEvent(mousemoveEvent);
        }, delay[6]);
        setTimeout(() => {
            elements.four.dispatchEvent(clickEvent);
        }, delay[7]);
        setTimeout(() => {
            elements.five.dispatchEvent(mousemoveEvent);
        }, delay[8]);
        setTimeout(() => {
            elements.five.dispatchEvent(clickEvent);
        }, delay[9]);
        setTimeout(() => {
            elements.six.dispatchEvent(mousemoveEvent);
        }, delay[10]);
        setTimeout(() => {
            elements.six.dispatchEvent(clickEvent);
        }, delay[11]);
    });
});