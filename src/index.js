import isArray from '../libs/isArray';
import { isElement } from '../libs/isElement';
import { isString, isHTMLCollection } from './utilities/conditions';

const eventTypesStore = {};
let fireArguments = {};

const ev = {};
	ev.handleEvent = function(e) {
		eventDelegator(e, this.callback, this.eventType)
	}


function addGlobalEvent(eventType, i, eventCallback, callback){
	var add = function(e){
		console.log(e,callback,eventType[i]);
		eventDelegator(e, callback, eventType[i])
	}
	window.addEventListener(eventType[i], add, true);
}



function updateEventTypeStore (eventType, watchElements, callback){
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

			eventTypesStore[eventType[i]] = watchElements;

			window.addEventListener(eventType[i], this, true);
		}else{
			eventTypesStore[eventType[i]] = eventTypesStore[eventType[i]].concat(watchElements);
		}
	}
}


const eventDelegator = (e, callback, eventType) => {
	const target = e.target;
	const watchElements = eventTypesStore[eventType];
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
	for (let i = 0; i < watchElementsLength; i++) {
		if (watchElements[i] === target) {
			callback(fireArguments)
			break;
		}
	}
}


/**
 * The elements to be compared as event targets.
 * @param {string|HTMLElement|Array|HTMLCollection} value - target or targets.  
 * @return {Array} - Array of HTMLElements.
 */
const getTargetsAsElements = (value) => {
	let elements;

	if (isString(value)) {
		/**
		 * If hyperElement.
		 */
		if (value.charAt(0) === '@') {

			// @TODO: get hyperElement as array.

		} else {
			/**
			 * If selector.
			 */
			elements = [document.querySelector(value)];
		}
	} else if (isElement(value)) {
		/**
		 * If HTMLElement.
		 */
		elements = [value];
	} else if (isArray(value)) {
		if (isElement(value[0])) {
			/**
			 * If Array of elements.
			 */
			elements = value;
		} else if (isString(value[0])) {
			/**
			 * If Array of selectors.
			 */
			const valueLength = value.length;
			elements = [];
			for (let i = 0; i < valueLength; i++) {
				elements.push(document.querySelector(value[i]));
			}
		}

	} else if (isHTMLCollection(value)) {
		/**
		 * If HTMLCollection.
		 */
		elements = [].slice.call(value);
	}
	return elements;
}


/**
 * The API used in conjunction with yoga.
 * @return - Callback.
 */
function fire(callback) {
	return callback;
}


/**
 *
 */
function yoga(targets, eventDescription, yogaCallback, interfaces) {
	let elements = getTargetsAsElements(targets);
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
		updateEventTypeStore.call(ev,events, elements, newCallback);

	}
}


window.yoga = yoga

export { yoga };
