import eventTypesStore from './event-type-store';
import eventDelegator from './event-delegator';
import { buttons, relatedTarget } from './normalisation';

/**
 * The context passed to addEventListener.
 */
const eventHandler = {};


/**
 * The handleEvent property for eventListeners.
 */
eventHandler.handleEvent = function(e) {
	const target = e.target;
	const eventsTargetPair = eventTypesStore[e.type];
	const eventsTargetPairLength = eventsTargetPair.length;
	let currentCallBack;
	let validTarget;

	for (let i = 0; i < eventsTargetPairLength; i++) {
		if (validTarget = matchTarget(eventsTargetPair[i], target)) {
			currentCallBack = eventsTargetPair[i][1];
			break;
		}
	}

	const n = {};


	/**
	 * Normailsations for event properties.
	 * An additional variable is used with properties that
	 * mend inconsistencies as it is cheaper than cloning
	 * the event object.
	 */

	/** 
	 * Mouse events.
	 */ console.log('e.type',e.type)
	if(e.type.indexOf('mouse') >= 0){
		console.log('YES')
		n.buttons = buttons(e);
		n.relatedTarget = relatedTarget(e);
	}

 	const targets = eventsTargetPair[0][0];

	/**
	 * Parameters passed to the fire API callback.
	 */
	if (target === validTarget) {
		eventDelegator(currentCallBack, this.eventType, e, n, target, targets);
	}

}


function matchTarget(stored, target, ) {
	const storedLength = stored.length;
	let matchedItem;
	for (let i = 0; i < storedLength; i++) {
		if (matchedItem = matchStored(stored[i], target)) {

			return matchedItem;
		}
	}
	return false;
}


function matchStored(element, target) {
	const elementLength = element.length;

	for (let i = 0; i < elementLength; i++) {

		if (element[i] === target) {

			return element[i];
		}
	}
	return false;
}

export default eventHandler;