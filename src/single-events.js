import { isString, isElement, getElement, newError } from './helpers';

const documentErrorMessage = 'Use an object parameter for global delegation.';

/**
 * Represents a sum.
 *
 * @param {HTMLElement|string|Array} targetElements - A selector, Element or array of either.
 * @param {Array} eventsArgs - Parameters for addEventListener.
 * @returns {Array} Returns singleCeaseFire functions in the order of provided targetElements.
 */
export default (targetElements, ...eventsArgs) => {
    const eventsArgsCopy = Array.from(eventsArgs);
    const eventsArgsCopyLength = eventsArgsCopy.length;
    let elements;

    // Check selector types.
    if (isString(targetElements)) {
        if (targetElements === 'document') {
            newError(documentErrorMessage);
        }
        elements = [getElement(targetElements)];
    } else {
        if (targetElements === document) {
            newError(documentErrorMessage);
        }
        elements = isElement(targetElements) ? [targetElements] : targetElements;
    }

    const singleCeaseFires = elements
        .map(selector => isString(selector) ? getElement(selector) : selector)
        .map(element => {
            if (eventsArgsCopyLength === 2) {
                eventsArgsCopy.push('false');
            }
            element.addEventListener(...eventsArgsCopy);

            // singleCeaseFire functions.
            return () => element.removeEventListener(...eventsArgsCopy);
        });

    return elements.length === 1 ? singleCeaseFires[0] : singleCeaseFires;
};
