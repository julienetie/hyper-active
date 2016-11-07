import eventTypesStore from './event-type-store';

/**
 * Maintains the eventTypeStore and element targets.
 * @param {string} eventType - Type of event.
 * @param {Array} watchElements - Elements to watch.
 * @param {Function} callback - The API callback. 
 */
function updateEventTypeStore(eventType, watchElements, callback) {
	const newEventLength = eventType.length;
	let listenerToRemove;
	let i = 0;

	this.callback = callback;

	for (let i = 0; i < newEventLength; i++) {
		this.eventType = eventType[i];

		/**
		 * only create new eventType entries if not yet properties.
		 */
		if (!eventTypesStore.hasOwnProperty(eventType[i])) {

			eventTypesStore[eventType[i]] = [
				[watchElements, callback]
			];

			window.addEventListener(eventType[i], this, true);
		} else {
			eventTypesStore[eventType[i]] = eventTypesStore[eventType[i]].concat([
				[watchElements, callback]
			]);
		}
	}
}

export default updateEventTypeStore;