import updateEventTypeStore from '../src/update-event-type-store';
import eventTypesStore from '../src/event-type-store';
import eventHandler from '../src/event-handler';
import messages from '../src/error-messages';

console.log('eventTypesStore', eventTypesStore);

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


	it('Should add an event listener for each eventType', () => {
		expect(false).to.be.true;
	});

	it('Should update eventTypesStore with watchElements and callback against the eventType', () => {
		expect(false).to.be.true;	
	});

	it(`Should add new watchElements & callback pair to an existing eventType 
		without overwriting existing pairs`, () => {
		expect(false).to.be.true;
	});
});
