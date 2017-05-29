import eventTypesStore from './event-type-store';
import fireArguments from './fire-arguments';
import { relate, destruct } from './fire-methods';

/**
 * Compares targets to event targets.
 * @param {Object} e - Event.
 * @param {Function} callback - The API callback.
 * @param {string} eventType - The type of event.
 */
const eventDelegator = (callback, eventType, e, n, target, targets) => {
	const watchElements = eventTypesStore[eventType][0];
	const watchElementsLength = watchElements.length;

	/**
	 * Assign the arguments to be passed to fire.
	 */
	fireArguments.e = e;
	fireArguments.target = target;
	fireArguments.targets = targets;
	fireArguments.relate = relate;
	fireArguments.n = n;
	fireArguments.interface = null;
	fireArguments.destruct = destruct;
	fireArguments.id = null;

	/**
	 * Fires the returned callback of fire for
	 * matching targets per eventType.
	 */
	callback(fireArguments);
}

export default eventDelegator;