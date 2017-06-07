(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.yogaFire = global.yogaFire || {})));
}(this, (function (exports) { 'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};























































var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var isObject = function isObject(value) {
    return value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && Array.isArray(value) === false;
};
var isObjectObject = function isObjectObject(value) {
    return isObject(value) === true && Object.prototype.toString.call(value) === '[object Object]';
};

// Is plane object.
var isPlaneObject = (function (value) {
    var valueConstructor = value.constructor;
    var constructorPrototype = valueConstructor.prototype;

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

var storage = { attachedEvents: null, ignoreSuspects: {} };

var isString = function isString(value) {
    return typeof value === 'string';
};

var isFunction = function isFunction(value) {
    return typeof value === 'function';
};
var isElement = function isElement(value) {
    return value instanceof window.Element;
};
var getElement = function getElement(selector) {
    return document.querySelector(selector);
};
var newError = function newError(message) {
    throw new Error(message);
};
var once = true;
var notice = function notice(message, style) {
    if (once) {
        // eslint-disable-next-line
        console.log(message, style);
        once = false;
    }
};
var hasProperty = function hasProperty(obj, property) {
    return !!Object.getOwnPropertyDescriptor(obj, property);
};
var error$1 = function error(value, parameter, linkHash) {
    notice('%c :: yogafire ::', 'color: #999;');
    throw new Error('"' + value + '" is invalid, see ' + parameter + ' \n\uD83D\uDD17 https://github.com/julienetie/yogafire/wiki/Docs' + linkHash + '\n');
};

/**
 * Attaches event listeners according to event discriptions.
 *
 * @param {Array} eventDescriptions - Event listener descriptions to be attached to the document.
 */
var addEventListeners = (function (eventDescriptions) {
    /**
     * Checks if a tagName exist within suspects.
     *
     * @param {Array} cleanSuspects - Suspects with removed prefixes.
     * @param {string} tagName - Target tagName.
     */
    var checkTagName = function checkTagName(cleanSuspects, tagName) {
        return cleanSuspects.includes(tagName);
    };

    /**
     * Manages suspects, targets and the storage.ignoredTargets data.
     *
     * @param {Object} e - The event object.
     * @param {Array} suspects - The possible targets.
     * @param {Function} eventSetName - The fireConfig property name.
     */
    var isTarget = function isTarget(e, suspects, eventSetName) {
        var target = e.target;
        var targetClassName = target.className;

        // Check for suspects ot ignore.
        var hasSuspectsToIgnore = hasProperty(storage.ignoreSuspects, eventSetName);
        var vettedSuspects = void 0;

        if (hasSuspectsToIgnore) {
            var suspectsToIgnore = storage.ignoreSuspects[eventSetName];
            vettedSuspects = suspects.filter(function (suspect) {
                return !suspectsToIgnore.includes(suspect);
            });
        } else {
            vettedSuspects = suspects;
        }

        // Removes class and id prefixes.
        var cleanSuspects = vettedSuspects.map(function (suspect) {
            return suspect.replace('.', '').replace('#', '');
        });

        // Id match.
        if (cleanSuspects.includes(target.id)) {
            return true;
            // Class match.
        } else if (targetClassName) {
            var hasClass = cleanSuspects.filter(function (suspect) {
                return targetClassName.includes(suspect);
            }).length > 0;
            if (hasClass) {
                return true;
            }
            return checkTagName(cleanSuspects, target.tagName);
        }
        return checkTagName(cleanSuspects, target.tagName);
    };

    var attachedEvent = eventDescriptions.map(function (_ref, index) {
        var eventType = _ref.eventType,
            suspects = _ref.suspects,
            handler = _ref.handler,
            eventSetName = _ref.eventSetName;

        if (!isString(eventType)) {
            error$1(eventType, 'eventType', '*#eventType');
        }

        var handlerWrapper = function handlerWrapper(e) {
            if (isTarget(e, suspects, eventSetName)) {
                handler(e, e.target);
            }
        };

        var addEvent = function addEvent() {
            return document.addEventListener(eventType, handlerWrapper, false);
        };

        addEvent();

        var removeEvent = function removeEvent() {
            return document.removeEventListener(eventType, handlerWrapper, false);
        };

        return {
            eventType: eventType,
            suspects: suspects,
            handler: handler,
            useCapture: false,
            eventSetName: eventSetName,
            index: index,
            addEvent: addEvent,
            removeEvent: removeEvent
        };
    });
    // Share attached events between modules.
    storage.attachedEvents = attachedEvent;
});

var documentErrorMessage = 'Use an object parameter for global delegation.';

/**
 * Represents a sum.
 *
 * @param {HTMLElement|string|Array} targetElements - A selector, Element or array of either.
 * @param {Array} eventsArgs - Parameters for addEventListener.
 * @returns {Array} Returns singleCeaseFire functions in the order of provided targetElements.
 */
var singleEvents = (function (targetElements) {
    for (var _len = arguments.length, eventsArgs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        eventsArgs[_key - 1] = arguments[_key];
    }

    var eventsArgsCopy = Array.from(eventsArgs);
    var eventsArgsCopyLength = eventsArgsCopy.length;
    var elements = void 0;

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

    var singleCeaseFires = elements.map(function (selector) {
        return isString(selector) ? getElement(selector) : selector;
    }).map(function (element) {
        if (eventsArgsCopyLength === 2) {
            eventsArgsCopy.push('false');
        }
        element.addEventListener.apply(element, toConsumableArray(eventsArgsCopy));

        // singleCeaseFire functions.
        return function () {
            return element.removeEventListener.apply(element, toConsumableArray(eventsArgsCopy));
        };
    });

    return elements.length === 1 ? singleCeaseFires[0] : singleCeaseFires;
});

/**
 * Enclosing function.
 *
 * @returns {Function} List of event details.
 */
var fireEnclosing = function fireEnclosing() {
    var handlerLinkingList = [];
    var handlerList = [];
    var eventSetNameList = [];
    var suspectsList = [];

    /**
     * The fire API.
     *
     * @param {Object|string|Element| Array} fireConfig - The event delegation
     * config or first parameter for singleEvents.
     * @param {Array} singleParams - Event type, handler and use capture
     * parameters for singleEvents.
     */
    return function fire(fireConfig) {
        // Ensure fireConfig is defined.
        if (fireConfig === undefined) {
            error$1(fireConfig, 'fireConfig', '*#fireConfig');
        }

        // Check if usage requires fireConfig or singleEvent API.
        if (!isPlaneObject(fireConfig)) {
            for (var _len = arguments.length, singleParams = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                singleParams[_key - 1] = arguments[_key];
            }

            return singleEvents.apply(undefined, [fireConfig].concat(singleParams));
        }

        // Process each eventSet.
        var eventsObjectKeys = Object.keys(fireConfig);
        var eventListeners2d = eventsObjectKeys.map(function (eventSetName) {
            var _fireConfig$eventSetN = fireConfig[eventSetName],
                suspect = _fireConfig$eventSetN.suspect,
                suspects = _fireConfig$eventSetN.suspects,
                handler = _fireConfig$eventSetN.handler;
            // Treats suspects and suspect synonomously.

            var suspectsSynonomous = suspects || suspect;
            var resolvedHandler = void 0;

            var isSuspectsValid = [isElement(suspectsSynonomous), isString(suspectsSynonomous), Array.isArray(suspectsSynonomous)].some(function (typeCheckValue) {
                return typeCheckValue;
            });

            if (!isSuspectsValid) {
                error$1(suspectsSynonomous, 'suspect|suspects', '*#suspect');
            }

            if (isFunction(handler)) {
                // Add eventSetNames as pre-existing properties for linkage.
                handlerLinkingList.push(eventSetName);
                handlerList.push(handler);
                resolvedHandler = handler;
            } else if (isString(handler)) {
                // Checks for handleLink.
                var handlerLinkIndex = handlerLinkingList.indexOf(handler);
                resolvedHandler = handlerList[handlerLinkIndex];
            } else {
                error$1(suspectsSynonomous, 'handler', '*#handler');
            }

            eventSetNameList.push(eventSetName);
            suspectsList.push(suspectsSynonomous);

            var isSuspectsLinkIndex = eventSetNameList.indexOf(suspectsSynonomous);

            // Checks for suspectsLink.
            var resolvedSuspects = isSuspectsLinkIndex >= 0 ? suspectsList[isSuspectsLinkIndex] : suspectsSynonomous;

            return eventSetName.split(':').map(function (eventType) {
                var wrappedSuspects = isString(resolvedSuspects) ? [resolvedSuspects] : resolvedSuspects;
                return {
                    eventType: eventType,
                    suspects: wrappedSuspects,
                    handler: resolvedHandler,
                    eventSetName: eventSetName
                };
            });
        });

        // Flattern event listeners.
        var eventListeners = eventListeners2d.reduce(function (a, b) {
            return a.concat(b);
        }, []);

        // Set up event listeners for delegation.
        return addEventListeners(eventListeners);
    };
};

var fire = fireEnclosing();

var notAnArray = 'ignoreSuspects should be an Array';

/**
 * API for removing events and ignoring suspects.
 *
 * @param {Object} ceaseFireConfig - Cease-fire Options.
 */
var ceaseFire = function ceaseFire(ceaseFireConfig) {
    // Ignore suspects
    if (hasProperty(ceaseFireConfig, 'ignoreSuspects')) {
        if (isPlaneObject(ceaseFireConfig.ignoreSuspects)) {
            Object.keys(ceaseFireConfig.ignoreSuspects).map(function (suspectToIgnore) {
                var ignoredValue = ceaseFireConfig.ignoreSuspects[suspectToIgnore];
                var ignoredValueArray = Array.isArray(ignoredValue) ? ignoredValue : [ignoredValue];

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
            storage.attachedEvents = storage.attachedEvents.filter(function (eventDetails) {
                var hasEventToRemove = ceaseFireConfig.removeEvents.some(function (eventToRemove) {
                    return eventToRemove === eventDetails.identity;
                });

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

exports.fire = fire;
exports.ceaseFire = ceaseFire;

Object.defineProperty(exports, '__esModule', { value: true });

})));
