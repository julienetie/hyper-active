// Closest Elements
const closestOuter = document.querySelector('.closest-outer');
const [closest1, closest2, closest3] = [...closestOuter.children];
const closestInner1 = closest1.firstElementChild;
const closestInner2 = closest2.firstElementChild;
const closestInner3 = closest3.firstElementChild;

// Closest Elements single handler
const scOuter = document.querySelector('.single-closest-outer');
const [sc1, sc2, sc3] = [...scOuter.children];
const sci1 = sc1.firstElementChild;
const sci2 = sc2.firstElementChild;
const sci3 = sc3.firstElementChild;

// Closest Elements Exluded
const d = document.querySelector('.closest-excluded');
const [d1, d2] = [...d.children];
const d1A = d1.children[0]
const d1B = d1.children[1];
const d2A = d2.children[0]
const d2B = d2.children[1];



// Contains Elements
const containsOuter = document.querySelector('.contains-outer');
const [contains1, contains2, contains3] = [...containsOuter.children];
const containsInner1 = contains1.firstElementChild;
const containsInner2 = contains2.firstElementChild;
const containsInner3 = contains3.firstElementChild;

// Contains Elements single handler
const scnOuter = document.querySelector('.single-contains-outer');
const [scn1, scn2, scn3] = [...scnOuter.children];
const scni1 = scn1.firstElementChild;
const scni2 = scn2.firstElementChild;
const scni3 = scn3.firstElementChild;

// Contains Elements Exluded
const e = document.querySelector('.contains-excluded');
const [e1, e2] = [...e.children];
const e1A = e1.children[0]
const e1B = e1.children[1];
const e2A = e2.children[0];
const e2B = e2.children[1];



// Equals Elements
const isOuter = document.querySelector('.equals-outer');
const [is1, is2, is3] = [...isOuter.children];

// Equals Elements single handler
const seOuter = document.querySelector('.single-equals-outer');
const [se1, se2, se3] = [...seOuter.children];

// Not Closest Elements
// const notClosestOuter = document.querySelector('.not-closest-outer');
// const [notClosest1, notClosest2] = [...notClosestOuter.children];
// const notClosest1Inner1 = notClosest1.children[0];
// const notClosest1Inner2 = notClosest1.children[1];
// const notClosest2Inner1 = notClosest2.children[0];
// const notClosest2Inner2 = notClosest2.children[1];

// console.log({
//     notClosest1Inner1,
//     notClosest1Inner2,
//     notClosest2Inner1,
//     notClosest2Inner2,
// })

const noop = () => {};
const testContainer = document.querySelector('#test-container');

const delay = {};
[...Array(20)].forEach((_, i) => delay[i] = i * 50);
const { isArray } = Array;
const { mousedown, click } = yogafire;

describe('Closest fire', () => {
    after(() => click.remove());
    it('click > closest > fire 1st suspect > should trigger the handler', done => {
        const one = () => done();
        const two = noop;
        const three = noop;
        click.closest(closest1, closest2, closest3)
            .fire(one, two, three);
        setTimeout(() => closestInner1.dispatchEvent(clickEvent), delay[0]);
    });
    it('click > closest > fire 2nd suspect > should trigger the handler', done => {
        const two = () => done();
        const one = noop;
        const three = noop;
        click.closest(closest1, closest2, closest3)
            .fire(one, two, three);
        setTimeout(() => closestInner2.dispatchEvent(clickEvent), delay[0]);
    });
    it('click > closest > fire 3rd suspect > should trigger the handler', done => {
        const three = () => { done() };
        const one = noop;
        const two = noop;
        click.closest(closest1, closest2, closest3)
            .fire(one, two, three);
        setTimeout(() => closestInner3.dispatchEvent(clickEvent), delay[0]);
    });
});

describe('Closest Single Handler', () => {
    after(() => click.remove());
    it('click > closest > fire 1st suspect > should trigger handler', done => {
        let count = 0;
        const allFired = count => count === 3 && done();
        const handler = ({ target }) => {
            switch (true) {
                case sc1.contains(target):
                case sc2.contains(target):
                case sc3.contains(target):
                    count++;
                    allFired(count);
                    break;
            }
        };
        click.closest(sc1, sc2, sc3).fire(handler);
        setTimeout(() => sci1.dispatchEvent(clickEvent), 0);
        setTimeout(() => sci2.dispatchEvent(clickEvent), 0);
        setTimeout(() => sci3.dispatchEvent(clickEvent), 0);
    });
});

describe('Closest Exclude By Not Closest', () => {
    after(() => click.remove());
    it('click > closest > not > closest > Should trigger handlers except exluded', done => {
        let count = 0;

        const one = () => {
            count++;
        }
        const two = () => {
            count++;
        }

        // If closest d1 or d2 but not for elements d1B or d2B 
        click.closest(d1, d2).not.closest(d1B, d2B).fire(one, two)
        setTimeout(() => d1B.dispatchEvent(clickEvent), 0);
        setTimeout(() => d1A.dispatchEvent(clickEvent), delay[1]);
        setTimeout(() => d2B.dispatchEvent(clickEvent), 2);
        setTimeout(() => d2A.dispatchEvent(clickEvent), delay[3]);
        setTimeout(() => {
            console.log('count', count)
            if (count === 2) {
                done();
            }
        }, delay[4]);

    });
});


describe('Contains fire', () => {
    after(() => click.remove());
    it('click > contains > fire 1st suspect > should trigger the handler', done => {
        const one = () => done();
        const two = noop;
        const three = noop;
        click.contains(containsInner1, containsInner2, containsInner3)
            .fire(one, two, three);
        setTimeout(() => contains1.dispatchEvent(clickEvent), delay[0]);
    });
    it('click > contains > fire 2nd suspect > should trigger the handler', done => {
        const two = () => done();
        const one = noop;
        const three = noop;
        click.contains(containsInner1, containsInner2, containsInner3)
            .fire(one, two, three);
        setTimeout(() => contains2.dispatchEvent(clickEvent), delay[0]);
    });
    it('click > contains > fire 3rd suspect > should trigger the handler', done => {
        const three = () => done();
        const one = noop;
        const two = noop;
        click.contains(containsInner1, containsInner2, containsInner3)
            .fire(one, two, three);
        setTimeout(() => contains3.dispatchEvent(clickEvent), delay[0]);
    });
});
// 

describe('Contains Single Handler', () => {
    after(() => click.remove());
    it('click > contains > fire 1st suspect > should trigger handler', done => {
        let count = 0;
        const allFired = count => count === 3 && done();
        const handler = ({ target }) => {
            switch (true) {
                case target.contains(sci1):
                case target.contains(sci2):
                case target.contains(sci3):
                    count++;
                    allFired(count);
                    break;
            }
        };
        click.contains(sci1, sci2, sci3).fire(handler);
        setTimeout(() => sc1.dispatchEvent(clickEvent), 0);
        setTimeout(() => sc2.dispatchEvent(clickEvent), 0);
        setTimeout(() => sc3.dispatchEvent(clickEvent), 0);
    });
});


describe('Contains Exclude By Not Contains', () => {
    after(() => click.remove());
    it('click > contains > not > contains > Should trigger handlers except exluded', done => {
        let count = 0;

        const one = () => {
            count++;
        }
        const two = () => {
            count++;
        }

        // If closest d1 or d2 but not for elements d1B or d2B 
        click.contains(e1A,e2A).not.contains(e2B).fire(one, two)
        setTimeout(() => e1.dispatchEvent(clickEvent), 0);
        setTimeout(() => e2.dispatchEvent(clickEvent), delay[1]);
        setTimeout(() => {
            console.log('count', count)
            if (count === 1) {
                done();
            }
        }, delay[2]);

    });
});

describe('Equals fire', () => {
     after(() => click.remove());
     it('click > equals > fire 1st suspect > should trigger the handler', done => {
         const one = () => done();
         const two = noop;
         const three = noop;
         click.equals(is1, is2, is3)
             .fire(one, two, three);
         setTimeout(() => is1.dispatchEvent(clickEvent), delay[0]);
     });
     it('click > equals > fire 2nd suspect > should trigger the handler', done => {
         const two = () => done();
         const one = noop;
         const three = noop;
         click.equals(is1, is2, is3)
             .fire(one, two, three);
         setTimeout(() => is2.dispatchEvent(clickEvent), delay[0]);
     });
     it('click > equals > fire 3rd suspect > should trigger the handler', done => {
         const three = () => done();
         const one = noop;
         const two = noop;
         click.equals(is1, is2, is3)
             .fire(one, two, three);
         setTimeout(() => is3.dispatchEvent(clickEvent), delay[0]);
     });
 });
  
  describe('Equals Single Handler', () => {
      after(() => click.remove());
      it('click > equals > fireAll 1st suspect > should trigger all handlers', done => {
          let count = 0;
          const allFired = count => count === 3 && done();
          const handler = ({ target }) => {
              switch (true) {
                  case target === se1:
                  case target === se2:
                  case target === se3:
                      count++;
  
                      allFired(count);
                      break;
              }
          };
          click.equals(se1, se2, se3).fire(handler);
          setTimeout(() => se1.dispatchEvent(clickEvent), 0);
          setTimeout(() => se2.dispatchEvent(clickEvent), 0);
          setTimeout(() => se3.dispatchEvent(clickEvent), 0);
      });
  });

/*
Notes: 

To account for: 
    Q: What happens if you have less handlers than suspects?
    A: for fire() all handlers are respective, if there are less handlers than suspects then
        the suspect is ignored and an console warning is provided. 
    Q: What if you have less suspects than handlers
    A: Same as above, a warning is shown in the console. Silent warnings are shown to prevent 
        breakage if the events are dynamically generated.  

    Q: What happens if elements are removed.
    A: For each event fired an internal debounce function is called, that function triggers 
        a requestIdleCallback request to call a cleanup task. 
        The cleanup task will check that each element reference is an Element. 
        If an element does not exist it will exclude the element (not) until it is updated.
        The default cleanup will debounce after 30000ms using a RAF based debounce.  
    A.2: There will be two settings:
        cleanupDebounceDelay: // default = 30000ms | XXXms
        cleanup: // default = true | false 
        quotaWarning: // default = 800 elements | false 
    A.3: Documentation will emphaisie good and bad examples of yogafire in a real-world application.
        Although idleTasks will attempt to cleanup memory leaks it is the responsibiliy of the 
        developer to manage their event workflow responsibly by: 
            - Manually removing yogafire fire referenced elements (which will remove Element-handler pairs)
            - Manually removing yogafire fireAll referenced elements (Which will only removed the desired element)
            - Manually removing yogafire eventDelegates (Which will cleanup both Elements and handlers)
            - Manually removing yogafire events (Which will remove native event listeners)

    Q: But what if the user repetitively actions an event unordinairly.
    A: If the user repeatedly triggers an event after n times and the number of referenced elements increases
        A cleanup will be triggered. 
        A setting will determin whent this is triggered.
            - rapidCleanupSupressionLimit: // default = 8 
            - rapidCleanupSuppressionDelay: // default = 1000ms
*/