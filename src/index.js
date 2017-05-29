import isPlaneObject from '../libs/is-plane-object';
const isString = value => typeof value === 'string';
const isPrimitive = value => isString(value) || typeof value === 'number';
const isFunction = value => typeof value === 'function';
const isElement = value => value instanceof Element;


const addEventListeners = (eventListeners) => {
    const eventListenersLength = eventListeners.length;
    let suspects;

    const handler = (e, suspects, action) => {
        const target = e.target;
        const cleanSuspects = suspects.map(suspect => suspect.replace('.', '').replace('#', ''));

        function checkTagName(cleanSuspects, tagName) {
            if (cleanSuspects.includes(tagName)) {
                action(e);
            }
        }

        if (cleanSuspects.includes(target.id)) {
            action(e);
        } else if (target.className) {
            const hasClass = cleanSuspects.filter(suspect => e.target.className.includes(suspect)).length > 0;
            if (hasClass) {
                action(e);
            } else {
                checkTagName(cleanSuspects, target.tagName);
            }
        } else {
            checkTagName(cleanSuspects, target.tagName);
        }
    }


    eventListeners.forEach((eventListener, i) => {
        console.log(eventListener.eventType)
        document.addEventListener(eventListener.eventType, (e) => {
            handler(e, eventListener.targets, eventListener.action)
        }, false);
    });
}


// removeEventListener 
export const ceaseFire = () => {};

const eventListeners = [];
const actionsIndexReference = [];
const actionsReference = [];
const targetsIndexReference = [];
const targetsReference = [];

const test = () => {}

/**
 * 
 */
export const fire = (eventsObject, singleEventType, singleHandler, singleCapture) => {
    const notUsingEventDelegation = !isPlaneObject(eventsObject);

    if (notUsingEventDelegation) {
        let element;
        if (isString(eventsObject)) {
            if (eventsObject === 'document') {
                throw new Error('Use an object parameter for global delegation.');
            }
            element = document.querySelector(eventsObject);
        } else if (isElement(eventsObject)) {
            element = eventsObject;
        } else if (Array.isArray(eventsObject)) {
            eventsObject.map(selector =>
                    typeof selector === 'string' ? document.querySelector(selector) : selector)
                .forEach(element =>
                    element.addEventListener(
                        singleEventType,
                        singleHandler,
                        singleCapture
                    )
                );
            return;
        }
        element.addEventListener(singleEventType, singleHandler, singleCapture);
        return;
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


        eventType.split(':').forEach((eventType) => {
            eventListeners.push({
                eventType,
                targets: typeof targetsCopy === 'string' ? [targetsCopy] : targetsCopy,
                action: actionCopy
            });
        });
    }

    addEventListeners(eventListeners);
}
