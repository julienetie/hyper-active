import test from 'ava';
import { yogafire, ceasefire } from '../../src/';

test('yogafire: should contain "fire" and "ceasefire" functions', t => {
    t.plan(2);
    t.is(typeof yogafire, 'function');
    t.is(typeof ceasefire, 'function');
});