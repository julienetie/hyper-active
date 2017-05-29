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

/**
 * @license
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash include="isPlainObject" -o isPlainObject.js`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
// ;(function() {

/** Used as the semantic version number. */
var objectTag = '[object Object]';

/** Detect free variable `global` from Node.js. */
var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
function overArg(func, transform) {
  return function (arg) {
    return func(transform(arg));
  };
}

/*--------------------------------------------------------------------------*/

/** Used for built-in method references. */
var funcProto = Function.prototype;
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

/** Used to lookup unminified function names. */
function isObjectLike(value) {
  return value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
}

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || objectToString.call(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}

/*------------------------------------------------------------------------*/

// Add methods that return unwrapped values in chain sequences.

var isString = function isString(value) {
    return typeof value === 'string';
};
var isElement = function isElement(value) {
    return value instanceof Element;
};

var addEventListeners = function addEventListeners(eventListeners) {
    var eventListenersLength = eventListeners.length;
    var suspects = void 0;

    var handler = function handler(e, suspects, action) {
        var target = e.target;
        var cleanSuspects = suspects.map(function (suspect) {
            return suspect.replace('.', '').replace('#', '');
        });

        function checkTagName(cleanSuspects, tagName) {
            if (cleanSuspects.includes(tagName)) {
                action(e);
            }
        }

        if (cleanSuspects.includes(target.id)) {
            action(e);
        } else if (target.className) {
            var hasClass = cleanSuspects.filter(function (suspect) {
                return e.target.className.includes(suspect);
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

    eventListeners.forEach(function (eventListener, i) {
        console.log(eventListener.eventType);
        document.addEventListener(eventListener.eventType, function (e) {
            handler(e, eventListener.targets, eventListener.action);
        }, false);
    });
};

// removeEventListener 
var ceaseFire = function ceaseFire() {};

var eventListeners = [];
var actionsIndexReference = [];
var actionsReference = [];
var targetsIndexReference = [];
var targetsReference = [];

/**
 * 
 */
var fire = function fire(eventsObject, singleEventType, singleHandler, singleCapture) {
    var notUsingEventDelegation = !isPlainObject(eventsObject);

    if (notUsingEventDelegation) {
        var element = void 0;
        if (isString(eventsObject)) {
            if (eventsObject === 'document') {
                throw new Error('Use an object parameter for global delegation.');
            }
            element = document.querySelector(eventsObject);
        } else if (isElement(eventsObject)) {
            element = eventsObject;
        } else if (Array.isArray(eventsObject)) {
            eventsObject.map(function (selector) {
                return typeof selector === 'string' ? document.querySelector(selector) : selector;
            }).forEach(function (element) {
                return element.addEventListener(singleEventType, singleHandler, singleCapture);
            });
            return;
        }
        element.addEventListener(singleEventType, singleHandler, singleCapture);
        return;
    }

    var _loop = function _loop(eventType) {
        var _eventsObject$eventTy = eventsObject[eventType],
            target = _eventsObject$eventTy.target,
            targets = _eventsObject$eventTy.targets,
            action = _eventsObject$eventTy.action;

        var eventsGroupTargets = targets || target;

        var actionCopy = void 0;
        var isActionCopy = void 0;
        var targetsCopy = void 0;
        var isTargetsCopy = void 0;

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

        var targetsIndex = targetsIndexReference.indexOf(eventsGroupTargets);
        if (targetsIndex >= 0) {
            targetsCopy = targetsReference[targetsIndex];
        } else {
            targetsCopy = eventsGroupTargets;
        }

        eventType.split(':').forEach(function (eventType) {
            eventListeners.push({
                eventType: eventType,
                targets: typeof targetsCopy === 'string' ? [targetsCopy] : targetsCopy,
                action: actionCopy
            });
        });
    };

    for (var eventType in eventsObject) {
        _loop(eventType);
    }

    addEventListeners(eventListeners);
};

exports.ceaseFire = ceaseFire;
exports.fire = fire;

Object.defineProperty(exports, '__esModule', { value: true });

})));
