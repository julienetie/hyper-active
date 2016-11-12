import { fire, yoga } from '../src/yoga-fire';
import messages from '../src/error-messages';


/**
 * Set up element to use as target/s.
 */
const element = document.createElement('div');
element.id = 'target';
document.body.appendChild(element);


describe('Yoga - targets', () => {
	it('Should throw an error if targets is not valid', () => {
		expect(() => yoga(undefined, 'click:dblclick', () => {}))
			.to.throw(messages.targets);
	});
});


describe('Yoga - eventTypes', () => {
	it('Should throw an error if the eventTypes is not valid', () => {
		expect(() => yoga(element, undefined, () => {}))
			.to.throw(messages.eventTypes);
	});

	it('Should be a string', () => {
		expect(() => yoga(element, 'click:dblclick', () => {}))
			.to.not.throw(messages.eventTypes);
	});
});


describe('Yoga - yogaCallback', () => {
	it('Should throw an error if the yogaCallback is not valid', () => {
		expect(() => yoga(element, 'click:mouseover', undefined))
			.to.throw(messages.yogaCallback);
	});

	it('Should be a function', () => {
		expect(() => yoga(element, 'click:dblclick', () => {}))
			.to.not.throw(messages.yogaCallback);
	});
});


describe('Yoga - interfaces', () => {
	it('Should not throw an error if the interfaces is not valid', () => {
		expect(() => yoga(element, 'click:mouseover', () => {}, 'not-an-array'))
			.to.throw(messages.interfaces);
	});

	it('Should be an array if provided', () => {
		expect(() => yoga(element, 'click:dblclick', () => {}, []))
			.to.not.throw(messages.interfaces);
	});
});


describe('Yoga - arguments', () => {
	it('Should provide Fire as an argument', () => {
		// let hasFireCallback;

		yoga(element, 'click:mouseover', (expectedFire) => {
			// hasFireCallback = expectedFire === fire;
			
			expect(expectedFire).to.equal(fire);
		})

		// expect(hasFireCallback).to.be.true;
	});
});


describe('Fire', () => {
	it('Should return a given value', () => {
		const value = '123';
		expect(fire(value)).to.equal(value);
	});
});


// describe('Fire - arguments', () => {
// 	it('Should provide a target', () => {
// 		let hasFireCallback;

// 		yoga(element, 'click:mouseover', (expectedFire) => {
// 			hasFireCallback = expectedFire === fire;
// 		})

// 		expect(hasFireCallback).to.be.true;
// 	});
// });