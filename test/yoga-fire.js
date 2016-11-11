import { fire, yoga } from '../src/yoga-fire';

/**
 * Set up element to use as target/s.
 */
var element = document.createElement('div');
	element.id = 'target';
document.body.appendChild(element);


describe('Fire', () => {
	it('Should return a given value', () => {
		const value = '123';
		expect(fire(value)).to.equal(value);
	});
});


describe('Yoga - targets', () => {
	it('Should throw an error if targets are not provided', () => {
		expect(()=> yoga(undefined, 'click:dblclick', () => {}))
		.to.throw('YogaFire: No targets were defined');
	});
});


describe('Yoga - eventDescription', () => {
	it('Should throw an error if the eventDescription is not provided', () => {
		expect(()=> yoga(element, undefined, () => {}))
		.to.throw('YogaFire: No eventTypes were defined');
	});

	it('Should be a string', () => {
		expect(()=> yoga(element, 'click:dblclick', () => {}))
		.to.not.throw('YogaFire: No eventTypes were defined');
	});
});


describe('Yoga - yogaCallback', () => {
	it('Should throw an error if the yogaCallback is not provided', () => {
		expect(()=> yoga(element, 'click:mouseover', undefined))
		.to.throw('YogaFire: No callback was provided');
	});

	it('Should be a function', () => {
		expect(()=> yoga(element, 'click:dblclick', () => {}))
		.to.not.throw('YogaFire: No callback was provided');
	});
});


describe('Yoga - interfaces', () => {
	it('Should not throw an error if the interfaces is not provided', () => {
		expect(()=> yoga(element, 'click:mouseover', () => {}, 'not-an-array'))
		.to.throw('YogaFire: interfaces is not an Array');
	});

	it('Should be an array if provided', () => {
		expect(()=> yoga(element, 'click:dblclick', () => {},[]))
		.to.not.throw('YogaFire: interfaces is not an Array');
	});
});
