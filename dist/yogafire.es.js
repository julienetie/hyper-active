const isObject = value => value != null && typeof value === 'object' && Array.isArray(value) === false;
const isObjectObject = value => isObject(value) === true && Object.prototype.toString.call(value) === '[object Object]';

// Is plane object.
var isPlaneObject = (value => {
    const valueConstructor = value.constructor;
    const constructorPrototype = valueConstructor.prototype;

    if (isObjectObject(value) === false) {
        return false;
    }

    if (typeof valueConstructor !== 'function') {
        return false;
    }

    if (isObjectObject(constructorPrototype) === false) {
        return false;
    }
    // eslint-disable-next-line 
    if (constructorPrototype.hasOwnProperty('isPrototypeOf') === false) {
        return false;
    }
    return true;
});

var addEventListeners = (eventListeners => {
    const handler = (e, suspects, action) => {
        const checkTagName = (cleanSuspects, tagName) => {
            if (cleanSuspects.includes(tagName)) {
                action(e);
            }
        };

        const target = e.target;
        const cleanSuspects = suspects.map(suspect => suspect.replace('.', '').replace('#', ''));

        if (cleanSuspects.includes(target.id)) {
            action(e);
        } else if (target.className) {
            const hasClass = cleanSuspects.filter(suspect => target.className.includes(suspect)).length > 0;

            if (hasClass) {
                action(e);
            } else {
                checkTagName(cleanSuspects, target.tagName);
            }
        } else {
            checkTagName(cleanSuspects, target.tagName);
        }
    };

    eventListeners.forEach(eventListener => {
        document.addEventListener(eventListener.eventType, e => handler(e, eventListener.targets, eventListener.action), false);
    });
});

const isString = value => typeof value === 'string';


const isElement = value => value instanceof window.Element;
const getElement = selector => document.querySelector(selector);
const newError = message => {
  throw new Error(message);
};

const documentErrorMessage = 'Use an object parameter for global delegation.';

/**
 * Represents a sum.
 *
 * @param {HTMLElement|string|Array} eventsObject - A selector, Element or array of either.
 * @param {Array} eventsArgs - Parameters for addEventListener.
 */
var singleEvents = ((eventsObject, ...eventsArgs) => {
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

    elements.map(selector => isString(selector) ? getElement(selector) : selector).forEach(element => element.addEventListener(...eventsArgs));
});

const firePartial = () => {
    const actionsIndexReference = [];
    const actionsReference = [];
    const targetsIndexReference = [];
    const targetsReference = [];

    return (eventsObject, ...singleParams) => {
        if (!isPlaneObject(eventsObject)) {
            return singleEvents(eventsObject, ...singleParams);
        }
        const eventsObjectKeys = Object.keys(eventsObject);

        const eventListenersMulti = eventsObjectKeys.map(eventTypes => {
            const { target, targets, action } = eventsObject[eventTypes];
            const eventsGroupTargets = targets || target;
            let actionCopy;

            if (typeof action === 'function') {
                actionsIndexReference.push(eventTypes);
                actionsReference.push(action);
                actionCopy = action;
            } else {
                actionCopy = actionsReference[actionsIndexReference.indexOf(action)];
            }

            targetsIndexReference.push(eventTypes);
            targetsReference.push(eventsGroupTargets);

            const targetsIndex = targetsIndexReference.indexOf(eventsGroupTargets);
            const targetsCopy = targetsIndex >= 0 ? targetsReference[targetsIndex] : eventsGroupTargets;

            return eventTypes.split(':').map(eventType => ({
                eventType,
                targets: isString(targetsCopy) ? [targetsCopy] : targetsCopy,
                action: actionCopy
            }));
        });

        const eventListeners = eventListenersMulti.reduce((a, b) => a.concat(b), []);
        return addEventListeners(eventListeners);
    };
};

var fire = firePartial();

const ceaseFire = () => {};

export { fire, ceaseFire };
