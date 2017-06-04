import test from 'tape';
import fire from '../src/fire';


test('fire: Should be a function.', t => {
    t.plan(1);
    t.equal(typeof fire, 'function');
});

// test('fire: Should throw error "fire was called without parameters".', t => {
//     t.plan(1);
//     t.throws(fire(), );
// });
