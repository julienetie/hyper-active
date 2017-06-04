import test from 'tape';
import { fire, ceaseFire } from '../src/';

test('yogafire: should contain "fire" and "ceaseFire" functions', t => {
    t.plan(2);
    t.equal(typeof fire, 'function');
    t.equal(typeof ceaseFire, 'function');
});
