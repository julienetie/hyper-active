import { isString, isHTMLCollection } from './utilities/conditions';
import isArray from '../libs/isArray';
import { isElement } from '../libs/isElement';

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

export default getTargetsAsElements;