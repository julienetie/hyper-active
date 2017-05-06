const isHTMLCollection = value => {
	if (typeof value.item === 'function') {
		return value.item(0) === value[0];
	}
	return false;
};

const isString = value => typeof value === 'string';

const isFunction = value => typeof value === 'function';

const hasDuplicates = array => new Set(array).size !== array.length;

/**
 * @license
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash include="isArray" -o isArray.js`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the semantic version number. */
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

// No operation performed.


/*------------------------------------------------------------------------*/

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * The arguments to be passed to the fire API callback.
 */
const fireArguments = {};

/**
 * Stores all event delegation event types and the target elements.
 */
const eventTypesStore = {};

/**
 * Maintains the eventTypeStore and element targets.
 * @param {string} eventType - Type of event.
 * @param {Array} watchElements - Elements to watch.
 * @param {Function} callback - The API callback. 
 */
function updateEventTypeStore(eventType, watchElements, callback) {
	const eventTypeLength = eventType.length;

	this.callback = callback;

	for (let i = 0; i < eventTypeLength; i++) {
		this.eventType = eventType[i];

		/**
   * Only creates new eventType entries if not yet properties.
   */
		if (!eventTypesStore.hasOwnProperty(eventType[i])) {

			eventTypesStore[eventType[i]] = [[watchElements, callback]];

			window.addEventListener(eventType[i], this, true);
		} else {
			eventTypesStore[eventType[i]] = eventTypesStore[eventType[i]].concat([[watchElements, callback]]);
		}
	}
}

/**
 * @license
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash include="isElement" -o isElement.js`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the semantic version number. */
/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Detect free variable `global` from Node.js. */
var freeGlobal$1 = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf$1 = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root$1 = freeGlobal$1 || freeSelf$1 || Function('return this')();

/*--------------------------------------------------------------------------*/

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
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

// No operation performed.


/*------------------------------------------------------------------------*/

/**
 * Checks if `value` is likely a DOM element.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
 * @example
 *
 * _.isElement(document.body);
 * // => true
 *
 * _.isElement('<body>');
 * // => false
 */
function isElement(value) {
  return value != null && value.nodeType === 1 && isObjectLike(value) && !isPlainObject(value);
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
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

/**
 * The elements to be compared as event targets.
 * @param {string|HTMLElement|Array|HTMLCollection} value - target or targets.  
 * @return {Array} - Array of HTMLElements.
 */
const getTargetsAsElements = value => {
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
};

function relate() {
	console.info('relate function', this);
}

function destruct() {
	console.info('destruct function', this);
}

/**
 * Compares targets to event targets.
 * @param {Object} e - Event.
 * @param {Function} callback - The API callback.
 * @param {string} eventType - The type of event.
 */
const eventDelegator = (callback, eventType, e, n, target, targets) => {
	const watchElements = eventTypesStore[eventType][0];
	const watchElementsLength = watchElements.length;

	/**
  * Assign the arguments to be passed to fire.
  */
	fireArguments.e = e;
	fireArguments.target = target;
	fireArguments.targets = targets;
	fireArguments.relate = relate;
	fireArguments.n = n;
	fireArguments.interface = null;
	fireArguments.destruct = destruct;
	fireArguments.id = null;

	/**
  * Fires the returned callback of fire for
  * matching targets per eventType.
  */
	callback(fireArguments);
};

// /**
//  * Browser Support:
//  * 
//  * Safari: 		6+
//  * Chrome:
//  * Opera:       18+
//  * IE: 			9+
//  * Firefox:     
//  * Edge:      
//  * 
//  * IOS: 		6+
//  * Android M:   4+
//  * Chrome M:     
//  * Earlier versions may work but will not be supported in development.
//  */


// export {
// 	/*
// 		MouseEvent.buttons
// 		¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯	
// 	*/
// 	buttons(event) {
// 		if ('buttons' in event) {
// 			return event.buttons;
// 		} else if ('which' in event) {
// 			let value = event.which;
// 			if (value === 2) {
// 				return 4;
// 			} else if (value === 3) {
// 				return 2;
// 			} else if (value > 0) {
// 				return 1 << (value - 1);
// 			}
// 		}

// 	},
// 	/*	
// 		MouseEvent.relatedTarget
// 		¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯
// 	*/
// 	relatedTarget(event) {
// 		return event.relatedTarget || (
// 			event.fromElement === event.target ?
// 			event.toElement : event.fromElement);
// 	}

// }

function buttons(event) {
	if ('buttons' in event) {
		return event.buttons;
	} else if ('which' in event) {
		let value = event.which;
		if (value === 2) {
			return 4;
		} else if (value === 3) {
			return 2;
		} else if (value > 0) {
			return 1 << value - 1;
		}
	}
}

function relatedTarget(event) {
	return event.relatedTarget || (event.fromElement === event.target ? event.toElement : event.fromElement);
}

/**
 * The context passed to addEventListener.
 */
const eventHandler = {};

/**
 * The handleEvent property for eventListeners.
 */
eventHandler.handleEvent = function (e) {
	const target = e.target;
	const eventsTargetPair = eventTypesStore[e.type];
	const eventsTargetPairLength = eventsTargetPair.length;
	let currentCallBack;
	let validTarget;

	for (let i = 0; i < eventsTargetPairLength; i++) {
		if (validTarget = matchTarget(eventsTargetPair[i], target)) {
			currentCallBack = eventsTargetPair[i][1];
			break;
		}
	}

	const n = {};

	/**
  * Normailsations for event properties.
  * An additional variable is used with properties that
  * mend inconsistencies as it is cheaper than cloning
  * the event object.
  */

	/** 
  * Mouse events.
  */console.log('e.type', e.type);
	if (e.type.indexOf('mouse') >= 0) {
		console.log('YES');
		n.buttons = buttons(e);
		n.relatedTarget = relatedTarget(e);
	}

	const targets = eventsTargetPair[0][0];

	/**
  * Parameters passed to the fire API callback.
  */
	if (target === validTarget) {
		eventDelegator(currentCallBack, this.eventType, e, n, target, targets);
	}
};

function matchTarget(stored, target) {
	const storedLength = stored.length;
	let matchedItem;
	for (let i = 0; i < storedLength; i++) {
		if (matchedItem = matchStored(stored[i], target)) {

			return matchedItem;
		}
	}
	return false;
}

function matchStored(element, target) {
	const elementLength = element.length;

	for (let i = 0; i < elementLength; i++) {

		if (element[i] === target) {

			return element[i];
		}
	}
	return false;
}

const logError = ({ message, type, value }) => {
	const error = new Error();

	/**
  * Logs YogaFire in the console.
  */
	if (typeof process === 'undefined') {
		console.info("%cYogaFire", "color: #cc0000; font-size:1rem;");
	}

	error.message = message;
	error.type = type;
	error.value = value;
	throw error;
};

const errorMessages = {
	targets: 'targets is not valid',
	eventTypes: 'eventTypes is not valid',
	yogaCallback: 'yogaCallback is not valid',
	interfaces: 'interfaces is not valid',
	duplicateEventTypes: 'Duplicate eventTypes are not allowed'
};

/**
 * The API used in conjunction with yoga.
 * @return - Callback.
 */
function fire(callback) {
	return callback;
}

/**
 * Handles targets and event types.
 * @param {Array|Element|HTMLCollection} targets - Elements to listen to.
 * @param {string} eventTypes	- An single or list of event types.
 * @param {Function} yogaCallback - The callback function.
 * @param {Array} interfaces - UI panels.
 */
function yoga(targets, eventTypes, yogaCallback, interfaces) {
	let elements;
	let eventDescriptions;

	if (targets) {
		elements = getTargetsAsElements(targets);
	} else {
		logError({
			message: errorMessages.targets
		});
	}

	if (!eventTypes) {
		logError({
			message: errorMessages.eventTypes
		});
	}

	if (interfaces && !isArray(interfaces)) {
		logError({
			message: errorMessages.interfaces
		});
	}

	// Check if eventTypes is a yogaCallback or string.
	if (isString(eventTypes)) {
		/**
   * If using the YogaFire API.
   */
		eventDescriptions = eventTypes.split(':');

		if (hasDuplicates(eventDescriptions)) {
			logError({
				message: errorMessages.duplicateEventTypes
			});
		}
	} else {}
	/**
  * If using the addEventListener API for HyperEvents.
  */

	// @TODO: hyperelment with addeventlistener (a wrapper to only use addeventlistener)
	// return;


	/**
  * YogaFire API. Ensuring yogaCallback is used.
  */
	if (isFunction(yogaCallback)) {
		if (interfaces && isArray(interfaces)) {
			/**
    * If interfaces supplied.
    */
			fireArguments.interface = interfaces;
		}

		/**
   * Sets the data from the previous interface in 
   * the rolling stone chain. 
   */
		// @TODO: setup data and example.
		// fireArguments.data = 'this is data';


		// Passes fire to the yogaCallback.
		const fireAPIArgument = yogaCallback.call(this, fire);

		/**
   * Updates eventDescriptions and the associated callback.
   */
		updateEventTypeStore.call(eventHandler, eventDescriptions, elements, fireAPIArgument);
	} else {
		logError({
			message: errorMessages.yogaCallback
		});
	}
}

// @TODO remove.
window.yoga = yoga;

export { yoga };
