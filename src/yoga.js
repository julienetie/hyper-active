import { isString } from './utilities/conditions';
import isArray from '../libs/isArray';
import fireArguments from './fire-arguments';
import updateEventTypeStore from './update-event-type-store';
import getTargetsAsElements from './get-targets-as-elements';
import eventHandler from './event-handler';


/**
 * The API used in conjunction with yoga.
 * @return - Callback.
 */
function fire(callback) {
	return callback;
}

/**
 * Handles targets and event types.
 * @param {Array|Element|HTMLCollection} targets - Elements to listen to.
 * @param {string} eventDescription	- An single or list of event types.
 * @param {Function} yogaCallback - The callback function.
 * @param {Array} interfaces - UI panels.
 */
function yoga(targets, eventDescription, yogaCallback, interfaces) {
	const elements = getTargetsAsElements(targets);
	let events;


	// Check if eventDescription is a yogaCallback or string.
	if (isString(eventDescription)) {
		/**
		 * If using the YogaFire API.
		 */
		events = eventDescription.split(':');
	} else {
		/**
		 * If using the addEventListener API for HyperEvents.
		 */

		// @TODO: hyperelment with addeventlistener (a wrapper to only use addeventlistener)
		return;
	}


	/**
	 * YogaFire API. Ensuring yogaCallback is used.
	 */
	if (typeof yogaCallback === 'function') {
		if (interfaces && isArray(interfaces)) {
			/**
			 * If interfaces supplied.
			 */
			fireArguments.interface = interfaces;
		}

		/**
		 * Sets the data from the previous interface in 
		 * the rolling stone chain. 
		 */
		fireArguments.data = 'this is data';


		// Passes fire to the yogaCallback.
		const newCallback = yogaCallback.call(this, fire);

		/**
		 * Updates eventTypes and the associated callback.
		 */
		updateEventTypeStore.call(eventHandler, events, elements, newCallback);

	}
}

export default yoga;