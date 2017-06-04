import test from 'tape';

test('throw', function(t) {
    t.plan(1);
    t.throws(function() {
        throw new TypeError('Error message');
    }, /Error message/,);
});
