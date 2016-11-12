import eventTypesStore from './event-type-store';

/**
 * Maintains the eventTypeStore and element targets.
 * @param {string} eventType - Type of event.
 * @param {Array} watchElements - Elements to watch.
 * @param {Function} callback - The API callback. 
 */
function updateEventTypeStore(eventType, watchElements, callback) {
	const eventTypeLength = eventType.length;

	this.callback = callback;

	for (let i = 0; i < eventTypeLength; i++) {
		this.eventType = eventType[i];

		/**
		 * Only creates new eventType entries if not yet properties.
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