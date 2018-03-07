import test from 'tape';
import { fire, ceasefire } from '../src/';

test('yogafire: should contain "fire" and "ceasefire" functions', t => {
    t.plan(2);
    t.equal(typeof fire, 'function');
    t.equal(typeof ceasefire, 'function');
});
