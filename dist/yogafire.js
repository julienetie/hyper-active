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

const storage = { attachedEvents: null, ignoreSuspects: {} };

const isString = value => typeof value === 'string';

const isFunction = value => typeof value === 'function';
const isElement = value => value instanceof window.Element;
const getElement = selector => document.querySelector(selector);
const newError = message => {
    throw new Error(message);
};
let once = true;
const notice = (message, style) => {
    if (once) {
        // eslint-disable-next-line
        console.log(message, style);
        once = false;
    }
};
const hasProperty = (obj, property) => !!Object.getOwnPropertyDescriptor(obj, property);
const error = (value, parameter, linkHash) => {
    notice('%c :: yogafire ::', 'color: #999;');
    throw new Error(`"${value}" is invalid, see ${parameter} \n🔗 https://github.com/julienetie/yogafire/wiki/Docs${linkHash}\n`);
};

/**
 * Attaches event listeners according to event discriptions.
 *
 * @param {Array} eventDescriptions - Event listener descriptions to be attached to the document.
 */
var addEventListeners = (eventDescriptions => {
    /**
     * Checks if a tagName exist within suspects.
     *
     * @param {Array} cleanSuspects - Suspects with removed prefixes.
     * @param {string} tagName - Target tagName.
     */
    const checkTagName = (cleanSuspects, tagName) => cleanSuspects.includes(tagName);

    /**
     * Manages suspects, targets and the storage.ignoredTargets data.
     *
     * @param {Object} e - The event object.
     * @param {Array} suspects - The possible targets.
     * @param {Function} eventSetName - The fireConfig property name.
     */
    const isTarget = (e, suspects, eventSetName) => {
        const target = e.target;
        const targetClassName = target.className;

        // Check for suspects ot ignore.
        const hasSuspectsToIgnore = hasProperty(storage.ignoreSuspects, eventSetName);
        let vettedSuspects;

        if (hasSuspectsToIgnore) {
            const suspectsToIgnore = storage.ignoreSuspects[eventSetName];
            vettedSuspects = suspects.filter(suspect => !suspectsToIgnore.includes(suspect));
        } else {
            vettedSuspects = suspects;
        }

        // Removes class and id prefixes.
        const cleanSuspects = vettedSuspects.map(suspect => suspect.replace('.', '').replace('#', ''));

        // Id match.
        if (cleanSuspects.includes(target.id)) {
            return true;
            // Class match.
        } else if (targetClassName) {
            const hasClass = cleanSuspects.filter(suspect => targetClassName.includes(suspect)).length > 0;
            if (hasClass) {
                return true;
            }
            return checkTagName(cleanSuspects, target.tagName);
        }
        return checkTagName(cleanSuspects, target.tagName);
    };

    const attachedEvent = eventDescriptions.map(({ eventType, suspects, handler, eventSetName }, index) => {
        if (!isString(eventType)) {
            error(eventType, 'eventType', '*#eventType');
        }

        const handlerWrapper = e => {
            if (isTarget(e, suspects, eventSetName)) {
                handler(e, e.target);
            }
        };

        const addEvent = () => document.addEventListener(eventType, handlerWrapper, false);

        addEvent();

        const removeEvent = () => document.removeEventListener(eventType, handlerWrapper, false);

        return {
            eventType,
            suspects,
            handler,
            useCapture: false,
            eventSetName,
            index,
            addEvent,
            removeEvent
        };
    });
    // Share attached events between modules.
    storage.attachedEvents = attachedEvent;
});

const documentErrorMessage = 'Use an object parameter for global delegation.';

/**
 * Represents a sum.
 *
 * @param {HTMLElement|string|Array} targetElements - A selector, Element or array of either.
 * @param {Array} eventsArgs - Parameters for addEventListener.
 * @returns {Array} Returns singleCeaseFire functions in the order of provided targetElements.
 */
var singleEvents = ((targetElements, ...eventsArgs) => {
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

    const singleCeaseFires = elements.map(selector => isString(selector) ? getElement(selector) : selector).map(element => {
        if (eventsArgsCopyLength === 2) {
            eventsArgsCopy.push('false');
        }
        element.addEventListener(...eventsArgsCopy);

        // singleCeaseFire functions.
        return () => element.removeEventListener(...eventsArgsCopy);
    });

    return elements.length === 1 ? singleCeaseFires[0] : singleCeaseFires;
});

/**
 * Enclosing function.
 *
 * @returns {Function} List of event details.
 */
const fireEnclosing = () => {
    const handlerLinkingList = [];
    const handlerList = [];
    const eventSetNameList = [];
    const suspectsList = [];

    /**
     * The fire API.
     *
     * @param {Object|string|Element| Array} fireConfig - The event delegation
     * config or first parameter for singleEvents.
     * @param {Array} singleParams - Event type, handler and use capture
     * parameters for singleEvents.
     */
    return function fire(fireConfig, ...singleParams) {
        // Ensure fireConfig is defined.
        if (fireConfig === undefined) {
            error(fireConfig, 'fireConfig', '*#fireConfig');
        }

        // Check if usage requires fireConfig or singleEvent API.
        if (!isPlaneObject(fireConfig)) {
            return singleEvents(fireConfig, ...singleParams);
        }

        // Process each eventSet.
        const eventsObjectKeys = Object.keys(fireConfig);
        const eventListeners2d = eventsObjectKeys.map(eventSetName => {
            const { suspect, suspects, handler } = fireConfig[eventSetName];
            // Treats suspects and suspect synonomously.
            const suspectsSynonomous = suspects || suspect;
            let resolvedHandler;

            const isSuspectsValid = [isElement(suspectsSynonomous), isString(suspectsSynonomous), Array.isArray(suspectsSynonomous)].some(typeCheckValue => typeCheckValue);

            if (!isSuspectsValid) {
                error(suspectsSynonomous, 'suspect|suspects', '*#suspect');
            }

            if (isFunction(handler)) {
                // Add eventSetNames as pre-existing properties for linkage.
                handlerLinkingList.push(eventSetName);
                handlerList.push(handler);
                resolvedHandler = handler;
            } else if (isString(handler)) {
                // Checks for handleLink.
                const handlerLinkIndex = handlerLinkingList.indexOf(handler);
                resolvedHandler = handlerList[handlerLinkIndex];
            } else {
                error(suspectsSynonomous, 'handler', '*#handler');
            }

            eventSetNameList.push(eventSetName);
            suspectsList.push(suspectsSynonomous);

            const isSuspectsLinkIndex = eventSetNameList.indexOf(suspectsSynonomous);

            // Checks for suspectsLink.
            const resolvedSuspects = isSuspectsLinkIndex >= 0 ? suspectsList[isSuspectsLinkIndex] : suspectsSynonomous;

            return eventSetName.split(':').map(eventType => {
                const wrappedSuspects = isString(resolvedSuspects) ? [resolvedSuspects] : resolvedSuspects;
                return {
                    eventType,
                    suspects: wrappedSuspects,
                    handler: resolvedHandler,
                    eventSetName
                };
            });
        });

        // Flattern event listeners.
        const eventListeners = eventListeners2d.reduce((a, b) => a.concat(b), []);

        // Set up event listeners for delegation.
        return addEventListeners(eventListeners);
    };
};

var fire = fireEnclosing();

const notAnArray = 'ignoreSuspects should be an Array';

/**
 * API for removing events and ignoring suspects.
 *
 * @param {Object} ceaseFireConfig - Cease-fire Options.
 */
const ceaseFire = ceaseFireConfig => {
    // Ignore suspects
    if (hasProperty(ceaseFireConfig, 'ignoreSuspects')) {
        if (isPlaneObject(ceaseFireConfig.ignoreSuspects)) {
            Object.keys(ceaseFireConfig.ignoreSuspects).map(suspectToIgnore => {
                const ignoredValue = ceaseFireConfig.ignoreSuspects[suspectToIgnore];
                const ignoredValueArray = Array.isArray(ignoredValue) ? ignoredValue : [ignoredValue];

                // Add suspect to ignoreSuspects.
                storage.ignoreSuspects[suspectToIgnore] = ignoredValueArray;

                // @todo Doing nothing.
                return suspectToIgnore;
            });
        } else {
            newError(notAnArray);
        }
    }

    // Remove Events.
    if (hasProperty(ceaseFireConfig, 'removeEvents')) {
        if (Array.isArray(ceaseFireConfig.removeEvents)) {
            storage.attachedEvents = storage.attachedEvents.filter(eventDetails => {
                const hasEventToRemove = ceaseFireConfig.removeEvents.some(eventToRemove => eventToRemove === eventDetails.identity);

                if (hasEventToRemove) {
                    // Remove Event.
                    eventDetails.removeEvent();
                    return false;
                }
                // @todo Doing nothing.
                return true;
            });
        } else {
            newError(notAnArray);
        }
    }
};

export { fire, ceaseFire };
