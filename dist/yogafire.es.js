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

const documentErrorMessage = 'Use an object parameter for global delegation.';

const newError = message => {
    throw new Error(message);
};

const singleEvents = (eventsObject, ...eventsArgs) => {
    const getElement = document.querySelector;
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
};

const firePartial = () => {
    const eventListeners = [];
    const actionsIndexReference = [];
    const actionsReference = [];
    const targetsIndexReference = [];
    const targetsReference = [];

    return (eventsObject, singleEventType, singleHandler, singleCapture) => {
        console.log('hello');
        if (!isPlaneObject(eventsObject)) {
            return singleEvents(eventsObject, singleEventType, singleHandler, singleCapture);
        }

        for (let eventType in eventsObject) {
            const { target, targets, action } = eventsObject[eventType];
            const eventsGroupTargets = targets || target;

            let actionCopy;
            let isActionCopy;
            let targetsCopy;
            let isTargetsCopy;

            // List of real actions.
            if (typeof action === 'function') {
                actionsIndexReference.push(eventType);
                actionsReference.push(action);
                actionCopy = action;
            } else {
                actionCopy = actionsReference[actionsIndexReference.indexOf(action)];
            }

            // Add Targets.
            targetsIndexReference.push(eventType);
            targetsReference.push(eventsGroupTargets);

            const targetsIndex = targetsIndexReference.indexOf(eventsGroupTargets);
            if (targetsIndex >= 0) {
                targetsCopy = targetsReference[targetsIndex];
            } else {
                targetsCopy = eventsGroupTargets;
            }

            eventType.split(':').forEach(eventType => {
                eventListeners.push({
                    eventType,
                    targets: typeof targetsCopy === 'string' ? [targetsCopy] : targetsCopy,
                    action: actionCopy
                });
            });
        }

        addEventListeners(eventListeners);
    };
};

const fire = firePartial();
const ceaseFire = () => {};

export { fire, ceaseFire };
