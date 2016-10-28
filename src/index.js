import isArray from '../libs/isArray';
import { isElement } from '../libs/isElement';

const isHTMLCollection = (value) => {
	return value.item(0) === value[0];
}


const getElementReference = (value) => {
	let elements;

	if (typeof value === 'string') {
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

	console.info(elements)
}


window.yoga = yoga

export { yoga };
