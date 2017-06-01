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

/**
 * Attaches event listeners according to event discriptions.
 *
 * @param {Array} eventDescriptions - Event listener descriptions to be attached to the document.
 */
var addEventListeners = (function (eventDescriptions) {
    var handler = function handler(e, suspects, action) {
        var checkTagName = function checkTagName(cleanSuspects, tagName) {
            if (cleanSuspects.includes(tagName)) {
                action(e);
            }
        };

        var target = e.target;
        var cleanSuspects = suspects.map(function (suspect) {
            return suspect.replace('.', '').replace('#', '');
        });

        if (cleanSuspects.includes(target.id)) {
            action(e);
        } else if (target.className) {
            var hasClass = cleanSuspects.filter(function (suspect) {
                return target.className.includes(suspect);
            }).length > 0;

            if (hasClass) {
                action(e);
            } else {
                checkTagName(cleanSuspects, target.tagName);
            }
        } else {
            checkTagName(cleanSuspects, target.tagName);
        }
    };

    return eventDescriptions.map(function (_ref, index) {
        var eventType = _ref.eventType,
            targets = _ref.targets,
            action = _ref.action;

        document.addEventListener(eventType, function (e) {
            return handler(e, targets, action);
        }, false);
        return {
            eventType: eventType,
            targets: targets,
            handler: action,
            useCapture: false,
            index: index
        };
    });
});

var isString = function isString(value) {
  return typeof value === 'string';
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

var firePartial = function firePartial() {
    var actionsIndexReference = [];
    var actionsReference = [];
    var targetsIndexReference = [];
    var targetsReference = [];

    return function (eventsObject) {
        for (var _len = arguments.length, singleParams = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            singleParams[_key - 1] = arguments[_key];
        }

        if (!isPlaneObject(eventsObject)) {
            return singleEvents.apply(undefined, [eventsObject].concat(singleParams));
        }
        var eventsObjectKeys = Object.keys(eventsObject);

        var eventListenersMulti = eventsObjectKeys.map(function (eventTypes) {
            var _eventsObject$eventTy = eventsObject[eventTypes],
                target = _eventsObject$eventTy.target,
                targets = _eventsObject$eventTy.targets,
                action = _eventsObject$eventTy.action;

            var eventsGroupTargets = targets || target;
            var actionCopy = void 0;

            if (typeof action === 'function') {
                actionsIndexReference.push(eventTypes);
                actionsReference.push(action);
                actionCopy = action;
            } else {
                actionCopy = actionsReference[actionsIndexReference.indexOf(action)];
            }

            targetsIndexReference.push(eventTypes);
            targetsReference.push(eventsGroupTargets);

            var targetsIndex = targetsIndexReference.indexOf(eventsGroupTargets);
            var targetsCopy = targetsIndex >= 0 ? targetsReference[targetsIndex] : eventsGroupTargets;

            return eventTypes.split(':').map(function (eventType) {
                return {
                    eventType: eventType,
                    targets: isString(targetsCopy) ? [targetsCopy] : targetsCopy,
                    action: actionCopy
                };
            });
        });

        var eventListeners = eventListenersMulti.reduce(function (a, b) {
            return a.concat(b);
        }, []);
        return addEventListeners(eventListeners);
    };
};

var fire = firePartial();

var ceaseFire = function ceaseFire() {};

exports.fire = fire;
exports.ceaseFire = ceaseFire;

Object.defineProperty(exports, '__esModule', { value: true });

})));
