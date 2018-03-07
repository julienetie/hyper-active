import test from 'tape';
import yogafire from '../src/yogafire';

const errorMessages = {
    fireUndefined: `"undefined" is invalid, see fireConfig 
🔗 https://github.com/julienetie/yogafire/wiki/Docs*#fireConfig`
}

test('fire: Should be a function.', t => {
    t.plan(1);
    t.equal(typeof yogafire, 'function');
});

test('yogafire: fireConfig should throw an error if undefined', t => {
    t.plan(1);
    t.throws(function() {
        yogafire();
    });
});

// fireConfig should throw an error if has no properties "eventSet".

// fireConfig should throw an error if eventSet doesnot contain suspect|suspects and handler

// fireConfig should throw an error if suspect| suspects is not a string or Array.

// fireConfig should throw an error if handler is not a function or string

//From here treat suspect as synonomous to suspects.
// suspects should match all selectors of a given class

// suspects should match all selectors of a given id

// suspects should match all selectors of a given tag

// handler should provide the event object argument

// handler should provide the target argument 

// handler should provide the eventSetName

// handler should provide the selectorName
