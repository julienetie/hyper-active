import isArray from '../libs/isArray';
import { isElement } from '../libs/isElement';
import { isString, isHTMLCollection } from './utilities/conditions';
import { buttons, relatedTarget } from './normalisation';
import { yoga } from './yoga-fire';
import eventHandler from './event-handler';
import fireArguments from './fire-arguments';
import eventTypesStore from './event-type-store';
import updateEventTypeStore from './update-event-type-store';





// *
//  * The arguments to be passed to the fire API callback.
 
// let fireArguments = {};





/**
 * The handleEvent property for eventListeners.
 */
eventHandler.handleEvent = function(e) {
	const eventsTargetPair = eventTypesStore[e.type];
	const eventsTargetPairLength = eventsTargetPair.length;
	let currentCallBack;
	let validTarget;

	for (let i = 0; i < eventsTargetPairLength; i++) {


		if (validTarget = matchTarget(eventsTargetPair[i], e.target)) {
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
	n.buttons = buttons(e);
	n.relatedTarget = relatedTarget(e);


	/**
	 * Parameters passed to the fire API callback.
	 */
	if (e.target === validTarget) {
		eventDelegator(e, currentCallBack, this.eventType, validTarget);
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


// /**
//  * Maintains the eventTypeStore and element targets.
//  * @param {string} eventType - Type of event.
//  * @param {Array} watchElements - Elements to watch.
//  * @param {Function} callback - The API callback. 
//  */
// function updateEventTypeStore(eventType, watchElements, callback) {
// 	const newEventLength = eventType.length;
// 	let listenerToRemove;
// 	let i = 0;

// 	this.callback = callback;

// 	for (let i = 0; i < newEventLength; i++) {
// 		this.eventType = eventType[i];

// 		/**
// 		 * only create new eventType entries if not yet properties.
// 		 */
// 		if (!eventTypesStore.hasOwnProperty(eventType[i])) {

// 			eventTypesStore[eventType[i]] = [
// 				[watchElements, callback]
// 			];

// 			window.addEventListener(eventType[i], this, true);
// 		} else {
// 			eventTypesStore[eventType[i]] = eventTypesStore[eventType[i]].concat([
// 				[watchElements, callback]
// 			]);
// 		}
// 	}
// }


/**
 * Compares targets to event targets.
 * @param {Object} e - Event.
 * @param {Function} callback - The API callback.
 * @param {string} eventType - The type of event.
 */
const eventDelegator = (e, callback, eventType, validTarget) => {
	const target = e.target;
	const watchElements = eventTypesStore[eventType][0];
	const watchElementsLength = watchElements.length;

	/**
	 * Assign the arguments to be passed to fire.
	 */
	fireArguments.e = e;
	fireArguments.target = target;
	fireArguments.parent = target.parent;


	/**
	 * Fires the returned callback of fire for
	 * matching targets per eventType.
	 */
	callback(fireArguments);
}





// *
//  * The API used in conjunction with yoga.
//  * @return - Callback.
 
// function fire(callback) {
// 	return callback;
// }


/**
 *
 */
// function yoga(targets, eventDescription, yogaCallback, interfaces) {
// 	let elements = getTargetsAsElements(targets);
// 	let events;


// 	// Check if eventDescription is a yogaCallback or string.
// 	if (isString(eventDescription)) {
// 		/**
// 		 * If using the YogaFire API.
// 		 */
// 		events = eventDescription.split(':');
// 	} else {
// 		/**
// 		 * If using the addEventListener API for HyperEvents.
// 		 */

// 		// @TODO: hyperelment with addeventlistener (a wrapper to only use addeventlistener)
// 		return;
// 	}


// 	/**
// 	 * YogaFire API. Ensuring yogaCallback is used.
// 	 */
// 	if (typeof yogaCallback === 'function') {
// 		if (interfaces && isArray(interfaces)) {
// 			/**
// 			 * If interfaces supplied.
// 			 */
// 			fireArguments.interface = interfaces;
// 		}

// 		/**
// 		 * Sets the data from the previous interface in 
// 		 * the rolling stone chain. 
// 		 */
// 		fireArguments.data = 'this is data';


// 		// Passes fire to the yogaCallback.
// 		const newCallback = yogaCallback.call(this, fire);

// 		/**
// 		 * Updates eventTypes and the associated callback.
// 		 */
// 		updateEventTypeStore.call(eventHandler, events, elements, newCallback);

// 	}
// }


window.yoga = yoga

export { yoga };
