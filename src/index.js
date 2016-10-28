import isArray from '../libs/isArray';
import { isElement } from '../libs/isElement';

const isHTMLCollection = (value) => {
	if (value.hasOwnProperty('item')) {
		return value.item(0) === value[0];
	}
	return false;
}

const isString = (value) => {
	return typeof value === 'string';
}


const getElementReference = (value) => {
	let elements;

	if (isString(value)) {
		if (value.charAt(0) === '@') {
			// get hyperElement as array
		} else {
			elements = [document.querySelector(value)]; // query selector
		}
	} else if (isElement(value)) {
		elements = [value];
	} else if (isArray(value)) {
		elements = value;
	} else if (isHTMLCollection(value)) {
		elements = [].slice.call(value);
	}
	return elements;
}



function yoga(elementReference, eventDescription, callback, interfaces) {
	// Get Array of elements.
	let elements = getElementReference(elementReference);
	let events;

	// Check if eventDescription is a callback or string.
	if (isString(eventDescription)) {
		events = eventDescription.split(':');
	} else {
		// Pass hyperelment with addeventlistener (a wrapper to only use addeventlistener)
		return;
	}


	if (typeof callback === 'function') {
		// Pass delegated event info.
	}

	if (interfaces) {
		if (isArray(interfaces)) {
			// Pass delegated event info.
		} else if (isString(interfaces)) {

		}
	}


	console.info(elements, events, callback, interfaces)
}


window.yoga = yoga

export { yoga };
