import eventTypesStore from './event-type-store';
import fireArguments from './fire-arguments';

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

export default eventDelegator;