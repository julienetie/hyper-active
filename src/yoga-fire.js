import { isString, isFunction } from './utilities/conditions';
import isArray from '../libs/isArray';
import fireArguments from './fire-arguments';
import updateeventDescriptionstore from './update-event-type-store';
import getTargetsAsElements from './get-targets-as-elements';
import eventHandler from './event-handler';
import logError from './log-error';
import messages from './error-messages';

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

	if(targets){
		elements = getTargetsAsElements(targets);
	}else{
		logError({
			message: messages.targets
		});		
	}



	if(!eventTypes){
		logError({
			message: messages.eventTypes
		});
	}

	if(interfaces && !isArray(interfaces)){
		logError({
			message: messages.interfaces
		});
	}

	
	

	// Check if eventTypes is a yogaCallback or string.
	if (isString(eventTypes)) {
		/**
		 * If using the YogaFire API.
		 */
		eventDescriptions = eventTypes.split(':');
	} else { 
		/**
		 * If using the addEventListener API for HyperEvents.
		 */

		// @TODO: hyperelment with addeventlistener (a wrapper to only use addeventlistener)
		// return;
	}


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
		updateeventDescriptionstore.call(
			eventHandler,
			eventDescriptions,
			elements,
			fireAPIArgument
		);
	}else{
		logError({
			message: messages.yogaCallback
		});
	}
}

export { yoga, fire };
