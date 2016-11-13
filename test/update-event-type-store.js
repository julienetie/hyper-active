import updateEventTypeStore from '../src/update-event-type-store';
import eventTypesStore from '../src/event-type-store';
import eventHandler from '../src/event-handler';
import messages from '../src/error-messages';


/**
 * Set up element to use as target/s.
 */
const element = document.createElement('div');
const element2 = document.createElement('div');
const element3 = document.createElement('div');
element.id = 'target';
element2.id = 'target2';
element3.id = 'target3';
document.body.appendChild(element);

const func = () => {};
const func2 = (func_2) => func_2;
const func3 = (func_3) => func_3;
/**
 * Reset the eventTypeStore.
 */
afterEach(() => {
	for(let member in eventTypesStore){
		delete eventTypesStore[member];
	}
});


describe('Update Event Type Store', () => {
	it('Should update eventTypesStore with new event types', () => {
		updateEventTypeStore.call(
			eventHandler, ['click', 'mousemove', 'dblclick'],
			undefined, undefined
		);

		expect(eventTypesStore).to.have.property('click');
		expect(eventTypesStore).to.have.property('mousemove');
		expect(eventTypesStore).to.have.property('dblclick');
	});


	it('Should update eventTypesStore with watchElements and callback against the eventType', () => {
		updateEventTypeStore.call(
			eventHandler, ['click', 'mousemove', 'dblclick'],
			[element], func
		);

		expect(eventTypesStore.click[0][0][0]).to.equal(element);
		expect(eventTypesStore.mousemove[0][0][0]).to.equal(element);
		expect(eventTypesStore.dblclick[0][0][0]).to.equal(element); 
		expect(eventTypesStore.click[0][1]).to.equal(func);
		expect(eventTypesStore.mousemove[0][1]).to.equal(func);
		expect(eventTypesStore.dblclick[0][1]).to.equal(func);
	});

	it(`Should add new watchElements & callback pair to an existing eventType 
		without overwriting existing pairs`, () => {
		updateEventTypeStore.call(
			eventHandler, ['click'], [element], func
		);
		updateEventTypeStore.call(
			eventHandler, ['click'], [element2], func2
		);
		updateEventTypeStore.call(
			eventHandler, ['click'], [element3], func3
		);

		expect(eventTypesStore.click[0][0][0]).to.equal(element)
		expect(eventTypesStore.click[0][1]).to.equal(func)
		expect(eventTypesStore.click[1][0][0]).to.equal(element2)
		expect(eventTypesStore.click[1][1]).to.equal(func2)
		expect(eventTypesStore.click[2][0][0]).to.equal(element3)
		expect(eventTypesStore.click[2][1]).to.equal(func3)
	});
});
