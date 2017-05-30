import { isString, isElement, getElement, newError } from './helpers';

const documentErrorMessage = 'Use an object parameter for global delegation.';

/**
 * Represents a sum.
 *
 * @param {HTMLElement|string|Array} eventsObject - A selector, Element or array of either.
 * @param {Array} eventsArgs - Parameters for addEventListener.
 */
export default (eventsObject, ...eventsArgs) => {
    let elements;

    if (isString(eventsObject)) {
        if (eventsObject === 'document') {
            newError(documentErrorMessage);
        }
        elements = [getElement(eventsObject)];
    } else {
        if (eventsObject === document) {
            newError(documentErrorMessage);
        }
        elements = isElement(eventsObject) ? [eventsObject] : eventsObject;
    }

    elements
        .map(selector => isString(selector) ? getElement(selector) : selector)
        .forEach(element => element.addEventListener(...eventsArgs));
};
