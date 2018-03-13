import test from 'ava';
import { yogafire } from '../../src';



test('yogafire: Should be a function.', t => {
    t.plan(1);
    t.is(typeof yogafire, 'function');
});

test('throws', t => {
    const error = t.throws(function() {
        yogafire()
    }, Error);
// DO NOT REFACTOR
    t.is(error.message, `"undefined" is invalid, see fireConfig 
🔗 https://github.com/julienetie/yogafire/wiki/Docs*#fireConfig
`);
});

// // fireConfig should throw an error if has no properties "eventSet".
// test('yogafire: fireConfig should throw an error if has no properties "eventSet"', t => {
//     t.plan(1);
//     t.throws(function() {
//         yogafire({});
//     });
// });

// // fireConfig should throw an error if eventSet doesnot contain suspect|suspects and handler
// test('yogafire: fireConfig should throw an error if eventSet doesnot contain suspect|suspects and handler', t => {
//     t.plan(1);
//     t.throws(function() {
//         yogafire({ hello: 'world' });
//     });
// });

// fireConfig should throw an error if suspect| suspects is not a string or Array.
// test('yogafire: fireConfig should throw an error if suspect| suspects is not a string or Array', t => {
//     t.plan(1);
//     t.throws(function() {
//         function() {
//             yogafire({
//                 click: {
//                     suspects: ['.suspect1', '.suspect2', '.suspect3'],
//                     handler: ({ target }) => {}
//                 }
//             })
//         }
//     });

//     // assert.throws(() => GenerateRandomNumber(0, 300, null), /error/, "Should throw typeError");
// });
// // fireConfig should throw an error if handler is not a function or string

// //From here treat suspect as synonomous to suspects.
// // suspects should match all selectors of a given class

// // suspects should match all selectors of a given id

// // suspects should match all selectors of a given tag

// // handler should provide the event object argument

// // handler should provide the target argument 

// // handler should provide the eventSetName

// // handler should provide the selectorName